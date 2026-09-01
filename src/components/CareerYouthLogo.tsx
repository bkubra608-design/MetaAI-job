import React from 'react';

interface CareerYouthLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  lightBackground?: boolean;
}

const sizeMap = {
  xs: { box: 22, text: 'text-sm' },
  sm: { box: 30, text: 'text-base' },
  md: { box: 38, text: 'text-lg' },
  lg: { box: 48, text: 'text-xl' },
  xl: { box: 64, text: 'text-2xl' },
};

/**
 * CareerYouth Emblem Logo
 * Features the signature split inverted triangle (Deep Navy & Steel Gray)
 * with the white geometric necktie collar & tie silhouette in the center.
 */
export const CareerYouthEmblem: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-xs transition-transform hover:scale-105 duration-200 ${className}`}
      aria-label="CareerYouth Logo"
    >
      <defs>
        {/* Soft shadow for depth */}
        <filter id="cy-shadow" x="-10%" y="-10%" width="120%" height="125%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.18" floodColor="#0A1E3F" />
        </filter>
        <clipPath id="triangle-clip">
          <polygon points="15,25 185,25 100,180" />
        </clipPath>
      </defs>

      <g filter="url(#cy-shadow)">
        {/* Inverted Triangle Base */}
        <g clipPath="url(#triangle-clip)">
          {/* Left Half: Deep Navy Blue */}
          <polygon points="15,25 100,25 100,180" fill="#0A2342" />

          {/* Right Half: Refined Steel Slate Gray */}
          <polygon points="100,25 185,25 100,180" fill="#6B7280" />

          {/* Top highlight bar */}
          <line x1="15" y1="25" x2="185" y2="25" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
        </g>

        {/* Center Necktie Geometric Silhouette with Crisp White Outline */}
        {/* Knot (top collar knot) */}
        {/* Knot shape: Top width ~20 (x=90 to 110), Widens to ~32 (x=84 to 116) at y=48, Narrows to ~18 (x=91 to 109) at y=64 */}
        <path
          d="M 92 25 L 84 48 L 91 64 L 100 66 L 109 64 L 116 48 L 108 25 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="miter"
          strokeLinecap="round"
        />

        {/* Tie Body (From knot base at y=64 down to triangle tip at y=176) */}
        {/* Widens gently as it travels downwards */}
        <path
          d="M 91 64 L 81 144 L 100 178 L 119 144 L 109 64"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="miter"
          strokeLinecap="round"
        />

        {/* Vertical divider centerline inside tie with subtle seam */}
        <line x1="100" y1="25" x2="100" y2="178" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.75" />
      </g>
    </svg>
  );
};

export const CareerYouthLogo: React.FC<CareerYouthLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-slate-900',
}) => {
  const config = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <CareerYouthEmblem size={config.box} />
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight ${config.text} ${textColor}`}>
              Career<span className="text-indigo-600">Youth</span>
            </span>
          </div>
          <span className="text-[10px] font-medium text-slate-500 tracking-tight leading-none mt-1 hidden sm:block">
            Find the Job That Matches You
          </span>
        </div>
      )}
    </div>
  );
};

export default CareerYouthLogo;
