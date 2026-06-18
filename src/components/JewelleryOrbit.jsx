"use client";

import { useEffect, useRef } from "react";
import "./JewelleryOrbit.css";

const JEWELLERY_PRODUCTS = [
  {
    id: 1,
    name: "Royal Heritage Gold Necklace",
    image: "/necklace_gold.png",
    price: "$299",
    rating: 4.8,
    reviews: 128,
    description: "Exquisite craftsmanship with timeless elegance.",
  },
  {
    id: 2,
    name: "Emerald Empress Ring",
    image: "/ring_emerald.png",
    price: "$450",
    rating: 4.9,
    reviews: 94,
    description: "A majestic emerald cradled in 18k yellow gold.",
  },
  {
    id: 3,
    name: "Ruby Cascade Earrings",
    image: "/earrings_ruby.png",
    price: "$380",
    rating: 4.8,
    reviews: 110,
    description: "Chandelier earrings featuring droplets of pure rubies.",
  },
  {
    id: 4,
    name: "Imperial Tiara Band",
    image: "/ring_emerald.png",
    price: "$599",
    rating: 5.0,
    reviews: 62,
    description: "Delicate filigree tiara ring set with brilliant diamonds.",
  },
  {
    id: 5,
    name: "Golden Aurelia Bracelet",
    image: "/necklace_gold.png",
    price: "$320",
    rating: 4.7,
    reviews: 88,
    description: "Hand-woven gold threads forming a fluid luxury cuff.",
  },
  {
    id: 6,
    name: "Solitaire Devotion Studs",
    image: "/earrings_ruby.png",
    price: "$899",
    rating: 4.9,
    reviews: 142,
    description: "Flawless princess-cut diamonds in a platinum claw.",
  },
  {
    id: 7,
    name: "Siren's Tear Pearl Pendant",
    image: "/necklace_gold.png",
    price: "$240",
    rating: 4.6,
    reviews: 75,
    description: "Luminous South Sea pearl suspended on a gold chain.",
  },
  {
    id: 8,
    name: "Celestial Star Sapphire Ring",
    image: "/ring_emerald.png",
    price: "$670",
    rating: 4.9,
    reviews: 53,
    description: "Deep blue star sapphire accented by stellar diamonds.",
  },
  {
    id: 9,
    name: "Opulent Deco Bangle",
    image: "/necklace_gold.png",
    price: "$410",
    rating: 4.7,
    reviews: 79,
    description: "Art Deco inspired geometric gold bangle.",
  },
  {
    id: 10,
    name: "Aura Quartz Choker",
    image: "/earrings_ruby.png",
    price: "$180",
    rating: 4.5,
    reviews: 66,
    description: "Choker of rare aura quartz wrapped in gold wire.",
  },
  {
    id: 11,
    name: "Gilded Leaf Ear Climbers",
    image: "/earrings_ruby.png",
    price: "$150",
    rating: 4.8,
    reviews: 121,
    description: "Dainty gold leaves climbing along the earlobe.",
  },
  {
    id: 12,
    name: "Monarch Gold Chandelier",
    image: "/earrings_ruby.png",
    price: "$520",
    rating: 4.9,
    reviews: 84,
    description: "Ornate chandelier earrings inspired by royal gates.",
  },
  {
    id: 13,
    name: "Elysian Fields Band",
    image: "/ring_emerald.png",
    price: "$280",
    rating: 4.7,
    reviews: 95,
    description: "Engraved floral band in solid yellow gold.",
  },
  {
    id: 14,
    name: "Serpentine Luxury Cuff",
    image: "/necklace_gold.png",
    price: "$650",
    rating: 5.0,
    reviews: 41,
    description: "Bold gold snake cuff set with emerald eyes.",
  },
  {
    id: 15,
    name: "Vintage Cameo Brooch",
    image: "/necklace_gold.png",
    price: "$340",
    rating: 4.6,
    reviews: 38,
    description: "Carved cameo portrait set in an ornate gold frame.",
  },
];

