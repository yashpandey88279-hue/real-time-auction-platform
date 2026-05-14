require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Auction = require('../models/Auction');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Auction.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create demo users
    const seller = await User.create({
      name: 'John Seller',
      email: 'seller@auction.com',
      password: 'password123',
    });

    const bidder1 = await User.create({
      name: 'Alice Bidder',
      email: 'alice@auction.com',
      password: 'password123',
    });

    const bidder2 = await User.create({
      name: 'Bob Bidder',
      email: 'bob@auction.com',
      password: 'password123',
    });

    console.log('👥 Users created');

    // Create demo auctions
    const endTime1 = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now
    const endTime2 = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours from now
    const endTime3 = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours from now

    const auction1 = await Auction.create({
      title: 'Vintage Leather Watch',
      description: 'Rare 1970s Swiss-made leather watch in excellent condition. Includes original box.',
      imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
      startingBid: 50,
      currentBid: 50,
      seller: seller._id,
      endTime: endTime1,
      status: 'active',
      bids: [],
    });

    const auction2 = await Auction.create({
      title: 'Antique Wooden Camera',
      description: 'Beautiful antique wooden camera from the 1920s. Fully functional. Perfect for collectors.',
      imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
      startingBid: 75,
      currentBid: 75,
      seller: seller._id,
      endTime: endTime2,
      status: 'active',
      bids: [],
    });

    const auction3 = await Auction.create({
      title: 'Signed Baseball Memorabilia',
      description: 'Original signed baseball from a famous 1980s championship game. Authenticated and certified.',
      imageUrl: 'https://images.unsplash.com/photo-1587280591203-bb75e5e1f5d2?w=400&h=400&fit=crop',
      startingBid: 100,
      currentBid: 100,
      seller: seller._id,
      endTime: endTime3,
      status: 'active',
      bids: [],
    });

    console.log('🎁 Auctions created');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

connectDB().then(seedDatabase);
