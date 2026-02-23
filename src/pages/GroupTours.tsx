import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allTours = [
  {
    id: '1',
    title: 'Himachal Pocket From Rajkot',
    price: '12,999',
    discount: '35%',
    duration: '9 Days & 8 Nights',
    type: 'Group',
    category: 'Himachal',
    destinations: 'Shimla, Manali, Dalhousie, Golden Temple',
    image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    title: 'Heavenly Kashmir with Amritsar',
    price: '16,299',
    discount: '35%',
    duration: '10 Days & 9 Nights',
    type: 'Group',
    category: 'Kashmir',
    destinations: 'Vaishnodevi, Srinagar, Sonmarg, Gulmarg',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Shimla Manali Group Special',
    price: '13,499',
    discount: '30%',
    duration: '7 Days & 6 Nights',
    type: 'Group',
    category: 'Himachal',
    destinations: 'Shimla, Manali, Kullu, Kufri',
    image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    title: 'Pocket Kashmir From Ahmedabad',
    price: '12,799',
    discount: '35%',
    duration: '9 Days & 8 Nights',
    type: 'Group',
    category: 'Kashmir',
    destinations: 'Katra, Srinagar, Sonmarg, Gulmarg, Pahalgam',
    image: 'https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '5',
    title: 'Rajasthan Heritage Tour',
    price: '14,999',
    discount: '25%',
    duration: '8 Days & 7 Nights',
    type: 'Group',
    category: 'Rajasthan',
    destinations: 'Jaipur, Udaipur, Jodhpur, Jaisalmer',
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '6',
    title: 'Uttarakhand Divine Journey',
    price: '11,999',
    discount: '30%',
    duration: '6 Days & 5 Nights',
    type: 'Group',
    category: 'Uttarakhand',
    destinations: 'Haridwar, Rishikesh, Mussoorie, Dehradun',
    image: 'https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const categories = ['All', 'Himachal', 'Kashmir', 'Rajasthan', 'Uttarakhand'];

export default function GroupTours() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allTours.filter((t) => {
    const catMatch = selectedCategory === 'All' || t.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const textMatch = t.title.toLowerCase().includes(q) || t.destinations.toLowerCase().includes(q);
    return catMatch && textMatch;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#FAF6EF', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .pkg-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s; }
        .pkg-card:hover { transform: translateY(-8px); box-shadow: 0 30px 80px rgba(27,58,45,0.15) !important; }
        .pkg-card:hover .pkg-img img { transform: scale(1.06); }
        .pkg-img img { transition: transform 0.6s ease; }
        .pkg-btn:hover { background: #3D8B5E !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(27,58,45,0.3) !important; }
        .cat-pill.active { background: linear-gradient(135deg, #1B3A2D, #3D8B5E); color: white; box-shadow: 0 4px 16px rgba(27,58,45,0.3); }
        .cat-pill:not(.active):hover { background: #F0EAE0; }
        .search-input:focus { border-color: #3D8B5E !important; box-shadow: 0 0 0 3px rgba(61,139,94,0.1) !important; }
      `}</style>

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{
          height: '320px',
          background: 'linear-gradient(180deg, rgba(27,58,45,0.7) 0%, rgba(27,58,45,0.5) 100%), url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920) center/cover no-repeat',
        }}
      >
        <Navbar />
        <div className="relative z-10 px-4" style={{ marginTop: '60px' }}>
          <div
            className="inline-flex items-center gap-2 rounded-full mb-4"
            style={{
              background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
              padding: '6px 18px', fontSize: '11px', letterSpacing: '2.5px',
              color: '#E8C97A', textTransform: 'uppercase', fontWeight: 600,
            }}
          >
            ✦ Join The Adventure
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900,
              color: 'white', letterSpacing: '-1px', lineHeight: 1.1,
              margin: '0 0 12px',
            }}
          >
            Group <em style={{ fontStyle: 'italic', color: '#E8C97A' }}>Tours</em>
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', fontWeight: 300, maxWidth: '480px', margin: '0 auto' }}>
            Join our group tours for an unforgettable adventure with fellow travellers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search & Filter */}
        <div className="mb-10 flex flex-col gap-5">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tours by destination or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full pl-12 pr-4 py-3.5 bg-white rounded-xl outline-none transition-all"
                style={{ border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A' }}
              />
            </div>
            <button
              className="flex items-center gap-2 px-6 py-3.5 bg-white rounded-xl transition-all"
              style={{ border: '1.5px solid #E5E0D5', fontSize: '14px', fontWeight: 500, color: '#1B3A2D' }}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cat-pill px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${selectedCategory === cat ? 'active' : ''}`}
                style={{
                  background: selectedCategory === cat ? '' : 'white',
                  color: selectedCategory === cat ? 'white' : '#1B3A2D',
                  border: selectedCategory === cat ? 'none' : '1px solid #E5E0D5',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#7A7265', marginBottom: '32px' }}>
          Showing <span style={{ fontWeight: 700, color: '#1B3A2D' }}>{filtered.length}</span> tours
        </p>

        {/* Cards Grid */}
        <div className="grid gap-7" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
          {filtered.map((tour) => (
            <div
              key={tour.id}
              className="pkg-card bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 4px 24px rgba(27,58,45,0.08)' }}
            >
              {/* Image */}
              <div className="pkg-img relative overflow-hidden" style={{ height: '240px' }}>
                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,58,45,0.6) 0%, transparent 60%)' }} />
                {/* Badge */}
                <div
                  className="absolute top-4 left-4 rounded-full font-bold"
                  style={{ background: '#C9A84C', color: '#1B3A2D', padding: '5px 14px', fontSize: '11px', letterSpacing: '0.5px' }}
                >
                  {tour.discount} OFF
                </div>
                {/* Duration pill */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    padding: '4px 14px', fontSize: '12px', color: 'rgba(255,255,255,0.9)', fontWeight: 500,
                  }}
                >
                  🗓 {tour.duration}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '24px' }}>
                <div
                  className="inline-block rounded-full mb-3"
                  style={{
                    background: 'rgba(27,58,45,0.08)', color: '#1B3A2D',
                    padding: '4px 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px',
                  }}
                >
                  {tour.type}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '20px', fontWeight: 700,
                    color: '#1B3A2D', lineHeight: 1.2,
                    margin: '0 0 10px',
                  }}
                >
                  {tour.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#7A7265', margin: '0 0 16px' }}>
                  📍 {tour.destinations}
                </p>

                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: '1px solid #F0EAE0' }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '26px', fontWeight: 700, color: '#1B3A2D',
                      }}
                    >
                      ₹{tour.price}
                    </span>
                    <span style={{ fontSize: '13px', color: '#7A7265' }}>/person</span>
                  </div>
                  <button
                    className="pkg-btn flex items-center gap-2 rounded-xl transition-all duration-300"
                    onClick={() => navigate(`/tour-details/${tour.id}`)}
                    style={{
                      background: '#1B3A2D', color: 'white',
                      padding: '10px 20px', border: 'none', cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px', fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(27,58,45,0.25)',
                    }}
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}