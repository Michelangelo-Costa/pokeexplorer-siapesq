"use client";

import React, { useEffect, useRef } from "react";

// Pokébola SVG simples
const Pokeball = ({
  x,
  y,
  size,
  opacity,
  speed,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.animate(
        [
          { transform: `translateY(0px)` },
          { transform: `translateY(-40px)` },
          { transform: `translateY(0px)` },
        ],
        {
          duration: speed,
          iterations: Infinity,
          delay,
        },
      );
    }
  }, [speed, delay]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        opacity,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <circle
          cx="16"
          cy="16"
          r="16"
          fill="#fff"
          stroke="#222"
          strokeWidth="2"
        />
        <path d="M0 16h32" stroke="#222" strokeWidth="2" />
        <circle
          cx="16"
          cy="16"
          r="6"
          fill="#ef5350"
          stroke="#222"
          strokeWidth="2"
        />
        <circle
          cx="16"
          cy="16"
          r="3"
          fill="#fff"
          stroke="#222"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

const PokeballParticles = () => {
  // Configurações de pokébolas flutuantes
  const pokeballs = [
    { x: 10, y: 30, size: 48, opacity: 0.18, speed: 4200, delay: 0 },
    { x: 60, y: 20, size: 64, opacity: 0.13, speed: 5200, delay: 800 },
    { x: 80, y: 60, size: 40, opacity: 0.15, speed: 3900, delay: 400 },
    { x: 30, y: 70, size: 56, opacity: 0.12, speed: 4800, delay: 1200 },
    { x: 50, y: 50, size: 36, opacity: 0.16, speed: 4100, delay: 600 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {pokeballs.map((p, i) => (
        <Pokeball key={i} {...p} />
      ))}
    </div>
  );
};

export default PokeballParticles;
