
import { useData } from '../context/DataContext';
import { ProductImage } from '../components/ProductImage';
import { 
  ArrowRight, 
  Tv, 
  Sofa, 
  ThumbsUp,
  Sparkles
} from 'lucide-react';

export const HomeView = ({ navigate }) => {
  const { products } = useData();

  // Highlight 3 popular products for home page recommendations
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} />
              Redefining Urban Living Convenience
            </span>
          </div>
          <h1 className="hero-title">
            Rent Premium Furniture & <br />
            Appliances on a Monthly Budget.
          </h1>
          <p className="hero-subtitle">
            Relocate with ease. No heavy purchases, no shipping hassles, and free maintenance. Upgrade your home style in minutes.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', padding: '0 16px' }}>
            <button className="btn btn-primary" onClick={() => navigate('catalog')} style={{ flex: '1 1 auto', maxWidth: '260px', minWidth: '180px' }}>
              Browse Rental Catalog
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => {
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} style={{ flex: '1 1 auto', maxWidth: '220px', minWidth: '160px' }}>
              Learn How It Works
            </button>
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 4vw, 40px)',
            marginTop: '40px',
            flexWrap: 'wrap',
            rowGap: '16px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary)', fontFamily: 'Outfit' }}>10k+</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Happy Renters</p>
            </div>
            <div style={{ width: '1px', background: 'var(--border)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--accent)', fontFamily: 'Outfit' }}>24 Hr</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Service Resolution</p>
            </div>
            <div style={{ width: '1px', background: 'var(--border)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary)', fontFamily: 'Outfit' }}>₹0</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Relocation Fee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Select by Category</h2>
          <p className="text-muted">Choose from our curated furniture lists or premium home appliance sets.</p>
        </div>

        <div className="category-grid">
          {/* Furniture Category */}
          <div 
            className="glass-card category-card" 
            onClick={() => navigate('catalog', { category: 'furniture' })}
          >
            <div className="category-icon">
              <Sofa size={30} />
            </div>
            <h3 className="category-title">Designer Furniture</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '6px' }}>
              Beds, premium fabric sofas, dining tables, study desks, and chest of drawers.
            </p>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              color: 'var(--primary)', 
              fontSize: '0.9rem', 
              fontWeight: '600',
              marginTop: '12px'
            }}>
              Explore Furniture <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </span>
          </div>

          {/* Appliances Category */}
          <div 
            className="glass-card category-card" 
            onClick={() => navigate('catalog', { category: 'appliance' })}
          >
            <div className="category-icon">
              <Tv size={30} />
            </div>
            <h3 className="category-title">Smart Appliances</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '6px' }}>
              Double door fridges, washing machines, Smart 4K TVs, and microwave ovens.
            </p>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              color: 'var(--primary)', 
              fontSize: '0.9rem', 
              fontWeight: '600',
              marginTop: '12px'
            }}>
              Explore Appliances <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '80px 0',
        transition: 'var(--transition)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>How RentEase Works</h2>
            <p className="text-muted">A seamless, fully managed experience from ordering to return.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '30px'
          }}>
            {/* Step 1 */}
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: 'var(--primary-light)', 
                color: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                1
              </div>
              <h4 style={{ marginBottom: '8px' }}>Select Products</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Browse our catalog of premium certified furniture and home appliances.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: 'var(--primary-light)', 
                color: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                2
              </div>
              <h4 style={{ marginBottom: '8px' }}>Choose Tenure</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Select a rental period (3, 6, 12+ months) that fits your temporary relocate schedule.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: 'var(--primary-light)', 
                color: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                3
              </div>
              <h4 style={{ marginBottom: '8px' }}>Free Home Setup</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Choose a delivery date and slot. Our specialized team delivers and sets up everything.
              </p>
            </div>

            {/* Step 4 */}
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: 'var(--primary-light)', 
                color: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                4
              </div>
              <h4 style={{ marginBottom: '8px' }}>Return or Relocate</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                End the rent term, schedule a return pickup, or request free relocation to a new home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel/List */}
      <section className="container" style={{ margin: '80px auto' }}>
        <div className="flex-between" style={{ marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem' }}>Featured Rentals</h2>
            <p className="text-muted">Most popular items chosen by students and professionals this month.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate('catalog')}>
            View All Catalog
          </button>
        </div>

        <div className="product-grid">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              className="glass-card" 
              role="button"
              tabIndex={0}
              style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
              onClick={() => navigate('product-detail', { productId: product.id })}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate('product-detail', { productId: product.id });
                }
              }}
            >
              <ProductImage subCategory={product.subCategory} productId={product.id} />
              
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span className="badge badge-accent" style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
                  {product.category}
                </span>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {product.name}
                </h4>
                <p className="text-muted" style={{ fontSize: '0.85rem', flexGrow: 1, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.description}
                </p>
                <div className="flex-between" style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Rents from</span>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', fontWeight: '800' }}>
                      ₹{product.baseRent}<span style={{ fontSize: '0.85rem', fontWeight: 'normal' }}>/mo</span>
                    </h3>
                  </div>
                  <button 
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate('product-detail', { productId: product.id });
                    }}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials section */}
      <section style={{ backgroundColor: 'var(--bg-tertiary)', padding: '80px 0', borderTop: '1px solid var(--border)', transition: 'var(--transition)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>What Our Renters Say</h2>
            <p className="text-muted">Real reviews from professionals and college graduates.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {/* Review 1 */}
            <div className="glass-card" style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '12px' }}>
                <ThumbsUp size={16} /> <ThumbsUp size={16} /> <ThumbsUp size={16} /> <ThumbsUp size={16} /> <ThumbsUp size={16} />
              </div>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--text-secondary)' }}>
                "As a software engineer relocating to Bangalore for work, buying furniture was going to cost over ₹1,50,000. RentEase solved it. I rent a sofa, TV, and bed for under ₹6,000/mo. Relocation support is a lifesaver!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 'bold' }}>
                  S
                </div>
                <div>
                  <h5 style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>Sarah Miller</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Software Engineer, Bangalore</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="glass-card" style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '12px' }}>
                <ThumbsUp size={16} /> <ThumbsUp size={16} /> <ThumbsUp size={16} /> <ThumbsUp size={16} /> <ThumbsUp size={16} />
              </div>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--text-secondary)' }}>
                "Renting a refrigerator and washing machine was incredibly simple. Delivery was fast, and the setup team built the bed frame for free. Maintenance resolved a wobbly washer tub in 18 hours!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 'bold' }}>
                  J
                </div>
                <div>
                  <h5 style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>James Peterson</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Graduate Student, IIT Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
