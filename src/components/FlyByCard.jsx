"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './FlyByCard.css';

export default function FlyByCard() {
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const cardsRef = useRef([]);

  const cardsData = [
    { title: "Raj Mahal", desc: "Elegance and timeless beauty." },
    { title: "Diamond Core", desc: "Brilliance in every cut." },
    { title: "Gold Standard", desc: "Pure prestige and heritage." },
    { title: "Ruby Glow", desc: "Passionate deep crimson." },
    { title: "Emerald Envy", desc: "Lush green majesty." },
    { title: "Sapphire Sea", desc: "Oceanic depths of blue." }
  ];

  useGSAP(() => {
    const numCards = cardsData.length;
    const orbitRadius = 600; // Radius of the circle
    const angleStep = 360 / numCards;

    // Position each card along the circumference
    cardsRef.current.forEach((card, i) => {
      if (card) {
        const angleInRadians = (i * angleStep) * (Math.PI / 180);
        gsap.set(card, {
          x: Math.sin(angleInRadians) * orbitRadius,
          z: Math.cos(angleInRadians) * orbitRadius,
          rotationY: i * angleStep, // Face outward tangentially
        });
      }
    });

    // Spin the entire orbit continuously
    gsap.to(orbitRef.current, {
      rotationY: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

  }, { scope: containerRef });

  return (
    <div className="flyby-scene" ref={containerRef}>
      <div className="flyby-orbit" ref={orbitRef}>
        {cardsData.map((data, index) => (
          <div 
            key={index} 
            className="flyby-card" 
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="flyby-card-content">
              <h3>{data.title}</h3>
              <p>{data.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
