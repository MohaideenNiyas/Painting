import React, { useState, useEffect, useContext } from 'react';
import PaintingCard from '../components/PaintingCard';
import api from '../services/api';
import { CartContext } from '../contexts/CartContext';


export default function PaintingList() {
  const [paintings, setPaintings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.getPaintings()
      .then(res => {
        if (Array.isArray(res.data)) {
          setPaintings(res.data);
          setFilteredPaintings(res.data);
        } else if (Array.isArray(res.data.paintings)) {
          setPaintings(res.data.paintings);
          setFilteredPaintings(res.data.paintings);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let results = paintings;

    if (searchTerm.trim() !== '') {
      results = results.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'All') {
      results = results.filter(p => p.category === category);
    }

    setFilteredPaintings(results);
  }, [searchTerm, category, paintings]);

  const categories = ['All', ...new Set(paintings.map(p => p.category))];

  const handleAddToCart = (painting) => {
    addToCart(painting);
    
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Our Painting Collection</h1>
      <p className="text-gray-600 text-center mt-2">
        Discover beautiful artworks from talented artists
      </p>

      {/* Search & Filter */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Search paintings"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-1/2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="mt-4 text-gray-600">
        {filteredPaintings.length} paintings found
      </p>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaintings.map(painting => (
          <PaintingCard
            key={painting._id}
            painting={painting}
            onAdd={() => handleAddToCart(painting)}
          />
        ))}
      </div>
    </div>
  );
}
