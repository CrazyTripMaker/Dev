import { useState } from 'react';
import { Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CustomisedTours() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', destination: '',
    startDate: '', endDate: '', travelers: '2', budget: '', preferences: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#FAF6EF', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .form-input:focus { border-color: #3D8B5E !important; box-shadow: 0 0 0 3px rgba(61,139,94,0.1) !important; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(27,58,45,0.4) !important; }
        .step-card { transition: transform 0.3s, box-shadow 0.3s; }
        .step-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(27,58,45,0.12) !important; }
      `}</style>

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{
          height: '320px',
          background: 'linear-gradient(180deg, rgba(27,58,45,0.75) 0%, rgba(27,58,45,0.5) 100%), url(https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&w=1920) center/cover no-repeat',
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
            ✦ Build Your Journey
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900,
              color: 'white', letterSpacing: '-1px', lineHeight: 1.1,
              margin: '0 0 12px',
            }}
          >
            Customised <em style={{ fontStyle: 'italic', color: '#E8C97A' }}>Tours</em>
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', fontWeight: 300, maxWidth: '480px', margin: '0 auto' }}>
            Create your dream vacation with a personalized itinerary crafted just for you
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1.3fr', alignItems: 'start' }}>

          {/* Left: Info */}
          <div className="flex flex-col gap-6">
            {/* Steps */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, color: '#3D8B5E', marginBottom: '12px' }}>✦ How It Works</div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '36px', fontWeight: 700, color: '#1B3A2D',
                  lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: '8px',
                }}
              >
                Plan your <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>dream trip</em>
              </h2>
              <p style={{ fontSize: '15px', color: '#7A7265', lineHeight: 1.7, fontWeight: 300, marginBottom: '32px' }}>
                Fill out the form and our travel experts will create a customized itinerary tailored to your preferences and budget.
              </p>

              {[
                { icon: '📍', title: 'Choose Your Destination', desc: 'Tell us where you want to go and we\'ll craft the perfect route' },
                { icon: '📅', title: 'Select Your Dates', desc: 'Pick your travel dates and duration for the perfect timing' },
                { icon: '👥', title: 'Personalize Your Experience', desc: 'Share your preferences and we\'ll customize everything' },
                { icon: '✈️', title: 'Travel & Enjoy', desc: 'Sit back and enjoy while we handle every last detail' },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="step-card flex items-start gap-4 bg-white rounded-2xl p-5 mb-4"
                  style={{ boxShadow: '0 4px 20px rgba(27,58,45,0.07)' }}
                >
                  <div
                    className="flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{
                      width: '48px', height: '48px',
                      background: 'rgba(27,58,45,0.06)', fontSize: '22px',
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1B3A2D', marginBottom: '4px' }}>{title}</h3>
                    <p style={{ fontSize: '13px', color: '#7A7265', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact card */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: '#1B3A2D' }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.12) 0%, transparent 60%)' }}
              />
              <div className="relative z-10">
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '12px',
                  }}
                >
                  Need immediate help?
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px', fontWeight: 300 }}>
                  Our travel experts are here to assist you directly!
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+919773335623"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      textDecoration: 'none', fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: 500,
                    }}
                  >
                    <span style={{ width: '36px', height: '36px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📞</span>
                    +91-9773335623
                  </a>
                  <a
                    href="mailto:info@crazytripmakers.com"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      textDecoration: 'none', fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: 500,
                    }}
                  >
                    <span style={{ width: '36px', height: '36px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✉️</span>
                    info@crazytripmakers.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="bg-white rounded-3xl"
            style={{ padding: '48px', boxShadow: '0 8px 48px rgba(27,58,45,0.1)' }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px', fontWeight: 700, color: '#1B3A2D',
                letterSpacing: '-0.5px', marginBottom: '6px',
              }}
            >
              Request a Custom Quote
            </h2>
            <p style={{ fontSize: '14px', color: '#7A7265', marginBottom: '32px', fontWeight: 300 }}>
              We'll get back to you within 24 hours with a personalised itinerary
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Rahul Sharma' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'rahul@example.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{label} *</label>
                    <input
                      type={type} name={name} required
                      value={(formData as any)[name]} onChange={handleChange}
                      placeholder={placeholder}
                      className="form-input w-full rounded-xl outline-none transition-all"
                      style={{ padding: '13px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A' }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Phone Number *</label>
                <input
                  type="tel" name="phone" required
                  value={formData.phone} onChange={handleChange}
                  placeholder="+91-9876543210"
                  className="form-input w-full rounded-xl outline-none transition-all"
                  style={{ padding: '13px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Destination *</label>
                <input
                  type="text" name="destination" required
                  value={formData.destination} onChange={handleChange}
                  placeholder="e.g., Kashmir, Kerala, Himachal"
                  className="form-input w-full rounded-xl outline-none transition-all"
                  style={{ padding: '13px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A' }}
                />
              </div>

              <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {[
                  { name: 'startDate', label: 'Start Date', type: 'date' },
                  { name: 'endDate', label: 'End Date', type: 'date' },
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{label} *</label>
                    <input
                      type={type} name={name} required
                      value={(formData as any)[name]} onChange={handleChange}
                      className="form-input w-full rounded-xl outline-none transition-all"
                      style={{ padding: '13px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A' }}
                    />
                  </div>
                ))}
              </div>

              <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Travellers *</label>
                  <select
                    name="travelers" value={formData.travelers} onChange={handleChange}
                    className="form-input w-full rounded-xl outline-none transition-all"
                    style={{ padding: '13px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A', background: 'white' }}
                  >
                    {['1 Person', '2 People', '3 People', '4 People', '5 People', '6+ People'].map((v, i) => (
                      <option key={v} value={i === 5 ? '6+' : String(i + 1)}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Budget (INR) *</label>
                  <input
                    type="text" name="budget" required
                    value={formData.budget} onChange={handleChange}
                    placeholder="e.g., 50,000"
                    className="form-input w-full rounded-xl outline-none transition-all"
                    style={{ padding: '13px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1B3A2D', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Special Preferences</label>
                <textarea
                  name="preferences" value={formData.preferences} onChange={handleChange}
                  rows={4} placeholder="Tell us about your interests, activities, dietary requirements, accommodation preferences, etc."
                  className="form-input w-full rounded-xl outline-none transition-all"
                  style={{ padding: '13px 16px', border: '1.5px solid #E5E0D5', fontSize: '14px', color: '#1A1A1A', resize: 'none' }}
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
                <Send className="w-5 h-5" /> Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}