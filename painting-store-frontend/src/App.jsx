import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PaintingDetail from './pages/PaintingDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CreatePainting from './pages/CreatePainting';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrdersPage from './pages/OrdersPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './utils/PrivateRoute';
import PaintingsList from './pages/PaintingLists';
import UsersList from './pages/UsersList';
import UserOrders from './pages/UserOrders';
import OrderDetails from './pages/OrderDetails';
import PaintingEdit from './pages/PaintingEdit';
import AdminPaintingListPage from './pages/AdminPaintingListPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 pt-20"> {/* Added padding-top to account for fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paintings/:id" element={<PaintingDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/paintings-list" element={<PaintingsList />} />

          <Route path="/checkout" element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrdersPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <PrivateRoute adminOnly>
                <CreatePainting />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute adminOnly>
                <UsersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users/:userId/orders"
            element={
              <PrivateRoute adminOnly>
                <UserOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <PrivateRoute adminOnly>
                <AdminOrdersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/orders/:orderId"
            element={
              <PrivateRoute adminOnly>
                <OrderDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/paintings"
            element={
              <PrivateRoute adminOnly>
                <AdminPaintingListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/paintings/create"
            element={
              <PrivateRoute adminOnly>
                <CreatePainting />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/paintings/edit/:id"
            element={
              <PrivateRoute adminOnly>
                <PaintingEdit />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={<div className="text-center py-20">Page not found</div>}
          />
        </Routes>
      </main>
      <Footer />

      {/* ✅ Toast Container - Minimal style, bottom-right */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        style={{
          borderRadius: '8px',
          padding: '10px',
          fontSize: '14px',
        }}
      />
    </div>
  );
}
