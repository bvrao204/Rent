import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ProductImage } from '../components/ProductImage';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Calendar, 
  ShieldCheck, 
  Star, 
  CheckCircle,
  Truck
} from 'lucide-react';

export const ProductDetailView = ({ navigate, productId }) => {
  const { products, addToCart } = useData();
  const [selectedTenure, setSelectedTenure] = useState(12); // Default 12 months (best price)
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container text-center animate-fade" style={{ padding: '80px 0' }}>
        <h2>Product Not Found</h2>
        <p className="text-muted">The product you are looking for does not exist or has been removed.</p>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('catalog')}>
          Return to Catalog
        </button>
      </div>
    );
  }

  // Calculate dynamic rent based on selected tenure
  // 12 months = baseRent
  // 6 months = baseRent * 1.2
  // 3 months = baseRent * 1.4
  let rentMultiplier = 1.0;
  if (selectedTenure === 6) rentMultiplier = 1.2;
  else if (selectedTenure === 3) rentMultiplier = 1.4;

  const currentMonthlyRent = Math.round(product.baseRent * rentMultiplier);

  const handleAddToCart = () => {
    addToCart(product, selectedTenure);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedTenure);
    navigate('cart');
  };

  return (
    <div className="container animate-fade" style={{ paddingBottom: '80px' }}>
      {/* Back button breadcrumb */}
      <div style={{ margin: '20px 0' }}>
        <button 
          className="btn-btn" 
          onClick={() => navigate('catalog')}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-secondary)',
            fontWeight: '600',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <ArrowLeft size={16} />
          Back to Rental Catalog
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .detail-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-top: 20px;
        }
        @media (min-width: 850px) {
          .detail-layout {
            grid-template-columns: 1.2fr 1fr;
          }
        }
        .tenure-option-box {
          border: 2px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: var(--transition-fast);
        }
        .tenure-option-box.selected {
          border-color: var(--primary);
          background: var(--primary-light);
        }
        .spec-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          margin-bottom: 8px;
        }
      `}} />

      <div className="detail-layout">
        {/* Left Column: Product Vector Image & Spec List */}
        <div>
          <div className="glass-card" style={{ padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ProductImage subCategory={product.subCategory} productId={product.id} stock={product.stock} style={{ width: '85%', height: 'auto' }} />
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              Product Features & Specs
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              {product.features.map((feat, idx) => (
                <div key={idx} className="spec-item text-muted">
                  <CheckCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing options & Tenure settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span className="badge badge-accent" style={{ marginBottom: '8px' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '2.2rem', fontFamily: 'Outfit', lineHeight: '1.2', marginBottom: '12px' }}>
              {product.name}
            </h1>
            
            <div className="star-rating" style={{ marginBottom: '16px' }}>
              <Star size={18} fill="currentColor" />
              <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                {product.rating.toFixed(1)}
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>(out of {product.reviewsCount} verified reviews)</span>
            </div>

            <p className="text-muted" style={{ fontSize: '0.98rem', lineHeight: '1.6' }}>
              {product.description}
            </p>
          </div>

          {/* Tenure options Selection */}
          <div className="glass-card" style={{ padding: '24px', cursor: 'default' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)' }} />
              1. Choose Rental Tenure
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* 12 Months */}
              <div 
                className={`tenure-option-box ${selectedTenure === 12 ? 'selected' : ''}`}
                onClick={() => setSelectedTenure(12)}
              >
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>12+ Months</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Best Price Plan</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                    ₹{product.baseRent}<span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>/mo</span>
                  </h3>
                </div>
              </div>

              {/* 6 Months */}
              <div 
                className={`tenure-option-box ${selectedTenure === 6 ? 'selected' : ''}`}
                onClick={() => setSelectedTenure(6)}
              >
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>6 Months</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Moderate Flex Plan (+20%)</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    ₹{Math.round(product.baseRent * 1.2)}<span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>/mo</span>
                  </h3>
                </div>
              </div>

              {/* 3 Months */}
              <div 
                className={`tenure-option-box ${selectedTenure === 3 ? 'selected' : ''}`}
                onClick={() => setSelectedTenure(3)}
              >
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>3 Months</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Short Flex Plan (+40%)</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    ₹{Math.round(product.baseRent * 1.4)}<span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>/mo</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Summary Box */}
          <div className="glass-card" style={{ padding: '24px', backgroundColor: 'var(--bg-tertiary)', cursor: 'default' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="flex-between">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Monthly Rental Cost:</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                  ₹{currentMonthlyRent}/mo
                </span>
              </div>
              <div className="flex-between">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Refundable Security Deposit:</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  ₹{product.securityDeposit}
                </span>
              </div>
              <div className="flex-between" style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '4px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Due Today (Deposit + 1st Month):</span>
                <span style={{ fontSize: '1.30rem', fontWeight: '800', color: 'var(--accent)' }}>
                  ₹{currentMonthlyRent + product.securityDeposit}
                </span>
              </div>
            </div>
            
            {/* Value Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Truck size={14} style={{ color: 'var(--primary)' }} />
                <span>Free delivery, assembly, and return pickup.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={14} style={{ color: 'var(--primary)' }} />
                <span>Free maintenance and parts replacement during tenure.</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handleAddToCart}
                style={{ flex: 1, padding: '12px' }}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={18} />
                {isAdded ? 'Added!' : 'Add to Cart'}
              </button>
              
              <button 
                className="btn btn-primary" 
                onClick={handleBuyNow}
                style={{ flex: 1.2, padding: '12px' }}
                disabled={product.stock === 0}
              >
                Rent Now
              </button>
            </div>
            {product.stock === 0 && (
              <p style={{ color: 'var(--danger)', fontSize: '0.8rem', textAlign: 'center', marginTop: '8px', fontWeight: '500' }}>
                This product is currently out of stock. Contact support to request availability notifications.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section style={{ marginTop: '60px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
          Customer Reviews & Experiences
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '20px', cursor: 'default' }}>
            <div className="flex-between" style={{ marginBottom: '8px' }}>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>Perfect condition, very professional</h5>
              <div className="star-rating" style={{ fontSize: '0.8rem' }}>
                <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" />
              </div>
            </div>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
              "The item arrived looking brand new. The logistics guys set it up exactly where I wanted and cleaned up after themselves. Definitely using RentEase for my next apartment relocate."
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: '500' }}>Reviewed by Brandon S. • 1 month ago</span>
          </div>

          <div className="glass-card" style={{ padding: '20px', cursor: 'default' }}>
            <div className="flex-between" style={{ marginBottom: '8px' }}>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>Stress free renting</h5>
              <div className="star-rating" style={{ fontSize: '0.8rem' }}>
                <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="none" stroke="currentColor" />
              </div>
            </div>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
              "Good prices and clean service. The wobbly adjustment leg on my model was resolved within 24 hours of filing a ticket on the dashboard."
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: '500' }}>Reviewed by Clara O. • 3 months ago</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailView;
