import React, { useState } from 'react';

const CreatePainting = ({ onPaintingCreated }) => {
  const [paintingData, setPaintingData] = useState({
    title: '',
    artist: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Impressionism',
    'Modern',
    'Abstract',
    'Renaissance',
    'Contemporary',
    'Photography',
    'Digital Art',
    'Portraits',
    'Landscape'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaintingData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!paintingData.title.trim()) newErrors.title = 'Title is required';
    if (!paintingData.artist.trim()) newErrors.artist = 'Artist name is required';
    if (!paintingData.description.trim()) newErrors.description = 'Description is required';
    if (!paintingData.price || paintingData.price <= 0) newErrors.price = 'Please enter a valid price';
    if (!paintingData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!paintingData.category) newErrors.category = 'Please select a category';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch('/api/paintings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paintingData)
      });
      
      if (!response.ok) throw new Error('Failed to create painting');
      
      const result = await response.json();
      
      // Reset form
      setPaintingData({
        title: '',
        artist: '',
        description: '',
        price: '',
        imageUrl: '',
        category: ''
      });
      
      if (onPaintingCreated) {
        onPaintingCreated(result);
      }
      
      alert('Painting created successfully!');
    } catch (error) {
      console.error('Error creating painting:', error);
      alert('Failed to create painting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Add New Painting
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Create a new masterpiece for your collection
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={paintingData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Starry Night"
                  maxLength={100}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                />
                {errors.title && <span className="text-red-500 text-sm mt-1 block">{errors.title}</span>}
              </div>
              
              <div>
                <label htmlFor="artist" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  Artist *
                </label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={paintingData.artist}
                  onChange={handleInputChange}
                  placeholder="e.g., Vincent van Gogh"
                  maxLength={50}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.artist ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                />
                {errors.artist && <span className="text-red-500 text-sm mt-1 block">{errors.artist}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={paintingData.description}
                onChange={handleInputChange}
                placeholder="Describe this masterpiece..."
                rows="4"
                maxLength={500}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                }`}
              />
              {errors.description && <span className="text-red-500 text-sm mt-1 block">{errors.description}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  Price (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={paintingData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                    }`}
                  />
                </div>
                {errors.price && <span className="text-red-500 text-sm mt-1 block">{errors.price}</span>}
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={paintingData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="text-red-500 text-sm mt-1 block">{errors.category}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Image URL *
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={paintingData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.imageUrl ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                }`}
              />
              {errors.imageUrl && <span className="text-red-500 text-sm mt-1 block">{errors.imageUrl}</span>}
              
              {paintingData.imageUrl && (
                <div className="mt-4 relative inline-block group">
                  <img 
                    src={paintingData.imageUrl} 
                    alt="Preview" 
                    className="w-48 h-48 rounded-xl object-cover shadow-lg transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9ImdyYXkiLz48dGV4dCB4PSIyMCUiIHk9IjUwJSIgc3R5bGU9ImZpbGw6IHdoaXRlOyBmb250LXNpemU6IDE4cHg7Ij5VbmFibGUgdG8gbG9hZCBpbWFnZTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setPaintingData(prev => ({ ...prev, imageUrl: '' }))}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => setPaintingData({
                  title: '',
                  artist: '',
                  description: '',
                  price: '',
                  imageUrl: '',
                  category: ''
                })}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : 'Create Painting'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CreatePainting;