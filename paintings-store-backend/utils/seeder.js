// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const paintings = require('./data/paintings');
const User = require('../models/User');           // fixed path
const Painting = require('../models/Painting');   // fixed path
const Order = require('../models/Order');         // fixed path
const connectDB = require('../config/db');    

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Painting.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const samplePaintings = paintings.map((painting) => {
      return { ...painting, user: adminUser };
    });

    await Painting.insertMany(samplePaintings);

    console.log('✅ Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Painting.deleteMany();
    await User.deleteMany();

    console.log('🗑 Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
