const User = require('../models/User');

// ... your other user controller functions ...

const getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Get users count error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  // other exports
  getUsersCount,
};
