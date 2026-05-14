'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAuthenticated, removeToken } from '@/lib/auth';
import '../styles/navbar.css';

export default function Navbar() {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const handleLogout = () => {
    removeToken();
    setAuth(false);
    router.push('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          🏆 AuctionHub
        </Link>
        <div className="navbar-menu">
          <Link href="/" className="nav-link">Home</Link>
          {auth ? (
            <>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/auctions/create" className="nav-link nav-create">+ Create Auction</Link>
              <button onClick={handleLogout} className="nav-logout">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">Login</Link>
              <Link href="/register" className="nav-link nav-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
