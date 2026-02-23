import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    initial: 'R',
    name: 'Rahul Sharma',
    location: 'Mumbai, Maharashtra',
    text: 'The Kashmir tour was beyond anything I imagined. Every detail was perfect — from the houseboat stay in Dal Lake to the Gulmarg gondola ride. CTM truly made magic happen.',
  },
  {
    initial: 'P',
    name: 'Priya Patel',
    location: 'Ahmedabad, Gujarat',
    text: 'We booked the Himachal group tour from Rajkot and it was the best decision. The team was incredibly responsive, the accommodations were superb, and the views were stunning.',
  },
  {
    initial: 'A',
    name: 'Anita Desai',
    location: 'Hyderabad, Telangana',
    text: "Our family's Kerala backwater cruise was pure bliss. CrazyTripMakers handled every detail flawlessly. The kids still talk about the elephant sanctuary in Munnar!",
  },
];

export default function OfferAndTestimonials() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');

        /* ── OFFER BANNER ── */
        .offer-wrap {
          padding: 0 60px;
          margin-bottom: 0;
          font-family: 'DM Sans', sans-serif;
        }
        .offer-section {
          border-radius: 28px;
          background: linear-gradient(135deg, #1B3A2D 0%, #0D2419 100%);
          padding: 64px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .offer-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .offer-content {
          position: relative; z-index: 1;
          max-width: 500px;
        }
        .offer-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 50px; padding: 6px 16px;
          font-size: 11px; color: #C9A84C;
          letter-spacing: 2px; text-transform: uppercase;
          font-weight: 700; margin-bottom: 20px;
        }
        .offer-title {
          font-family: 'Playfair Display', serif;
          font-size: 40px; font-weight: 900;
          color: white; line-height: 1.1;
          letter-spacing: -1px; margin-bottom: 16px;
        }
        .offer-title span {
          color: #E8C97A;
          font-style: italic;
        }
        .offer-desc {
          font-size: 15px; color: rgba(255,255,255,0.6);
          line-height: 1.7; font-weight: 300;
          margin-bottom: 32px;
        }
        .offer-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: #C9A84C;
          color: #1B3A2D;
          padding: 16px 32px; border-radius: 14px;
          font-size: 14px; font-weight: 700;
          text-decoration: none; letter-spacing: 0.3px;
          transition: all 0.3s;
          box-shadow: 0 8px 30px rgba(201,168,76,0.4);
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .offer-cta:hover {
          background: #E8C97A;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(201,168,76,0.5);
        }
        .offer-nums {
          position: relative; z-index: 1;
          display: flex; gap: 40px;
        }
        .offer-num { text-align: center; }
        .offer-num-val {
          font-family: 'Playfair Display', serif;
          font-size: 48px; font-weight: 900;
          color: white; line-height: 1;
        }
        .offer-num-val span { color: #C9A84C; }
        .offer-num-label {
          font-size: 12px; color: rgba(255,255,255,0.5);
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-top: 8px; font-weight: 500;
        }

        /* ── TESTIMONIALS ── */
        .testi-section {
          background: #FAF6EF;
          padding: 100px 60px;
          font-family: 'DM Sans', sans-serif;
        }
        .testi-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .testi-eyebrow {
          display: inline-block;
          font-size: 11px; letter-spacing: 3px;
          text-transform: uppercase; font-weight: 700;
          color: #3D8B5E; margin-bottom: 16px;
        }
        .testi-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 700; color: #1B3A2D;
          line-height: 1.1; letter-spacing: -1px;
          margin: 0;
        }
        .testi-title em { font-style: italic; color: #C9A84C; }

        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .testi-card {
          background: white;
          border-radius: 20px; padding: 32px;
          border: 1px solid rgba(0,0,0,0.04);
          transition: box-shadow 0.4s, transform 0.4s;
        }
        .testi-card:hover {
          box-shadow: 0 20px 60px rgba(27,58,45,0.1);
          transform: translateY(-4px);
        }

        .testi-stars {
          color: #C9A84C;
          font-size: 13px; letter-spacing: 2px;
          margin-bottom: 16px;
        }
        .testi-quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px; line-height: 0.5;
          color: #C9A84C; opacity: 0.3;
          margin-bottom: 16px;
          display: block;
        }
        .testi-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; color: #4A4540;
          line-height: 1.8; font-weight: 300;
          font-style: italic;
        }

        .testi-author {
          margin-top: 24px;
          display: flex; align-items: center; gap: 14px;
        }
        .testi-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #1B3A2D, #3D8B5E);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 700; color: #C9A84C;
          flex-shrink: 0;
        }
        .testi-author-name {
          font-size: 14px; font-weight: 600; color: #1B3A2D;
        }
        .testi-author-loc {
          font-size: 12px; color: #7A7265; margin-top: 2px;
        }

        @media (max-width: 900px) {
          .offer-wrap { padding: 0 20px; }
          .offer-section { flex-direction: column; padding: 40px 28px; gap: 40px; }
          .offer-nums { justify-content: center; }
          .testi-section { padding: 60px 20px; }
          .testi-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .offer-title { font-size: 28px; }
          .offer-num-val { font-size: 36px; }
        }
      `}</style>

      {/* ── SPECIAL OFFER BANNER ── */}
      <div style={{ background: '#FFFDF9', paddingTop: '0', paddingBottom: '100px' }}>
        <div className="offer-wrap">
          <div className="offer-section">
            <div className="offer-bg" />

            <div className="offer-content">
              <div className="offer-badge">🎉 Limited Time Offer</div>
              <h2 className="offer-title">
                Get up to <span>35% off</span><br />on all group tours
              </h2>
              <p className="offer-desc">
                Book any group package for March–June 2025 and save big. Our most popular packages — Himachal, Kashmir, and Kerala — are filling up fast.
              </p>
              <button className="offer-cta" onClick={() => navigate('/contact')}>
                Claim Your Discount
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="offer-nums">
              <div className="offer-num">
                <div className="offer-num-val">15<span>K</span></div>
                <div className="offer-num-label">Travellers</div>
              </div>
              <div className="offer-num">
                <div className="offer-num-val">4.9<span>★</span></div>
                <div className="offer-num-label">Rating</div>
              </div>
              <div className="offer-num">
                <div className="offer-num-val">8<span>+</span></div>
                <div className="offer-num-label">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="testi-section">
        <div className="testi-header">
          <div className="testi-eyebrow">✦ Real Stories</div>
          <h2 className="testi-title">
            What our travellers<br /><em>have to say</em>
          </h2>
        </div>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-stars">★★★★★</div>
              <span className="testi-quote-mark">"</span>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initial}</div>
                <div>
                  <div className="testi-author-name">{t.name}</div>
                  <div className="testi-author-loc">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}