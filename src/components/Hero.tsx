import { useEffect, useRef } from 'react';
import Navbar from './Navbar';

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height: '100vh', minHeight: '700px', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(27,58,45,0.55) 0%, rgba(27,58,45,0.25) 50%, rgba(27,58,45,0.7) 100%), url('https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1920') center/cover no-repeat`,
          animation: 'heroZoom 12s ease-out forwards',
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');
        @keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes marquee { to { transform: translateX(-50%); } }
        .hero-eyebrow { animation: fadeUp 0.8s ease 0.3s both; }
        .hero-title { animation: fadeUp 0.8s ease 0.5s both; }
        .hero-subtitle { animation: fadeUp 0.8s ease 0.7s both; }
        .hero-search { animation: fadeUp 0.8s ease 0.9s both; }
        .hero-stats { animation: fadeUp 0.8s ease 1.1s both; }
        .scroll-indicator { animation: fadeUp 0.8s ease 1.3s both; }
        .scroll-line { animation: scrollPulse 2s ease infinite; }
        .search-tab:hover { background: #F5F0E8; }
        .search-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(27,58,45,0.5) !important; }
      `}</style>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`
      }} />

      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div
          className="hero-eyebrow inline-flex items-center gap-3 rounded-full mb-7"
          style={{
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.4)',
            padding: '8px 20px',
            fontSize: '12px',
            letterSpacing: '2.5px',
            color: '#E8C97A',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span style={{ width: 4, height: 4, background: '#C9A84C', borderRadius: '50%', display: 'inline-block' }} />
          India's Most Loved Travel Experience
          <span style={{ width: 4, height: 4, background: '#C9A84C', borderRadius: '50%', display: 'inline-block' }} />
        </div>

        {/* Title */}
        <h1
          className="hero-title m-0 mb-6"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(52px, 7vw, 96px)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.02,
            letterSpacing: '-2px',
          }}
        >
          Wander into
          <em
            className="block mt-2"
            style={{
              fontStyle: 'italic',
              color: '#E8C97A',
            }}
          >
            pure magic
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
          style={{
            fontSize: '18px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '520px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
            letterSpacing: '0.2px',
          }}
        >
          Handcrafted journeys across India's most extraordinary landscapes — from Himalayan peaks to tropical shores.
        </p>

        {/* Search Bar */}
        <div
          className="hero-search flex items-center gap-2 mx-auto"
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '20px',
            padding: '8px',
            maxWidth: '640px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <div
            className="search-tab flex items-center gap-3 flex-1 rounded-2xl cursor-pointer transition-colors duration-200"
            style={{ padding: '14px 18px' }}
          >
            <span style={{ fontSize: '18px' }}>📍</span>
            <div>
              <div style={{ fontSize: '11px', color: '#7A7265', letterSpacing: '0.5px', fontWeight: 500 }}>Where to?</div>
              <input
                type="text"
                placeholder="Kashmir, Manali, Kerala..."
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px', fontWeight: 600, color: '#1B3A2D', width: '100%',
                }}
              />
            </div>
          </div>
          <div style={{ width: '1px', height: '36px', background: '#E5E0D8', flexShrink: 0 }} />
          <div
            className="search-tab flex items-center gap-3 rounded-2xl cursor-pointer transition-colors duration-200"
            style={{ padding: '14px 18px' }}
          >
            <span style={{ fontSize: '18px' }}>📅</span>
            <div>
              <div style={{ fontSize: '11px', color: '#7A7265', letterSpacing: '0.5px', fontWeight: 500 }}>When?</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1B3A2D' }}>Any time</div>
            </div>
          </div>
          <div style={{ width: '1px', height: '36px', background: '#E5E0D8', flexShrink: 0 }} />
          <div
            className="search-tab flex items-center gap-3 rounded-2xl cursor-pointer transition-colors duration-200"
            style={{ padding: '14px 18px' }}
          >
            <span style={{ fontSize: '18px' }}>👥</span>
            <div>
              <div style={{ fontSize: '11px', color: '#7A7265', letterSpacing: '0.5px', fontWeight: 500 }}>Travellers</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1B3A2D' }}>2 Adults</div>
            </div>
          </div>
          <button
            className="search-btn flex items-center gap-2 text-white rounded-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #1B3A2D 0%, #3D8B5E 100%)',
              border: 'none', cursor: 'pointer',
              padding: '16px 28px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px', fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(27,58,45,0.4)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Search Tours
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        className="hero-stats absolute bottom-10 left-0 right-0 flex justify-center gap-16 z-10"
        ref={statsRef}
      >
        {[
          { num: '15K+', label: 'Happy Travellers' },
          { num: '200+', label: 'Tour Packages' },
          { num: '50+', label: 'Destinations' },
          { num: '4.9★', label: 'Average Rating' },
        ].map(({ num, label }) => (
          <div key={label} className="text-center">
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '32px', fontWeight: 700,
                color: 'white', lineHeight: 1,
              }}
            >
              {num.replace(/[K+★]/g, '')}
              <span style={{ color: '#E8C97A' }}>{num.match(/[K+★]/)?.[0]}</span>
            </div>
            <div
              style={{
                fontSize: '12px', letterSpacing: '1px',
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase', marginTop: '6px',
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator absolute bottom-10 right-16 z-10 flex flex-col items-center gap-2"
      >
        <div
          className="scroll-line"
          style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }}
        />
        <span
          style={{
            fontSize: '10px', letterSpacing: '2px',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontWeight: 500,
          }}
        >
          Scroll
        </span>
      </div>
    </div>
  );
}