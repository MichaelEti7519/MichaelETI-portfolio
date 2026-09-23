import { motion } from 'motion/react';

interface ProjectFaviconProps {
  repoName: string;
  size?: number;
  className?: string;
}

export default function ProjectFavicon({ repoName, size = 28, className = '' }: ProjectFaviconProps) {
  const normalized = repoName.toLowerCase();

  const renderFavicon = () => {
    // 1. EcoTreks (Sustainable travel marketplace & booking)
    if (normalized.includes('ecotrek')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0">
          <rect width="32" height="32" rx="8" fill="#059669" />
          {/* Stylized mountain peaks and rising eco leaf */}
          <path
            d="M6 22L13 12L17 18L21 14L26 22H6Z"
            fill="#047857"
          />
          <path
            d="M10 22L14.5 15L17.5 19.5L20.5 15.5L24 22H10Z"
            fill="#10B981"
          />
          {/* Compass / sun point */}
          <circle cx="21" cy="9" r="2.5" fill="#FEF08A" />
          {/* Mountain snow cap */}
          <path d="M14.5 15L13 17.5H16L14.5 15Z" fill="#ECFDF5" />
        </svg>
      );
    }

    // 2. GreenSight 1.0 (Agricultural telemetry, weather & soil insights)
    if (normalized.includes('greensight')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0">
          <rect width="32" height="32" rx="8" fill="#15803D" />
          {/* Telemetry sensor arc waves */}
          <path
            d="M8 12C12 7 20 7 24 12"
            stroke="#86EFAC"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeDasharray="1 3"
          />
          <path
            d="M11 15C13.8 11.5 18.2 11.5 21 15"
            stroke="#BBF7D0"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          {/* Sprouting seedling */}
          <path
            d="M16 25V17M16 17C16 13.5 13 13 11.5 14C11.5 17 14.5 17 16 17ZM16 17C16 13 19.5 12.5 21 13.5C21 17 17.5 17 16 17Z"
            stroke="#FEF08A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#4ADE80"
            fillOpacity="0.4"
          />
          {/* Ground soil base */}
          <path d="M9 25H23" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    // 3. Telecom Voice Call Translation (Real-time WebSockets audio & transcription)
    if (normalized.includes('voice-call') || normalized.includes('voice')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0">
          <rect width="32" height="32" rx="8" fill="#2563EB" />
          {/* Headset / audio stream bridge */}
          <path
            d="M8 17C8 12.58 11.58 9 16 9C20.42 9 24 12.58 24 17V20C24 21.1 23.1 22 22 22H21V16H23V17"
            stroke="#93C5FD"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M9 16H11V22H10C8.9 22 8 21.1 8 20V16Z"
            fill="#60A5FA"
          />
          {/* Equalizer live sound waves */}
          <path d="M13 16V20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 14V22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M19 16V20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Mic boom */}
          <path d="M22 22C22 23.5 20.5 24.5 18.5 24.5H17" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    }

    // 4. Remote Job Board (Talent & vacancy directory platform)
    if (normalized.includes('job') || normalized.includes('remote')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0">
          <rect width="32" height="32" rx="8" fill="#7C3AED" />
          {/* Global latitude/longitude rings */}
          <circle cx="16" cy="16" r="10" stroke="#C4B5FD" strokeWidth="1.2" strokeOpacity="0.4" />
          {/* Briefcase emblem */}
          <rect x="9" y="13" width="14" height="11" rx="2" fill="#6D28D9" stroke="#E9D5FF" strokeWidth="1.5" />
          <path d="M13 13V11C13 10.4 13.4 10 14 10H18C18.6 10 19 10.4 19 11V13" stroke="#E9D5FF" strokeWidth="1.5" />
          <path d="M9 17H23" stroke="#C4B5FD" strokeWidth="1.2" />
          <circle cx="16" cy="18" r="1.5" fill="#FDE047" />
        </svg>
      );
    }

    // 5. AI Expense Tracker (Prexp - Mobile spending & financial analytics)
    if (normalized.includes('expense') || normalized.includes('finance')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0">
          <rect width="32" height="32" rx="8" fill="#EA580C" />
          {/* Smart wallet card */}
          <rect x="7" y="10" width="18" height="13" rx="2.5" fill="#C2410C" stroke="#FED7AA" strokeWidth="1.5" />
          <path d="M7 14H25" stroke="#FED7AA" strokeWidth="1.2" />
          {/* Rising financial telemetry bars */}
          <path d="M11 20V17" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 20V15" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <path d="M19 20V12" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          {/* Small currency coin symbol */}
          <circle cx="21.5" cy="18" r="1.5" fill="#FEF08A" />
        </svg>
      );
    }

    // 6. Student Management System (Spring Boot university academic administration API)
    if (normalized.includes('student') || normalized.includes('management')) {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0">
          <rect width="32" height="32" rx="8" fill="#1E293B" />
          {/* Academic graduation mortarboard */}
          <path
            d="M16 8L7 13L16 18L25 13L16 8Z"
            fill="#3B82F6"
            stroke="#93C5FD"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* Cap base & tassel */}
          <path
            d="M10.5 15.5V20.5C10.5 22.5 13 24 16 24C19 24 21.5 22.5 21.5 20.5V15.5"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M23 14V21.5" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="23" cy="22" r="1" fill="#FBBF24" />
        </svg>
      );
    }

    // Default project repo emblem
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0">
        <rect width="32" height="32" rx="8" fill="#3B82F6" />
        <path
          d="M10 11H22M10 16H22M10 21H17"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div
      style={{ perspective: 600 }}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
    >
      <motion.div
        className="flex items-center justify-center shadow-xs rounded-lg overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{
          scale: 1.14,
          rotateX: 10,
          rotateY: -10,
          z: 15,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 18,
        }}
      >
        {renderFavicon()}
      </motion.div>
    </div>
  );
}
