import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PaintingCard from '../components/PaintingCard';
import { CartContext } from '../contexts/CartContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PLACEHOLDER =
  'https://via.placeholder.com/1200x500/cccccc/333333?text=No+Image+Available';

// Normalize image URLs
function resolveImageUrl(url) {
  if (!url) return PLACEHOLDER;
  if (/^https?:\/\//i.test(url)) return url;
  const base =
    (import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
    'http://localhost:5000';
  return `${String(base).replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
}

export default function Home() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    api
      .getPaintings()
      .then((res) => {
        if (!mounted) return;
        let fetched = [];
        if (Array.isArray(res.data)) fetched = res.data;
        else if (Array.isArray(res.data.paintings)) fetched = res.data.paintings;
        setPaintings(fetched);
      })
      .catch((err) => {
        console.error('Error fetching paintings:', err);
        if (mounted) setPaintings([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-rotate (pause on hover)
  useEffect(() => {
    if (paintings.length === 0 || isHovering) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % paintings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paintings, isHovering]);

  const goToNextSlide = () => {
    if (paintings.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % paintings.length);
  };

  const goToPrevSlide = () => {
    if (paintings.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + paintings.length) % paintings.length);
  };

  if (loading) return <div className="text-center py-20 text-2xl text-gray-600">Loading...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Image Slider */}
      {paintings.length > 0 && (
        <section
          className="relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-xl shadow-lg mb-12"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            ref={sliderRef}
          >
            <div
              className="absolute w-full h-full transition-transform duration-700 ease-in-out flex"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {paintings.map((painting, index) => {
                const imgSrc = resolveImageUrl(painting.imageUrl);

                return (
                  <div
                    key={painting._id || index}
                    className="w-full h-full flex-shrink-0 flex items-center justify-center relative"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={imgSrc}
                        alt={painting.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = PLACEHOLDER;
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6 sm:p-8 transition-opacity duration-300 hover:bg-black/60">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 drop-shadow-lg animate-fade-in">
                          {painting.title}
                        </h2>
                        <p className="text-md sm:text-lg text-center max-w-xl mb-8 opacity-95 animate-fade-in delay-100">
                          {painting.description ||
                            'Discover exquisite art that inspires and captivates.'}
                        </p>
                        <button
                          onClick={() => navigate(`/paintings/${painting._id}`)}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-fade-in delay-200"
                        >
                          View Painting
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/60 p-2 sm:p-3 rounded-full text-gray-800 hover:bg-white/80 transition-all duration-300 z-30 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/60 p-2 sm:p-3 rounded-full text-gray-800 hover:bg-white/80 transition-all duration-300 z-30 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="sm:w-7 sm:h-7" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
            {paintings.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                  currentSlide === index
                    ? 'bg-indigo-500 scale-125 shadow-md'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Paintings Section */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 mt-12">
        Our Latest Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paintings.slice(0, 8).map((p) => (
          <PaintingCard key={p._id} painting={p} onAdd={addToCart} />
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate('/paintings-list')}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
        >
          Explore All Artworks
        </button>
      </div>

      {/* About Us */}
      <section className="bg-gray-100 py-16 px-6 mt-16 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          At Art Gallery, we believe in the power of art to transform spaces and
          inspire lives. We are dedicated to connecting art lovers with unique
          and captivating pieces from emerging and established artists
          worldwide.
        </p>
        <button
          onClick={() => navigate('/about-us')}
          className="mt-8 text-indigo-600 font-semibold hover:underline"
        >
          Learn More About Us
        </button>
      </section>
    </div>
  );
}
