
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ParticlesBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const colors = ["#bd34fe", "#6e00ff", "#3a0ca3", "#4361ee"];
    const particleCount = 30;
    const container = containerRef.current;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.width = `${Math.random() * 5 + 3}px`;
      particle.style.height = particle.style.width;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.position = "absolute";
      particle.style.borderRadius = "50%";
      container.appendChild(particle);

      gsap.set(particle, {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
      });

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 h-full w-full overflow-hidden"
    ></div>
  );
};

export default ParticlesBackground;