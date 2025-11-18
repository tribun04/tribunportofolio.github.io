import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// This component splits text into individual spans for animation
const SplitText = ({ children, className, animationProps = {} }) => {
  const wordsRef = useRef([]);

  useEffect(() => {
    if (wordsRef.current.length > 0) {
      // Clear any existing animations before applying new ones
      gsap.set(wordsRef.current, { clearProps: "all" });

      // Apply animation if animationProps are provided
      if (Object.keys(animationProps).length > 0) {
        gsap.from(wordsRef.current, {
          ...animationProps,
          stagger: animationProps.stagger || 0.05, // Default stagger if not provided
          onComplete: animationProps.onComplete || null,
        });
      }
    }
  }, [animationProps, children]); // Rerun if children or animationProps change

  // Split the children text into individual characters
  const characters = React.Children.toArray(children)
    .join('')
    .split('')
    .map((char, index) => (
      <span
        key={index}
        ref={(el) => (wordsRef.current[index] = el)}
        style={{ display: 'inline-block', overflow: 'hidden' }} // Important for individual character animation
      >
        {char === ' ' ? '\u00A0' : char} {/* Render space character correctly */}
      </span>
    ));

  return <span className={className}>{characters}</span>;
};

export default SplitText;