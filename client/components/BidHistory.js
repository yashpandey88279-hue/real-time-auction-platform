'use client';

export default function BidHistory({ bids }) {
  return (
    <div className="bid-history">
      <h3>Bid History</h3>
      <div className="bids-list">
        {bids && bids.length > 0 ? (
          bids.slice().reverse().map((bid, index) => (
            <div key={index} className="bid-item animate-bid">
              <div className="bid-info">
                <span className="bid-bidder">{bid.user?.name || 'Anonymous'}</span>
                <span className="bid-amount">${bid.amount}</span>
              </div>
              <span className="bid-time">
                {new Date(bid.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-bids">No bids yet. Be the first to bid!</p>
        )}
      </div>
    </div>
  );
}
