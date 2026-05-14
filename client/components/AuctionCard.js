'use client';

import Link from 'next/link';
import CountdownTimer from './CountdownTimer';
import '../styles/auction.css';

export default function AuctionCard({ auction }) {
  const isEnded = new Date(auction.endTime) <= new Date();

  return (
    <div className="auction-card">
      <div className="auction-image">
        <img src={auction.imageUrl} alt={auction.title} />
        {isEnded && <div className="ended-badge">Ended</div>}
      </div>
      <div className="auction-content">
        <h3 className="auction-title">{auction.title}</h3>
        <div className="auction-bid">
          <span className="bid-label">Current Bid:</span>
          <span className="bid-amount">${auction.currentBid}</span>
        </div>
        <div className="auction-seller">
          <span className="seller-label">Seller:</span>
          <span className="seller-name">{auction.seller.name}</span>
        </div>
        <div className="auction-timer">
          <CountdownTimer endTime={auction.endTime} />
        </div>
        <Link href={`/auctions/${auction._id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}
