import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Group Tours', 'Personal Tours', 'Couple/Honeymoon Tours'];

const toursByCategory = {
  'Group Tours': [
    {
      id: "1",
      title: "Himachal Pocket From Rajkot",
      price: "12,999",
      discount: "35",
      duration: "9 Days & 8 Nights",
      type: "GROUP",
      destinations: "Shimla · Manali · Dalhousie · Golden Temple",
      image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "2",
      title: "Heavenly Kashmir with Amritsar",
      price: "16,299",
      discount: "35",
      duration: "10 Days & 9 Nights",
      type: "GROUP",
      destinations: "Vaishnodevi · Srinagar · Sonmarg · Gulmarg",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "3",
      title: "Rajasthan Heritage Tour",
      price: "14,999",
      discount: "25",
      duration: "8 Days & 7 Nights",
      type: "GROUP",
      destinations: "Jaipur · Udaipur · Jaisalmer · Jodhpur",
      image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ],
  'Personal Tours': [
    {
      id: "10",
      title: "Magical Kerala From Cochin",
      price: "11,999",
      discount: "35",
      duration: "5 Days & 4 Nights",
      type: "PERSONAL",
      destinations: "Munnar · Thekkady · Alleppey",
      image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "11",
      title: "Magical Himachal From Delhi",
      price: "11,499",
      discount: "35",
      duration: "6 Days & 5 Nights",
      type: "PERSONAL",
      destinations: "Shimla · Manali · Solang Valley · Kullu",
      image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "12",
      title: "Magical Kashmir From Srinagar",
      price: "15,999",
      discount: "35",
      duration: "6 Days & 5 Nights",
      type: "PERSONAL",
      destinations: "Srinagar · Pahalgam · Gulmarg · Sonmarg",
      image: "https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ],
  'Couple/Honeymoon Tours': [
    {
      id: "16",
      title: "Shimla Manali Couple Special",
      price: "12,699",
      discount: "35",
      duration: "8 Days & 7 Nights",
      type: "COUPLE",
      destinations: "Shimla · Manali · Kullu · Kufri",
      image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "17",
      title: "Kerala Honeymoon Special",
      price: "13,999",
      discount: "30",
      duration: "6 Days & 5 Nights",
      type: "COUPLE",
      destinations: "Munnar · Thekkady · Alleppey · Kovalam",
      image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "18",
      title: "Kashmir Honeymoon Retreat",
      price: "17,499",
      discount: "20",
      duration: "7 Days & 6 Nights",
      type: "COUPLE",
      destinations: "Srinagar · Gulmarg · Pahalgam · Dal Lake",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ]
};

const categoryIcons: Record<string, string> = {
  'Group Tours': '👥',
  'Personal Tours': '🧭',
  'Couple/Honeymoon Tours': '💑',
};

export default function TopCategories() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Group Tours');
  const tours = toursByCategory[activeCategory as keyof typeof toursByCategory];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .topcats-section {
          background: #FFFDF9;
          padding: 100px 60px;
          font-family: 'DM Sans', sans-serif;
        }

        /* Header */
        .topcats-eyebrow {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 700;
          color: #3D8B5E;
          margin-bottom: 16px;
        }
        .topcats-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 700;
          color: #1B3A2D;
          line-height: 1.1;
          letter-spacing: -1px;
          margin: 0 0 16px 0;
        }
        .topcats-title em {
          font-style: italic;
          color: #C9A84C;
        }
        .topcats-subtitle {
          font-size: 16px;
          color: #7A7265;
          max-width: 480px;
          line-height: 1.7;
          font-weight: 300;
          margin: 0 0 48px 0;
        }

        /* Tab pills */
        .topcats-tabs {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 52px;
        }
        .topcats-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .topcats-tab.inactive {
          background: white;
          color: #1B3A2D;
          border-color: #E5E0D5;
          box-shadow: 0 2px 12px rgba(27,58,45,0.06);
        }
        .topcats-tab.inactive:hover {
          border-color: #C9A84C;
          color: #C9A84C;
          box-shadow: 0 4px 16px rgba(27,58,45,0.1);
        }
        .topcats-tab.active {
          background: #1B3A2D;
          color: #FAF6EF;
          border-color: #1B3A2D;
          box-shadow: 0 6px 20px rgba(27,58,45,0.3);
        }

        /* Grid */
        .topcats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* Card */
        .topcats-card {
          border-radius: 24px;
          overflow: hidden;
          background: white;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s;
        }
        .topcats-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 80px rgba(27,58,45,0.15);
        }

        .topcats-img {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .topcats-img img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .topcats-card:hover .topcats-img img { transform: scale(1.06); }

        .topcats-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(27,58,45,0.85) 0%, transparent 50%);
        }

        .topcats-badge {
          position: absolute; top: 16px; left: 16px;
          background: #C9A84C;
          color: #1B3A2D;
          padding: 6px 14px; border-radius: 50px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.5px;
        }

        .topcats-overlay-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px 24px;
        }
        .topcats-duration {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px; padding: 4px 12px;
          font-size: 12px; color: rgba(255,255,255,0.9);
          font-weight: 500; margin-bottom: 8px;
        }
        .topcats-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 700;
          color: white; line-height: 1.2;
        }

        /* Body */
        .topcats-body { padding: 20px 24px 24px; }

        .topcats-price-row {
          display: flex; align-items: center; justify-content: space-between;
        }
        .topcats-price {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 700;
          color: #1B3A2D;
        }
        .topcats-price small {
          font-size: 12px; font-weight: 400;
          color: #7A7265;
          font-family: 'DM Sans', sans-serif;
        }
        .topcats-discount {
          background: rgba(201,168,76,0.12);
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.3);
          padding: 4px 10px; border-radius: 50px;
          font-size: 12px; font-weight: 700;
        }
        .topcats-dest {
          font-size: 13px; color: #7A7265; margin-top: 6px;
        }
        .topcats-btn {
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
        .topcats-btn:hover {
          background: #3D8B5E;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(27,58,45,0.3);
        }

        @media (max-width: 900px) {
          .topcats-section { padding: 60px 20px; }
          .topcats-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .topcats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="topcats-section">
        {/* Header */}
        <div className="topcats-eyebrow">✦ Browse by Type</div>
        <h2 className="topcats-title">
          Find your perfect<br /><em>journey</em>
        </h2>
        <p className="topcats-subtitle">
          From serene hill retreats to vibrant cultural immersions — there's a tour shaped just for you.
        </p>

        {/* Tabs */}
        <div className="topcats-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`topcats-tab ${activeCategory === cat ? 'active' : 'inactive'}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span>{categoryIcons[cat]}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="topcats-grid">
          {tours.map((tour) => (
            <div
              className="topcats-card"
              key={tour.id}
              onClick={() => navigate(`/tour-details/${tour.id}`)}
            >
              <div className="topcats-img">
                <img src={tour.image} alt={tour.title} />
                <div className="topcats-img-overlay" />
                <div className="topcats-badge">{tour.type}</div>
                <div className="topcats-overlay-content">
                  <div className="topcats-duration">🗓 {tour.duration}</div>
                  <div className="topcats-card-title">{tour.title}</div>
                </div>
              </div>
              <div className="topcats-body">
                <div className="topcats-price-row">
                  <div className="topcats-price">
                    ₹{tour.price} <small>/person</small>
                  </div>
                  {tour.discount && (
                    <div className="topcats-discount">{tour.discount}% OFF</div>
                  )}
                </div>
                <div className="topcats-dest">{tour.destinations}</div>
                <button className="topcats-btn">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}