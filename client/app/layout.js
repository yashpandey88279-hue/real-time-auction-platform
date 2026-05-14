import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'AuctionHub - Real-Time Auction Platform',
  description: 'Buy and sell items in real-time auctions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
