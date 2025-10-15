import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // e.g., 'pending', 'completed', 'cancelled'

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) api.setToken(token);
    if (debouncedSearchTerm) {
      searchOrders();
    } else {
      fetchOrders();
    }
  }, [filterStatus, debouncedSearchTerm]); // Refetch orders when filter status or debounced search term changes

  const fetchOrders = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await api.getAllOrders(filterStatus);
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders.');
      setOrders([]); // Clear orders on error
    } finally {
      setLoading(false);
    }
  };

  const searchOrders = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await api.getOrderById(debouncedSearchTerm);
      setOrders(response.data ? [response.data] : []);
      if (!response.data) {
        setError('Order not found.');
      }
    } catch (err) {
      console.error('Failed to search order:', err);
      setError('Order not found.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading orders...</div>;
  // Only show "No orders found" if not loading and no error, and orders array is empty
  // Error message will be displayed by the 'error' state
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  async function handleStatusChange(orderId, newStatus) {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      // Optionally, show a success toast notification
      // toast.success('Order status updated successfully!');
    } catch (err) {
      console.error('Failed to update order status:', err);
      setError('Failed to update order status.');
      // Optionally, show an error toast notification
      // toast.error('Failed to update order status.');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Orders</h1>
      <Link to="/admin" className="text-indigo-600 hover:text-indigo-900 mb-8 inline-block">
        &larr; Back to Admin Dashboard
      </Link>

      {/* Filter and Search Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search by Order ID"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="created">created</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="out for delivery">Out for delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {orders.length === 0 && !loading && !error ? (
        <div className="text-center py-10 text-gray-500">No orders found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.totalPrice?.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="created">Created</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/admin/orders/${order._id}`} className="text-indigo-600 hover:text-indigo-900">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
