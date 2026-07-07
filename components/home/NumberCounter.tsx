'use client';

import React, { useEffect, useRef, useState } from 'react';

interface NumberCounterProps {
  value: number;
  label: string;
  hasPlus?: boolean;
}

export default function NumberCounter({ value, label, hasPlus = false }: NumberCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate counter when visible
  useEffect(() => {
    if (!isVisible) return;

    let currentValue = 0;
    const increment = Math.ceil(value / 30); // 30 frames for animation
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(currentValue);
      }
    }, 50); // ~1.5s total animation

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div ref={counterRef} className="num">
      <div className="v">
        <span className="counter-display">{displayValue}</span>
        {hasPlus && <small>+</small>}
      </div>
      <div className="l">{label}</div>
    </div>
  );
}