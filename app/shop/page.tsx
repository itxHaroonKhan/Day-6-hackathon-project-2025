
"use client"

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CheckoutForm from "@/components/CheckoutForm";
import ConfirmModal from "@/components/ConfirmModal";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const { user } = useUser();
  const [showCheckout, setShowCheckout] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    type: "info" as "info" | "success" | "error",
  });

  const handleCheckout = () => {
    if (cart.length === 0) {
      setAlertModal({
        isOpen: true,
        message: "Your cart is empty! Add items before checking out.",
        type: "info",
      });
      return;
    }
    setShowCheckout(true);
  };

  const handleFormSubmit = async (formData: { name: string; email: string; address: string; phone: string; zipCode: string; country: string }) => {
    try {
      // Use logged-in user's email if available
      const userEmail = user?.emailAddresses[0]?.emailAddress || formData.email;
      
      const orderData = {
        ...formData,
        email: userEmail,
        orderItems: cart,
        totalPrice: totalPrice.toFixed(2),
      };

      console.log("📦 Placing order:", orderData);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      console.log("📋 Order response:", result);

      if (result.success) {
        const message = result.demo 
          ? "Order placed successfully! (Demo mode - Sanity not configured)"
          : "Order placed successfully! You will receive a confirmation email soon.";
        
        setAlertModal({
          isOpen: true,
          message: message,
          type: "success",
        });
        clearCart();
        setShowCheckout(false);
        setTimeout(() => {
          window.location.href = "/orders";
        }, 500);
      } else {
        setAlertModal({
          isOpen: true,
          message: "Failed to place order: " + result.message,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      
      if (error instanceof TypeError) {
        setAlertModal({
          isOpen: true,
          message: "Network error. Please check your internet connection and try again.",
          type: "error",
        });
      } else {
        setAlertModal({
          isOpen: true,
          message: "An error occurred while placing your order. Please try again.",
          type: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 text-center md:text-left">Your Shopping Bag</h1>
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg font-semibold text-gray-600">Your cart is empty</p>
                  <button
                    className="mt-6 px-6 py-3 bg-[#029FAE] text-white rounded-full font-semibold hover:bg-[#027b89] transition-all duration-300"
                    onClick={() => (window.location.href = "/shop")}
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                cart.map((product, index) => (
                  <div key={`${product._id}-${index}`} className="border-b border-gray-300 py-6 flex flex-col lg:flex-row items-center gap-6">
                    <div className="w-32 h-32 flex-shrink-0">
                      <Image src={product.imageUrl} alt={product.title} width={128} height={128} className="rounded-lg object-cover" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
                      <p className="text-gray-500">{product.description}</p>
                      <div className="text-gray-500 mt-4 flex gap-6">
                        <p className="text-lg font-semibold"><strong>Price:</strong> ${product.price}</p>
                        <div className="flex gap-4">
                          <button title="Save for later"><FaRegHeart className="text-gray-500 hover:text-red-500" /></button>
                          <button title="Remove from cart" onClick={() => removeFromCart(product._id)}>
                            <RiDeleteBin6Line className="text-gray-500 hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Subtotal</p>
                <p>${totalPrice}</p>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Estimated Delivery & Handling</p>
                <p>Free</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-black font-bold mb-6">
                <p>Total</p>
                <p>${totalPrice}</p>
              </div>

              {showCheckout && <CheckoutForm onSubmit={handleFormSubmit} onCancel={() => setShowCheckout(false)} cart={cart} totalPrice={totalPrice} />}

              {cart.length > 0 && (
                <button onClick={handleCheckout} className="w-full bg-[#029FAE] text-white py-3 rounded-full font-semibold">
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
      </div>

      {/* Alert Modal */}
      <ConfirmModal
        isOpen={alertModal.isOpen}
        title={alertModal.type === "success" ? "Success" : alertModal.type === "error" ? "Error" : "Information"}
        message={alertModal.message}
        onConfirm={() => setAlertModal({ ...alertModal, isOpen: false })}
        onCancel={() => setAlertModal({ ...alertModal, isOpen: false })}
        confirmText="OK"
        cancelText=""
        type={alertModal.type === "success" ? "info" : alertModal.type === "error" ? "danger" : "warning"}
      />
    </div>
  );
};

export default CartPage;
