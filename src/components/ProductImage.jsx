import React from 'react';

export const ProductImage = ({ subCategory, className = '' }) => {
  // We use CSS variables so these gradients automatically adjust in dark mode or match our primary themes
  const subCategoryNormalized = subCategory?.toLowerCase() || '';

  const renderSVG = () => {
    switch (subCategoryNormalized) {
      case 'bed':
        return (
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bedWood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#854d0e" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="bedSheet" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#c7d2fe" />
              </linearGradient>
              <linearGradient id="bedBlanket" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>
            </defs>
            {/* Headboard */}
            <rect x="20" y="30" width="160" height="60" rx="6" fill="url(#bedWood)" />
            <rect x="30" y="40" width="140" height="40" rx="3" fill="#1e293b" opacity="0.15" />
            
            {/* Bed frame structure */}
            <rect x="25" y="80" width="150" height="45" rx="4" fill="url(#bedWood)" />
            
            {/* Pillows */}
            <rect x="40" y="60" width="50" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="110" y="60" width="50" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="45" y="63" width="40" height="14" rx="2" fill="#f8fafc" />
            <rect x="115" y="63" width="40" height="14" rx="2" fill="#f8fafc" />
            
            {/* Mattress/Sheets */}
            <rect x="30" y="75" width="140" height="20" rx="3" fill="url(#bedSheet)" />
            
            {/* Blanket */}
            <path d="M 30 85 L 170 85 L 170 120 A 4 4 0 0 1 166 124 L 34 124 A 4 4 0 0 1 30 120 Z" fill="url(#bedBlanket)" />
            <path d="M 30 85 L 170 85 L 170 95 L 30 95 Z" fill="#4f46e5" />
            
            {/* Bed Legs */}
            <rect x="30" y="125" width="12" height="12" rx="2" fill="#451a03" />
            <rect x="158" y="125" width="12" height="12" rx="2" fill="#451a03" />
          </svg>
        );
      case 'sofa':
        return (
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sofaBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="sofaCushion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a5b4fc" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            {/* Backrest */}
            <rect x="25" y="45" width="150" height="50" rx="10" fill="url(#sofaBody)" />
            
            {/* Back cushions (separated visually) */}
            <rect x="32" y="50" width="44" height="40" rx="6" fill="url(#sofaCushion)" opacity="0.9" />
            <rect x="78" y="50" width="44" height="40" rx="6" fill="url(#sofaCushion)" opacity="0.9" />
            <rect x="124" y="50" width="44" height="40" rx="6" fill="url(#sofaCushion)" opacity="0.9" />
            
            {/* Left Armrest */}
            <rect x="15" y="65" width="18" height="45" rx="8" fill="url(#sofaBody)" />
            {/* Right Armrest */}
            <rect x="167" y="65" width="18" height="45" rx="8" fill="url(#sofaBody)" />
            
            {/* Seat Base */}
            <rect x="25" y="90" width="150" height="22" rx="6" fill="url(#sofaBody)" />
            
            {/* Seat Cushions */}
            <rect x="30" y="87" width="68" height="10" rx="3" fill="#c7d2fe" opacity="0.8" />
            <rect x="102" y="87" width="68" height="10" rx="3" fill="#c7d2fe" opacity="0.8" />
            
            {/* Legs */}
            <rect x="35" y="112" width="10" height="15" rx="2" fill="#78350f" transform="rotate(-10 35 112)" />
            <rect x="155" y="112" width="10" height="15" rx="2" fill="#78350f" transform="rotate(10 155 112)" />
            
            {/* Shadow under sofa */}
            <ellipse cx="100" cy="126" rx="75" ry="6" fill="#000000" opacity="0.15" />
          </svg>
        );
      case 'table':
        return (
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tableWood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <linearGradient id="chairColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>
            {/* Chairs background */}
            <rect x="35" y="45" width="30" height="40" rx="3" fill="url(#chairColor)" opacity="0.75" />
            <rect x="35" y="80" width="30" height="5" fill="#000000" opacity="0.2" />
            
            <rect x="135" y="45" width="30" height="40" rx="3" fill="url(#chairColor)" opacity="0.75" />
            <rect x="135" y="80" width="30" height="5" fill="#000000" opacity="0.2" />
            
            {/* Table Top */}
            <rect x="20" y="75" width="160" height="12" rx="4" fill="url(#tableWood)" />
            <rect x="22" y="77" width="156" height="3" rx="1.5" fill="#f59e0b" opacity="0.2" />
            
            {/* Table Legs */}
            <rect x="35" y="87" width="10" height="42" fill="url(#tableWood)" />
            <rect x="155" y="87" width="10" height="42" fill="url(#tableWood)" />
            
            {/* Table inner shadow / support beam */}
            <rect x="35" y="87" width="130" height="6" fill="#451a03" />
            
            {/* Vase/Bowl on table */}
            <path d="M 90 75 Q 90 60 100 60 Q 110 60 110 75 Z" fill="#2dd4bf" opacity="0.9" />
            <ellipse cx="100" cy="58" rx="8" ry="4" fill="#fbbf24" />
            
            {/* Floor shadow */}
            <ellipse cx="100" cy="130" rx="70" ry="5" fill="#000000" opacity="0.1" />
          </svg>
        );
      case 'fridge':
        return (
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="fridgeMetallic" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="screenGlass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Body */}
            <rect x="55" y="15" width="90" height="120" rx="8" fill="url(#fridgeMetallic)" />
            
            {/* Upper Door (Freezer) */}
            <rect x="57" y="17" width="86" height="40" rx="4" fill="#64748b" opacity="0.15" />
            <rect x="57" y="17" width="86" height="38" rx="4" fill="url(#fridgeMetallic)" />
            
            {/* Smart Screen */}
            <rect x="75" y="24" width="22" height="15" rx="2" fill="url(#screenGlass)" />
            <rect x="78" y="27" width="10" height="1" fill="#38bdf8" />
            <rect x="78" y="30" width="16" height="2" fill="#2dd4bf" />
            <circle cx="91" cy="27" r="1.5" fill="#fbbf24" />
            
            {/* Lower Door */}
            <rect x="57" y="58" width="86" height="74" rx="4" fill="url(#fridgeMetallic)" />
            
            {/* Separation line */}
            <line x1="55" y1="56" x2="145" y2="56" stroke="#1e293b" strokeWidth="2" />
            
            {/* Handles */}
            <rect x="130" y="28" width="5" height="20" rx="2.5" fill="#f1f5f9" stroke="#475569" strokeWidth="1" />
            <rect x="130" y="66" width="5" height="35" rx="2.5" fill="#f1f5f9" stroke="#475569" strokeWidth="1" />
            
            {/* Brand Logo hint */}
            <circle cx="100" cy="115" r="3" fill="#cbd5e1" opacity="0.5" />
            
            {/* Base feet */}
            <rect x="68" y="135" width="12" height="5" rx="1" fill="#1e293b" />
            <rect x="120" y="135" width="12" height="5" rx="1" fill="#1e293b" />
            
            {/* Reflection shine */}
            <path d="M 60 17 L 90 17 L 60 133 Z" fill="#ffffff" opacity="0.1" />
          </svg>
        );
      case 'washing-machine':
        return (
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="washerMetallic" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="washerGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            {/* Outer Case */}
            <rect x="55" y="20" width="90" height="110" rx="8" fill="url(#washerMetallic)" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Top Control Panel */}
            <rect x="55" y="20" width="90" height="25" rx="6" fill="#e2e8f0" />
            
            {/* Knob */}
            <circle cx="75" cy="32" r="6" fill="#64748b" />
            <circle cx="75" cy="32" r="2" fill="#cbd5e1" />
            
            {/* Status Screen */}
            <rect x="95" y="26" width="36" height="12" rx="2" fill="#0f172a" />
            <text x="100" y="35" fill="#2dd4bf" fontSize="8" fontFamily="monospace" fontWeight="bold">0:29</text>
            
            {/* Detergent drawer line */}
            <line x1="55" y1="45" x2="145" y2="45" stroke="#94a3b8" strokeWidth="1" />
            
            {/* Washer Door (Circle) */}
            <circle cx="100" cy="85" r="32" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="100" cy="85" r="25" fill="url(#washerGlass)" stroke="#0369a1" strokeWidth="1.5" />
            
            {/* Water reflections inside door */}
            <path d="M 82 85 C 90 95 110 95 118 85 C 110 75 90 75 82 85 Z" fill="#ffffff" opacity="0.35" />
            
            {/* Highlight reflections */}
            <path d="M 85 70 A 20 20 0 0 1 115 70" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
            
            {/* Detergent drawer drawer */}
            <rect x="58" y="25" width="8" height="10" rx="1" fill="#cbd5e1" opacity="0.6" />
          </svg>
        );
      case 'tv':
        return (
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tvScreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="50%" stopColor="#312e81" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="tvLandscape" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
            </defs>
            {/* Outer Frame (Bezel) */}
            <rect x="15" y="20" width="170" height="98" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            
            {/* Active Screen */}
            <rect x="18" y="23" width="164" height="92" rx="3" fill="url(#tvScreen)" />
            
            {/* Landscape graphic showing vibrant color screen content */}
            {/* Sun */}
            <circle cx="100" cy="65" r="18" fill="url(#tvLandscape)" />
            {/* Mountains */}
            <path d="M 18 115 L 75 70 L 115 100 L 155 55 L 182 115 Z" fill="#090d16" opacity="0.8" />
            <path d="M 50 115 L 100 80 L 140 115 Z" fill="#1e293b" opacity="0.5" />
            
            {/* Stand Column */}
            <rect x="92" y="118" width="16" height="15" fill="#334155" />
            <polygon points="90,118 110,118 105,133 95,133" fill="#1e293b" />
            
            {/* Stand Base */}
            <ellipse cx="100" cy="133" rx="30" ry="5" fill="#334155" />
            <ellipse cx="100" cy="133" rx="25" ry="3" fill="#0f172a" />
            
            {/* Power LED Indicator */}
            <circle cx="100" cy="116" r="1.5" fill="#2dd4bf" />
          </svg>
        );
      default:
        // Fallback appliance/furniture abstract box
        return (
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="30" width="120" height="90" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 60 50 H 140 M 60 75 H 140 M 60 100 H 100" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="130" cy="100" r="10" fill="#6366f1" opacity="0.2" />
            <circle cx="130" cy="100" r="4" fill="#6366f1" />
          </svg>
        );
    }
  };

  return (
    <div className={`product-img-container ${className}`}>
      {renderSVG()}
    </div>
  );
};

export default ProductImage;
