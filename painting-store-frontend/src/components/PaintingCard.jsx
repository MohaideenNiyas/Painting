import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

export default function PaintingCard({ painting, onAdd }) {
  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigation
    if (onAdd) {
      onAdd(painting);
      toast.success(`${painting.title} added to the cart.`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full hover:shadow-lg transition-shadow duration-300 group max-w-sm">
      {/* Image + Link */}
      <Link to={`/paintings/${painting._id}`} className="block">
        <div className="h-56 bg-gray-100 overflow-hidden flex items-center justify-center">
          {painting.imageUrl ? (
            <img
              src={painting.imageUrl}
              alt={painting.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold truncate">{painting.title}</h3>
          <p className="text-sm text-gray-500">
            {painting.category || 'Uncategorized'}
          </p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {painting.description ||
              'A beautiful piece of art to add to your collection.'}
          </p>
        </div>
      </Link>

      {/* Price + Button */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-blue-600 font-bold text-lg">
          ${painting.price?.toFixed(2)}
        </span>
        {onAdd && (
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
