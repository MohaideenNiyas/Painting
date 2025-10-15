const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, default: 'Unknown', trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: '' },
  category: {
      type: String,
      default: 'Uncategorized',
      trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Painting', paintingSchema);
