
import { ShieldCheck, Truck, RotateCcw, HeartHandshake } from 'lucide-react';

export const Footer = ({ navigate }) => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      padding: '60px 0 30px 0',
      marginTop: '60px',
      color: 'var(--text-secondary)',
      transition: 'var(--transition)'
    }}>
      <div className="container">
        {/* Core Value Props Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', padding: '8px', background: 'var(--primary-light)', borderRadius: '10px' }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '4px' }}>Free Delivery & Setup</h4>
              <p style={{ fontSize: '0.85rem' }}>We haul, deliver, and construct in-house for free.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', padding: '8px', background: 'var(--primary-light)', borderRadius: '10px' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '4px' }}>Free Maintenance</h4>
              <p style={{ fontSize: '0.85rem' }}>Got issues? Report on your dashboard for prompt fixes.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', padding: '8px', background: 'var(--primary-light)', borderRadius: '10px' }}>
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '4px' }}>Easy Relocation Support</h4>
              <p style={{ fontSize: '0.85rem' }}>Relocating within city limits? We will move items free.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', padding: '8px', background: 'var(--primary-light)', borderRadius: '10px' }}>
              <HeartHandshake size={24} />
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '4px' }}>Sustainable Choice</h4>
              <p style={{ fontSize: '0.85rem' }}>Reduce unnecessary consumption through sharing economies.</p>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px',
          paddingBottom: '40px'
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                fontFamily: 'Outfit'
              }}>
                RE
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--text-primary)' }}>
                RentEase
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '20px', maxWidth: '300px' }}>
              Premium furniture and household appliances rented monthly. Perfect for students, relocating professionals, and flexible lifestyles.
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h5 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '16px' }}>Rent Categories</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li>
                <span 
                  onClick={() => navigate('catalog', { category: 'furniture' })} 
                  style={{ cursor: 'pointer', hover: { color: 'var(--primary)' } }}
                >
                  All Furniture
                </span>
              </li>
              <li>
                <span 
                  onClick={() => navigate('catalog', { category: 'appliance' })} 
                  style={{ cursor: 'pointer' }}
                >
                  All Appliances
                </span>
              </li>
              <li>
                <span 
                  onClick={() => navigate('catalog', { subCategory: 'bed' })} 
                  style={{ cursor: 'pointer' }}
                >
                  Beds & Mattresses
                </span>
              </li>
              <li>
                <span 
                  onClick={() => navigate('catalog', { subCategory: 'sofa' })} 
                  style={{ cursor: 'pointer' }}
                >
                  Sofas & Seating
                </span>
              </li>
              <li>
                <span 
                  onClick={() => navigate('catalog', { subCategory: 'fridge' })} 
                  style={{ cursor: 'pointer' }}
                >
                  Refrigerators
                </span>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h5 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '16px' }}>Help & Support</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li>
                <span onClick={() => navigate('user-dashboard')} style={{ cursor: 'pointer' }}>
                  Raise Maintenance
                </span>
              </li>
              <li>
                <span onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
                  Frequently Asked FAQs
                </span>
              </li>
              <li>
                <span onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
                  How RentEase Works
                </span>
              </li>
              <li>
                <span onClick={() => alert('Support lines: support@rentease.com')} style={{ cursor: 'pointer' }}>
                  Contact Us
                </span>
              </li>
              <li>
                <span onClick={() => alert('Cities: Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, Kolkata, Jaipur, Ahmedabad, Kochi')} style={{ cursor: 'pointer' }}>
                  Coverage Map
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>
              © {new Date().getFullYear()} <strong style={{ color: 'var(--text-primary)' }}>RentEase</strong> — Designed &amp; Built by{' '}
              <a
                href="https://github.com/bvrao204"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}
              >
                B Venkateswara Rao
              </a>
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'var(--success-light)',
                color: 'var(--success)',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.04em'
              }}>
                MIT LICENSE
              </span>
              Open source — free to use and modify with attribution.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Privacy Policy')}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Terms of Service')}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Damage Policy')}>Damage Claims</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
