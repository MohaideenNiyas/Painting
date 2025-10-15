const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  painting: { type: mongoose.Schema.Types.ObjectId, ref: 'Painting', required: true },
  title: { type: String },
  quantity: { type: Number, default: 1, min: 1 },
  price: { type: Number, required: true } // price at time of order
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [orderItemSchema], required: true },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['created', 'paid', 'shipped','out for delivery','delivered','cancelled'], default: 'created' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
