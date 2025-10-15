import React, { useContext, useState, useRef, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Checkout() {
  const { items, clearCart, total } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'Credit Card'
  });

  // Scroll to error when it changes
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    // Check if cart is empty
    if (items.length === 0) {
      setError('Order must include at least one item.');
      return;
    }

    // Check if required fields are filled
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode || !formData.country) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const orderItems = items.map(it => ({ paintingId: it._id, quantity: it.quantity }));
      const shippingAddress = {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      };
      await api.createOrder({
        items: orderItems,
        shippingAddress: shippingAddress, // Send shippingAddress
        customerInfo: { // Keep customerInfo if needed for other purposes, but shippingAddress is now separate
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod
        }
      });

      clearCart();
      navigate('/orders', { state: { orderId: Date.now(), total: total } }); // Example redirect
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const shippingCost = 15.99;
  const tax = 16.00;
  const grandTotal = total + shippingCost + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back to Cart */}
      <Link to="/cart" className="text-gray-600 hover:underline flex items-center gap-1 mb-6">
        ← Back to Cart
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <Lock className="w-6 h-6 text-blue-600" /> Secure Checkout
      </h1>

      {/* Error Message */}
      {error && (
        <div ref={errorRef} className="p-3 bg-red-100 text-red-700 rounded mb-4">
          {error}
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information & Payment */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-lg mb-4">Customer Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Shipping Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your complete shipping address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your postal code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your country"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-lg mb-4">Payment Method</h2>
            <div className="space-y-2">
              {['Credit Card', 'PayPal', 'Bank Transfer'].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleChange}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          {/* Place Order */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Lock size={18} /> {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>

        {/* Order Summary - Sticky */}
        <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-8 self-start">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price.toFixed(2)}</p>
                </div>
              </div>
              <p>₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
