import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#1A1A1A',
        padding: '80px 60px 32px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .footer-link { text-decoration: none; font-size: 14px; color: rgba(255,255,255,0.45); font-weight: 300; transition: color 0.3s; }
        .footer-link:hover { color: #C9A84C; }
        .social-btn { width: 38px; height: 38px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 14px; color: rgba(255,255,255,0.5); transition: all 0.3s; cursor: pointer; }
        .social-btn:hover { background: #C9A84C; color: #1B3A2D; border-color: #C9A84C; transform: translateY(-2px); }
        .legal-link { text-decoration: none; font-size: 13px; color: rgba(255,255,255,0.25); font-weight: 300; transition: color 0.3s; }
        .legal-link:hover { color: rgba(255,255,255,0.6); }
      `}</style>

      {/* Top Grid */}
      <div
        className="grid gap-16 mb-16"
        style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1B3A2D 0%, #3D8B5E 100%)', boxShadow: '0 4px 20px rgba(27,58,45,0.3)' }}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700, color: '#C9A84C' }}>CTM</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '-0.3px' }}>
              Crazy<span style={{ color: '#C9A84C' }}>Trip</span>Makers
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300, maxWidth: '260px', marginTop: '16px' }}>
            Your trusted travel partner for unforgettable journeys across India. Creating memories, one trip at a time since 2017.
          </p>
          <div className="flex gap-3 mt-6">
            {['f', '𝕏', 'in', '▶'].map((icon) => (
              <a key={icon} href="#" className="social-btn">{icon}</a>
            ))}
          </div>
        </div>

        {/* Tours */}
        <div>
          <h4
            style={{
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '20px',
            }}
          >
            Tours
          </h4>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {[
              { to: '/group-tours', label: 'Group Tours' },
              { to: '/personal-tours', label: 'Personal Tours' },
              { to: '/customised-tours', label: 'Customised Tours' },
            ].map(({ to, label }) => (
              <li key={to}><Link to={to} className="footer-link">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4
            style={{
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '20px',
            }}
          >
            Destinations
          </h4>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {['Himachal Pradesh', 'Kashmir', 'Kerala', 'Rajasthan', 'Uttarakhand'].map((d) => (
              <li key={d}><a href="#" className="footer-link">{d}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4
            style={{
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '20px',
            }}
          >
            Company
          </h4>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {[
              { to: '/about-us', label: 'About Us' },
              { to: '/our-branches', label: 'Our Branches' },
              { to: '/contact', label: 'Contact Us' },
            ].map(({ to, label }) => (
              <li key={to}><Link to={to} className="footer-link">{label}</Link></li>
            ))}
            <li>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>📞 +91-9573623034</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>📞 +91-9974542678</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>✉️ info@CrazyTripMakers.com</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>📍 Hyderabad & Ahmedabad</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="flex justify-between items-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px' }}
      >
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
          © 2025 <span style={{ color: '#C9A84C' }}>CrazyTripMakers</span>. All rights reserved. Made with ❤️ in India.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((l) => (
            <a key={l} href="#" className="legal-link">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}