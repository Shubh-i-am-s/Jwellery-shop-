"use client";

import Link from 'next/link';
import { Heart, ShoppingCart, User, Star, ChevronDown } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        {/* Top Section */}
        <div className="navbar-top">
          {/* Logo Area */}
          <div className="logo-area">
            <div className="logo-circle">
              <div className="logo-crown">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
                  <path d="M0 8h14L11 0l-4 4-4-4L0 8z" />
                </svg>
              </div>
              <span className="logo-r">R</span>
            </div>
            <div className="logo-text">
              <span className="brand-name">RAJ MAHAL</span>
              <span className="brand-subtitle">FINE JEWELLERY</span>
            </div>
          </div>

          {/* Center Decoration */}
          <div className="center-decoration">
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none" stroke="var(--color-primary)" strokeWidth="1">
              <path d="M20 2 L23 10 L31 10 L25 15 L27 23 L20 18 L13 23 L15 15 L9 10 L17 10 Z" fill="var(--color-primary)" stroke="none" />
              <path d="M5 25 Q 20 15 35 25" fill="none" stroke="var(--color-primary)" />
              <path d="M10 27 Q 20 20 30 27" fill="none" stroke="var(--color-primary)" />
              <circle cx="20" cy="28" r="1.5" fill="var(--color-primary)" />
            </svg>
          </div>

          {/* Right Actions */}
          <div className="right-actions">
            <button className="action-btn">
              <Heart size={18} strokeWidth={1.5} />
              <span>WISHLIST</span>
            </button>
            <button className="action-btn cart-btn">
              <ShoppingCart size={18} strokeWidth={1.5} />
              <span>CART</span>
              <span className="cart-badge">2</span>
            </button>
            <button className="action-btn">
              <User size={18} strokeWidth={1.5} />
              <span>ACCOUNT</span>
            </button>

            <button className="book-appointment-btn">
              <Star size={12} fill="currentColor" />
              <span>BOOK APPOINTMENT</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="navbar-divider"></div>

        {/* Bottom Section (Links) */}
        <div className="navbar-bottom">
          <ul className="nav-links">
            <li><Link href="/" className="nav-link">HOME</Link></li>
            <li className="separator">|</li>
            <li>
              <Link href="/collections" className="nav-link">
                COLLECTIONS <ChevronDown size={12} className="dropdown-icon" />
              </Link>
            </li>
            <li className="separator">|</li>
            <li>
              <Link href="/jewellery" className="nav-link">
                JEWELLERY <ChevronDown size={12} className="dropdown-icon" />
              </Link>
            </li>
            <li className="separator">|</li>
            <li><Link href="/royal-diamonds" className="nav-link">ROYAL DIAMONDS</Link></li>
            <li className="separator">|</li>
            <li>
              <Link href="/bridal" className="nav-link">
                BRIDAL COLLECTION <ChevronDown size={12} className="dropdown-icon" />
              </Link>
            </li>
            <li className="separator">|</li>
            <li><Link href="/about" className="nav-link">ABOUT US</Link></li>
            <li className="separator">|</li>
            <li><Link href="/heritage" className="nav-link">HERITAGE</Link></li>
            <li className="separator">|</li>
            <li><Link href="/contact" className="nav-link">CONTACT</Link></li>
          </ul>
        </div>

        {/* Corner Decorations */}
        <div className="corner-decoration left">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path d="M0 40 Q 20 40 40 0" fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="0.5" />
            <path d="M10 40 Q 25 40 40 10" fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="corner-decoration right">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path d="M40 40 Q 20 40 0 0" fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="0.5" />
            <path d="M30 40 Q 15 40 0 10" fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="0.5" />
          </svg>
        </div>
      </nav>
    </div>
  );
}
