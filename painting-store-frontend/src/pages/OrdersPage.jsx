import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderPage() {
  const location = useLocation();
  const { orderId, total } = location.state || { orderId: "null", total: 0 };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Success Icon */}
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />

      {/* Heading */}
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6 text-center">
        Thank you for your purchase. Your order has been successfully placed.
      </p>

      {/* Order Details */}
      {orderId && (
        <p className="text-gray-700 mb-1">Order ID: #{orderId}</p>
      )}
      <p className="text-lg font-semibold mb-8">
        Total: ${total?.toFixed(2)}
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/paintings-list"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="border px-6 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
