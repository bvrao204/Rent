import React, { useState } from 'react';

// Using Lorem Picsum (100% reliable, always returns an image) seeded by product
// Combined with Unsplash direct photo IDs (handpicked) as primary source
const PRODUCT_IMAGES = {
  bed: [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=600&q=80&auto=format&fit=crop',
  ],
  sofa: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&q=80&auto=format&fit=crop',
  ],
  table: [
    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616464916356-3a777b87b0d3?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80&auto=format&fit=crop',
  ],
  fridge: [
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop',
  ],
  'washing-machine': [
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80&auto=format&fit=crop',
  ],
  tv: [
    'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536240478700-b869ad10d2d5?w=600&q=80&auto=format&fit=crop',
  ],
};

// Picsum fallback seeds (one per product image variant) — always loads
const PICSUM_SEEDS = {
  bed: [10, 26, 42],
  sofa: [15, 31, 47],
  table: [20, 36, 52],
  fridge: [25, 41, 57],
  'washing-machine': [30, 46, 62],
  tv: [35, 51, 67],
};

const CATEGORY_GRADIENTS = {
  bed:               'linear-gradient(135deg, #c7d2fe 0%, #6366f1 100%)',
  sofa:              'linear-gradient(135deg, #a5f3fc 0%, #0891b2 100%)',
  table:             'linear-gradient(135deg, #fde68a 0%, #d97706 100%)',
  fridge:            'linear-gradient(135deg, #bfdbfe 0%, #2563eb 100%)',
  'washing-machine': 'linear-gradient(135deg, #bbf7d0 0%, #16a34a 100%)',
  tv:                'linear-gradient(135deg, #fecaca 0%, #dc2626 100%)',
};

const CATEGORY_EMOJI = {
  bed: '🛏️', sofa: '🛋️', table: '🪑',
  fridge: '🧊', 'washing-machine': '🫧', tv: '📺',
};

export const ProductImage = ({ subCategory, productId, style = {}, className = '' }) => {
  const key = (subCategory || 'bed').toLowerCase();
  const images      = PRODUCT_IMAGES[key]  || PRODUCT_IMAGES['bed'];
  const picsumSeeds = PICSUM_SEEDS[key]    || PICSUM_SEEDS['bed'];
  const gradient    = CATEGORY_GRADIENTS[key] || CATEGORY_GRADIENTS['bed'];
  const emoji       = CATEGORY_EMOJI[key]  || '📦';

  // Deterministic index from productId
  const idx = productId
    ? productId.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % images.length
    : 0;

  const primaryUrl  = images[idx];
  const fallbackUrl = `https://picsum.photos/seed/${picsumSeeds[idx]}/600/400`;

  const [src, setSrc]         = useState(primaryUrl);
  const [loaded, setLoaded]   = useState(false);
  const [failed, setFailed]   = useState(false);

  const handleError = () => {
    if (src === primaryUrl) {
      // Try picsum fallback
      setSrc(fallbackUrl);
    } else {
      // Both failed — show emoji card
      setFailed(true);
    }
  };

  return (
    <div
      className={`product-img-container ${className}`}
      style={{ position: 'relative', overflow: 'hidden', background: gradient, ...style }}
    >
      {/* Shimmer loader */}
      {!loaded && !failed && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: gradient,
        }}>
          <div style={{
            width: 36, height: 36,
            border: '3px solid rgba(255,255,255,0.35)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'reSpin 0.9s linear infinite',
          }} />
          <style dangerouslySetInnerHTML={{ __html: `@keyframes reSpin { to { transform: rotate(360deg); } }` }} />
        </div>
      )}

      {/* Image (primary → picsum fallback) */}
      {!failed && (
        <img
          src={src}
          alt={key}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            display: 'block',
          }}
        />
      )}

      {/* Emoji fallback if both image sources fail */}
      {failed && (
        <div style={{
          width: '100%', height: '100%', background: gradient,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{ fontSize: '3rem' }}>{emoji}</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, textTransform: 'capitalize' }}>
            {key.replace('-', ' ')}
          </span>
        </div>
      )}

      {/* Bottom gloss overlay */}
      {loaded && !failed && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.1))',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
};

export default ProductImage;
