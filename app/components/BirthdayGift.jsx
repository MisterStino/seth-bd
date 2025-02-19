"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Utility: Random integer between min & max (inclusive).
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function BirthdayGift() {
  // Refs for canvas
  const confettiCanvasRef = useRef(null);
  const explosionCanvasRef = useRef(null);

  // Audio
  const audioRef = useRef(null);

  // States
  const [isOpen, setIsOpen] = useState(false);       
  const [explosionActive, setExplosionActive] = useState(false);
  const [showTronText, setShowTronText] = useState(false);

  // Confetti Particles
  let confettiParticles = [];
  let confettiAnimationId;

  // Explosion Particles
  let explosionParticles = [];
  let explosionAnimationId;

  useEffect(() => {
    if (!isOpen) return; // Only run animation if open
  
    const canvas = confettiCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let confettiParticles = [];
  
    class ConfettiParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 3;
        this.speedX = (Math.random() - 0.5) * 20; // Reduce speed to improve performance
        this.speedY = Math.random() * -10 - 5;
        this.gravity = 0.3;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.opacity = 1;
      }
      update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  
    function spawnConfetti() {
      for (let i = 0; i < 10; i++) {
        confettiParticles.push(new ConfettiParticle(canvas.width / 2, canvas.height - 100));
      }
    }
  
    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isOpen) spawnConfetti();
  
      confettiParticles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.opacity <= 0) {
          confettiParticles.splice(index, 1);
        }
      });
  
      requestAnimationFrame(animateConfetti);
    }
  
    animateConfetti();
    return () => ctx.clearRect(0, 0, canvas.width, canvas.height); // Cleanup function
  }, [isOpen]); 


  // ─────────────────────────────────────────────────────────────────
  // HANDLE BOX LID (Audio + Timers)
  // ─────────────────────────────────────────────────────────────────
  const handleLidToggle = (e) => {
    const audio = audioRef.current;
    if (e.target.checked) {
      // OPEN
      audio.currentTime = 48;
      audio.play();
      setIsOpen(true);

      // Trigger top explosion
      setExplosionActive(true);

      // Show Tron text after 2s
      setTimeout(() => {
        setShowTronText(true);
      }, 2000);
    } else {
      // CLOSE
      audio.pause();
      audio.currentTime = 48;
      setIsOpen(false);
      setShowTronText(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Galaxy / Star Layers */}
      <div className="bg-animation">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="stars4"></div>
      </div>

      {/* Explosion Canvas */}
      <canvas ref={explosionCanvasRef} className="explosion-canvas"></canvas>

      {/* Confetti Canvas */}
      <canvas ref={confettiCanvasRef} className="confetti-canvas"></canvas>

      {/* Audio */}
      <audio ref={audioRef} src="/Soulchaser.mp3" preload="auto"></audio>

      {/* TRON Text */}
      {showTronText && (
        <div className="tron-text">
          <h2>Now playing:</h2>
          <h1>SoulChaster</h1>
          <h2>By Seth van der Bijl</h2>
        </div>
      )}

      {/* GIFT BOX */}
      <div className="birthday-gift">
        <div className="gift w-40 h-24 bg-yellow-400 shadow-lg relative">
          <input
            id="click"
            type="checkbox"
            className="hidden"
            onChange={handleLidToggle}
          />
          <label
            htmlFor="click"
            className="click absolute w-44 h-10 bg-yellow-400 top-[-40px] left-[-10px]
                       cursor-pointer transition-transform origin-bottom-left duration-300 z-10"
          >
            <div className="absolute w-[25px] h-[40px] bg-red-500 left-[69px]"></div>
            <div
              className="absolute w-0 h-0 border-b-[30px] border-b-red-500
                          border-t-[30px] border-t-red-500 border-l-[0px]
                          border-l-transparent border-r-[30px] border-r-transparent
                          left-[65px] top-[-47px] rotate-[-90deg]"
            ></div>
          </label>

          <div className="absolute w-6 h-24 bg-red-500 left-[50%] transform -translate-x-1/2"></div>

          <div
            className="wishes absolute text-center text-3xl font-bold
                       text-gray-100 opacity-0 transition-transform duration-500
                       left-1 top-[-80px]"
          >
            Happy Birthday! 🎉
          </div>
        </div>
      </div>
    </div>
  );
}
