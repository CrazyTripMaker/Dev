import { Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#FAF6EF', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .form-input:focus { border-color: #3D8B5E !important; box-shadow: 0 0 0 3px rgba(61,139,94,0.1) !important; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(27,58,45,0.4) !important; }
        .contact-info-item:hover .contact-icon { background: rgba(201,168,76,0.2) !important; border-color: rgba(201,168,76,0.4) !important; }
      `}</style>

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{
          height: '320px',
          background: 'linear-gradient(180deg, rgba(27,58,45,0.75) 0%, rgba(27,58,45,0.5) 100%), url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920) center/cover no-repeat',
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
            ✦ Get In Touch
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900,
              color: 'white', letterSpacing: '-1px', lineHeight: 1.1,
              margin: '0 0 12px',
            }}
          >
            Let's plan your <em style={{ fontStyle: 'italic', color: '#E8C97A' }}>journey</em>
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', fontWeight: 300, maxWidth: '480px', margin: '0 auto' }}>
            Our travel experts are just a message away
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'start' }}>

          {/* Left: Info Panel */}
          <div
            className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: '#1B3A2D' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(61,139,94,0.3) 0%, transparent 60%)' }}
            />
            <div className="relative z-10">
              <div
                className="inline-block rounded-full mb-7"
                style={{
                  background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)',
                  padding: '6px 16px', fontSize: '11px', color: '#C9A84C',
                  letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700,
                }}
              >
                Contact Details
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '36px', fontWeight: 700, color: 'white',
                  lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '16px',
                }}
              >
                Plan your<br /><em style={{ fontStyle: 'italic', color: '#E8C97A' }}>dream trip</em><br />with us
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontWeight: 300, marginBottom: '40px' }}>
                Our travel experts are available 6 days a week to help you craft the perfect itinerary — wherever your heart wants to go.
              </p>

              {[
                { icon: '📞', label: 'Phone', value: '+91-9573623034 / +91-9974542678', sub: 'Mon–Sat, 9AM–8PM IST' },
                { icon: '✉️', label: 'Email', value: 'info@CrazyTripMakers.com', sub: 'We reply within 24 hours' },
                { icon: '📍', label: 'Office', value: 'Hyderabad & Ahmedabad', sub: 'Visit by appointment' },
                { icon: '⏰', label: 'Working Hours', value: 'Monday – Saturday', sub: '9:00 AM – 8:00 PM IST' },
              ].map(({ icon, label, value, sub }) => (
                <div key={label} className="contact-info-item flex items-start gap-4 mb-6">
                  <div
                    className="contact-icon flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300"
                    style={{
                      width: '48px', height: '48px',
                      background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                      fontSize: '20px',
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{value}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '36px', fontWeight: 700, color: '#1B3A2D',
                letterSpacing: '-0.5px', marginBottom: '8px',
              }}
            >
              Send us a message
            </h2>
            <p style={{ fontSize: '15px', color: '#7A7265', marginBottom: '36px', fontWeight: 300 }}>
              Tell us about your dream trip and we'll craft the perfect plan for you.
            </p>

            <form className="flex flex-col gap-5">
              <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {[
                  { label: 'Your Name', type: 'text', placeholder: 'Rahul Sharma' },
                  { label: 'Phone Number', type: 'tel', placeholder: '+91-9876543210' },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="form-input w-full rounded-xl outline-none transition-all"
                      style={{ padding: '14px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A', background: 'white' }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  className="form-input w-full rounded-xl outline-none transition-all"
                  style={{ padding: '14px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A', background: 'white' }}
                />
              </div>

              <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Destination</label>
                  <input
                    type="text"
                    placeholder="Kashmir, Manali..."
                    className="form-input w-full rounded-xl outline-none transition-all"
                    style={{ padding: '14px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A', background: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Tour Type</label>
                  <select
                    className="form-input w-full rounded-xl outline-none transition-all"
                    style={{ padding: '14px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A', background: 'white' }}
                  >
                    <option>Group Tour</option>
                    <option>Personal Tour</option>
                    <option>Customised Tour</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Subject</label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="form-input w-full rounded-xl outline-none transition-all"
                  style={{ padding: '14px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A', background: 'white' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your inquiry..."
                  className="form-input w-full rounded-xl outline-none transition-all"
                  style={{ padding: '14px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A', background: 'white', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="submit-btn flex items-center justify-center gap-3 w-full rounded-2xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #1B3A2D 0%, #3D8B5E 100%)',
                  color: 'white', border: 'none', cursor: 'pointer',
                  padding: '16px', fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px', fontWeight: 600, letterSpacing: '0.3px',
                  boxShadow: '0 6px 24px rgba(27,58,45,0.3)',
                }}
              >
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}