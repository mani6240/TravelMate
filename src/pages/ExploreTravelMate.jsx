import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userManager } from '../lib/managers';

export default function ExploreTravelMate() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userManager.isLoggedIn()) navigate('/login');
  }, [navigate]);

  return (
    <div className="main-content">
        <h1>Explore TravelMate</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
          Learn about the platform without leaving your dashboard workflow.
        </p>

        <section id="features" className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">Features</div>
          <div className="grid grid-3 mobile-swipe-grid">
            <div className="card">
              <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>🗓️</div>
              <h3>Smart Trip Planning</h3>
              <p>Create detailed itineraries with our intuitive trip planner. Organize activities, accommodations, and transport all in one place.</p>
            </div>
            <div className="card">
              <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>🏨</div>
              <h3>Easy Booking</h3>
              <p>Book flights, hotels, and transportation with confidence. Compare prices and get the best deals for your travel needs.</p>
            </div>
            <div className="card">
              <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>💰</div>
              <h3>Budget Tracking</h3>
              <p>Keep track of your travel expenses. Set budgets and monitor spending throughout your journey.</p>
            </div>
            <div className="card">
              <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>🌍</div>
              <h3>Destination Info</h3>
              <p>Explore detailed information about destinations including attractions, weather, and local tips.</p>
            </div>
            <div className="card">
              <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>❤️</div>
              <h3>Wishlist</h3>
              <p>Save your favorite destinations and accommodations. Build your travel bucket list easily.</p>
            </div>
            <div className="card">
              <div style={{fontSize:'3rem', textAlign:'center', marginBottom:'1rem'}}>📱</div>
              <h3>Mobile Ready</h3>
              <p>Access your travel plans anywhere, anytime. Fully responsive design works on all devices.</p>
            </div>
          </div>
        </section>

        <section id="about" className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">About</div>
          <p style={{maxWidth:'850px', margin:'0 auto 2rem', color:'var(--text-secondary)', fontSize:'1.05rem', lineHeight:1.8}}>
            TravelMate is built for modern travelers who want everything in one place. From discovering destinations to organizing every day of the trip, we make planning faster, clearer, and more enjoyable.
          </p>
          <div className="grid grid-2" style={{gap:'2rem'}}>
            <div>
              <h3 style={{color:'var(--primary-color)', marginBottom:'1rem', fontSize:'1.35rem'}}>Our Mission</h3>
              <p style={{fontSize:'1.02rem', lineHeight:1.8, marginBottom:'1rem'}}>TravelMate is dedicated to making travel planning simple, affordable, and enjoyable for everyone. We believe that travel should be an adventure, not a hassle.</p>
              <p style={{fontSize:'1.02rem', lineHeight:1.8, marginBottom:'1rem'}}>Our platform combines trip planning, booking tools, and budget tracking in one seamless experience, so you can spend less time organizing and more time exploring.</p>
              <p style={{fontSize:'1.02rem', lineHeight:1.8}}>Whether it is a weekend getaway or a multi-country journey, TravelMate gives you a structured plan with the flexibility to adjust anytime.</p>
            </div>
            <div>
              <h3 style={{color:'var(--primary-color)', marginBottom:'1rem', fontSize:'1.35rem'}}>Why We Started</h3>
              <p style={{fontSize:'1.02rem', lineHeight:1.8, marginBottom:'1rem'}}>We created TravelMate after seeing how frustrating trip planning can be. Flights on one website, hotels on another, and budgets in spreadsheets made the process fragmented and stressful.</p>
              <p style={{fontSize:'1.02rem', lineHeight:1.8, marginBottom:'1rem'}}>Our goal was to design a travel workspace that feels professional and intuitive, where every decision is connected and easy to manage.</p>
              <p style={{fontSize:'1.02rem', lineHeight:1.8}}>Today, thousands of travelers use TravelMate to plan confidently, stay on budget, and enjoy a smoother journey from day one.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="card">
          <div className="card-header">Contact</div>
          <p style={{maxWidth:'760px', margin:'0 auto 2rem', color:'var(--text-secondary)', fontSize:'1.05rem'}}>
            Have questions about planning, booking, or your account? Our team is ready to help you build your next great trip.
          </p>
          <div className="grid grid-3 mobile-swipe-grid" style={{ marginBottom: '2rem' }}>
            <div className="card">
              <h4 style={{marginBottom:'0.5rem'}}>📧 Email</h4>
              <p><a href="mailto:support@travelmate.com" style={{color:'var(--text-primary)', textDecoration:'none'}}>support@travelmate.com</a></p>
            </div>
            <div className="card">
              <h4 style={{marginBottom:'0.5rem'}}>📱 Phone</h4>
              <p><a href="tel:+1234567890" style={{color:'var(--text-primary)', textDecoration:'none'}}>+1 (234) 567-890</a></p>
            </div>
            <div className="card">
              <h4 style={{marginBottom:'0.5rem'}}>📍 Address</h4>
              <p>123 Travel Street, Adventure City, AC 12345</p>
            </div>
          </div>
          <div className="card" style={{maxWidth:'760px', margin:'0 auto'}}>
            <h3 style={{marginBottom:'1rem', fontSize:'1.3rem'}}>Send us a Message</h3>
            <form style={{display:'grid', gap:'0.9rem'}}>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message" rows="5"></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </section>
    </div>
  );
}

