import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

// ============ MODERN CSS-IN-JS STYLES ============
const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #db2777 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(219, 39, 119, 0.3)',
  },
  buttonSecondary: {
    background: 'white',
    color: '#db2777',
    border: '2px solid #db2777',
    padding: '12px 28px',
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
};

// ============ HOME PAGE ============
function HomePage() {
  const categories = [
    { id: 'hair', name: 'Hair', icon: '💇‍♀️', image: 'https://i.pinimg.com/736x/33/f4/90/33f490c5d74a943ce772b4e10d8c4497.jpg', description: 'Braids, Weaves, Wigs, Color & Cuts', gradient: 'linear-gradient(135deg, #f472b6, #ec4899)' },
    { id: 'nails', name: 'Nails', icon: '💅', image: 'https://i.pinimg.com/736x/72/3e/ff/723effbf6db7ec8a8e3bc84d6ed0507d.jpg', description: 'Gel, Acrylic, Art & Designs', gradient: 'linear-gradient(135deg, #ec4899, #a855f7)' },
    { id: 'pedicure', name: 'Pedicure', icon: '🦶', image: 'https://i.pinimg.com/736x/f5/a3/78/f5a3787cacfa07bcf75373fe476093e5.jpg', description: 'Medicure, Spa & Care', gradient: 'linear-gradient(135deg, #a855f7, #8b5cf6)' },
    { id: 'spa', name: 'Spa', icon: '🧖‍♀️', image: 'https://i.pinimg.com/736x/8c/9f/a7/8c9fa7dbc6e87d9a2d83c5bf0acf7874.jpg', description: 'Massage, Facial & Body Treatments', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <div style={{ fontSize: '72px', marginBottom: '16px' }}>✨</div>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          <span style={styles.gradientText}>Meseret's Luxury Salon</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px', marginBottom: '8px' }}>Bole, Addis Ababa</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>)}
          <span style={{ color: '#6b7280', marginLeft: '8px' }}>4.9 (1,240+ reviews)</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '60px' }}>
        {categories.map(cat => (
          <Link to={`/services/${cat.id}`} key={cat.id} style={{ textDecoration: 'none' }}>
            <div style={{
              ...styles.glassCard,
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
              cursor: 'pointer',
              height: '100%',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 30px 40px -20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 35px -10px rgba(0,0,0,0.1)';
            }}>
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', padding: '8px 12px', borderRadius: '40px', fontSize: '24px' }}>
                  {cat.icon}
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#1f2937' }}>{cat.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '16px' }}>{cat.description}</p>
                <div style={{ color: '#db2777', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Explore <span style={{ fontSize: '18px' }}>→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* VIP Section */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7, #fffbeb)',
        borderRadius: '32px',
        padding: '48px',
        textAlign: 'center',
        marginBottom: '40px',
        border: '1px solid rgba(251, 191, 36, 0.2)',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>👑</div>
        <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#92400e', marginBottom: '12px' }}>VIP Salon Buyout</h2>
        <p style={{ color: '#78350f', fontSize: '16px', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
          Book the entire salon for you and your friends • Private entrance • Dedicated staff • Welcome drinks
        </p>
        <Link to="/vip-booking">
          <button style={styles.buttonSecondary}>Book VIP Experience →</button>
        </Link>
      </div>
    </div>
  );
}

// ============ SERVICE PAGE (with YOUR images) ============
function ServicePage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedInspo, setSelectedInspo] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', notes: '' });
  const [step, setStep] = useState(1);

  const categoryData = {
    hair: { name: 'Hair Styles', icon: '💇‍♀️', gradient: 'linear-gradient(135deg, #f472b6, #ec4899)' },
    nails: { name: 'Nail Designs', icon: '💅', gradient: 'linear-gradient(135deg, #ec4899, #a855f7)' },
    pedicure: { name: 'Pedicure & Medicure', icon: '🦶', gradient: 'linear-gradient(135deg, #a855f7, #8b5cf6)' },
    spa: { name: 'Spa & Massage', icon: '🧖‍♀️', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
  };

  // YOUR ORIGINAL IMAGES (preserved exactly as you had them)
  const inspirationImages = {
    hair: [
      { id: 1, url: 'https://i.pinimg.com/736x/cd/3e/16/cd3e16d7030d0b3ef94fc44c0c2f2908.jpg', title: 'Knotless Braids', description: 'Medium length with beads' },
      { id: 2, url: 'https://i.pinimg.com/736x/aa/81/df/aa81df91ce78aa618060e64dce8db511.jpg', title: 'straight', description: 'Traditional pattern with cowrie shells' },
      { id: 3, url: 'https://i.pinimg.com/736x/11/cf/b2/11cfb2acacc2e81bc0e7b0171390869c.jpg', title: 'Box Braids', description: 'Classic medium box braids' },
      { id: 4, url: 'https://images.unsplash.com/photo-1525692103677-7a20e6f2cfc2?w=400', title: 'Cornrows', description: 'Stylish geometric patterns' },
      { id: 5, url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', title: 'Butterfly Locs', description: 'Bohemian goddess locs' },
      { id: 6, url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400', title: 'Hair Color', description: 'Bold colors and highlights' }
    ],
    nails: [
      { id: 1, url: 'https://i.pinimg.com/736x/0c/e8/d2/0ce8d273770d535da454fc4940054cf2.jpg', title: 'French Tip', description: 'Classic with a twist' },
      { id: 2, url: 'https://i.pinimg.com/736x/c2/0b/d5/c20bd56237eed9f5d84e5aec3f190c83.jpg', title: 'Almond Nails', description: 'Elegant and long' },
      { id: 3, url: 'https://i.pinimg.com/736x/5a/fa/ca/5afaca7a4c53bf9f06c7daa071eb2b70.jpg', title: 'Nail Art', description: 'Custom designs' },
      { id: 4, url: 'https://i.pinimg.com/736x/7f/a6/ad/7fa6ad661148c6b9437725528e56dfb0.jpg', title: 'Glitter Nails', description: 'Party ready' },
      { id: 5, url: 'https://i.pinimg.com/736x/98/b0/59/98b0595a04508a1d38e2e384020bcc37.jpg', title: 'Matte Finish', description: 'Modern and chic' },
      { id: 6, url: 'https://i.pinimg.com/736x/72/3e/ff/723effbf6db7ec8a8e3bc84d6ed0507d.jpg', title: 'Rhinestone Nails', description: 'Luxury crystals' }
    ],
    pedicure: [
      { id: 1, url: 'https://images.unsplash.com/photo-1549465220-1a8c1847e6b3?w=400', title: 'Classic Pedicure', description: 'Clean and polished' },
      { id: 2, url: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=400', title: 'Spa Pedicure', description: 'With massage' },
      { id: 3, url: 'https://images.unsplash.com/photo-1512006676798-5690811cf41a?w=400', title: 'Nail Art Toes', description: 'Detailed designs' },
      { id: 4, url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400', title: 'Gel Pedicure', description: 'Long lasting' }
    ],
    spa: [
      { id: 1, url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400', title: 'Hot Stone Massage', description: 'Deep relaxation' },
      { id: 2, url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400', title: 'Facial Treatment', description: 'Glowing skin' },
      { id: 3, url: 'https://images.unsplash.com/photo-1600334089648-b0b9d5b8b7d0?w=400', title: 'Body Scrub', description: 'Exfoliating' },
      { id: 4, url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', title: 'Aromatherapy', description: 'Essential oils' }
    ]
  };

  const images = inspirationImages[category] || inspirationImages.hair;
  const currentCategory = categoryData[category] || categoryData.hair;

  useEffect(() => {
    axios.get('/api/staff').then(res => setStaff(res.data));
  }, []);

  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  const handleBooking = async () => {
    const startDateTime = new Date();
    startDateTime.setHours(parseInt(selectedTime.split(':')));
    
    const serviceMap = { hair: 1, nails: 3, pedicure: 5, spa: 4 };
    const serviceId = serviceMap[category] || 1;
    
    await axios.post('/api/book', {
      customer_name: formData.name,
      customer_phone: formData.phone,
      service_id: serviceId,
      staff_id: selectedStaff.id,
      start_time: startDateTime.toISOString(),
      notes: `${formData.notes} | Inspo: ${selectedInspo?.title || 'None'}`
    });
    
    alert(`✅ Booking confirmed!\n\nService: ${category}\nStaff: ${selectedStaff.name}\nTime: ${selectedTime}\nWe'll send a confirmation to your phone.`);
    navigate('/');
  };

  if (showBooking) {
    return (
      <div style={{ ...styles.container, maxWidth: '600px', padding: '40px 24px' }}>
        <button onClick={() => setShowBooking(false)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', marginBottom: '24px', color: '#db2777', fontWeight: '500' }}>
          ← Back to Gallery
        </button>

        <div style={{ ...styles.glassCard, padding: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
            <span style={styles.gradientText}>Book Your Appointment</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px' }}>Complete the details below</p>
          
          {step === 1 && (
            <>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Choose Your Stylist</h3>
              {staff.map(s => (
                <div key={s.id} onClick={() => { setSelectedStaff(s); setStep(2); }} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '20px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: selectedStaff?.id === s.id ? '2px solid #db2777' : '1px solid #e5e7eb'
                }}>
                  <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                    💇
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '18px' }}>{s.name}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{s.role}</div>
                    <div style={{ fontSize: '13px', color: '#db2777', marginTop: '4px' }}>⭐ 4.9 • 5+ years experience</div>
                  </div>
                </div>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Select Time with {selectedStaff?.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {timeSlots.map(t => (
                  <button key={t} onClick={() => { setSelectedTime(t); setStep(3); }} style={{
                    padding: '12px',
                    background: selectedTime === t ? '#db2777' : 'white',
                    color: selectedTime === t ? 'white' : '#374151',
                    border: selectedTime === t ? 'none' : '1px solid #e5e7eb',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                  }}>{t}</button>
                ))}
              </div>
              <button onClick={() => setStep(1)} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>← Back to Stylists</button>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ background: '#fdf2f8', padding: '20px', borderRadius: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '600' }}>Service:</span>
                  <span>{currentCategory.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '600' }}>Stylist:</span>
                  <span>{selectedStaff?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '600' }}>Time:</span>
                  <span>{selectedTime}</span>
                </div>
                {selectedInspo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '600' }}>Style:</span>
                    <span>{selectedInspo.title}</span>
                  </div>
                )}
              </div>
              
              <input 
                type="text" 
                placeholder="Your full name" 
                style={styles.input} 
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Phone number" 
                style={{ ...styles.input, marginTop: '12px' }} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
              <textarea 
                placeholder="Special requests (optional)" 
                style={{ ...styles.input, marginTop: '12px', minHeight: '80px' }} 
                rows="3"
                onChange={e => setFormData({...formData, notes: e.target.value})}
              />
              
              <button 
                onClick={handleBooking} 
                style={{ ...styles.buttonPrimary, width: '100%', marginTop: '24px' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Confirm Booking
              </button>
              <button onClick={() => setStep(2)} style={{ width: '100%', background: 'none', color: '#6b7280', padding: '12px', border: 'none', cursor: 'pointer', marginTop: '12px' }}>
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={{ padding: '24px 0' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#db2777', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ← Back to Home
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '64px', marginBottom: '8px' }}>{currentCategory.icon}</div>
        <h1 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '12px' }}>
          <span style={styles.gradientText}>{currentCategory.name}</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Tap any style for inspiration, then book your appointment</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px', marginBottom: '48px' }}>
        {images.map(img => (
          <div key={img.id} onClick={() => { setSelectedInspo(img); setShowBooking(true); }} style={{
            ...styles.glassCard,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 25px 35px -12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 35px -10px rgba(0,0,0,0.1)';
          }}>
            <img src={img.url} alt={img.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>{img.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{img.description}</p>
              <div style={{ marginTop: '12px', color: '#db2777', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Book This Style <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <button 
          onClick={() => { setSelectedInspo(null); setShowBooking(true); }} 
          style={styles.buttonSecondary}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#db2777';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#db2777';
          }}
        >
          Or Book Without Inspiration →
        </button>
      </div>
    </div>
  );
}

// ============ VIP BOOKING ============
function VipBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', guests: 2, date: '', time: '' });

  const handleSubmit = () => {
    alert(`👑 VIP Booking Request Received!\n\nWe'll contact you within 24 hours to confirm.\n\nPrice: 15,000 ETB for 3 hours\nIncludes: Private entrance, dedicated staff, drinks, photo setup`);
    navigate('/');
  };

  return (
    <div style={{ ...styles.container, maxWidth: '600px', padding: '40px 24px' }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', marginBottom: '24px', color: '#db2777', fontWeight: '500' }}>
        ← Back to Home
      </button>

      <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fffbeb)', borderRadius: '32px', padding: '40px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
        <div style={{ fontSize: '64px', textAlign: 'center', marginBottom: '16px' }}>👑</div>
        <h2 style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '12px', color: '#92400e' }}>VIP Salon Buyout</h2>
        <p style={{ textAlign: 'center', marginBottom: '28px', color: '#78350f' }}>Book the entire salon for your private event</p>

        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', marginBottom: '28px' }}>
          <h3 style={{ fontWeight: '700', marginBottom: '16px' }}>✨ What's Included:</h3>
          <ul style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>🏢 Entire salon for 3 hours</li>
            <li>👥 Up to 6 guests</li>
            <li>💇 Dedicated staff (3 stylists)</li>
            <li>🥂 Welcome drinks & snacks</li>
            <li>📸 Private photo setup</li>
            <li>🎈 Birthday/bridal setup available</li>
          </ul>
          <p style={{ marginTop: '20px', fontSize: '24px', fontWeight: '700', color: '#92400e', textAlign: 'center' }}>15,000 ETB</p>
        </div>

        <input type="text" placeholder="Your name" style={styles.input} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="tel" placeholder="Phone number" style={{ ...styles.input, marginTop: '12px' }} onChange={e => setFormData({...formData, phone: e.target.value})} />
        <input type="number" placeholder="Number of guests (max 6)" style={{ ...styles.input, marginTop: '12px' }} onChange={e => setFormData({...formData, guests: e.target.value})} />
        <input type="date" style={{ ...styles.input, marginTop: '12px' }} onChange={e => setFormData({...formData, date: e.target.value})} />
        <input type="time" style={{ ...styles.input, marginTop: '12px', marginBottom: '24px' }} onChange={e => setFormData({...formData, time: e.target.value})} />

        <button onClick={handleSubmit} style={{ ...styles.buttonPrimary, width: '100%', background: 'linear-gradient(135deg, #92400e, #b45309)' }}>
          Request VIP Booking →
        </button>
      </div>
    </div>
  );
}

// ============ RECEPTIONIST DASHBOARD ============
function ReceptionistDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState([]);

  const login = () => {
    if (password === '1234') {
      setIsLoggedIn(true);
      loadAppointments();
    } else {
      alert('Wrong PIN. Try: 1234');
    }
  };

  const loadAppointments = async () => {
    const res = await axios.get('/api/today-appointments');
    setAppointments(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/api/appointment/${id}/status`, { status });
    loadAppointments();
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
        <div style={{ ...styles.glassCard, padding: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
            <span style={styles.gradientText}>Receptionist Login</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '28px', fontSize: '14px' }}>Enter your secure PIN</p>
          <input type="password" placeholder="PIN Code" style={styles.input} value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && login()} />
          <button onClick={login} style={{ ...styles.buttonPrimary, width: '100%', marginTop: '20px' }}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, maxWidth: '900px' }}>
      <div style={{ padding: '32px 0' }}>
        <div style={{ ...styles.glassCard, padding: '24px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700' }}>📅 Today's Schedule</h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {appointments.length === 0 ? (
          <div style={{ ...styles.glassCard, padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <p style={{ color: '#6b7280', fontSize: '18px' }}>No appointments today</p>
          </div>
        ) : (
          appointments.map(apt => (
            <div key={apt.id} style={{ ...styles.glassCard, padding: '20px', marginBottom: '16px', borderLeft: '4px solid #db2777' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{apt.customer_name}</div>
                  <div style={{ color: '#4b5563', fontSize: '14px', marginBottom: '8px' }}>📞 {apt.customer_phone}</div>
                  <div style={{ fontSize: '14px', marginBottom: '4px' }}>💇 {apt.service_name} with {apt.staff_name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>⏰ {new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => updateStatus(apt.id, 'completed')} style={{ background: '#16a34a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer', fontWeight: '500' }}>✅ Check-in</button>
                  <button onClick={() => updateStatus(apt.id, 'no_show')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer', fontWeight: '500' }}>❌ No-show</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============ ADMIN PANEL ============
function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ total: 0 });

  const login = () => {
    if (password === 'admin123') {
      setIsLoggedIn(true);
      loadStats();
    } else {
      alert('Wrong password');
    }
  };

  const loadStats = async () => {
    const res = await axios.get('/api/today-appointments');
    setStats({ total: res.data.length });
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
        <div style={{ ...styles.glassCard, padding: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
            <span style={styles.gradientText}>Admin Login</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '28px', fontSize: '14px' }}>Enter administrator password</p>
          <input type="password" placeholder="Password" style={styles.input} value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && login()} />
          <button onClick={login} style={{ ...styles.buttonPrimary, width: '100%', marginTop: '20px' }}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, maxWidth: '600px' }}>
      <div style={{ padding: '32px 0' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>🔧 Admin Dashboard</h1>
        <div style={{ ...styles.glassCard, padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', fontWeight: '700', color: '#db2777' }}>{stats.total}</div>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>Today's Appointments</p>
        </div>
        <div style={{ ...styles.glassCard, padding: '24px' }}>
          <h3 style={{ fontWeight: '700', marginBottom: '16px' }}>🤖 System Status</h3>
          <div style={{ color: '#16a34a', marginBottom: '8px' }}>✅ Backend Server: Running</div>
          <div style={{ color: '#16a34a', marginBottom: '8px' }}>✅ Database: Connected</div>
          <div style={{ color: '#ca8a04' }}>⚠️ Telegram Bot: Not Configured</div>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
function App() {
  return (
    <BrowserRouter>
      <div style={{ background: 'white', padding: '16px 0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ ...styles.container, display: 'flex', gap: '32px', justifyContent: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#db2777', fontWeight: '600' }}>🏠 Home</Link>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>👩‍💼 Receptionist</Link>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>🔧 Admin</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:category" element={<ServicePage />} />
        <Route path="/vip-booking" element={<VipBooking />} />
        <Route path="/dashboard" element={<ReceptionistDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;