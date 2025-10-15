import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { items } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust scroll threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-white shadow-md'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo & Nav */}
        <div className="flex items-center gap-4">
          <Link to="/" className={`text-2xl font-bold text-indigo-600`}>Paintings</Link>
          <nav className="hidden md:flex gap-4">
            <Link to="/" className={`text-gray-800 hover:text-indigo-500`}>Home</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className={`text-gray-800 hover:text-indigo-500`}>Admin</Link>
            )}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          {!isAdminPage && (
            <Link to="/cart" className={`relative flex items-center gap-1 text-gray-800 hover:text-indigo-600`}>
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {items.length > 0 && (
                <span className="ml-1 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
          )}

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className={`text-gray-800 text-sm`}>Hi, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className={`px-3 py-1 border rounded text-gray-800 border-gray-300`}>Login</Link>
              <Link to="/register" className="px-3 py-1 bg-indigo-600 text-white rounded">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
