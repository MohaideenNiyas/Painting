import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    paintings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) api.setToken(token);
    const fetchStats = async () => {
      try {
        // Use the methods defined in your api.js that call the correct admin routes
        const [usersRes, ordersRes, paintingsRes] = await Promise.all([
          api.getUsersCount(),
          api.getOrdersCount(),
          api.getPaintingsCount()
        ]);

        setStats({
          users: usersRes?.data?.count ?? 0,
          orders: ordersRes?.data?.count ?? 0,
          paintings: paintingsRes?.data?.count ?? 0
        });
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center py-20">Loading dashboard...</div>;

  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link to="/admin/users" className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{stats.users}</p>
        </Link>

        <Link to="/admin/orders" className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">{stats.orders}</p>
        </Link>

        <Link to="/admin/paintings" className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold text-gray-700">Total Paintings</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">{stats.paintings}</p>
        </Link>
      </div>
    </div>
  );
}
