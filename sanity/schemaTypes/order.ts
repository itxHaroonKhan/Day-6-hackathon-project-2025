
// schemas/order.ts
export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    { 
      name: "name", 
      title: "Customer Name", 
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    { 
      name: "email", 
      title: "Email", 
      type: "string",
      validation: (Rule: any) => Rule.required().email()
    },
    { 
      name: "phone", 
      title: "Phone", 
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    { 
      name: "address", 
      title: "Address", 
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    { 
      name: "zipCode", 
      title: "Zip Code", 
      type: "string"
    },
    { 
      name: "country", 
      title: "Country", 
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "orderItems",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", title: "Product ID", type: "string" },
            { name: "title", title: "Product Title", type: "string", validation: (Rule: any) => Rule.required() },
            { name: "price", title: "Price", type: "number", validation: (Rule: any) => Rule.required() },
            { name: "imageUrl", title: "Image URL", type: "url" },
            { name: "quantity", title: "Quantity", type: "number", validation: (Rule: any) => Rule.required().min(1) },
          ],
          preview: {
            select: {
              title: "title",
              price: "price",
              quantity: "quantity",
              imageUrl: "imageUrl",
            },
            prepare({ title, price, quantity, imageUrl }: { title?: string; price?: number; quantity?: number; imageUrl?: string }) {
              return {
                title: `${title || "Product"}`,
                subtitle: `$${price} × ${quantity}`,
              }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    { 
      name: "totalPrice", 
      title: "Total Price", 
      type: "number",
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
      validation: (Rule: any) => Rule.required()
    },
    { 
      name: "createdAt", 
      title: "Created At", 
      type: "datetime",
      readOnly: true
    },
    { 
      name: "updatedAt", 
      title: "Updated At", 
      type: "datetime",
      readOnly: true
    },
  ],
  preview: {
    select: {
      name: "name",
      email: "email",
      status: "status",
      total: "totalPrice",
      createdAt: "createdAt",
    },
    prepare({ name, email, status, total, createdAt }: { name?: string; email?: string; status?: string; total?: number; createdAt?: string }) {
      const statusEmoji = {
        pending: "⏳",
        processing: "🔄",
        shipped: "📦",
        delivered: "✅",
        cancelled: "❌",
      }[status || "pending"];
      
      return {
        title: `${statusEmoji} Order by ${name || "Unknown"}`,
        subtitle: `${email || ""} • $${total || 0} • ${status || "pending"} • ${createdAt ? new Date(createdAt).toLocaleDateString() : "No date"}`,
      }
    },
  },
};
