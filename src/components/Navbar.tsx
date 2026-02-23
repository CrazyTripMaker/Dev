import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/group-tours', label: 'Group Tours' },
    { path: '/personal-tours', label: 'Personal Tours' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/contact', label: 'About' },
  ];

  return (
    <>
      {/* Google Fonts — same as HTML */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ctm-nav-link {
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #1B3A2D;
          letter-spacing: 0.3px;
          position: relative;
          transition: color 0.3s;
          padding-bottom: 2px;
        }
        .ctm-nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #C9A84C;
          transition: width 0.3s ease;
        }
        .ctm-nav-link:hover {
          color: #C9A84C;
        }
        .ctm-nav-link:hover::after,
        .ctm-nav-link.active::after {
          width: 100%;
        }
        .ctm-nav-link.active {
          color: #C9A84C;
        }

        .ctm-nav-cta {
          background: #1B3A2D;
          color: #FAF6EF !important;
          padding: 10px 24px;
          border-radius: 50px;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 16px rgba(27,58,45,0.25);
          transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          display: inline-block;
          white-space: nowrap;
        }
        .ctm-nav-cta:hover {
          background: #2A5C42 !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(27,58,45,0.3) !important;
        }
        .ctm-nav-cta::after {
          display: none !important;
        }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '16px 60px' : '20px 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(250, 246, 239, 0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.08)' : 'none',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #1B3A2D 0%, #3D8B5E 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Playfair Display', serif",
              fontSize: '16px',
              fontWeight: 700,
              color: '#C9A84C',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 20px rgba(27,58,45,0.3)',
              flexShrink: 0,
            }}
          >
            CTM
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#1B3A2D',
              letterSpacing: '-0.3px',
            }}
          >
            Crazy<span style={{ color: '#C9A84C' }}>Trip</span>Makers
          </span>
        </Link>

        {/* Nav Links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`ctm-nav-link${isActive(path) ? ' active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="ctm-nav-cta">
              Book Now
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}