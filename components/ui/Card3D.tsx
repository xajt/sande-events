'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  shimmer?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className,
  intensity = 15,
  glowColor = 'rgba(255, 17, 0, 0.5)',
  shimmer = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calculate rotation based on mouse position
  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

  // Spring-based scale with bounce effect
  const scale = useSpring(isHovered ? 1.02 : 1, {
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  });

  // Calculate glow intensity based on mouse distance from center
  const glowIntensity = useTransform(
    [x, y],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt((latestX || 0) ** 2 + (latestY || 0) ** 2);
      return Math.min(distance * 2, 1);
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate normalized mouse position (-0.5 to 0.5)
    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
      }}
      className={cn('relative', className)}
    >
      {/* Glow Border Effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent)`,
          opacity: useTransform(glowIntensity, (v) => v * 0.8),
        }}
      />

      {/* Motion Trail Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}20, transparent 70%)`,
          opacity: useTransform(glowIntensity, (v) => v * 0.3),
        }}
      />

      {/* Shimmer Effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            initial={{ x: '-100%' }}
            animate={{
              x: isHovered ? '200%' : '-100%',
            }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.5,
            }}
            style={{
              width: '50%',
            }}
          />
        </motion.div>
      )}

      {/* Card Content */}
      <div
        className="relative h-full bg-background rounded-lg border border-border/50 backdrop-blur-sm overflow-hidden"
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Card3D;
