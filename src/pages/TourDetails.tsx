import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allToursDatabase = [
  {
    id: '1',
    title: 'Himachal Pocket From Rajkot',
    price: '12,999',
    discount: '35%',
    duration: '9 Days & 8 Nights',
    type: 'Group',
    category: 'Himachal',
    destinations: ['Shimla', 'Manali', 'Dalhousie', 'Golden Temple'],
    description: 'Experience the breathtaking beauty of Himachal Pradesh with this comprehensive tour package.',
    detailedDescription: `This 9-day tour takes you through the most beautiful destinations in Himachal Pradesh. Starting from Rajkot, you'll explore the colonial charm of Shimla, the adventure hub of Manali, the serene landscapes of Dalhousie, and the spiritual tranquility of the Golden Temple in Amritsar.`,
    inclusions: [
      'Accommodation in 3-star hotels',
      'Daily breakfast and dinner',
      'All transfers in AC vehicle',
      'Sightseeing as per itinerary',
      'Driver allowances and parking charges',
      'All applicable taxes',
    ],
    exclusions: [
      'Airfare/train tickets',
      'Lunch and personal expenses',
      'Entry tickets to monuments',
      'Travel insurance',
      'Tips and porter charges',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Delhi & Transfer to Shimla', description: 'Arrive in Delhi, meet our representative and proceed to Shimla. Overnight stay in Shimla.' },
      { day: 'Day 2', title: 'Shimla Sightseeing', description: 'Visit Mall Road, The Ridge, Christ Church, and Jakhoo Temple. Overnight in Shimla.' },
      { day: 'Day 3', title: 'Shimla to Manali', description: 'Travel to Manali via Kullu Valley. Visit Kullu Shawl Factory en route. Overnight in Manali.' },
    ],
    departureOptions: [
      { city: 'Rajkot', price: '12,999', duration: '9 Days & 8 Nights', originalPrice: '19,999', discount: '35% OFF' },
      { city: 'Ahmedabad', price: '11,999', duration: '9 Days & 8 Nights', originalPrice: '17,999', discount: '33% OFF' },
      { city: 'Mumbai', price: '14,499', duration: '9 Days & 8 Nights', originalPrice: '21,999', discount: '34% OFF' },
    ],
    highlights: [
      'Stay in premium hotels with mountain views',
      'Visit Snow Point in Solang Valley',
      'Experience the scenic Toy Train ride',
      'Explore local markets and cuisine',
      'Professional guide services',
    ],
    image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
    tourType: 'Group',
    maxGroupSize: 20,
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 124,
    departureCity: 'Rajkot',
    availableDates: ['2024-12-15', '2024-12-22', '2025-01-05'],
  },
];

