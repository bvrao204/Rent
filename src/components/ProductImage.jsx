import { useState, useEffect } from 'react';

/**
 * URL Fallback Chain per subcategory:
 * 1. LoremFlickr — keyword-based Flickr photos (semantically correct appliance/furniture images)
 * 2. Specific Unsplash photo IDs (handpicked, high quality)
 * 3. Picsum with seed (guaranteed to load, pleasant generic photo)
 * 4. Emoji gradient card (works offline, no network needed)
 */
const IMAGE_CHAINS = {
  bed: ['/images/bed.png', '/images/bed2.png', '/images/bed3.png'],
  sofa: ['/images/sofa.png', '/images/sofa2.png', '/images/sofa3.png'],
  table: ['/images/table.png', '/images/table2.png', '/images/table3.png'],
  fridge: ['/images/fridge.png', '/images/fridge2.png', '/images/fridge3.png'],
  'washing-machine': ['/images/washing-machine.png', '/images/washing-machine2.png', '/images/washing-machine3.png'],
  tv: ['/images/tv.png', '/images/tv2.png', '/images/tv3.png'],
  microwave: ['/images/microwave.png', '/images/microwave2.png', '/images/microwave3.png'],
  ac: ['/images/ac.png', '/images/ac2.png'],
  'water-purifier': ['/images/water-purifier.png', '/images/water-purifier2.png'],
  geyser: ['/images/geyser.png', '/images/geyser2.png'],
};

const CATEGORY_GRADIENTS = {
  bed: 'linear-gradient(135deg,#c7d2fe 0%,#6366f1 100%)',
  sofa: 'linear-gradient(135deg,#a5f3fc 0%,#0891b2 100%)',
  table: 'linear-gradient(135deg,#fde68a 0%,#d97706 100%)',
  fridge: 'linear-gradient(135deg,#bfdbfe 0%,#2563eb 100%)',
  'washing-machine': 'linear-gradient(135deg,#bbf7d0 0%,#16a34a 100%)',
  tv: 'linear-gradient(135deg,#fecaca 0%,#dc2626 100%)',
  microwave: 'linear-gradient(135deg,#fed7aa 0%,#ea580c 100%)',
  ac: 'linear-gradient(135deg,#cffafe 0%,#06b6d4 100%)',
  'water-purifier': 'linear-gradient(135deg,#d1fae5 0%,#059669 100%)',
  geyser: 'linear-gradient(135deg,#ffe4e6 0%,#e11d48 100%)',
};

const CATEGORY_EMOJI = {
  bed: '🛏️', sofa: '🛋️', table: '🪑',
  fridge: '🧊', 'washing-machine': '🫧', tv: '📺',
  microwave: '📡', ac: '❄️', 'water-purifier': '💧', geyser: '🚿',
};

const DIRECT_PRODUCT_IMAGES = {
  'prod-1': ['/images/bed.png'],
  'prod-25': ['/images/bed2.png'],
  'prod-26': ['/images/bed3.png'],
  'prod-2': ['/images/sofa.png'],
  'prod-27': ['/images/sofa2.png'],
  'prod-28': ['/images/sofa3.png'],
  'prod-3': ['/images/table.png'],
  'prod-29': ['/images/table2.png'],
  'prod-30': ['/images/table3.png'],
  'prod-4': ['/images/fridge.png'],
  'prod-15': ['/images/fridge-lg.png'],
  'prod-19': ['/images/fridge3.png'],
  'prod-5': ['/images/washing-machine.png'],
  'prod-16': ['/images/washer-samsung.png'],
  'prod-21': ['/images/washing-machine2.png'],
  'prod-6': ['/images/tv.png'],
  'prod-17': ['/images/tv-oneplus.png'],
  'prod-18': ['/images/tv-sony.png'],
  'prod-7': ['/images/microwave-samsung.png'],
  'prod-11': ['/images/microwave-ifb.png'],
  'prod-22': ['/images/microwave2.png'],
  'prod-8': ['/images/ac-voltas.png'],
  'prod-12': ['/images/ac-lg.png'],
  'prod-20': ['/images/ac2.png'],
  'prod-9': ['/images/purifier-kent.png'],
  'prod-13': ['/images/purifier-aquaguard.png'],
  'prod-23': ['/images/water-purifier.png'],
  'prod-10': ['/images/geyser-havells.png'],
  'prod-14': ['/images/geyser-bajaj.png'],
  'prod-24': ['/images/geyser.png'],
};

