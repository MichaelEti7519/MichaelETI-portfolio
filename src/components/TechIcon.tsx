import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
  isTriggered?: boolean;
}

export default function TechIcon({ name, className = '', size = 20, isTriggered = false }: TechIconProps) {
  const [internalActive, setInternalActive] = useState(false);
  const normalized = name.toLowerCase();

  const handleTouchOrClick = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setInternalActive(true);
    setTimeout(() => {
      setInternalActive(false);
    }, 1200);
  };

  const isAnim = internalActive || isTriggered;

  const renderIcon = () => {
    // 1. React 19 / React (Living 3D Atom: Gyroscopic electron orbits spinning around pulsing core)
    if (normalized.includes('react') && !normalized.includes('react native') && !normalized.includes('react router')) {
      return (
        <svg width={size} height={size} viewBox="-16 -16 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <radialGradient id="react-core-glow" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </radialGradient>
            <linearGradient id="react-ring-3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>

          {/* Ambient Core Aura */}
          <motion.circle
            cx="0"
            cy="0"
            r="12"
            fill="#0284C7"
            animate={isAnim ? { fillOpacity: [0.1, 0.35, 0.1], scale: [1, 1.25, 1] } : { fillOpacity: 0.12 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />

          {/* Gyroscopic 3D Electron Orbits */}
          <motion.g
            stroke="url(#react-ring-3d)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            animate={
              isAnim
                ? {
                    rotate: [0, 180, 360],
                    scale: [1, 1.12, 1],
                  }
                : {}
            }
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <ellipse rx="14.5" ry="5.5" />
            <ellipse rx="14.5" ry="5.5" transform="rotate(60)" />
            <ellipse rx="14.5" ry="5.5" transform="rotate(120)" />
          </motion.g>

          {/* Glowing Nucleus Sphere */}
          <motion.circle
            cx="0"
            cy="0"
            r="3.5"
            fill="url(#react-core-glow)"
            animate={isAnim ? { scale: [1, 1.45, 1] } : { scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <circle cx="-1" cy="-1" r="1.2" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      );
    }

    // 2. React Native (Smartphone vibrates with haptics while React atom levitates & rotates)
    if (normalized.includes('react native')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="rn-phone-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <radialGradient id="rn-atom-core" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="40%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </radialGradient>
            <linearGradient id="rn-ring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Haptic vibration pulse arcs emitting from device */}
          <motion.g
            style={{ transformOrigin: '16px 16px' }}
            animate={
              isAnim
                ? {
                    opacity: [0, 1, 0],
                    scale: [0.9, 1.15, 1],
                  }
                : { opacity: 0, scale: 1 }
            }
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <path d="M3.5 12C2.5 13.8 2.5 16.2 3.5 18" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M28.5 12C29.5 13.8 29.5 16.2 28.5 18" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" />
          </motion.g>

          {/* Smartphone chassis with native tactile vibration */}
          <motion.g
            animate={
              isAnim
                ? {
                    x: [0, -1.2, 1.2, -0.8, 0.8, 0],
                    y: [0, 0.4, -0.4, 0],
                  }
                : { x: 0, y: 0 }
            }
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Phone outer chassis */}
            <rect
              x="6.5"
              y="2.5"
              width="19"
              height="27"
              rx="4.5"
              fill="url(#rn-phone-grad)"
              stroke="#38BDF8"
              strokeWidth="1.2"
            />

            {/* Top speaker notch */}
            <rect x="14" y="4" width="4" height="1" rx="0.5" fill="#38BDF8" fillOpacity="0.8" />

            {/* High-contrast OLED Screen */}
            <rect x="8" y="6" width="16" height="20" rx="2.5" fill="#030712" stroke="#1E293B" strokeWidth="0.8" />

            {/* Home indicator bar */}
            <rect x="13.5" y="24" width="5" height="0.8" rx="0.4" fill="#38BDF8" fillOpacity="0.7" />

            {/* Centered Levitating & Gyroscopic React Native Atom */}
            <motion.g
              style={{ transformOrigin: '16px 15px' }}
              animate={
                isAnim
                  ? {
                      rotate: [0, 180, 360],
                      scale: [1, 1.15, 1],
                    }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            >
              {/* Three 3D orbital electron rings */}
              <ellipse cx="16" cy="15" rx="6.5" ry="2.4" stroke="url(#rn-ring-grad)" strokeWidth="1.2" fill="none" />
              <ellipse
                cx="16"
                cy="15"
                rx="6.5"
                ry="2.4"
                stroke="url(#rn-ring-grad)"
                strokeWidth="1.2"
                fill="none"
                transform="rotate(60 16 15)"
              />
              <ellipse
                cx="16"
                cy="15"
                rx="6.5"
                ry="2.4"
                stroke="url(#rn-ring-grad)"
                strokeWidth="1.2"
                fill="none"
                transform="rotate(120 16 15)"
              />

              {/* Glowing React Nucleus */}
              <circle cx="16" cy="15" r="2.2" fill="url(#rn-atom-core)" />
              <circle cx="15.3" cy="14.3" r="0.7" fill="#FFFFFF" fillOpacity="0.9" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // 3. React Router (Highway junction with moving traffic packet)
    if (normalized.includes('react router')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="rr-cube-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="26" height="26" rx="6.5" fill="url(#rr-cube-top)" stroke="#FDA4AF" strokeWidth="1" />
          {/* Route path network with 3D nodes */}
          <circle cx="9" cy="11" r="3" fill="#FFFFFF" />
          <circle cx="23" cy="21" r="3" fill="#FFFFFF" />
          <path d="M9 14V17C9 19.2 10.8 21 13 21H19" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M13 11H19C21.2 11 23 12.8 23 15V17" stroke="#FFE4E6" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
          {/* Traveling route signal beacon */}
          <motion.circle
            cx="9"
            cy="11"
            r="2.2"
            fill="#FEF08A"
            animate={
              isAnim
                ? {
                    cx: [9, 9, 13, 19, 23],
                    cy: [11, 21, 21, 21, 21],
                    scale: [1, 1.4, 1.2, 1],
                  }
                : {}
            }
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 4. TypeScript (3D Isometric Cube with Embossed TS shining & elevating)
    if (normalized.includes('typescript')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="ts-cube-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          <rect x="3" y="5" width="26" height="24" rx="5" fill="#1E3A8A" />
          <motion.rect
            x="3"
            y="3"
            width="26"
            height="24"
            rx="5"
            fill="url(#ts-cube-face)"
            stroke="#93C5FD"
            strokeWidth="1.2"
            animate={isAnim ? { y: [-2, 0], scale: [1, 1.04, 1] } : { y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          {/* T & S Embossed Glyphs popping with light glint */}
          <motion.path
            d="M7 11H15M11 11V22M16 19.5C16.8 21.2 18.5 22 20.5 22C22.8 22 24.5 20.8 24.5 19C24.5 17 23 16.2 20.2 15.6C18.2 15.2 17 14.5 17 13.2C17 11.8 18.4 11 20.2 11C21.8 11 23.2 11.8 23.8 13.2"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={
              isAnim
                ? {
                    stroke: ['#FFFFFF', '#93C5FD', '#FFFFFF'],
                    scale: [1, 1.12, 1],
                  }
                : {}
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 5. Next.js (Dark Orb with slicing diagonal N-Blade)
    if (normalized.includes('next.js') || normalized.includes('nextjs')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <radialGradient id="next-orb-dark" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>
          <motion.circle
            cx="16"
            cy="16"
            r="14"
            fill="url(#next-orb-dark)"
            stroke="#475569"
            strokeWidth="1.2"
            animate={isAnim ? { stroke: ['#475569', '#38BDF8', '#475569'] } : {}}
            transition={{ duration: 0.8 }}
          />
          {/* Left upright pillar */}
          <path d="M11 9V23" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
          {/* Right upright pillar */}
          <path d="M21 9V17.5" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
          {/* Slicing diagonal light blade */}
          <motion.path
            d="M11 9L21.5 23.5"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            animate={
              isAnim
                ? {
                    pathLength: [0.4, 1, 1],
                    stroke: ['#38BDF8', '#FFFFFF'],
                    opacity: [0.7, 1],
                  }
                : {}
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 6. Tailwind CSS (Cyan Ocean Waves surging & undulating)
    if (normalized.includes('tailwind')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="tw-wave-front" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="tw-wave-back" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          {/* Back wave undulating */}
          <motion.path
            d="M16 6c-4.2 0-7 2.1-8 6.3 1.6-2.1 3.5-2.9 5.6-2.4 1.2.3 2.1 1.2 3 2.1C18.2 13.8 20 15.6 24 15.6c4.2 0 7-2.1 8-6.3-1.6 2.1-3.5 2.9-5.6 2.4-1.2-.3-2.1-1.2-3-2.1-1.6-1.8-3.4-3.6-7.4-3.6z"
            fill="url(#tw-wave-back)"
            animate={
              isAnim
                ? {
                    x: [0, -3, 2, 0],
                    y: [0, 1.5, -1, 0],
                  }
                : {}
            }
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          {/* Front wave surging */}
          <motion.path
            d="M8 15.6c-4.2 0-7 2.1-8 6.3 1.6-2.1 3.5-2.9 5.6-2.4 1.2.3 2.1 1.2 3 2.1 1.6 1.8 3.4 3.6 7.4 3.6 4.2 0 7-2.1 8-6.3-1.6 2.1-3.5 2.9-5.6 2.4-1.2-.3-2.1-1.2-3-2.1-1.6-1.8-3.4-3.6-7.4-3.6z"
            fill="url(#tw-wave-front)"
            animate={
              isAnim
                ? {
                    x: [0, 3, -2, 0],
                    y: [0, -1.5, 1, 0],
                  }
                : {}
            }
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 7. Vite (Golden Lightning Bolt zapping & flashing inside crystal shield)
    if (normalized.includes('vite')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="vite-shield-l" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#41D1FF" />
              <stop offset="100%" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="vite-bolt-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF066" />
              <stop offset="100%" stopColor="#FFA800" />
            </linearGradient>
          </defs>
          <path d="M28 6L16 28 4 6l18-2 6 2z" fill="url(#vite-shield-l)" fillOpacity="0.85" />
          {/* Lightning bolt striking with electric flash */}
          <motion.path
            d="M20 4l-8.5 2 3.5 6.5-5 1.5 7.5 14 8.5-20.5-6-3.5z"
            fill="url(#vite-bolt-gold)"
            animate={
              isAnim
                ? {
                    scale: [1, 1.25, 0.9, 1.1, 1],
                    y: [0, -1, 1, 0],
                    filter: [
                      'drop-shadow(0 0 0px #F59E0B)',
                      'drop-shadow(0 0 6px #FDE047)',
                      'drop-shadow(0 0 0px #F59E0B)',
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 8. HTML5 (Orange Shield with glowing 5 Emblem)
    if (normalized.includes('html5') || normalized.includes('html')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="html-orange-l" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6B4A" />
              <stop offset="100%" stopColor="#E44D26" />
            </linearGradient>
            <linearGradient id="html-orange-r" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F16529" />
              <stop offset="100%" stopColor="#D83B0E" />
            </linearGradient>
          </defs>
          <path d="M5 4l2.4 22L16 29l8.6-3L27 4H5z" fill="url(#html-orange-l)" />
          <path d="M16 6.2v20.4l6.4-2.2L24.2 6.2H16z" fill="url(#html-orange-r)" />
          <motion.path
            d="M10.2 9.8h11.6l-.3 3H13.2l.3 3h7.6l-.7 6.8-4.4 1.4-4.4-1.4-.3-3.2h2.8l.2 1.6 1.7.5 1.7-.5.3-2.5h-9.8l.7-8.7z"
            fill="#FFFFFF"
            animate={
              isAnim
                ? {
                    scale: [1, 1.15, 1],
                    fill: ['#FFFFFF', '#FEF08A', '#FFFFFF'],
                  }
                : {}
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 9. Expo (Origami Prism folding & rotating)
    if (normalized.includes('expo')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <rect x="3" y="3" width="26" height="26" rx="6" fill="#090D16" stroke="#38BDF8" strokeWidth="1" />
          <motion.path
            d="M8 22l6-12 3 6-3 6H8zm8-6l3-6 5 12h-3l-2-4.5-2-1.5z"
            fill="#FFFFFF"
            animate={
              isAnim
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }
                : {}
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 10. NativeWind (Aero Wave Crests blowing with wind gust)
    if (normalized.includes('nativewind')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <rect x="3" y="3" width="26" height="26" rx="6" fill="#0284C7" stroke="#7DD3FC" strokeWidth="1" />
          <motion.path
            d="M9 12c2 0 3.5-1.5 5-1.5s2.8 1.5 5 1.5 3.5-1.5 4-1.5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={isAnim ? { x: [-3, 4, 0] } : {}}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
          <motion.path
            d="M9 20c2 0 3.5-1.5 5-1.5s2.8 1.5 5 1.5 3.5-1.5 4-1.5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={isAnim ? { x: [3, -4, 0] } : {}}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 11. AsyncStorage / Storage (Vault Drawers sliding open with illuminated memory cells)
    if (normalized.includes('asyncstorage') || normalized.includes('storage')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="storage-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <motion.g animate={isAnim ? { x: [0, 4, 0] } : {}} transition={{ duration: 0.8, ease: 'easeInOut' }}>
            <rect x="4" y="5" width="24" height="9" rx="3" fill="url(#storage-grad)" stroke="#FDE68A" strokeWidth="1" />
            <circle cx="9" cy="9.5" r="1.5" fill="#FEF3C7" />
            <path d="M19 9.5H23" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
          <motion.g animate={isAnim ? { x: [0, -3, 0] } : {}} transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}>
            <rect x="4" y="18" width="24" height="9" rx="3" fill="url(#storage-grad)" stroke="#FDE68A" strokeWidth="1" />
            <circle cx="9" cy="22.5" r="1.5" fill="#FEF3C7" />
            <path d="M19 22.5H23" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
        </svg>
      );
    }

    // 12. i18next Localization (3D Globe rotating its longitudes)
    if (normalized.includes('i18n') || normalized.includes('localization')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <circle cx="16" cy="16" r="13" fill="#2563EB" stroke="#93C5FD" strokeWidth="1.2" />
          <motion.ellipse
            cx="16"
            cy="16"
            rx="6.5"
            ry="13"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            fill="none"
            animate={isAnim ? { rx: [6.5, 1, 6.5, 12, 6.5] } : {}}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
          <path d="M3 16H29M6 10H26M6 22H26" stroke="#DBEAFE" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    }

    // 13. Haptics (3D Tactile Motor / Taptic Engine with resonant pulse waves)
    if (normalized.includes('haptic')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="haptic-chassis" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#5B21B6" />
              <stop offset="100%" stopColor="#3B0764" />
            </linearGradient>
            <radialGradient id="haptic-core" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#DDD6FE" />
              <stop offset="40%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#7C3AED" />
            </radialGradient>
            <linearGradient id="haptic-copper" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Symmetrical Tactile Vibration Ripple Arcs */}
          <motion.g
            style={{ transformOrigin: '16px 16px' }}
            animate={
              isAnim
                ? {
                    opacity: [0.35, 1, 0.7, 1, 0.35],
                    scale: [0.95, 1.12, 0.98, 1.08, 1],
                  }
                : { opacity: 0.45, scale: 1 }
            }
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Left shockwaves */}
            <path d="M5.5 12C4.5 14.5 4.5 17.5 5.5 20" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M2.5 10C1 13.5 1 18.5 2.5 22"
              stroke="#8B5CF6"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="1.5 1.5"
            />

            {/* Right shockwaves */}
            <path d="M26.5 12C27.5 14.5 27.5 17.5 26.5 20" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M29.5 10C31 13.5 31 18.5 29.5 22"
              stroke="#8B5CF6"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="1.5 1.5"
            />
          </motion.g>

          {/* High-frequency buzzing tactile motor actuator */}
          <motion.g
            animate={
              isAnim
                ? {
                    x: [0, -1.8, 1.8, -1.2, 1.2, -0.6, 0.6, 0],
                    y: [0, 0.5, -0.5, 0.3, -0.3, 0],
                  }
                : { x: 0, y: 0 }
            }
            transition={{ duration: 0.45, ease: 'linear' }}
          >
            {/* Actuator Enclosure Box */}
            <rect
              x="8"
              y="6.5"
              width="16"
              height="19"
              rx="4"
              fill="url(#haptic-chassis)"
              stroke="#DDD6FE"
              strokeWidth="1.2"
            />

            {/* Guide tracks / micro bevel slits */}
            <line
              x1="11"
              y1="9.5"
              x2="21"
              y2="9.5"
              stroke="#DDD6FE"
              strokeWidth="0.8"
              strokeDasharray="1 1.5"
              strokeOpacity="0.7"
            />
            <line
              x1="11"
              y1="22.5"
              x2="21"
              y2="22.5"
              stroke="#DDD6FE"
              strokeWidth="0.8"
              strokeDasharray="1 1.5"
              strokeOpacity="0.7"
            />

            {/* Copper electromagnetic induction ring */}
            <circle cx="16" cy="16" r="5" fill="#1E1B4B" stroke="url(#haptic-copper)" strokeWidth="1.5" />

            {/* Glowing resonant actuator weight core */}
            <motion.circle
              cx="16"
              cy="16"
              r="2.8"
              fill="url(#haptic-core)"
              style={{ transformOrigin: '16px 16px' }}
              animate={
                isAnim
                  ? {
                      scale: [1, 1.35, 1],
                    }
                  : { scale: 1 }
              }
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            />
            {/* Specular highlight */}
            <circle cx="15.2" cy="15.2" r="0.8" fill="#FFFFFF" fillOpacity="0.85" />
          </motion.g>
        </svg>
      );
    }

    // 14. Node.js (3D Isometric Emerald Hexagon pulsing & blooming)
    if (normalized.includes('node')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="node-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
            <linearGradient id="node-side" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>
          <motion.g animate={isAnim ? { scale: [1, 1.16, 1] } : {}} transition={{ duration: 0.7, ease: 'easeInOut' }}>
            <path d="M16 2l12 7v14l-12 7-12-7V9l12-7z" fill="url(#node-top)" />
            <path d="M16 16l12-7v14l-12 7V16z" fill="url(#node-side)" />
            <path d="M16 16L4 9v14l12 7V16z" fill="#14532D" />
            <motion.path
              d="M16 10v7l3.5 2v-4"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={isAnim ? { stroke: ['#FFFFFF', '#FEF08A', '#FFFFFF'] } : {}}
              transition={{ duration: 0.7 }}
            />
          </motion.g>
        </svg>
      );
    }

    // 15. Express (Obsidian Monolith with glowing 'ex' letters)
    if (normalized.includes('express')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <circle cx="16" cy="16" r="14" fill="#0F172A" stroke="#475569" strokeWidth="1.2" />
          <motion.text
            x="16"
            y="21"
            textAnchor="middle"
            fill="#F8FAFC"
            fontSize="14"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.5px"
            animate={
              isAnim
                ? {
                    fill: ['#F8FAFC', '#38BDF8', '#F8FAFC'],
                    scale: [1, 1.25, 1],
                  }
                : {}
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            ex
          </motion.text>
        </svg>
      );
    }

    // 16. WebSockets (Telecommunication signal packets shooting back & forth)
    if (normalized.includes('websocket')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="ws-beam-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="7"
            cy="24"
            r="4.5"
            fill="url(#ws-beam-grad)"
            stroke="#FFEDD5"
            strokeWidth="1"
            animate={isAnim ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.6 }}
          />
          <motion.circle
            cx="25"
            cy="8"
            r="4.5"
            fill="url(#ws-beam-grad)"
            stroke="#FFEDD5"
            strokeWidth="1"
            animate={isAnim ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <path d="M10 20L22 12" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
          {/* Animated data packet traveling between endpoints */}
          <motion.circle
            r="2.5"
            fill="#FEF08A"
            animate={
              isAnim
                ? {
                    cx: [10, 22, 10],
                    cy: [20, 12, 20],
                    scale: [1, 1.5, 1],
                  }
                : { cx: 16, cy: 16 }
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 17. Socket.IO (Lightning Bolt flashing in dark sphere)
    if (normalized.includes('socket.io') || normalized.includes('socket')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <circle cx="16" cy="16" r="14" fill="#09090B" stroke="#27272A" strokeWidth="1.2" />
          <motion.path
            d="M15 7l-4 10h5.5l-2.5 8 8-11h-5.5l4-7h-5.5z"
            fill="#FFFFFF"
            animate={
              isAnim
                ? {
                    fill: ['#FFFFFF', '#FEF08A', '#FFFFFF'],
                    scale: [1, 1.3, 1],
                    y: [0, -2, 2, 0],
                  }
                : {}
            }
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 18. Spring Boot / Java (Spring Leaf blooming & swaying)
    if (normalized.includes('spring') || normalized.includes('java')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="spring-leaf-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#4D7C0F" />
            </linearGradient>
          </defs>
          <motion.path
            d="M26 10C24.3 5.6 19.1 2.7 14 4.3 8.9 5.9 5.3 10.7 5.6 16c.3 5.1 3.7 9.3 8.7 10.8 5.1 1.5 10.7-1.3 12.7-6.1.5-1.3.4-2.9-.3-4.1-.8-1.3-2.1-2.3-3.6-2.7 1.9-.5 3.3-2 2.9-3.9z"
            fill="url(#spring-leaf-grad)"
            animate={
              isAnim
                ? {
                    rotate: [0, -12, 12, 0],
                    scale: [1, 1.15, 1],
                  }
                : {}
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <circle cx="16" cy="15" r="3" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      );
    }

    // 19. JWT & bcrypt (Padlock Shackle UNLOCKS and pops open!)
    if (normalized.includes('jwt') || normalized.includes('bcrypt')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <defs>
            <linearGradient id="lock-body-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E879F9" />
              <stop offset="100%" stopColor="#A21CAF" />
            </linearGradient>
          </defs>
          {/* Shackle pops UP when unlocked */}
          <motion.path
            d="M10 14V9C10 5.7 12.7 3 16 3C19.3 3 22 5.7 22 9V14"
            stroke="#CBD5E1"
            strokeWidth="2.8"
            strokeLinecap="round"
            animate={
              isAnim
                ? {
                    y: [0, -4, -4, 0],
                    rotate: [0, 0, 15, 0],
                  }
                : { y: 0 }
            }
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          <rect x="5" y="14" width="22" height="15" rx="4" fill="url(#lock-body-grad)" stroke="#F5D0FE" strokeWidth="1" />
          <motion.circle
            cx="16"
            cy="20.5"
            r="2"
            fill="#FFFFFF"
            animate={isAnim ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.6 }}
          />
          <path d="M16 22.5V25.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    // 20. Stripe Webhooks (Credit Card sliding into reader with green verified ping)
    if (normalized.includes('stripe')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <motion.rect
            x="3"
            y="3"
            width="26"
            height="26"
            rx="6"
            fill="#635BFF"
            stroke="#A5B4FC"
            strokeWidth="1"
            animate={isAnim ? { y: [-2, 0], scale: [1, 1.05, 1] } : { y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
          <motion.path
            d="M18.4 13.8c0-.8-.7-1.3-1.7-1.3-1.2 0-2.3.5-3.2 1.3l-1.1-2c1.3-1.3 3-1.9 4.6-1.9 3.1 0 5.1 1.5 5.1 4.3 0 4.2-5.6 3.5-5.6 5.2 0 .9.8 1.3 1.9 1.3 1.5 0 2.7-.8 3.6-1.7l1.1 2c-1.5 1.5-3.2 2.3-5 2.3-3.1 0-5.2-1.6-5.2-4.3 0-4.3 5.5-3.6 5.5-5.2z"
            fill="#FFFFFF"
            animate={isAnim ? { fill: ['#FFFFFF', '#A7F3D0', '#FFFFFF'] } : {}}
            transition={{ duration: 0.7 }}
          />
        </svg>
      );
    }

    // 21. PostgreSQL (Sapphire Elephant with flapping ear & water splash)
    if (normalized.includes('postgres')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <circle cx="16" cy="16" r="14" fill="#1E3A8A" stroke="#93C5FD" strokeWidth="1.2" />
          <motion.path
            d="M23 17c-.4 3.3-2.9 6-6.4 6-2 0-3.7-.9-4.9-2.4l-2 2c-.4.4-1.1.3-1.3-.3-.3-.5 0-1.1.4-1.5l2-2C9.9 17.7 9.2 16.1 9.2 14.3c0-3.7 2.9-6.7 6.7-6.7s6.7 3 6.7 6.7c0 .9-.1 1.9-.7 2.7z"
            fill="#FFFFFF"
            animate={isAnim ? { rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <circle cx="13" cy="13" r="1.3" fill="#3B82F6" />
        </svg>
      );
    }

    // 22. Prisma ORM (Emerald Crystal Prism refracting rays)
    if (normalized.includes('prisma')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <motion.g animate={isAnim ? { scale: [1, 1.18, 1], rotate: [0, 8, -8, 0] } : {}} transition={{ duration: 0.8 }}>
            <path d="M5 25L16 3l11 22H5z" fill="#0F172A" />
            <path d="M16 3l11 22H16L11 16l5-13z" fill="#16A34A" />
            <path d="M16 3l-5 13h5V3z" fill="#4ADE80" />
          </motion.g>
        </svg>
      );
    }

    // 23. MySQL (Golden Dolphin leaping in blue water)
    if (normalized.includes('mysql')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <rect x="3" y="3" width="26" height="26" rx="6" fill="#00758F" stroke="#38BDF8" strokeWidth="1" />
          <motion.path
            d="M8 19.5c2-4 5.3-7.3 10.7-7.3 2.7 0 4.7 1.3 5.3 3.3-2-.7-4-.7-6 0-2.7 1.3-4 4-6 6-1.3.7-2.7.7-4-2z"
            fill="#F29111"
            animate={
              isAnim
                ? {
                    y: [0, -3.5, 1, 0],
                    rotate: [0, -14, 6, 0],
                  }
                : {}
            }
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />
          <path d="M18.7 12c.7-1.3 2-2.7 4-2.7s3.3 1.3 4 3.3c-1-.7-2.4-.9-3.7-.7-1 .3-2 1.1-2.7 2-.5-.7-1-1.3-1.6-1.9z" fill="#FFFFFF" />
        </svg>
      );
    }

    // 24. Firebase (Flames dancing and flickering upward)
    if (normalized.includes('firebase')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <motion.path
            d="M6 23.5L9.6 6.5a.7.7 0 0 1 1.2-.3l3.6 6.8L6 23.5z"
            fill="#FFA000"
            animate={isAnim ? { y: [0, -2, 0], scaleY: [1, 1.25, 1] } : {}}
            transition={{ duration: 0.6 }}
          />
          <motion.path
            d="M16 15.5l3.2-6a.7.7 0 0 1 1.2 0l5.6 14L16 15.5z"
            fill="#F57C00"
            animate={isAnim ? { y: [0, -3, 0], scaleY: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          />
          <motion.path
            d="M6 23.5l10 5.7 10-5.7L16 4.3 6 23.5z"
            fill="#FFCA28"
            animate={isAnim ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.7 }}
          />
        </svg>
      );
    }

    // 25. Appwrite (Magenta Core pulsing radar waves)
    if (normalized.includes('appwrite')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <rect x="3" y="3" width="26" height="26" rx="6" fill="#18181B" stroke="#FD366E" strokeWidth="1.2" />
          <motion.path
            d="M16 6a10 10 0 0 0-10 10c0 3 1.2 5.5 3.2 7.3l2.1-2.1A7 7 0 0 1 9 16a7 7 0 0 1 7-7 7 7 0 0 1 7 7c0 2-.8 3.7-2.3 5.1l2.1 2.1a9.9 9.9 0 0 0 3.2-7.2A10 10 0 0 0 16 6z"
            fill="#FD366E"
            animate={isAnim ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.7 }}
          />
          <motion.circle
            cx="16"
            cy="16"
            r="3.3"
            fill="#FD366E"
            animate={isAnim ? { scale: [1, 1.6, 1], fillOpacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 0.6 }}
          />
        </svg>
      );
    }

    // 26. Git & GitHub (Branch commit nodes pulsing sequentially)
    if (normalized.includes('git')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <rect x="3" y="3" width="26" height="26" rx="6" fill="#F05032" stroke="#FED7AA" strokeWidth="1" />
          <motion.path
            d="M23.7 15l-6.8-6.8a1.6 1.6 0 0 0-2.3 0l-1.6 1.6 2.9 2.9a2 2 0 0 1 2.5 2.5l2.8 2.8a2 2 0 1 1-1.2 1.2l-2.7-2.7v4.4a2 2 0 1 1-1.7 0V16a2 2 0 0 1-1.1-1.1l-2.8-2.8-3.2 3.1a1.6 1.6 0 0 0 0 2.3l6.8 6.8a1.6 1.6 0 0 0 2.3 0l6.4-6.4a1.6 1.6 0 0 0 0-2.3z"
            fill="#FFFFFF"
            animate={
              isAnim
                ? {
                    scale: [1, 1.18, 1],
                    rotate: [0, -10, 10, 0],
                  }
                : {}
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 27. Postman (Rocket Astronaut blasting propulsion thrust)
    if (normalized.includes('postman')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <circle cx="16" cy="16" r="14" fill="#FF6C37" stroke="#FFEDD5" strokeWidth="1" />
          <motion.path
            d="M21 14.5l-9-5.3v4l5.3 2.7-5.3 2.7v4l9.3-5.4a1.6 1.6 0 0 0 0-2.7z"
            fill="#FFFFFF"
            animate={
              isAnim
                ? {
                    x: [0, 4, -1, 0],
                    y: [0, -2, 1, 0],
                    scale: [1, 1.25, 1],
                  }
                : {}
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // 28. Docker (Cargo Containers loading & whale bobbing in ocean water)
    if (normalized.includes('docker')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
          <rect x="3" y="3" width="26" height="26" rx="6" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
          {/* Container stack loading */}
          <motion.g
            animate={isAnim ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <path d="M7 14h2.5v2.5H7zm4 0h2.5v2.5H11zm4 0h2.5v2.5H15zm4 0h2.5v2.5H19zm-8-4h2.5v2.5H11zm4 0h2.5v2.5H15zm4 0h2.5v2.5H19zm-4-4h2.5v2.5H15z" fill="#FFFFFF" />
          </motion.g>
          {/* Whale bobbing */}
          <motion.path
            d="M25 18c-.5 0-1.7-.3-2.3.4-1.3 1.2-3 1.6-5 1.6H5c.3 2 1.9 5.3 6 5.3 6 0 10-3.3 11.3-6.7 1 .4 2 .1 2.7-.6z"
            fill="#FFFFFF"
            animate={isAnim ? { y: [0, 1.5, -1, 0] } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </svg>
      );
    }

    // Fallback Code Emblem
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 drop-shadow-sm">
        <rect x="3" y="3" width="26" height="26" rx="6" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1" />
        <motion.path
          d="M13 11L8 16l5 5M19 11l5 5-5 5"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={isAnim ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
        />
      </svg>
    );
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none cursor-pointer ${className}`}
      onClick={handleTouchOrClick}
      onTouchStart={handleTouchOrClick}
      title={`Touch or click ${name} to animate`}
    >
      <motion.div
        className="flex items-center justify-center will-change-transform"
        whileHover={{
          scale: 1.15,
        }}
        whileTap={{
          scale: 0.92,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
      >
        {renderIcon()}
      </motion.div>
    </div>
  );
}
