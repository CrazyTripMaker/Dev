import { useState } from 'react';

export default function ContactBranch() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    tourType: 'Group Tour',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .contact-section {
          background: #F5F0E8;
          padding: 100px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── LEFT VISUAL PANEL ── */
        .contact-visual {
          background: #1B3A2D;
          border-radius: 24px;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .contact-visual-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 70%, rgba(61,139,94,0.3) 0%, transparent 60%);
          pointer-events: none;
        }
        .contact-tag {
          position: relative; z-index: 1;
          display: inline-block;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 50px; padding: 6px 16px;
          font-size: 11px; color: #C9A84C;
          letter-spacing: 2px; text-transform: uppercase;
          font-weight: 700; margin-bottom: 28px;
        }
        .contact-visual-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px; font-weight: 700;
          color: white; line-height: 1.2;
          letter-spacing: -0.5px; margin-bottom: 16px;
          position: relative; z-index: 1;
        }
        .contact-visual-title em {
          font-style: italic;
          color: #E8C97A;
        }
        .contact-visual-desc {
          font-size: 15px; color: rgba(255,255,255,0.55);
          line-height: 1.7; font-weight: 300;
          position: relative; z-index: 1;
          margin-bottom: 36px;
        }

        .contact-info-items {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; gap: 20px;
        }
        .contact-info-item {
          display: flex; align-items: flex-start; gap: 16px;
        }
        .contact-info-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .contact-info-text {
          font-size: 14px; color: rgba(255,255,255,0.85);
          font-weight: 500; line-height: 1.4;
        }
        .contact-info-sub {
          font-size: 12px; color: rgba(255,255,255,0.4);
          margin-top: 3px;
        }

        /* ── RIGHT FORM PANEL ── */
        .contact-form-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px; font-weight: 700;
          color: #1B3A2D; margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .contact-form-desc {
          font-size: 15px; color: #7A7265;
          margin-bottom: 36px; font-weight: 300;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-size: 12px; font-weight: 700;
          color: #1B3A2D; letter-spacing: 0.5px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%; padding: 14px 16px;
          border: 1.5px solid #E5E0D5;
          border-radius: 12px; outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: #1A1A1A;
          background: white;
          transition: border-color 0.3s, box-shadow 0.3s;
          appearance: none;
          -webkit-appearance: none;
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: #3D8B5E;
          box-shadow: 0 0 0 3px rgba(61,139,94,0.1);
        }
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #7A7265;
          font-weight: 400;
        }
        .form-group textarea {
          resize: none; height: 100px;
        }

        .form-submit {
          width: 100%; padding: 16px;
          background: linear-gradient(135deg, #1B3A2D 0%, #3D8B5E 100%);
          color: white; border: none; cursor: pointer;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          letter-spacing: 0.3px;
          display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: all 0.3s;
          box-shadow: 0 6px 24px rgba(27,58,45,0.3);
        }
        .form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(27,58,45,0.4);
        }

        @media (max-width: 900px) {
          .contact-section {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 60px 20px;
          }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="contact-section" id="contact">

        {/* ── LEFT: Info Panel ── */}
        <div className="contact-visual">
          <div className="contact-visual-bg" />
          <div className="contact-tag">Get In Touch</div>
          <h2 className="contact-visual-title">
            Plan your<br /><em>dream trip</em><br />with us
          </h2>
          <p className="contact-visual-desc">
            Our travel experts are available 6 days a week to help you craft the perfect itinerary — wherever your heart wants to go.
          </p>
          <div className="contact-info-items">
            <div className="contact-info-item">
              <div className="contact-info-icon">📞</div>
              <div>
                <div className="contact-info-text">+91-9573623034 / +91-9974542678</div>
                <div className="contact-info-sub">Mon–Sat, 9AM–8PM IST</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">✉️</div>
              <div>
                <div className="contact-info-text">info@CrazyTripMakers.com</div>
                <div className="contact-info-sub">We reply within 24 hours</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">📍</div>
              <div>
                <div className="contact-info-text">Hyderabad &amp; Ahmedabad</div>
                <div className="contact-info-sub">Visit by appointment</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form Panel ── */}
        <div>
          <h2 className="contact-form-title">Send us a message</h2>
          <p className="contact-form-desc">
            Tell us about your dream trip and we'll craft the perfect plan for you.
          </p>

          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text" name="name" placeholder="Rahul Sharma"
                value={formData.name} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel" name="phone" placeholder="+91-9876543210"
                value={formData.phone} onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email" name="email" placeholder="rahul@example.com"
              value={formData.email} onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text" name="destination" placeholder="Kashmir, Manali..."
                value={formData.destination} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Tour Type</label>
              <select name="tourType" value={formData.tourType} onChange={handleChange}>
                <option>Group Tour</option>
                <option>Personal Tour</option>
                <option>Customised Tour</option>
                <option>Honeymoon Package</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Tell us about your travel dates, group size, budget and preferences..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button className="form-submit" onClick={handleSubmit}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
            </svg>
            Send Message
          </button>
        </div>

      </section>
    </>
  );
}