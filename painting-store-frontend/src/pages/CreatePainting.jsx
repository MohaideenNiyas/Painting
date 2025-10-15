import React, { useState, useRef } from 'react'
import api from '../services/api'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function CreatePainting() {
  const [form, setForm] = useState({
    title: '',
    artist: '',
    category: '',
    price: '',
    description: '',
    imageUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const navigate = useNavigate()
  const fileInputRef = useRef()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.createPainting({
        ...form,
        price: Number(form.price)
      })
      navigate('/admin')
    } catch (err) {
      alert(err.response?.data?.message || 'Create failed')
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const { data } = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setForm({ ...form, imageUrl: data.imageUrl })
    } catch (err) {
      console.error(err)
      alert('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">🎨 Create New Painting</h2>
      <Link to="/admin/paintings" className="text-indigo-600 hover:text-indigo-900 mb-8 inline-block">
        &larr; Back to Painting List
      </Link>

      <form onSubmit={submit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            placeholder="Enter painting title"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Artist */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Artist</label>
          <input
            value={form.artist}
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
            placeholder="Enter artist name"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            <option value="">Select category</option>
            <option value="Landscape">Landscape</option>
            <option value="Portrait">Portrait</option>
            <option value="Abstract">Abstract</option>
            <option value="Still Life">Still Life</option>
            <option value="Seascape">Seascape</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price *</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            placeholder="Enter price in ₹"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Drag & Drop Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
              dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
            }`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploading ? (
              <p className="text-gray-500">Uploading image...</p>
            ) : form.imageUrl ? (
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500">
                Drag & drop an image here, or <span className="text-indigo-600">browse</span>
              </p>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Write a short description..."
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? 'Creating...' : 'Create Painting'}
          </button>
        </div>
      </form>
    </div>
  )
}
