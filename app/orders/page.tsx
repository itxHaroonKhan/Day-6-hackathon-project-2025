"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ConfirmModal from "@/components/ConfirmModal";

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  country: string;
  orderItems: OrderItem[];
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  _createdAt: string;
  _updatedAt: string;
}

const statusSteps = {
  pending: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
  cancelled: 0,
};

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    orderId: "",
  });

  useEffect(() => {
    if (isLoaded && user) {
      fetchOrders(user.emailAddresses[0]?.emailAddress || "");
    } else if (isLoaded && !user) {
      setLoading(false);
    }
  }, [user, isLoaded]);

  const fetchOrders = async (userEmail: string) => {
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();

      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.warn("Order fetch error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        fetchOrders(user?.emailAddresses[0]?.emailAddress || "");
        setDeleteModal({ isOpen: false, orderId: "" });
      } else {
        alert("Failed to delete order: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please sign in to view your orders</p>
          <Link
            href="/sign-in"
            className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const getEstimatedDelivery = (createdAt: string, status: string) => {
    const orderDate = new Date(createdAt);
    const deliveryDate = new Date(orderDate);
    
    if (status === "delivered") {
      return "Delivered";
    }
    
    deliveryDate.setDate(orderDate.getDate() + 7); // 7 days delivery estimate
    return `Estimated: ${deliveryDate.toLocaleDateString('en-PK', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })}`;
  };

  const getStatusTimeline = (status: string) => {
    const currentStep = statusSteps[status as keyof typeof statusSteps];
    
    return (
      <div className="w-full overflow-x-auto">
        <div className="flex items-center justify-between relative min-w-[400px]">
          {/* Progress Bar */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          
          {/* Steps */}
          {["Pending", "Processing", "Shipped", "Delivered"].map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber <= currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? isCurrent
                        ? "bg-teal-500 text-white ring-4 ring-teal-200"
                        : "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                <span
                  className={`text-xs mt-1 font-medium whitespace-nowrap ${
                    isCompleted ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center md:text-left">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600 mb-4">No orders found</p>
            <a
              href="/shop"
              className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Order Header with Status Timeline */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 md:px-6 py-4 md:py-6 border-b">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div>
                          <p className="text-xs md:text-sm text-gray-600">Order ID</p>
                          <p className="font-semibold text-gray-800 text-sm md:text-base break-all">{order._id}</p>
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-gray-600">Order Date</p>
                          <p className="font-semibold text-gray-800 text-sm md:text-base">
                            {new Date(order._createdAt).toLocaleDateString('en-PK', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-gray-600">Est. Delivery</p>
                          <p className="font-semibold text-gray-800 text-sm md:text-base">
                            {getEstimatedDelivery(order._createdAt, order.status)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, orderId: order._id })}
                      className="px-3 md:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm md:text-base w-full md:w-auto justify-center"
                      title="Delete Order"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="hidden md:inline">Delete</span>
                    </button>
                  </div>
                  
                  {/* Status Timeline */}
                  <div className="mt-4 md:mt-6">
                    {getStatusTimeline(order.status)}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 pb-4 border-b last:border-b-0"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-gray-600">
                            Price: ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="mt-6 pt-6 border-t flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">Total Amount</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-gray-50 px-4 md:px-6 py-4 border-t">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                    Shipping Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-gray-600">
                    <div>
                      <p className="mb-1">
                        <strong className="text-gray-800">Name:</strong> {order.name}
                      </p>
                      <p className="mb-1 break-all">
                        <strong className="text-gray-800">Email:</strong> {order.email}
                      </p>
                      <p>
                        <strong className="text-gray-800">Phone:</strong> {order.phone}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 break-all">
                        <strong className="text-gray-800">Address:</strong> {order.address}
                      </p>
                      <p>
                        {order.zipCode}, {order.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
        onConfirm={() => deleteOrder(deleteModal.orderId)}
        onCancel={() => setDeleteModal({ isOpen: false, orderId: "" })}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
