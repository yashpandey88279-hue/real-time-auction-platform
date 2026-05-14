'use client';

import { useEffect, useState } from 'react';
import AuctionCard from '@/components/AuctionCard';
import { getAuctions } from '@/lib/api';
import './home.css';

export default function Home() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const { data } = await getAuctions();
        setAuctions(data);
      } catch (err) {
        setError('Failed to load auctions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to AuctionHub</h1>
          <p>Bid on unique items in real-time. Find hidden treasures or sell your own.</p>
        </div>
      </section>

      <section className="auctions-section">
        <h2>Active Auctions</h2>
        {loading && <p className="loading">Loading auctions...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && auctions.length === 0 && (
          <p className="no-auctions">No active auctions at the moment.</p>
        )}
        <div className="auctions-grid">
          {auctions.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} />
          ))}
        </div>
      </section>
    </div>
  );
}
