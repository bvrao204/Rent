import React, { useState, useEffect } from 'react';

/**
 * URL Fallback Chain per subcategory:
 * 1. LoremFlickr — keyword-based Flickr photos (semantically correct appliance/furniture images)
 * 2. Specific Unsplash photo IDs (handpicked, high quality)
 * 3. Picsum with seed (guaranteed to load, pleasant generic photo)
 * 4. Emoji gradient card (works offline, no network needed)
 */
const IMAGE_CHAINS = {
  bed: [
    'https://loremflickr.com/600/400/bedroom,bed?lock=12',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/bed42/600/400',
  ],
  sofa: [
    'https://loremflickr.com/600/400/sofa,couch,living-room?lock=7',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/sofa42/600/400',
  ],
  table: [
    'https://loremflickr.com/600/400/dining,table,furniture?lock=5',
    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/table42/600/400',
  ],
  fridge: [
    'https://loremflickr.com/600/400/refrigerator,fridge,appliance?lock=3',
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/fridge42/600/400',
  ],
  'washing-machine': [
    'https://loremflickr.com/600/400/washing,machine,laundry?lock=9',
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/washer42/600/400',
  ],
  tv: [
    'https://loremflickr.com/600/400/television,smart-tv,screen?lock=15',
    'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/tv42/600/400',
  ],
  microwave: [
    'https://loremflickr.com/600/400/microwave,oven,kitchen?lock=21',
    'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556909172-89cf861786e8?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/microwave42/600/400',
  ],
  ac: [
    'https://loremflickr.com/600/400/air,conditioner,cooling?lock=18',
    'https://images.unsplash.com/photo-1631545806609-35a8cbec1a9a?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557170083-8b5e39eca3bb?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/ac42/600/400',
  ],
  'water-purifier': [
    'https://loremflickr.com/600/400/water,purifier,filter?lock=24',
    'https://images.unsplash.com/photo-1544070078-a212eda27b49?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563789031959-4c0a7e72ee7d?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/purifier42/600/400',
  ],
  geyser: [
    'https://loremflickr.com/600/400/water,heater,geyser,bathroom?lock=27',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop',
    'https://picsum.photos/seed/geyser42/600/400',
  ],
};

const CATEGORY_GRADIENTS = {
  bed:              'linear-gradient(135deg,#c7d2fe 0%,#6366f1 100%)',
  sofa:             'linear-gradient(135deg,#a5f3fc 0%,#0891b2 100%)',
  table:            'linear-gradient(135deg,#fde68a 0%,#d97706 100%)',
  fridge:           'linear-gradient(135deg,#bfdbfe 0%,#2563eb 100%)',
  'washing-machine':'linear-gradient(135deg,#bbf7d0 0%,#16a34a 100%)',
  tv:               'linear-gradient(135deg,#fecaca 0%,#dc2626 100%)',
  microwave:        'linear-gradient(135deg,#fed7aa 0%,#ea580c 100%)',
  ac:               'linear-gradient(135deg,#cffafe 0%,#06b6d4 100%)',
  'water-purifier': 'linear-gradient(135deg,#d1fae5 0%,#059669 100%)',
  geyser:           'linear-gradient(135deg,#ffe4e6 0%,#e11d48 100%)',
};

const CATEGORY_EMOJI = {
  bed: '🛏️', sofa: '🛋️', table: '🪑',
  fridge: '🧊', 'washing-machine': '🫧', tv: '📺',
  microwave: '📡', ac: '❄️', 'water-purifier': '💧', geyser: '🚿',
};

const DIRECT_PRODUCT_IMAGES = {
  'prod-1': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80', // Bed
  'prod-2': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80', // Sofa
  'prod-3': 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&auto=format&fit=crop&q=80', // Table
  'prod-4': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&auto=format&fit=crop&q=80', // Fridge
  'prod-5': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80', // Washing Machine
  'prod-6': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80', // TV
  'prod-7': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&auto=format&fit=crop&q=80', // Samsung Microwave
  'prod-8': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80', // Voltas AC
  'prod-9': 'https://images.unsplash.com/photo-1563789031959-4c0a7e72ee7d?w=800&auto=format&fit=crop&q=80', // Kent Purifier
  'prod-10': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop&q=80', // Havells Geyser
  'prod-11': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80', // IFB Microwave
  'prod-12': 'https://images.unsplash.com/photo-1631545806609-35a8cbec1a9a?w=800&auto=format&fit=crop&q=80', // LG AC
  'prod-13': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&auto=format&fit=crop&q=80', // Aquaguard Purifier
  'prod-14': 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&auto=format&fit=crop&q=80', // Bajaj Geyser
};

export const ProductImage = ({ subCategory, productId, style = {}, className = '' }) => {
  const key       = (subCategory || 'bed').toLowerCase();
  const directUrl = DIRECT_PRODUCT_IMAGES[productId];
  
  const rawChain  = IMAGE_CHAINS[key] || IMAGE_CHAINS['bed'];
  const chain     = directUrl ? [directUrl, ...rawChain] : rawChain;
  
  const gradient  = CATEGORY_GRADIENTS[key] || CATEGORY_GRADIENTS['bed'];
  const emoji     = CATEGORY_EMOJI[key] || '📦';

  // If there's a direct URL, always start at index 0 (which is the directUrl).
  // Otherwise, use a deterministic index to shuffle general category images.
  const startIdx  = directUrl ? 0 : (productId
    ? productId.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % 3
    : 0);

  const [urlIndex, setUrlIndex] = useState(startIdx);
  const [loaded,   setLoaded]   = useState(false);
  const [failed,   setFailed]   = useState(false);

  // Reset when subCategory or productId changes
  useEffect(() => {
    setUrlIndex(startIdx);
    setLoaded(false);
    setFailed(false);
  }, [subCategory, productId, startIdx]);

  const handleError = () => {
    const next = urlIndex + 1;
    if (next < chain.length) {
      setUrlIndex(next);   // try next URL
      setLoaded(false);
    } else {
      setFailed(true);     // all URLs exhausted → emoji fallback
    }
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
      {!failed && (
        <img
          key={chain[urlIndex]}   // force remount when URL changes
          src={chain[urlIndex]}
          alt={key}
          crossOrigin="anonymous"
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
    </div>
  );
};

export default ProductImage;