const toPublicAssetUrl = (assetPath) => {
  if (!assetPath) return assetPath;
  if (/^https?:\/\//.test(assetPath)) return assetPath;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${assetPath.replace(/^\//, '')}`;
};

export const ProductImage = ({ subCategory, productId, stock, style = {}, className = '' }) => {
  const key = (subCategory || 'bed').toLowerCase();
  const rawChain = IMAGE_CHAINS[key] || IMAGE_CHAINS['bed'];

  const directUrls = productId
    ? (Array.isArray(DIRECT_PRODUCT_IMAGES[productId]) ? DIRECT_PRODUCT_IMAGES[productId] : [DIRECT_PRODUCT_IMAGES[productId]])
      .filter(Boolean)
      .map(url => toPublicAssetUrl(url))
    : [];

  const chain = directUrls.length ? [...directUrls, ...rawChain.map(url => toPublicAssetUrl(url))] : rawChain.map(url => toPublicAssetUrl(url));

  const gradient = CATEGORY_GRADIENTS[key] || CATEGORY_GRADIENTS['bed'];
  const emoji = CATEGORY_EMOJI[key] || '📦';

  // If there are direct product images, always start with the first one.
  // Otherwise, use a deterministic index to shuffle general category images.
  const startIdx = directUrls.length ? 0 : (productId
    ? productId.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % chain.length
    : 0);

  const [urlIndex, setUrlIndex] = useState(startIdx);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Reset when subCategory or productId changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrlIndex(startIdx);
    setLoaded(false);
    setFailed(false);
  }, [subCategory, productId, startIdx]);

  const handleError = () => {
    setFailed(true); // Lock the image and prevent cycling to other images
  };

  return (
    <div
      className={`product-img-container ${className}`}
      style={{ position: 'relative', overflow: 'hidden', background: gradient, ...style }}
    >
      {/* Shimmer spinner while loading */}
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
            animation: 'piSpin 0.8s linear infinite',
          }} />
          <style dangerouslySetInnerHTML={{ __html: `@keyframes piSpin{to{transform:rotate(360deg)}}` }} />
        </div>
      )}

      {/* Image — progresses through chain on error */}
      {!failed && (() => {
        const currentUrl = chain[urlIndex];
        const isAltComposition = productId && ['prod-20', 'prod-23', 'prod-24'].includes(productId);

        return (
          <img
            key={`${productId || 'default'}-${currentUrl}`}   // force remount when product or URL changes
            src={currentUrl}
            alt={key}
            onLoad={() => setLoaded(true)}
            onError={handleError}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
              display: 'block',
              backgroundColor: '#fff',
              transform: isAltComposition ? 'scale(1.35) scaleX(-1)' : 'none',
            }}
          />
        );
      })()}

      {/* Emoji card — only when all URLs fail */}
      {failed && (
        <div style={{
          width: '100%', height: '100%', background: gradient,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <span style={{ fontSize: '3.5rem' }}>{emoji}</span>
          <span style={{
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)',
            fontWeight: 700, textTransform: 'capitalize', letterSpacing: '0.5px',
          }}>
            {key.replace(/-/g, ' ')}
          </span>
        </div>
      )}

      {/* Subtle bottom gloss */}
      {loaded && !failed && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
          background: 'linear-gradient(transparent,rgba(0,0,0,0.12))',
          pointerEvents: 'none',
        }} />
      )}

      {/* Out of Stock Overlay */}
      {stock === 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{
            background: 'var(--danger, #dc2626)',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.85rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            padding: '6px 16px',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(220, 38, 38, 0.35)',
            transform: 'rotate(-5deg)',
            fontFamily: 'Outfit, sans-serif'
          }}>
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
