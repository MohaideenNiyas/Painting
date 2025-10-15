const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth'); // <-- auth, not protect
const User = require('../models/User');
const Order = require('../models/Order');
const Painting = require('../models/Painting');

router.get('/users/count', auth, admin, async (req, res) => {
  const count = await User.countDocuments();
  res.json({ count });
});

router.get('/orders/count', auth, admin, async (req, res) => {
  const count = await Order.countDocuments();
  res.json({ count });
});

router.get('/paintings/count', auth, admin, async (req, res) => {
  const count = await Painting.countDocuments();
  res.json({ count });
});

// Admin User Management
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users/:userId/orders', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('user', 'name email').populate('items.painting', 'title imageUrl');
    res.json(orders);
  } catch (error) {
    console.error(error); // Add this line to log the error on the backend
    res.status(500).json({ message: error.message });
  }
});

// Admin Painting Management (for editing)
router.get('/orders/:id', auth, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.painting', 'title imageUrl');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/orders/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Admin Painting Management (for listing and editing)
router.get('/paintings', auth, admin, async (req, res) => {
  try {
    const paintings = await Painting.find({});
    res.json(paintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/paintings/:id', auth, admin, async (req, res) => {
  const { title, artist, description, price, imageUrl, category, countInStock } = req.body;

  try {
    const painting = await Painting.findById(req.params.id);

    if (painting) {
      painting.title = title || painting.title;
      painting.artist = artist || painting.artist;
      painting.description = description || painting.description;
      painting.price = price || painting.price;
      painting.imageUrl = imageUrl || painting.imageUrl;
      painting.category = category || painting.category;
      painting.countInStock = countInStock || painting.countInStock;

      const updatedPainting = await painting.save();
      res.json(updatedPainting);
    } else {
      res.status(404).json({ message: 'Painting not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