export default function JewelleryOrbit({ visible }) {
  const containerRef = useRef(null);
  const angleRef = useRef(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let animId;

    const animate = () => {
      const container = containerRef.current;
      if (container && !isHoveredRef.current) {
        const cards = container.querySelectorAll(".orbit-card");
        if (cards.length > 0) {
          // Slow, smooth continuous orbital rotation
          angleRef.current = (angleRef.current - 0.0015) % (2 * Math.PI);

          const w = window.innerWidth;
          const h = window.innerHeight;

          // Horizontal-only path settings
          const rx = w < 768 ? w * 0.42 : w * 0.32;
          const ry = 0; // Flat horizontal motion, no incline

          // Orbit scaling and styling bounds
          const minScale = w < 768 ? 0.35 : 0.45;
          const maxScale = w < 768 ? 0.65 : 0.75;
          const minOpacity = 0.15;
          const maxOpacity = 1.0;
          const minZIndex = 10;
          const maxZIndex = 100;
          const maxBlur = 1.8;

          cards.forEach((card, index) => {
            // Distribute cards evenly around the orbit
            const cardAngle = angleRef.current + (index * 2 * Math.PI) / cards.length;

            const yOffset = w < 768 ? 60 : 110;
            // X position: horizontal spread
            const x = Math.cos(cardAngle) * rx;
            const y = yOffset;

            // Depth: card is "front" when it's at the horizontal center (x≈0, cosAngle≈0).
            // We want maximum scale/opacity at x=0 (cos(angle)=0, i.e. angle=π/2 or 3π/2).
            // Use: depth = (1 - Math.abs(Math.cos(cardAngle))) — full depth at x=0, zero at edges.
            // But for a carousel feel we want the LEFTMOST visible card to be biggest when coming from left.
            // Best approach: use sin to create a natural front-back cycle on a tilted orbit.
            // Since ry=0, remap depth from cosine so center cards are "front":
            const depth = (1 - Math.abs(Math.cos(cardAngle)));

            const scale = minScale + (maxScale - minScale) * depth;
            const opacity = minOpacity + (maxOpacity - minOpacity) * (0.4 + depth * 0.6);
            const zIndex = Math.round(minZIndex + (maxZIndex - minZIndex) * depth);
            const blur = maxBlur * (1 - depth);

            // Apply styles directly for ultra-performance (60fps)
            card.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
            
            // Blur background cards for a depth of field effect
            if (blur > 0.6) {
              card.style.filter = `blur(${blur.toFixed(1)}px)`;
            } else {
              card.style.filter = "none";
            }

            // Only allow interaction with front cards
            if (depth < 0.35) {
              card.style.pointerEvents = "none";
            } else {
              card.style.pointerEvents = "auto";
            }
          });
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`jewellery-orbit-overlay ${visible ? "visible" : ""}`}
    >
      {/* Decorative horizontal gold track line behind the cards */}
      <div className="horizontal-track-line"></div>

      {JEWELLERY_PRODUCTS.map((prod) => (
        <div 
          key={prod.id} 
          className="orbit-card"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
        >
          {/* Top Image Area */}
          <div className="card-image-wrapper">
            <img src={prod.image} alt={prod.name} className="product-image" />
            {/* Top Right Ribbon */}
            <div className="ribbon-banner">
              <img src="/crown.svg" alt="Crown" className="ribbon-crown" />
            </div>
          </div>

          {/* Product Details */}
          <div className="card-info">
            <h3 className="product-title">{prod.name}</h3>

            <div className="gold-divider">
              <span className="divider-flourish">☙ ❖ ❧</span>
            </div>

            <p className="product-description">{prod.description}</p>

            <div className="price-rating-row">
              <span className="product-price">{prod.price}</span>
              <div className="rating-container">
                <span className="rating-stars">
                  {"★".repeat(Math.floor(prod.rating))}
                  {"☆".repeat(5 - Math.floor(prod.rating))}
                </span>
                <span className="rating-count">({prod.reviews})</span>
              </div>
            </div>
          </div>

          {/* Elegant Add to Cart Button */}
          <button className="add-to-cart-btn">
            <span className="btn-flourish">❧</span>
            ADD TO CART
            <span className="btn-flourish">☙</span>
          </button>
        </div>
      ))}
    </div>
  );
}
