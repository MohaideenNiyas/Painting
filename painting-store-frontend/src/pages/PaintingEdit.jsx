import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function PaintingEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [painting, setPainting] = useState({
    title: '',
    artist: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    countInStock: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) api.setToken(token);
    const fetchPainting = async () => {
      try {
        const response = await api.getPainting(id); // Use existing getPainting method
        setPainting(response.data);
      } catch (err) {
        console.error('Failed to fetch painting:', err);
        setError('Failed to load painting data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPainting();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPainting((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.updatePainting(id, painting); // This method needs to be created in api.js
      alert('Painting updated successfully!');
      navigate('/admin/paintings');
    } catch (err) {
      console.error('Failed to update painting:', err);
      setError('Failed to update painting.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading painting...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-4">Edit Painting</h1>
      <Link to="/admin/paintings" className="text-indigo-600 hover:text-indigo-900 mb-8 inline-block">
        &larr; Back to Painting List
      </Link>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={painting.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist</label>
          <input
            type="text"
            name="artist"
            id="artist"
            value={painting.artist}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={painting.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={painting.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={painting.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={painting.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            id="countInStock"
            value={painting.countInStock}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {submitting ? 'Updating...' : 'Update Painting'}
        </button>
      </form>
    </div>
  );
}
