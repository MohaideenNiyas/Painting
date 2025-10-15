import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function AdminPaintingListPage() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) api.setToken(token);
    fetchPaintings();
  }, []);

  const fetchPaintings = async () => {
    setLoading(true);
    try {
      const response = await api.getAllPaintingsAdmin(); // This fetches all paintings for admin
      setPaintings(response.data);
    } catch (err) {
      console.error('Failed to fetch paintings:', err);
      setError('Failed to load paintings.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading paintings...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Paintings</h1>
        <Link to="/admin/paintings/create" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Create New Painting
        </Link>
      </div>

      <Link to="/admin" className="text-indigo-600 hover:text-indigo-900 mb-8 inline-block">
        &larr; Back to Admin Dashboard
      </Link>

      {paintings.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No paintings found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paintings.map((painting) => (
            <Link to={`/admin/paintings/edit/${painting._id}`} key={painting._id} className="block bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-200 cursor-pointer">
              <img src={painting.imageUrl} alt={painting.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{painting.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{painting.artist}</p>
                <p className="text-lg font-bold text-gray-900 mt-2">${painting.price?.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
