import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQty, total } = useContext(CartContext)

  const shipping = total > 200 ? 0 : 15.99
  const tax = Number((total * 0.08).toFixed(2))
  const grandTotal = (total + shipping + tax).toFixed(2)
  const freeShippingMsg =
    shipping > 0 && total < 200
      ? `Add $${(200 - total).toFixed(2)} more for free shipping!`
      : ''

  // Empty cart UI
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/paintings-list"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          ← Continue Shopping
        </Link>

        <div className="flex flex-col items-center justify-center text-center py-20">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven&apos;t added any paintings to your cart yet.
          </p>
          <Link
            to="/paintings-list"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Start Shopping →
          </Link>
        </div>
      </div>
    )
  }

  // Cart with items
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back to shop */}
      <Link
        to="/paintings-list"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        ← Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <ShoppingBag className="w-8 h-8 text-indigo-600" /> Shopping Cart
        <span className="ml-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
          {items.length} {items.length > 1 ? 'items' : 'item'}
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <div
              key={it._id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={it.imageUrl}
                  alt={it.title}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <h2 className="font-semibold">{it.title}</h2>
                  <p className="text-gray-500 text-sm">
                    ${it.price.toFixed(2)} each
                  </p>
                  <p className="text-gray-500 text-sm">
                    Subtotal: ${(it.price * it.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQty(it._id, Math.max(1, it.quantity - 1))
                  }
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3">{it.quantity}</span>
                <button
                  onClick={() => updateQty(it._id, it.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeFromCart(it._id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Order Summary */}
        <div className="p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-4">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>${grandTotal}</span>
          </div>

          {freeShippingMsg && (
            <div className="bg-indigo-50 text-indigo-700 p-3 rounded-lg text-sm mb-4">
              {freeShippingMsg}
            </div>
          )}

          <Link
            to="/checkout"
            className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mb-3"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/paintings-list"
            className="block text-center text-sm text-indigo-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
