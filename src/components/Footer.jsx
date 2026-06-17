"use client";

import React, { useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Back to forth animation
    gsap.from(contentRef.current, {
      scale: 0.5,
      opacity: 0,
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 100%", // Trigger when footer top enters the bottom of the viewport
        end: "top 60%", // End when the top of the footer reaches 60% of the viewport height
        scrub: true, // Tie animation to scroll
      }
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="footer">
      <div ref={contentRef} style={{ transformOrigin: "top center", willChange: "transform, opacity" }}>
        <div className="container footer-container">
          <div className="footer-brand">
            <h2 className="footer-logo">Rajmahal Jewellery</h2>
            <p className="footer-tagline">Elevate Your Aura</p>
            <p className="footer-description">
              Discover the elite and exquisite collection of yellow, brown, and golden jewellery. Crafted for eternity, designed for luxury.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-heading">Collections</h3>
              <ul>
                <li><a href="#">Bridal</a></li>
                <li><a href="#">High Jewellery</a></li>
                <li><a href="#">Everyday Elegance</a></li>
                <li><a href="#">Mens Collection</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Customer Care</h3>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Book an Appointment</a></li>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">Care Guide</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Follow Us</h3>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Pinterest</a></li>
                <li><a href="#">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container flex justify-between items-center footer-bottom-inner">
            <p>&copy; {new Date().getFullYear()} Rajmahal Jewellery. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
