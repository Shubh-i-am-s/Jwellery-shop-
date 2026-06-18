"use client";

import Link from 'next/link';
import { Heart, ShoppingCart, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        {/* Left Section: Royal Logo Seal & Brand */}
        <div className="logo-area">
          <div className="logo-crest-container">
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" className="logo-svg">
              {/* Outer Wreath */}
              <path d="M18 48C12 40 12 28 18 20C19 18 21 17 23 16" stroke="var(--color-primary)" strokeWidth="1" strokeLinecap="round"/>
              <path d="M46 48C52 40 52 28 46 20C45 18 43 17 41 16" stroke="var(--color-primary)" strokeWidth="1" strokeLinecap="round"/>
              {/* Leaves flourishes */}
              <path d="M14 36C12 35 11 32 13 30" stroke="var(--color-primary)" strokeWidth="1"/>
              <path d="M15 28C14 26 13 23 16 22" stroke="var(--color-primary)" strokeWidth="1"/>
              <path d="M50 36C52 35 53 32 51 30" stroke="var(--color-primary)" strokeWidth="1"/>
              <path d="M49 28C50 26 51 23 48 22" stroke="var(--color-primary)" strokeWidth="1"/>
              {/* Double Circle */}
              <circle cx="32" cy="34" r="16" stroke="var(--color-primary)" strokeWidth="1" />
              <circle cx="32" cy="34" r="13" stroke="var(--color-primary)" strokeWidth="0.5" strokeDasharray="2 1" />
              {/* Crown */}
              <path d="M24 18 L22 23 L42 23 L40 18 L36 21 L32 15 L28 21 Z" fill="var(--color-primary)" />
              <circle cx="32" cy="13" r="1.5" fill="var(--color-primary)" />
              <circle cx="23.5" cy="16.5" r="1" fill="var(--color-primary)" />
              <circle cx="40.5" cy="16.5" r="1" fill="var(--color-primary)" />
            </svg>
            <span className="logo-r">R</span>
          </div>
          <div className="logo-text">
            <span className="brand-name">RAJ MAHAL</span>
            <span className="brand-subtitle">☙ FINE JEWELLERY ❧</span>
          </div>
        </div>

        {/* Right Section: Actions & Star items */}
        <div className="nav-items-group">
          <div className="nav-divider"></div>
          
          {/* New Arrivals Link */}
          <Link href="/new-arrivals" className="nav-new-arrivals">
            <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2C12 2 13 8 15 10C17 12 22 12 22 12C22 12 17 12 15 14C13 16 12 22 12 22C12 22 11 16 9 14C7 12 2 12 2 12C2 12 7 12 9 10C11 8 12 2 12 2Z" />
            </svg>
            <span>NEW ARRIVALS</span>
          </Link>

          <div className="nav-divider"></div>

          {/* Wishlist */}
          <button className="nav-action-btn">
            <Heart size={20} strokeWidth={1.5} className="nav-icon" />
            <span>WISHLIST</span>
          </button>

          {/* Cart */}
          <button className="nav-action-btn cart-btn">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={20} strokeWidth={1.5} className="nav-icon" />
              <span className="cart-badge">2</span>
            </div>
            <span>CART</span>
          </button>

          <div className="nav-divider"></div>

          {/* Account */}
          <button className="nav-action-btn">
            <User size={20} strokeWidth={1.5} className="nav-icon" />
            <span>ACCOUNT</span>
          </button>

          <div className="nav-divider"></div>

          {/* Book Appointment Button */}
          <button className="book-appointment-btn">
            <svg className="btn-crown-icon" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M2 19h20v2H2v-2zm1-2h18v-2H3v2zm2-4l-3-7 6 3 4-6 4 6 6-3-3 7H5z" />
            </svg>
            <span>BOOK APPOINTMENT</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
