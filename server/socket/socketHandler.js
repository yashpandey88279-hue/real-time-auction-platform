const Auction = require('../models/Auction');
const User = require('../models/User');

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Join auction room
    socket.on('join_auction', async (auctionId) => {
      socket.join(auctionId);
      console.log(`📍 User ${socket.id} joined auction ${auctionId}`);
    });

    // Leave auction room
    socket.on('leave_auction', (auctionId) => {
      socket.leave(auctionId);
      console.log(`📍 User ${socket.id} left auction ${auctionId}`);
    });

    // Place bid
    socket.on('place_bid', async (data) => {
      try {
        const { auctionId, amount, userId } = data;

        // Fetch auction
        const auction = await Auction.findById(auctionId).populate('bids.user', 'name');
        
        if (!auction) {
          socket.emit('bid_error', { message: 'Auction not found' });
          return;
        }

        // Validate bid
        if (amount <= auction.currentBid) {
          socket.emit('bid_error', { message: 'Bid must be higher than current bid' });
          return;
        }

        if (new Date() > auction.endTime) {
          socket.emit('bid_error', { message: 'Auction has ended' });
          return;
        }

        // Get bidder info
        const bidder = await User.findById(userId);
        if (!bidder) {
          socket.emit('bid_error', { message: 'User not found' });
          return;
        }

        // Update auction
        auction.currentBid = amount;
        auction.bids.push({ user: userId, amount });
        await auction.save();

        // Broadcast to all clients in the auction room
        io.to(auctionId).emit('bid_updated', {
          currentBid: auction.currentBid,
          bidderName: bidder.name,
          timestamp: new Date(),
          bids: auction.bids,
        });

        socket.emit('bid_success', { message: 'Bid placed successfully' });
      } catch (error) {
        socket.emit('bid_error', { message: 'Error placing bid: ' + error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSocketHandlers;
