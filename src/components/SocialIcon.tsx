import React, { useState } from 'react';
import { motion } from 'motion/react';

export type SocialPlatform = 'github' | 'linkedin' | 'email' | 'mail' | string;

interface SocialIconProps {
  name: SocialPlatform;
  className?: string;
  size?: number;
  isTriggered?: boolean;
}

export default function SocialIcon({
  name,
  className = '',
  size = 20,
  isTriggered = false,
}: SocialIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [internalActive, setInternalActive] = useState(false);
  const normalized = name.toLowerCase().trim();

  const handleTrigger = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setInternalActive(true);
    setTimeout(() => {
      setInternalActive(false);
    }, 800);
  };

  const isActive = isHovered || internalActive || isTriggered;

  const render2DIcon = () => {
    // 1. GitHub 2D Flat Icon
    if (normalized.includes('github') || normalized === 'git') {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            fill="currentColor"
            animate={
              isActive
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, -6, 6, 0],
                  }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 2. LinkedIn 2D Flat Icon
    if (normalized.includes('linkedin')) {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flat 2D rounded container */}
          <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
          {/* 'in' flat white glyphs */}
          <motion.g
            animate={
              isActive
                ? {
                    y: [0, -1, 0],
                  }
                : { y: 0 }
            }
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* 'i' dot */}
            <motion.circle
              cx="6.8"
              cy="7.2"
              r="1.4"
              fill="#FFFFFF"
              animate={isActive ? { y: [0, -1.8, 0] } : { y: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
            {/* 'i' bar */}
            <rect x="5.5" y="10" width="2.6" height="8.2" rx="0.4" fill="#FFFFFF" />
            {/* 'n' shape */}
            <path
              d="M10.8 10h2.5v1.2c.4-.7 1.4-1.4 2.8-1.4 2.7 0 3.4 1.8 3.4 4.1V18.2h-2.6v-3.8c0-1.1-.3-1.8-1.4-1.8-1 0-1.4.7-1.4 1.8v3.8h-2.6V10h-.7z"
              fill="#FFFFFF"
            />
          </motion.g>
        </svg>
      );
    }

    // 3. Email / Mail 2D Flat Icon
    if (normalized.includes('email') || normalized.includes('mail')) {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2.5"
            animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          />
          <motion.polyline
            points="3 7 12 13 21 7"
            animate={isActive ? { y: [0, 1, 0] } : { y: 0 }}
            transition={{ duration: 0.35 }}
          />
        </svg>
      );
    }

    // Fallback 2D Link
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTrigger}
      onTouchStart={handleTrigger}
      title={`${name} 2D icon`}
    >
      <motion.div
        className="flex items-center justify-center"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      >
        {render2DIcon()}
      </motion.div>
    </div>
  );
}
