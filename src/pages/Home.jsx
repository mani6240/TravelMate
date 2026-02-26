import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div>
      <section
        className="hero"
        style={{
          backgroundImage:"linear-gradient(rgba(30, 64, 175, 0.68), rgba(15, 23, 42, 0.68)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize:'cover',
          backgroundPosition:'center'
        }}
      >
        <div className="hero-content">
          <h1>Your Ultimate Trip Planning Companion</h1>
          <p>Simplify your travel planning with TravelMate. Book flights, accommodations, and create itineraries all in one place.</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-outline btn-lg">Get Started</Link>
            <a href="#features" className="btn btn-primary btn-lg">Learn More</a>
          </div>
        </div>
      </section>

      <section id="features" className="container">
        <h2 style={{textAlign:'center', fontSize:'2.5rem', marginBottom:'3rem', color:'var(--text-primary)'}}>Why Choose TravelMate?</h2>
        <div className="grid grid-3">
          <div className="card">
            <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>🗓️</div>
            <h3 style={{textAlign:'center', marginBottom:'1rem'}}>Smart Trip Planning</h3>
            <p>Create detailed itineraries with our intuitive trip planner. Organize activities, accommodations, and transport all in one place.</p>
          </div>
          <div className="card">
            <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>🏨</div>
            <h3 style={{textAlign:'center', marginBottom:'1rem'}}>Easy Booking</h3>
            <p>Book flights, hotels, and transportation with confidence. Compare prices and get the best deals for your travel needs.</p>
          </div>
          <div className="card">
            <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>💰</div>
            <h3 style={{textAlign:'center', marginBottom:'1rem'}}>Budget Tracking</h3>
            <p>Keep track of your travel expenses. Set budgets and monitor spending throughout your journey.</p>
          </div>
          <div className="card">
            <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>🌍</div>
            <h3 style={{textAlign:'center', marginBottom:'1rem'}}>Destination Info</h3>
            <p>Explore detailed information about destinations including attractions, weather, and local tips.</p>
          </div>
          <div className="card">
            <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>❤️</div>
            <h3 style={{textAlign:'center', marginBottom:'1rem'}}>Wishlist</h3>
            <p>Save your favorite destinations and accommodations. Build your travel bucket list easily.</p>
          </div>
          <div className="card">
            <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>📱</div>
            <h3 style={{textAlign:'center', marginBottom:'1rem'}}>Mobile Ready</h3>
            <p>Access your travel plans anywhere, anytime. Fully responsive design works on all devices.</p>
          </div>
        </div>
      </section>

      <section style={{background:'linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%)', color:'white', padding:'4rem 2rem', textAlign:'center'}}>
        <div className="container">
          <h2 style={{fontSize:'2.5rem', marginBottom:'3rem'}}>Join Thousands of Happy Travelers</h2>
          <div className="stats-grid">
            <div className="stat-card" style={{background:'rgba(255,255,255,0.1)', border:'2px solid white'}}>
              <div style={{color:'white', fontSize:'2.5rem', fontWeight:700}}>5K+</div>
              <div style={{color:'rgba(255,255,255,0.9)', marginTop:'0.5rem'}}>Active Users</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.1)', border:'2px solid white'}}>
              <div style={{color:'white', fontSize:'2.5rem', fontWeight:700}}>150+</div>
              <div style={{color:'rgba(255,255,255,0.9)', marginTop:'0.5rem'}}>Destinations</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.1)', border:'2px solid white'}}>
              <div style={{color:'white', fontSize:'2.5rem', fontWeight:700}}>$2M</div>
              <div style={{color:'rgba(255,255,255,0.9)', marginTop:'0.5rem'}}>Travel Booked</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.1)', border:'2px solid white'}}>
              <div style={{color:'white', fontSize:'2.5rem', fontWeight:700}}>4.9★</div>
              <div style={{color:'rgba(255,255,255,0.9)', marginTop:'0.5rem'}}>Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" style={{background:'var(--surface-color)', padding:'5.5rem 2rem', minHeight:'88vh', display:'flex', alignItems:'center'}}>
        <div className="container">
          <h2 style={{fontSize:'2.75rem', marginBottom:'0.5rem', textAlign:'center', color:'var(--text-primary)'}}>About TravelMate</h2>
          <p style={{maxWidth:'850px', margin:'0 auto 3rem', textAlign:'center', color:'var(--text-secondary)', fontSize:'1.12rem', lineHeight:1.8}}>
            TravelMate is built for modern travelers who want everything in one place. From discovering destinations to organizing every day of the trip, we make planning faster, clearer, and more enjoyable.
          </p>
          <div className="grid grid-2" style={{gap:'2.5rem'}}>
            <div>
              <h3 style={{color:'var(--primary-color)', marginBottom:'1rem', fontSize:'1.55rem'}}>Our Mission</h3>
              <p style={{fontSize:'1.08rem', lineHeight:1.9, marginBottom:'1rem'}}>TravelMate is dedicated to making travel planning simple, affordable, and enjoyable for everyone. We believe that travel should be an adventure, not a hassle.</p>
              <p style={{fontSize:'1.08rem', lineHeight:1.9, marginBottom:'1rem'}}>Our platform combines trip planning, booking tools, and budget tracking in one seamless experience, so you can spend less time organizing and more time exploring.</p>
              <p style={{fontSize:'1.08rem', lineHeight:1.9}}>Whether it is a weekend getaway or a multi-country journey, TravelMate gives you a structured plan with the flexibility to adjust anytime.</p>
            </div>
            <div>
              <h3 style={{color:'var(--primary-color)', marginBottom:'1rem', fontSize:'1.55rem'}}>Why We Started</h3>
              <p style={{fontSize:'1.08rem', lineHeight:1.9, marginBottom:'1rem'}}>We created TravelMate after seeing how frustrating trip planning can be. Flights on one website, hotels on another, and budgets in spreadsheets made the process fragmented and stressful.</p>
              <p style={{fontSize:'1.08rem', lineHeight:1.9, marginBottom:'1rem'}}>Our goal was to design a travel workspace that feels professional and intuitive, where every decision is connected and easy to manage.</p>
              <p style={{fontSize:'1.08rem', lineHeight:1.9}}>Today, thousands of travelers use TravelMate to plan confidently, stay on budget, and enjoy a smoother journey from day one.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" style={{background:'linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #0ea5e9 100%)', color:'white', padding:'6rem 2rem', textAlign:'center'}}>
        <div className="container">
          <h2 style={{fontSize:'2.75rem', marginBottom:'0.75rem'}}>Get In Touch</h2>
          <p style={{maxWidth:'760px', margin:'0 auto 2.5rem', color:'rgba(255,255,255,0.9)', fontSize:'1.1rem'}}>
            Have questions about planning, booking, or your account? Our team is ready to help you build your next great trip.
          </p>
          <div className="grid grid-3" style={{gap:'1.25rem', marginBottom:'2.5rem'}}>
            <div style={{background:'rgba(255,255,255,0.14)', border:'1px solid rgba(255,255,255,0.35)', borderRadius:'0.9rem', padding:'1.2rem'}}>
              <h4 style={{marginBottom:'0.4rem'}}>{'\uD83D\uDCE7'} Email</h4>
              <p><a href="mailto:support@travelmate.com" style={{color:'white', textDecoration:'none'}}>support@travelmate.com</a></p>
            </div>
            <div style={{background:'rgba(255,255,255,0.14)', border:'1px solid rgba(255,255,255,0.35)', borderRadius:'0.9rem', padding:'1.2rem'}}>
              <h4 style={{marginBottom:'0.4rem'}}>{'\uD83D\uDCF1'} Phone</h4>
              <p><a href="tel:+1234567890" style={{color:'white', textDecoration:'none'}}>+1 (234) 567-890</a></p>
            </div>
            <div style={{background:'rgba(255,255,255,0.14)', border:'1px solid rgba(255,255,255,0.35)', borderRadius:'0.9rem', padding:'1.2rem'}}>
              <h4 style={{marginBottom:'0.4rem'}}>{'\uD83D\uDCCD'} Address</h4>
              <p>123 Travel Street, Adventure City, AC 12345</p>
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.16)', border:'1px solid rgba(255,255,255,0.35)', padding:'2rem', borderRadius:'1rem', marginBottom:'1rem', maxWidth:'760px', marginLeft:'auto', marginRight:'auto'}}>
            <h3 style={{marginBottom:'1rem', fontSize:'1.5rem'}}>Send us a Message</h3>
            <form style={{display:'grid', gap:'0.9rem'}}>
              <input type="text" placeholder="Your Name" style={{padding:'0.9rem 1rem', borderRadius:'0.65rem', border:'1px solid rgba(255,255,255,0.4)', background:'rgba(255,255,255,0.95)', color:'#0f172a'}} />
              <input type="email" placeholder="Your Email" style={{padding:'0.9rem 1rem', borderRadius:'0.65rem', border:'1px solid rgba(255,255,255,0.4)', background:'rgba(255,255,255,0.95)', color:'#0f172a'}} />
              <textarea placeholder="Your Message" rows="5" style={{padding:'0.9rem 1rem', borderRadius:'0.65rem', border:'1px solid rgba(255,255,255,0.4)', background:'rgba(255,255,255,0.95)', color:'#0f172a'}}></textarea>
              <button type="submit" className="btn btn-primary" style={{background:'#0f172a', border:'1px solid rgba(255,255,255,0.45)'}}>Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <section style={{background:'var(--surface-color)', padding:'4rem 2rem', textAlign:'center'}}>
        <div className="container">
          <h2 style={{fontSize:'2.5rem', marginBottom:'1rem'}}>Ready to Start Your Adventure?</h2>
          <p style={{fontSize:'1.125rem', color:'var(--text-light)', marginBottom:'2rem'}}>Join TravelMate today and plan your perfect trip!</p>
          <Link to="/login" className="btn btn-primary btn-lg">Sign Up</Link>
        </div>
      </section>
    </div>
  );
}

