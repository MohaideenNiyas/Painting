const Painting = require('../models/Painting');

const getAllPaintings = async (req, res) => {
  try {
    const paintings = await Painting.find().sort({ createdAt: -1 });
    res.json(paintings);
  } catch (err) {
    console.error('Get paintings error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPaintingsCount = async (req, res) => {
  try {
    const count = await Painting.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Get paintings count error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPaintingById = async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (!painting) return res.status(404).json({ message: 'Painting not found' });
    res.json(painting);
  } catch (err) {
    console.error('Get painting error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createPainting = async (req, res) => {
  try {
    const { title, artist, description, price, imageUrl, category } = req.body;
    if (!title || price == null) return res.status(400).json({ message: 'Title and price are required' });

    const painting = new Painting({
      title,
      artist,
      description,
      price,
      imageUrl,
      category: category || 'Uncategorized'
    });

    await painting.save();
    res.status(201).json(painting);
  } catch (err) {
    console.error('Create painting error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePainting = async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (!painting) return res.status(404).json({ message: 'Painting not found' });

    const updates = ['title', 'artist', 'description', 'price', 'imageUrl', 'category'];
    updates.forEach(field => {
      if (req.body[field] !== undefined) painting[field] = req.body[field];
    });

    await painting.save();
    res.json(painting);
  } catch (err) {
    console.error('Update painting error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePainting = async (req, res) => {
  try {
    const painting = await Painting.findByIdAndDelete(req.params.id);
    if (!painting) return res.status(404).json({ message: 'Painting not found' });
    res.json({ message: 'Painting deleted' });
  } catch (err) {
    console.error('Delete painting error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllPaintings,
  getPaintingById,
  getPaintingsCount,
  createPainting,
  updatePainting,
  deletePainting
};
