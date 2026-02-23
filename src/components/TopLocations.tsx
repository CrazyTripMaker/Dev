const locations = [
  { name: "Kashmir Valley", image: "https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Manali", image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Meghalaya", image: "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Andaman", image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Goa", image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Rishikesh", image: "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Rajasthan", image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Shimla", image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Kerala", image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

export default function TopLocations() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dest-section {
          background: #FFFDF9;
          padding: 100px 60px 60px;
          font-family: 'DM Sans', sans-serif;
        }

        .dest-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .dest-eyebrow {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 700;
          color: #3D8B5E;
          margin-bottom: 16px;
        }
        .dest-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 700;
          color: #1B3A2D;
          line-height: 1.1;
          letter-spacing: -1px;
          margin: 0;
        }
        .dest-title em {
          font-style: italic;
          color: #C9A84C;
        }

        .dest-mosaic {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: 200px 200px;
          gap: 12px;
        }

        .dest-tile:nth-child(1) { grid-column: span 2; }
        .dest-tile:nth-child(4) { grid-column: span 2; }
        .dest-tile:nth-child(6) { grid-column: span 2; }

        .dest-tile {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .dest-tile:hover {
          transform: scale(1.02);
          z-index: 2;
        }
        .dest-tile img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .dest-tile:hover img { transform: scale(1.08); }

        .dest-tile-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(27,58,45,0.8) 0%, transparent 50%);
        }
        .dest-tile-label {
          position: absolute;
          bottom: 16px; left: 16px;
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 700;
          color: white;
        }

        @media (max-width: 900px) {
          .dest-section { padding: 60px 20px 40px; }
          .dest-mosaic {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: none;
          }
          .dest-tile:nth-child(1),
          .dest-tile:nth-child(4),
          .dest-tile:nth-child(6) { grid-column: span 1; }
          .dest-tile { height: 160px; }
        }
      `}</style>

      <section className="dest-section">
        <div className="dest-header">
          <div className="dest-eyebrow">✦ Popular Destinations</div>
          <h2 className="dest-title">
            India's most <em>magnificent</em> places
          </h2>
        </div>

        <div className="dest-mosaic">
          {locations.map((loc, i) => (
            <div className="dest-tile" key={i}>
              <img src={loc.image} alt={loc.name} />
              <div className="dest-tile-overlay" />
              <div className="dest-tile-label">{loc.name}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}