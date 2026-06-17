"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./HeroSequence.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const totalFrames = 282 * 5; // 1410 total frames across 5 folders
  const framesPerFolder = 282;
  const imagesRef = useRef([]);
  const playheadRef = useRef({ frame: 0 });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const folderIndex = Math.floor((i - 1) / framesPerFolder) + 1;
      const localFrameNumber = ((i - 1) % framesPerFolder) + 1;
      const frameString = localFrameNumber.toString().padStart(3, "0");
      img.src = `/RMP${folderIndex}/ezgif-frame-${frameString}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadedFrames(loadedCount);
        if (i === 1) {
          // Draw first frame immediately when it loads
          renderFrame(1, images);
        }
      };
      img.onerror = () => {
        // In case an image is missing, still count it so we don't hang
        loadedCount++;
        setLoadedFrames(loadedCount);
      };
      images.push(img);
    }
    imagesRef.current = images;

    // Handle resize
    const handleResize = () => {
      if (imagesRef.current[Math.floor(playheadRef.current.frame)]) {
        renderFrame(Math.floor(playheadRef.current.frame) + 1, imagesRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderFrame = (index, imagesArray = imagesRef.current) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Use window.innerWidth/innerHeight but handle high DPI screens for crisp images
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);

    const img = imagesArray[index - 1];
    if (img && img.complete) {
      // Calculate aspect ratio to cover the screen (like object-fit: cover)
      const hRatio = rect.width / img.width;
      const vRatio = rect.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (rect.width - img.width * ratio) / 2;
      const centerShift_y = (rect.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  useGSAP(() => {
    // Only start ScrollTrigger once at least the first image is loaded
    if (loadedFrames === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500%", // Reduced from 5000% to 2500% to make the animation play faster
        pin: true,
        scrub: 0.5, // Buttery smooth scrubbing
      }
    });

    timeline.to(playheadRef.current, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        const currentFrame = Math.floor(playheadRef.current.frame) + 1;
        // Use requestAnimationFrame via renderFrame
        requestAnimationFrame(() => renderFrame(currentFrame));

        // Royal Title Animation Logic (Image 1 to 100)
        const titleEl = document.querySelector('.royal-title');
        if (titleEl) {
          if (currentFrame >= 1 && currentFrame <= 100) {
            const progress = (currentFrame - 1) / 99; // 0 to 1
            
            // Fade-in (frame 1-20), Fade-out (frame 80-100)
            let opacity = 1;
            if (currentFrame <= 20) opacity = (currentFrame - 1) / 19;
            else if (currentFrame >= 80) opacity = 1 - ((currentFrame - 80) / 20);

            // Scale-up (0.9 to 1.05) and floating movement
            const scale = 0.9 + (progress * 0.15);
            const yOffset = 30 - (progress * 60); // Starts slightly low, floats up

            titleEl.style.opacity = opacity;
            titleEl.style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) scale(${scale})`;
            titleEl.style.display = 'flex';
          } else {
            // Strictly hide outside range
            titleEl.style.opacity = 0;
            titleEl.style.display = 'none';
          }
        }
      }
    }, 0);

  }, { dependencies: [loadedFrames === 0], scope: containerRef });

  // We can start the experience once a good chunk of frames (e.g., 150) are loaded
  const isReady = loadedFrames >= Math.min(totalFrames, 150);

  return (
    <section ref={containerRef} className="hero-sequence-container">
      <div className={`loader-overlay ${isReady ? 'fade-out' : ''}`}>
        <span className="loader-text">
          {isReady ? 'ENTER' : `LOADING CINEMATIC EXPERIENCE (${Math.round((loadedFrames / totalFrames) * 100)}%)`}
        </span>
      </div>
      <canvas ref={canvasRef} className="hero-canvas" />
      
      <div className="royal-title">
        <img src="/crown.svg" alt="Royal Crown" className="royal-crown" />
        <div className="royal-welcome royal-text-gold">WELCOME TO</div>
        <div className="royal-main royal-text-gold">JEWELLERY</div>
        <div className="royal-sub royal-text-gold">STORE</div>
      </div>
    </section>
  );
}
