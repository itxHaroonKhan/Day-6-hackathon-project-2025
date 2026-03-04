import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

interface CartItem {
  _id: string;
  title: string;
  price: number | string;
  imageUrl: string;
  quantity?: number;
}

// Sanity client for saving orders
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-18",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, zipCode, country, orderItems, totalPrice } = body;

    console.log("📦 New order received:", {
      name,
      email,
      orderItemsCount: orderItems?.length,
      totalPrice,
    });

    // Validate required fields
    if (!name || !email || !phone || !address || !orderItems || orderItems.length === 0) {
      console.error("❌ Validation failed:", { name, email, phone, address, orderItems });
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check Sanity credentials
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const token = process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN;
    
    if (!projectId || !token || projectId === "your_project_id") {
      console.error("❌ Sanity credentials missing or invalid");
      console.log("Project ID:", projectId);
      console.log("Token present:", !!token);
      
      // Return success anyway for testing (order will be logged only)
      console.log("✅ Order logged (Sanity not configured):", { name, email, total: totalPrice });
      return NextResponse.json(
        { 
          success: true, 
          message: "Order placed successfully (Sanity not configured)", 
          orderId: "demo-" + Date.now(),
          demo: true
        },
        { status: 201 }
      );
    }

    // Transform order items to match Sanity schema
    const formattedOrderItems = orderItems.map((item: CartItem) => ({
      _key: Math.random().toString(36).substr(2, 9),
      productId: item._id,
      title: item.title,
      price: typeof item.price === "string" ? parseFloat(item.price) : item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity || 1,
    }));

    // Create order in Sanity
    const order = {
      _type: "order",
      name,
      email,
      phone,
      address,
      zipCode,
      country,
      orderItems: formattedOrderItems,
      totalPrice: typeof totalPrice === "string" ? parseFloat(totalPrice) : totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log("📝 Creating order in Sanity:", order);

    const createdOrder = await sanityClient.create(order);

    console.log("✅ Order created successfully:", createdOrder._id);

    return NextResponse.json(
      { success: true, message: "Order created successfully", orderId: createdOrder._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating order:", error);
    
    // If it's a network error, return a friendly message
    if (error instanceof TypeError && error.message === "fetch failed") {
      return NextResponse.json(
        { 
          success: false, 
          message: "Network error. Please check your internet connection." 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create order", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Fetching orders from Sanity...");
    
    // Get email from query params
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    
    // Check if Sanity credentials are configured
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const token = process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN;
    
    console.log("📋 Sanity config:", { 
      projectId: projectId ? "configured" : "missing",
      projectIdValue: projectId,
      token: token ? "configured" : "missing",
      email: email || "not provided"
    });
    
    if (!projectId || !token || projectId === "your_project_id") {
      console.warn("⚠️ Sanity not configured - returning empty orders");
      return NextResponse.json(
        { success: true, orders: [], message: "Sanity not configured" },
        { status: 200 }
      );
    }

    // If email is provided, filter by email
    let query;
    if (email) {
      query = `*[_type == "order" && email == "${email}"] | order(_createdAt desc) {
        _id,
        name,
        email,
        phone,
        address,
        zipCode,
        country,
        orderItems[] {
          productId,
          title,
          price,
          imageUrl,
          quantity
        },
        totalPrice,
        status,
        _createdAt,
        _updatedAt
      }`;
    } else {
      // Admin view - all orders
      query = `*[_type == "order"] | order(_createdAt desc) {
        _id,
        name,
        email,
        phone,
        address,
        zipCode,
        country,
        orderItems[] {
          productId,
          title,
          price,
          imageUrl,
          quantity
        },
        totalPrice,
        status,
        _createdAt,
        _updatedAt
      }`;
    }

    console.log("📝 Running query:", query);

    const orders = await sanityClient.fetch(query);

    console.log("✅ Fetched orders:", orders.length);

    return NextResponse.json(
      { success: true, orders },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    
    // Check if it's a network error
    if (error instanceof TypeError) {
      console.error("Network error details:", error.message);
    }
    
    // Return empty array instead of error
    return NextResponse.json(
      { success: true, orders: [], message: "Unable to fetch orders at this time" },
      { status: 200 }
    );
  }
}

// DELETE - Delete an order by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const token = process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN;

    if (!projectId || !token || projectId === "your_project_id") {
      return NextResponse.json(
        { success: false, message: "Sanity not configured" },
        { status: 500 }
      );
    }

    console.log("🗑️ Deleting order:", orderId);

    await sanityClient.delete(orderId);

    console.log("✅ Order deleted successfully:", orderId);

    return NextResponse.json(
      { success: true, message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete order", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
