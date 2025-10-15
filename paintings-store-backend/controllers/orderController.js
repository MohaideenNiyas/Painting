const Order = require('../models/Order');
const Painting = require('../models/Painting');

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, shippingAddress } = req.body; // Add shippingAddress here
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include items' });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    // fetch paintings
    const paintingIds = items.map(i => i.paintingId);
    const paintings = await Painting.find({ _id: { $in: paintingIds } });

    const foundIds = new Set(paintings.map(p => p._id.toString()));
    for (const it of items) {
      if (!foundIds.has(it.paintingId)) {
        return res.status(400).json({ message: `Painting with id ${it.paintingId} not found` });
      }
    }

    const orderItems = items.map(it => {
      const p = paintings.find(x => x._id.toString() === it.paintingId);
      const qty = Math.max(1, parseInt(it.quantity || 1));
      return {
        painting: p._id,
        title: p.title,
        quantity: qty,
        price: p.price
      };
    });

    const totalPrice = orderItems.reduce((s, it) => s + it.price * it.quantity, 0);

    const order = new Order({
      user: userId,
      items: orderItems,
      shippingAddress, // Add shippingAddress here
      totalPrice
    });

    await order.save();
    await order.populate('items.painting'); // modern populate

    res.status(201).json(order);
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate('items.painting');
    res.json(orders);
  } catch (err) {
    console.error('Get user orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) {
      query.status = status;
    }
    const orders = await Order.find(query).sort({ createdAt: -1 }).populate('user', 'name email').populate('items.painting');
    res.json(orders);
  } catch (err) {
    console.error('Get all orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.painting');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error('Get order by ID error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrdersCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Get orders count error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, getOrdersCount, getOrderById };
