import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) api.setToken(token);
    const fetchOrderDetails = async () => {
      try {
        const response = await api.getOrderById(orderId); // This method needs to be created in api.js
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="text-center py-20">Loading order details...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!order) return <div className="text-center py-20">Order not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Order Details (ID: {order._id})</h1>
      <Link to={-1} className="text-indigo-600 hover:text-indigo-900 mb-8 inline-block">
        &larr; Back to Orders
      </Link>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Information</h2>
        <p className="mb-2"><strong>User:</strong> {order.user ? order.user.name : 'N/A'} ({order.user ? order.user.email : 'N/A'})</p>
        <p className="mb-2"><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
        <p className="mb-2"><strong>Status:</strong> {order.status}</p>
        <p className="mb-2"><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p className="mb-2">
          <strong>Shipping Address:</strong>{' '}
          {order.shippingAddress ? (
            `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
          ) : (
            'N/A'
          )}
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ordered Items</h2>
        {order.items && order.items.length === 0 ? (
          <p>No items in this order.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Painting
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items && order.items.map((item) => (
                  <tr key={item.painting._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Link to={`/paintings/${item.painting._id}`} className="text-indigo-600 hover:text-indigo-900">
                        {item.painting.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
