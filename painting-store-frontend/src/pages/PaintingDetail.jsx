import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

export default function PaintingDetail() {
  const { id } = useParams();
  const [painting, setPainting] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (painting) => {
    addToCart(painting, 1);
    toast.success(`${painting.title} added to the cart.`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  useEffect(() => {
    api.getPainting(id)
      .then(r => setPainting(r.data))
      .catch(() => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!painting) return <div className="text-center py-20">Painting not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Link to="/paintings-list" className="text-gray-600 hover:underline mb-4 inline-block">
        ← Back to Paintings
      </Link>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-sm">
          {painting.imageUrl ? (
            <img
              src={painting.imageUrl}
              alt={painting.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-100 text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h2 className="text-3xl font-bold">{painting.title}</h2>
          <p className="text-gray-500 mt-1">{painting.category || 'Abstract'}</p>

          <p className="text-blue-600 text-2xl font-semibold mt-2">
            ₹{painting.price.toFixed(2)}
          </p>

          <h3 className="font-bold mt-6">Description</h3>
          <p className="text-gray-700 mt-1">{painting.description}</p>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => handleAddToCart(painting)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>

          {/* Category & Price */}
          <div className="mt-6 border-t pt-4 flex justify-between text-sm">
            <p>
              <span className="font-bold">Category:</span> {painting.category || 'Abstract'}
            </p>
            <p>
              <span className="font-bold">Price:</span> ₹{painting.price.toFixed(2)}
            </p>
          </div>

          {/* Features */}
          <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>High-quality reproduction</li>
            <li>Ready to hang</li>
            <li>30-day return policy</li>
            <li>Free shipping on orders over ₹200</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
