"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./HeroSequence.css";
import JewelleryOrbit from "./JewelleryOrbit";

gsap.registerPlugin(ScrollTrigger);

// Build an explicit frame manifest based on actual files on disk.
// Each entry is { folder, frame } e.g. { folder: 4, frame: 46 }
function buildFrameManifest() {
  const manifest = [];

  // RMP1: frames 001–282 (282 files)
  for (let f = 1; f <= 282; f++) manifest.push({ folder: 1, frame: f });
  // RMP2: frames 001–283 (283 files)
  for (let f = 1; f <= 283; f++) manifest.push({ folder: 2, frame: f });
  // RMP3: frames 001–286 (286 files)
  for (let f = 1; f <= 286; f++) manifest.push({ folder: 3, frame: f });
  // RMP4: frames 046–282 (237 files — starts at 046, no 001-045)
  for (let f = 46; f <= 282; f++) manifest.push({ folder: 4, frame: f });
  // RMP5: frames 001–282 (282 files)
  for (let f = 1; f <= 282; f++) manifest.push({ folder: 5, frame: f });

  return manifest;
}

const FRAME_MANIFEST = buildFrameManifest();
const TOTAL_FRAMES = FRAME_MANIFEST.length; // 1370

function frameSrc(entry) {
  const pad = entry.frame.toString().padStart(3, "0");
  return `/RMP${entry.folder}/ezgif-frame-${pad}.jpg`;
}

export default function HeroSequence() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const imagesRef = useRef([]);
  const playheadRef = useRef({ frame: 0 });
  // Cache canvas dimensions to avoid resizing every frame (which resets the buffer & causes blur)
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  // Keep track of the last successfully drawn frame index so we never flash black
  const lastDrawnRef = useRef(0);
  const [cardsVisible, setCardsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images = new Array(TOTAL_FRAMES);

    FRAME_MANIFEST.forEach((entry, idx) => {
      const img = new Image();
      img.src = frameSrc(entry);
      img.onload = () => {
        loadedCount++;
        setLoadedFrames(loadedCount);
        if (idx === 0) {
          // Draw first frame immediately when it loads
          renderFrame(0, images);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadedFrames(loadedCount);
      };
      images[idx] = img;
    });
    imagesRef.current = images;

    // Handle resize — force canvas re-measure then redraw current frame
    const handleResize = () => {
      canvasSizeRef.current = { w: 0, h: 0 }; // invalidate cached size
      const idx = Math.floor(playheadRef.current.frame);
      renderFrame(idx, imagesRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // idx is 0-based into the flat manifest
  const renderFrame = (idx, imagesArray = imagesRef.current) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Force minimum 2x resolution for 4K-quality sharpness
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    // Only resize the canvas backing store when dimensions actually change.
    if (canvasSizeRef.current.w !== targetW || canvasSizeRef.current.h !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      canvasSizeRef.current = { w: targetW, h: targetH };
    }

    // Reset transform and apply DPR scale for CSS-pixel drawing
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Clamp idx to valid range
    const safeIdx = Math.max(0, Math.min(idx, TOTAL_FRAMES - 1));
    let img = imagesArray[safeIdx];

    // If the requested frame isn't loaded yet, fall back to the last successfully drawn frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesArray[lastDrawnRef.current];
    }

    if (img && img.complete && img.naturalWidth > 0) {
      // Calculate aspect ratio to cover the screen (like object-fit: cover)
      const hRatio = rect.width / img.width;
      const vRatio = rect.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const drawW = img.width * ratio;
      const drawH = img.height * ratio;
      const centerShift_x = (rect.width - drawW) / 2;
      const centerShift_y = (rect.height - drawH) / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, drawW, drawH
      );
      lastDrawnRef.current = safeIdx;
    }
    // If no valid image at all, don't clearRect — keep whatever was drawn last (prevents black flash)
  };

  useGSAP(() => {
    // Only start ScrollTrigger once at least the first image is loaded
    if (loadedFrames === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500%",
        pin: true,
        scrub: 0.5,
      }
    });

    timeline.to(playheadRef.current, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        const currentIdx = Math.floor(playheadRef.current.frame);
        requestAnimationFrame(() => renderFrame(currentIdx));

        const currentEntry = FRAME_MANIFEST[currentIdx];
        if (currentEntry) {
          const visible = (currentEntry.folder === 4 && currentEntry.frame >= 181) || 
                          (currentEntry.folder === 5 && currentEntry.frame < 60);
          if (visible !== isVisibleRef.current) {
            isVisibleRef.current = visible;
            setCardsVisible(visible);
          }
        }
      }
    }, 0);

  }, { dependencies: [loadedFrames === 0], scope: containerRef });

  // We can start the experience once a good chunk of frames are loaded
  const isReady = loadedFrames >= Math.min(TOTAL_FRAMES, 150);

  return (
    <section ref={containerRef} className="hero-sequence-container">
      <div className={`loader-overlay ${isReady ? 'fade-out' : ''}`}>
        <span className="loader-text">
          {isReady ? 'ENTER' : `LOADING CINEMATIC EXPERIENCE (${Math.round((loadedFrames / TOTAL_FRAMES) * 100)}%)`}
        </span>
      </div>
      <canvas ref={canvasRef} className="hero-canvas" />
      <JewelleryOrbit visible={cardsVisible} />
    </section>
  );
}