export default function TourDetails() {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDeparture, setSelectedDeparture] = useState<any>(null);

  useEffect(() => {
    const found = allToursDatabase.find((t) => t.id === tourId);
    if (found) {
      setTour(found);
      if (found.departureOptions?.length) setSelectedDeparture(found.departureOptions[0]);
    }
  }, [tourId]);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF6EF', fontFamily: "'DM Sans', sans-serif" }}>
        <div className="text-center">
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🗺️</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#1B3A2D', marginBottom: '8px' }}>Tour not found</h2>
          <p style={{ color: '#7A7265', marginBottom: '24px' }}>The tour you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: '#1B3A2D', color: 'white', border: 'none', cursor: 'pointer',
              padding: '12px 28px', borderRadius: '12px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600,
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = [
    tour.image,
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const tabs = ['overview', 'itinerary', 'inclusions', 'highlights'];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#FAF6EF', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .thumb-btn:hover img { transform: scale(1.05); }
        .thumb-btn img { transition: transform 0.3s; }
        .tab-btn { transition: all 0.3s; border-bottom: 2px solid transparent; }
        .tab-btn.active { border-bottom-color: #C9A84C; color: #1B3A2D; }
        .departure-card { transition: all 0.3s cubic-bezier(0.23,1,0.32,1); cursor: pointer; }
        .departure-card:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(27,58,45,0.15) !important; }
        .departure-card.selected { border-color: #1B3A2D !important; background: rgba(27,58,45,0.03) !important; }
        .book-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(27,58,45,0.4) !important; }
        .callback-btn:hover { background: rgba(27,58,45,0.05); transform: translateY(-1px); }
        .review-card { transition: transform 0.3s, box-shadow 0.3s; }
        .review-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(27,58,45,0.1) !important; }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '500px', marginTop: '0' }}>
        <img src={images[selectedImage]} alt={tour.title} className="w-full h-full object-cover transition-all duration-700" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(27,58,45,0.85) 0%, rgba(27,58,45,0.1) 60%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: '40px 60px' }}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)', color: 'white',
              padding: '8px 18px', borderRadius: '50px',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tours
          </button>
          <div
            className="inline-flex items-center gap-2 rounded-full mb-4"
            style={{
              background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
              padding: '5px 16px', fontSize: '11px', color: '#E8C97A',
              letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700,
            }}
          >
            {tour.type} Tour
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900,
              color: 'white', lineHeight: 1.1, letterSpacing: '-1px',
              marginBottom: '16px',
            }}
          >
            {tour.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
            <span>📍 {tour.destinations.join(', ')}</span>
            <span>🗓 {selectedDeparture?.duration || tour.duration}</span>
            <span>👥 Max {tour.maxGroupSize} people</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span style={{ fontWeight: 700, color: 'white' }}>{tour.rating}</span>
              <span>({tour.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Thumbnails */}
      <div style={{ background: '#1B3A2D', padding: '16px 60px' }}>
        <div className="flex gap-3 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className="thumb-btn flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300"
              style={{
                width: '100px', height: '64px',
                border: selectedImage === idx ? '2px solid #C9A84C' : '2px solid transparent',
                opacity: selectedImage === idx ? 1 : 0.6,
                cursor: 'pointer', background: 'none', padding: 0,
              }}
            >
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Departure Options */}
      <div style={{ background: 'white', padding: '48px 60px' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, color: '#3D8B5E', marginBottom: '8px' }}>✦ Select Your Starting Point</div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '28px', fontWeight: 700, color: '#1B3A2D',
              letterSpacing: '-0.5px', marginBottom: '28px',
            }}
          >
            Join Us <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>From</em>
          </h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {tour.departureOptions?.map((dep: any) => (
              <div
                key={dep.city}
                className={`departure-card rounded-2xl p-5 ${selectedDeparture?.city === dep.city ? 'selected' : ''}`}
                onClick={() => setSelectedDeparture(dep)}
                style={{
                  border: selectedDeparture?.city === dep.city ? '2px solid #1B3A2D' : '2px solid #F0EAE0',
                  background: selectedDeparture?.city === dep.city ? 'rgba(27,58,45,0.03)' : 'white',
                  boxShadow: '0 4px 16px rgba(27,58,45,0.06)',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1B3A2D', fontFamily: "'Playfair Display', serif" }}>
                    {dep.city}
                  </h3>
                  {selectedDeparture?.city === dep.city && (
                    <div style={{ width: '22px', height: '22px', background: '#1B3A2D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#1B3A2D', fontFamily: "'Playfair Display', serif", marginBottom: '4px' }}>
                  ₹{dep.price}
                </div>
                <div style={{ fontSize: '12px', color: '#7A7265', marginBottom: '6px' }}>{dep.duration}</div>
                {dep.originalPrice && (
                  <div style={{ fontSize: '12px' }}>
                    <span style={{ textDecoration: 'line-through', color: '#AAA' }}>₹{dep.originalPrice}</span>
                    <span style={{ marginLeft: '8px', color: '#C9A84C', fontWeight: 700 }}>{dep.discount}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-16 py-16">
        <div className="grid gap-12" style={{ gridTemplateColumns: '1fr 380px' }}>

          {/* Left */}
          <div>
            {/* Tabs */}
            <div className="flex gap-0 mb-10" style={{ borderBottom: '1px solid #E5E0D5' }}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn px-6 py-3 capitalize font-semibold text-sm transition-all cursor-pointer ${activeTab === tab ? 'active' : ''}`}
                  style={{
                    background: 'none', border: 'none',
                    color: activeTab === tab ? '#1B3A2D' : '#7A7265',
                    borderBottom: `2px solid ${activeTab === tab ? '#C9A84C' : 'transparent'}`,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: '0.3px',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#1B3A2D', marginBottom: '16px' }}>Tour Overview</h3>
                <p style={{ fontSize: '15px', color: '#4A4540', lineHeight: 1.8, fontWeight: 300, marginBottom: '32px' }}>{tour.detailedDescription}</p>
                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  {[
                    { icon: '👥', label: 'Tour Type', value: `${tour.type} Tour` },
                    { icon: '🗓', label: 'Duration', value: selectedDeparture?.duration || tour.duration },
                    { icon: '⚡', label: 'Difficulty', value: tour.difficulty },
                    { icon: '📍', label: 'Departure From', value: selectedDeparture?.city || tour.departureCity },
                  ].map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 bg-white rounded-2xl"
                      style={{ padding: '20px', boxShadow: '0 4px 16px rgba(27,58,45,0.07)' }}
                    >
                      <div style={{ width: '48px', height: '48px', background: 'rgba(27,58,45,0.06)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{icon}</div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#7A7265', marginBottom: '4px' }}>{label}</div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#1B3A2D' }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {activeTab === 'itinerary' && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#1B3A2D', marginBottom: '8px' }}>Detailed Itinerary</h3>
                <p style={{ fontSize: '14px', color: '#7A7265', marginBottom: '28px' }}>Departing from <strong style={{ color: '#1B3A2D' }}>{selectedDeparture?.city || tour.departureCity}</strong></p>
                <div className="flex flex-col gap-4">
                  {tour.itinerary.map((day: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex gap-5 bg-white rounded-2xl"
                      style={{ padding: '24px', boxShadow: '0 4px 16px rgba(27,58,45,0.07)' }}
                    >
                      <div
                        style={{
                          minWidth: '64px', height: '64px',
                          background: 'linear-gradient(135deg, #1B3A2D, #3D8B5E)',
                          borderRadius: '16px',
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>Day</span>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#E8C97A', lineHeight: 1 }}>
                          {day.day.replace('Day ', '')}
                        </span>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1B3A2D', marginBottom: '8px' }}>{day.title}</h4>
                        <p style={{ fontSize: '14px', color: '#7A7265', lineHeight: 1.7 }}>{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions */}
            {activeTab === 'inclusions' && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#1B3A2D', marginBottom: '24px' }}>What's Included</h3>
                <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 16px rgba(27,58,45,0.07)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#3D8B5E', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>✅ Inclusions</h4>
                    <div className="flex flex-col gap-3">
                      {tour.inclusions.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div style={{ width: '20px', height: '20px', background: 'rgba(61,139,94,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                            <Check className="w-3 h-3" style={{ color: '#3D8B5E' }} strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: '14px', color: '#4A4540', lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 16px rgba(27,58,45,0.07)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#E05C5C', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>❌ Exclusions</h4>
                    <div className="flex flex-col gap-3">
                      {tour.exclusions.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div style={{ width: '20px', height: '20px', background: 'rgba(224,92,92,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', fontSize: '12px', color: '#E05C5C', fontWeight: 700 }}>×</div>
                          <span style={{ fontSize: '14px', color: '#4A4540', lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Highlights */}
            {activeTab === 'highlights' && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#1B3A2D', marginBottom: '24px' }}>Tour Highlights</h3>
                <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  {tour.highlights.map((h: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white rounded-2xl"
                      style={{ padding: '20px', boxShadow: '0 4px 16px rgba(27,58,45,0.07)' }}
                    >
                      <div style={{ width: '40px', height: '40px', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' }}>⭐</div>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#1B3A2D' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking */}
          <div>
            <div
              className="sticky bg-white rounded-3xl"
              style={{ top: '100px', padding: '32px', boxShadow: '0 12px 48px rgba(27,58,45,0.14)' }}
            >
              <div style={{ marginBottom: '24px' }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: '12px', color: '#7A7265' }}>Starting From</span>
                  <span
                    style={{
                      background: 'rgba(201,168,76,0.12)', color: '#C9A84C',
                      border: '1px solid rgba(201,168,76,0.3)',
                      padding: '3px 10px', borderRadius: '50px',
                      fontSize: '12px', fontWeight: 700,
                    }}
                  >
                    {tour.discount} OFF
                  </span>
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 900, color: '#1B3A2D', lineHeight: 1 }}>
                  ₹{selectedDeparture?.price || tour.price}
                  <span style={{ fontSize: '16px', fontWeight: 400, color: '#7A7265', fontFamily: "'DM Sans', sans-serif" }}> /person</span>
                </div>
                {selectedDeparture?.originalPrice && (
                  <p style={{ fontSize: '13px', color: '#AAA', marginTop: '4px' }}>
                    <span style={{ textDecoration: 'line-through' }}>₹{selectedDeparture.originalPrice}</span>
                    <span style={{ marginLeft: '8px', color: '#C9A84C', fontWeight: 700 }}>{selectedDeparture.discount}</span>
                  </p>
                )}
              </div>

              <div style={{ borderTop: '1px solid #F0EAE0', paddingTop: '24px', marginBottom: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Select Departure Date</label>
                  <select
                    style={{
                      width: '100%', padding: '12px 14px',
                      border: '1.5px solid #E5E0D5', borderRadius: '12px',
                      fontSize: '14px', color: '#1A1A1A', background: 'white', outline: 'none',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {tour.availableDates.map((date: string) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Number of Travellers</label>
                  <div className="flex items-center gap-2">
                    <button style={{ width: '40px', height: '40px', background: '#F5F0E8', border: 'none', borderRadius: '10px', fontSize: '18px', cursor: 'pointer', color: '#1B3A2D', fontWeight: 700 }}>−</button>
                    <input
                      type="number" defaultValue={2} min={1} max={tour.maxGroupSize}
                      style={{
                        flex: 1, padding: '10px', border: '1.5px solid #E5E0D5',
                        borderRadius: '10px', textAlign: 'center',
                        fontSize: '16px', fontWeight: 700, color: '#1B3A2D',
                        fontFamily: "'DM Sans', sans-serif", outline: 'none',
                      }}
                    />
                    <button style={{ width: '40px', height: '40px', background: '#F5F0E8', border: 'none', borderRadius: '10px', fontSize: '18px', cursor: 'pointer', color: '#1B3A2D', fontWeight: 700 }}>+</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  className="book-btn w-full rounded-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #1B3A2D 0%, #3D8B5E 100%)',
                    color: 'white', border: 'none', cursor: 'pointer',
                    padding: '16px', fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px', fontWeight: 700,
                    boxShadow: '0 6px 24px rgba(27,58,45,0.3)',
                  }}
                >
                  🎒 Book Now
                </button>
                <button
                  className="callback-btn w-full rounded-2xl transition-all duration-300"
                  style={{
                    background: 'transparent',
                    color: '#1B3A2D', border: '2px solid #1B3A2D', cursor: 'pointer',
                    padding: '15px', fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px', fontWeight: 700,
                  }}
                >
                  📞 Request Callback
                </button>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #F0EAE0' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Need Help?</h4>
                <div className="flex flex-col gap-2">
                  <span style={{ fontSize: '13px', color: '#7A7265' }}>📞 +91-9573623034</span>
                  <span style={{ fontSize: '13px', color: '#7A7265' }}>✉️ info@CrazyTripMakers.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop: '80px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '36px' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, color: '#3D8B5E', marginBottom: '8px' }}>✦ What Travellers Say</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '-0.5px' }}>
                Customer <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Reviews</em>
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span style={{ fontSize: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#1B3A2D' }}>{tour.rating}/5</span>
              <span style={{ fontSize: '14px', color: '#7A7265' }}>({tour.reviews} reviews)</span>
            </div>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              { name: 'Rahul Sharma', loc: 'Mumbai, Maharashtra', text: 'Amazing experience! Everything was perfectly organized. The guides were knowledgeable and the hotels were great. Would 100% book again with CrazyTripMakers!' },
              { name: 'Priya Patel', loc: 'Ahmedabad, Gujarat', text: 'The Himachal tour was breathtaking. Every detail was taken care of. The group was friendly and the itinerary was perfectly paced. Highly recommended!' },
              { name: 'Anita Desai', loc: 'Hyderabad, Telangana', text: 'Flawless execution from start to finish. Our family had the time of our lives. The team was responsive and went above and beyond to make us comfortable.' },
            ].map(({ name, loc, text }) => (
              <div
                key={name}
                className="review-card bg-white rounded-2xl p-7"
                style={{ boxShadow: '0 4px 20px rgba(27,58,45,0.08)' }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', color: '#C9A84C', opacity: 0.3, lineHeight: 0.5, marginBottom: '12px' }}>"</div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p style={{ fontSize: '15px', color: '#4A4540', lineHeight: 1.7, fontStyle: 'italic', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>{text}</p>
                <div className="flex items-center gap-3">
                  <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #1B3A2D, #3D8B5E)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: '#C9A84C' }}>
                    {name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1B3A2D' }}>{name}</div>
                    <div style={{ fontSize: '12px', color: '#7A7265' }}>{loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/919773335623"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed', bottom: '32px', right: '32px',
          width: '56px', height: '56px',
          background: '#25D366', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', textDecoration: 'none',
          boxShadow: '0 8px 32px rgba(37,211,102,0.4)',
          zIndex: 900,
          animation: 'float 3s ease-in-out infinite',
        }}
        title="Chat on WhatsApp"
      >
        💬
      </a>

      <Footer />
    </div>
  );
}