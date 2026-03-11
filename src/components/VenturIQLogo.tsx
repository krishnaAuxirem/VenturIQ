import React from "react";
import { Link } from "react-router-dom";

interface VenturIQLogoProps {
  width?: number;
  height?: number;
  className?: string;
  asLink?: boolean;
}

export const VenturIQLogoSVG: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 200,
  height = 60,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 120"
    width={width}
    height={height}
    className={className}
  >
    <defs>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#F97316", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#EF4444", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#00C2FF", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#8B5CF6", stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="softglow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <line x1="18" y1="22" x2="50" y2="88" stroke="url(#orangeGrad)" strokeWidth="7" strokeLinecap="round" filter="url(#glow)" />
    <line x1="82" y1="22" x2="50" y2="88" stroke="url(#cyanGrad)" strokeWidth="7" strokeLinecap="round" filter="url(#glow)" />
    <line x1="50" y1="88" x2="50" y2="38" stroke="url(#orangeGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 3" opacity="0.7" />
    <polygon points="50,22 44,36 56,36" fill="#F97316" filter="url(#glow)" />
    <circle cx="30" cy="50" r="4" fill="transparent" stroke="#F97316" strokeWidth="2" />
    <circle cx="70" cy="50" r="4" fill="transparent" stroke="#00C2FF" strokeWidth="2" />
    <circle cx="18" cy="22" r="5" fill="#F97316" filter="url(#softglow)" />
    <circle cx="82" cy="22" r="5" fill="#8B5CF6" filter="url(#softglow)" />
    <circle cx="50" cy="88" r="5.5" fill="url(#orangeGrad)" filter="url(#softglow)" />
    <line x1="34" y1="50" x2="66" y2="50" stroke="#374151" strokeWidth="1.5" strokeDasharray="3 2" />
    <text x="108" y="68" fontFamily="DM Sans, sans-serif" fontSize="38" fontWeight="800" fill="#FFFFFF" letterSpacing="-1">Ventur</text>
    <text x="268" y="68" fontFamily="DM Sans, sans-serif" fontSize="38" fontWeight="800" fill="url(#orangeGrad)" letterSpacing="-1" filter="url(#glow)">IQ</text>
    <text x="109" y="90" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="400" fill="#9CA3AF" letterSpacing="3">AI STARTUP INTELLIGENCE</text>
    <circle cx="305" cy="86" r="2.5" fill="#F97316" opacity="0.8" />
  </svg>
);

const VenturIQLogo: React.FC<VenturIQLogoProps> = ({
  width = 200,
  height = 60,
  className = "",
  asLink = true,
}) => {
  if (asLink) {
    return (
      <Link to="/" className={`inline-flex items-center ${className}`}>
        <VenturIQLogoSVG width={width} height={height} />
      </Link>
    );
  }
  return <VenturIQLogoSVG width={width} height={height} className={className} />;
};

export default VenturIQLogo;
