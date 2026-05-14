const Auction = require('../models/Auction');
const User = require('../models/User');

// Get all active auctions
const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ status: 'active' })
      .populate('seller', 'name email')
      .sort({ endTime: 1 });

    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single auction
const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('seller', 'name email')
      .populate('bids.user', 'name email');

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new auction
const createAuction = async (req, res) => {
  try {
    const { title, description, imageUrl, startingBid, endTime } = req.body;

    // Validation
    if (!title || !description || !imageUrl || !startingBid || !endTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const endTimeDate = new Date(endTime);
    if (endTimeDate <= new Date()) {
      return res.status(400).json({ message: 'End time must be in the future' });
    }

    const auction = new Auction({
      title,
      description,
      imageUrl,
      startingBid,
      currentBid: startingBid,
      endTime: endTimeDate,
      seller: req.userId,
      status: 'active',
    });

    await auction.save();
    await auction.populate('seller', 'name email');

    res.status(201).json({
      message: 'Auction created successfully',
      auction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update auction
const updateAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Only seller can edit
    if (auction.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to edit this auction' });
    }

    // Don't allow editing if bids exist
    if (auction.bids.length > 0) {
      return res.status(400).json({ message: 'Cannot edit auction after bids are placed' });
    }

    const { title, description, imageUrl, startingBid, endTime } = req.body;

    if (title) auction.title = title;
    if (description) auction.description = description;
    if (imageUrl) auction.imageUrl = imageUrl;
    if (startingBid) {
      auction.startingBid = startingBid;
      auction.currentBid = startingBid;
    }
    if (endTime) auction.endTime = new Date(endTime);

    await auction.save();
    await auction.populate('seller', 'name email');

    res.status(200).json({
      message: 'Auction updated successfully',
      auction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete auction
const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Only seller can delete
    if (auction.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this auction' });
    }

    // Don't allow deletion if bids exist
    if (auction.bids.length > 0) {
      return res.status(400).json({ message: 'Cannot delete auction after bids are placed' });
    }

    await Auction.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Auction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's auctions
const getUserAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ seller: req.userId })
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's bids
const getUserBids = async (req, res) => {
  try {
    const auctions = await Auction.find({ 'bids.user': req.userId })
      .populate('seller', 'name email')
      .populate('bids.user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllAuctions,
  getAuctionById,
  createAuction,
  updateAuction,
  deleteAuction,
  getUserAuctions,
  getUserBids,
};
