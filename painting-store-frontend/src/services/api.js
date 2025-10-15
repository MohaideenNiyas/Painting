import axios from 'axios'

const instance = axios.create({ baseURL: '/api' })

const setToken = (token) => {
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete instance.defaults.headers.common['Authorization']
}

export default {
  instance,
  setToken,
  // auth
  register: (data) => instance.post('/auth/register', data),
  login: (data) => instance.post('/auth/login', data),
  // paintings
  getPaintings: () => instance.get('/paintings'),
  getPainting: (id) => instance.get(`/paintings/${id}`),
  createPainting: (data) => instance.post('/paintings', data),
  // updatePainting: (id, data) => instance.put(`/paintings/${id}`, data),
  deletePainting: (id) => instance.delete(`/paintings/${id}`),
  // orders
  createOrder: (data) => instance.post('/orders', data),
  getMyOrders: () => instance.get('/orders/me'),
  getAllOrders: (status = '') => instance.get(`/orders${status ? `?status=${status}` : ''}`),
  // Admin specific API calls
  getOrderById: (id) => instance.get(`/orders/${id}`), // For admin to view specific order details
  getUsersCount: () => instance.get('/admin/users/count'),
  getAllUsers: () => instance.get('/admin/users'), // New: Get all users
  getUserById: (id) => instance.get(`/admin/users/${id}`), // New: Get user by ID
  getOrdersCount: () => instance.get('/admin/orders/count'),
  getOrdersByUser: (userId) => instance.get(`/admin/users/${userId}/orders`), // New: Get orders by user
  getPaintingsCount: () => instance.get('/admin/paintings/count'),
  getAllPaintingsAdmin: () => instance.get('/admin/paintings'), // New: Get all paintings for admin
  updatePainting: (id, data) => instance.put(`/admin/paintings/${id}`, data), // Modified: Ensure this uses admin route for editing
  updateOrderStatus: (id, status) => instance.put(`/admin/orders/${id}/status`, { status }) // New: Update order status
}
