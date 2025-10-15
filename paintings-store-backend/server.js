require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path')
const uploadRoutes = require('./routes/upload')

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const authRoutes = require('./routes/auth');
const paintingRoutes = require('./routes/paintings');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/adminRoutes'); // <-- add this



app.use('/api/upload', uploadRoutes)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/paintings', paintingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);  

// health check
app.get('/', (req, res) => res.send('Painting store backend is running'));

// global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
