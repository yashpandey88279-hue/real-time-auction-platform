const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getAllAuctions,
  getAuctionById,
  createAuction,
  updateAuction,
  deleteAuction,
  getUserAuctions,
  getUserBids,
} = require('../controllers/auctionController');

const router = express.Router();

// Public routes
router.get('/', getAllAuctions);
router.get('/:id', getAuctionById);

// Protected routes
router.post('/', authMiddleware, createAuction);
router.put('/:id', authMiddleware, updateAuction);
router.delete('/:id', authMiddleware, deleteAuction);
router.get('/user/auctions', authMiddleware, getUserAuctions);
router.get('/user/bids', authMiddleware, getUserBids);

module.exports = router;
