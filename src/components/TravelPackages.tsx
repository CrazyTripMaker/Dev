import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface Package {
  package_id: number;
  package_name: string;
  short_description: string;
  duration_days: number;
  duration_nights: number;
  base_price: string;
  discount_percent: string;
  final_price: string;
  start_location: string;
}

const PACKAGE_IMAGES = [
  'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function TravelPackages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/packages/list`, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        const data = await res.json();
        setPackages(data.packages || []);
      } catch (error) {
        console.error('Failed to fetch packages', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const featured = packages[0];
  const rest = packages.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .pkg-section {
          background: #FAF6EF;
          padding: 100px 60px;
          font-family: 'DM Sans', sans-serif;
        }
        .pkg-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 60px;
        }
        .section-eyebrow {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 700;
          color: #3D8B5E;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 700;
          color: #1B3A2D;
          line-height: 1.1;
          letter-spacing: -1px;
          margin: 0;
        }
        .section-title em {
          font-style: italic;
          color: #C9A84C;
        }
        .view-all-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          color: #1B3A2D;
          border-bottom: 1.5px solid #1B3A2D;
          padding-bottom: 2px;
          transition: all 0.3s;
          white-space: nowrap;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          cursor: pointer;
        }
        .view-all-btn:hover {
          color: #C9A84C;
          border-color: #C9A84C;
        }
        .view-all-btn svg {
          transition: transform 0.3s;
        }
        .view-all-btn:hover svg {
          transform: translateX(4px);
        }

        /* Grid */
        .packages-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 20px;
        }

        /* Card base */
        .pkg-card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          background: white;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s;
        }
        .pkg-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 80px rgba(27,58,45,0.15);
        }
        .pkg-card.featured {
          grid-row: span 2;
        }

        /* Image */
        .pkg-img {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        .pkg-card.featured .pkg-img { height: 580px; }
        .pkg-card:not(.featured) .pkg-img { height: 200px; }
        .pkg-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .pkg-card:hover .pkg-img img { transform: scale(1.06); }
        .pkg-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(27,58,45,0.85) 0%, transparent 50%);
        }

        /* Badges */
        .pkg-badge {
          position: absolute; top: 16px; left: 16px;
          background: #C9A84C;
          color: #1B3A2D;
          padding: 6px 14px; border-radius: 50px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.5px;
        }
        .pkg-featured-badge {
          position: absolute; top: 16px; right: 16px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          backdrop-filter: blur(10px);
          color: white;
          padding: 6px 14px; border-radius: 50px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* Overlay content (on image) */
        .pkg-overlay-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 24px;
        }
        .pkg-card.featured .pkg-overlay-content { padding: 32px; }

        .pkg-duration {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px; padding: 4px 12px;
          font-size: 12px; color: rgba(255,255,255,0.9);
          font-weight: 500; margin-bottom: 10px;
        }
        .pkg-title-overlay {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 700;
          color: white; line-height: 1.2;
        }
        .pkg-card.featured .pkg-title-overlay { font-size: 28px; margin-bottom: 8px; }

        .pkg-destinations {
          font-size: 13px; color: rgba(255,255,255,0.7);
          margin-top: 6px; display: flex; align-items: center; gap: 6px;
        }
        .pkg-price-badge {
          margin-left: auto;
          background: rgba(201,168,76,0.2);
          color: #E8C97A;
          padding: 4px 12px; border-radius: 50px;
          font-size: 12px; font-weight: 700;
        }

        /* Featured explore btn */
        .pkg-explore-btn {
          display: flex; align-items: center; gap: 6px;
          margin-top: 20px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25);
          color: white;
          padding: 12px 20px; border-radius: 12px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          width: 100%;
          justify-content: center;
          transition: all 0.3s;
          letter-spacing: 0.3px;
        }
        .pkg-explore-btn:hover {
          background: rgba(255,255,255,0.25);
        }

        /* Card body (non-featured) */
        .pkg-body { padding: 20px 24px 24px; }
        .pkg-card.featured .pkg-body { display: none; }

        .pkg-price-row {
          display: flex; align-items: center; justify-content: space-between;
        }
        .pkg-price {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 700;
          color: #1B3A2D;
        }
        .pkg-price small {
          font-size: 12px; font-weight: 400;
          color: #7A7265;
          font-family: 'DM Sans', sans-serif;
        }
        .pkg-discount {
          background: rgba(201,168,76,0.12);
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.3);
          padding: 4px 10px; border-radius: 50px;
          font-size: 12px; font-weight: 700;
        }
        .pkg-btn {
          display: flex; align-items: center; gap: 6px;
          margin-top: 16px;
          background: #1B3A2D;
          color: white;
          padding: 12px 20px; border-radius: 12px;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          width: 100%;
          justify-content: center;
          transition: all 0.3s;
          letter-spacing: 0.3px;
        }
        .pkg-btn:hover {
          background: #3D8B5E;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(27,58,45,0.3);
        }

        /* Loading / empty */
        .pkg-loading {
          text-align: center;
          padding: 80px 0;
          font-family: 'DM Sans', sans-serif;
          color: #7A7265;
          font-size: 16px;
        }

        @media (max-width: 900px) {
          .pkg-section { padding: 60px 20px; }
          .packages-grid {
            grid-template-columns: 1fr;
          }
          .pkg-card.featured { grid-row: span 1; }
          .pkg-card.featured .pkg-img { height: 340px; }
          .pkg-header { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>

      <section className="pkg-section">
        {/* Header */}
        <div className="pkg-header">
          <div>
            <div className="section-eyebrow">✦ Curated For You</div>
            <h2 className="section-title">
              Tours that take your<br /><em>breath away</em>
            </h2>
          </div>
          <button className="view-all-btn" onClick={() => navigate('/group-tours')}>
            All Packages
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="pkg-loading">Loading packages...</div>
        ) : !packages.length ? (
          <div className="pkg-loading">No packages available right now.</div>
        ) : (
          <div className="packages-grid">
            {/* Featured card */}
            {featured && (
              <div className="pkg-card featured">
                <div className="pkg-img">
                  <img
                    src={PACKAGE_IMAGES[0]}
                    alt={featured.package_name}
                  />
                  <div className="pkg-img-overlay" />
                  <div className="pkg-badge">BESTSELLER</div>
                  <div className="pkg-featured-badge">
                    {featured.duration_days} Days
                  </div>
                  <div className="pkg-overlay-content">
                    <div className="pkg-duration">
                      📍 {featured.start_location || featured.short_description}
                    </div>
                    <div className="pkg-title-overlay">{featured.package_name}</div>
                    <div className="pkg-destinations">
                      <span>From ₹{featured.final_price}/- per person</span>
                      {Number(featured.discount_percent) > 0 && (
                        <span className="pkg-price-badge">
                          {featured.discount_percent}% OFF
                        </span>
                      )}
                    </div>
                    <button
                      className="pkg-explore-btn"
                      onClick={() => navigate(`/tour-details/${featured.package_id}`)}
                    >
                      Explore Package →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Remaining cards */}
            {rest.map((pkg, i) => (
              <div className="pkg-card" key={pkg.package_id}>
                <div className="pkg-img">
                  <img
                    src={PACKAGE_IMAGES[(i + 1) % PACKAGE_IMAGES.length]}
                    alt={pkg.package_name}
                  />
                  <div className="pkg-img-overlay" />
                  <div className="pkg-badge">
                    {i % 3 === 0 ? 'GROUP' : i % 3 === 1 ? 'PERSONAL' : 'DELUXE'}
                  </div>
                  <div className="pkg-overlay-content">
                    <div className="pkg-duration">
                      🗓 {pkg.duration_days} Days & {pkg.duration_nights} Nights
                    </div>
                    <div className="pkg-title-overlay">{pkg.package_name}</div>
                  </div>
                </div>
                <div className="pkg-body">
                  <div className="pkg-price-row">
                    <div className="pkg-price">
                      ₹{pkg.final_price} <small>/person</small>
                    </div>
                    {Number(pkg.discount_percent) > 0 && (
                      <div className="pkg-discount">{pkg.discount_percent}% OFF</div>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: '#7A7265', marginTop: '6px' }}>
                    {pkg.short_description}
                  </div>
                  <button
                    className="pkg-btn"
                    onClick={() => navigate(`/tour-details/${pkg.package_id}`)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}