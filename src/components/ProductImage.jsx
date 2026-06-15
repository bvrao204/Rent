import React, { useState } from 'react';

// Real product images sourced from Unsplash (free, public CDN)
const PRODUCT_IMAGES = {
  bed: [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80&auto=format&fit=crop',
  ],
  sofa: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&q=80&auto=format&fit=crop',
  ],
  table: [
    'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616464916356-3a777b87b0d3?w=600&q=80&auto=format&fit=crop',
  ],
  fridge: [
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
  ],
  'washing-machine': [
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80&auto=format&fit=crop',
  ],
  tv: [
    'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?w=600&q=80&auto=format&fit=crop',
  ],
};

// Fallback gradient colors per category for loading states
const CATEGORY_GRADIENTS = {
  bed: 'linear-gradient(135deg, #c7d2fe 0%, #818cf8 100%)',
  sofa: 'linear-gradient(135deg, #a5f3fc 0%, #06b6d4 100%)',
  table: 'linear-gradient(135deg, #fde68a 0%, #d97706 100%)',
  fridge: 'linear-gradient(135deg, #bfdbfe 0%, #3b82f6 100%)',
  'washing-machine': 'linear-gradient(135deg, #bbf7d0 0%, #16a34a 100%)',
  tv: 'linear-gradient(135deg, #fecaca 0%, #dc2626 100%)',
};

export const ProductImage = ({ subCategory, productId, style = {}, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const key = subCategory?.toLowerCase() || 'bed';
  const images = PRODUCT_IMAGES[key] || PRODUCT_IMAGES['bed'];

  // Use productId hash (or 0) to deterministically pick an image per product
  const idSum = productId
    ? productId.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0)
    : 0;
  const imageUrl = images[idSum % images.length];
  const gradient = CATEGORY_GRADIENTS[key] || CATEGORY_GRADIENTS['bed'];

  return (
    <div
      className={`product-img-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: gradient,
        ...style,
      }}
    >
      {/* Shimmer skeleton while loading */}
      {!imgLoaded && !imgError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `${gradient}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.4)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style dangerouslySetInnerHTML={{__html:`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}} />
        </div>
      )}

      {/* Real product image */}
      {!imgError ? (
        <img
          src={imageUrl}
          alt={subCategory}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            display: 'block',
          }}
        />
      ) : (
        // Fallback gradient + icon if image fails
        <div style={{
          width: '100%',
          height: '100%',
          background: gradient,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '3rem' }}>
            {key === 'bed' ? '🛏️'
              : key === 'sofa' ? '🛋️'
              : key === 'table' ? '🪑'
              : key === 'fridge' ? '🧊'
              : key === 'washing-machine' ? '🫧'
              : '📺'}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', textTransform: 'capitalize' }}>
            {key.replace('-', ' ')}
          </span>
        </div>
      )}

      {/* Subtle overlay gradient at bottom for text readability */}
      {imgLoaded && !imgError && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.08))',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
};

export default ProductImage;
