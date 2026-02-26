import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userManager } from '../lib/managers';
import { showToast } from '../lib/ui';

export default function Profile(){
  const navigate = useNavigate();

  function saveProfile(e){
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
    const user = userManager.getCurrentUser();
    if (user) {
      userManager.updateProfile({
        name: document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value
      });
    }
  }

  function logout(){
    userManager.logout();
    showToast('Logged out successfully', 'success');
    setTimeout(() => navigate('/'), 800);
  }

  if (!userManager.isLoggedIn()) {
    setTimeout(() => navigate('/login'), 50);
    return null;
  }

  return (
    <div className="main-content">
        <h1>My Profile</h1>

        <div className="card" style={{marginBottom:'2rem', textAlign:'center'}}>
          <div style={{width:120, height:120, background:'var(--primary-color)', borderRadius:'50%', margin:'0 auto 1rem', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'2.25rem', fontWeight:700}}>MJ</div>
          <h2 style={{marginBottom:'0.5rem'}}>Mani jr</h2>
          <p className="text-muted" style={{marginBottom:'1rem'}}>Member since Jan 2024</p>
          <div style={{display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap'}}>
            <span className="badge badge-success">Email Verified</span>
            <span className="badge badge-info">Premium Member</span>
          </div>
        </div>

        <div className="profile-logout-wrap" style={{ marginBottom: '2rem' }}>
          <p className="profile-logout-note">Need a break? You can safely sign out here.</p>
          <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
        </div>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Personal Information</div>
          <form onSubmit={saveProfile}>
            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" defaultValue="Mani" required />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" defaultValue="jr" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" defaultValue="manijr11@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" defaultValue="+(91)159-123-4567" />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" id="dob" />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input type="text" id="country" defaultValue="India" />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" defaultValue="chennai" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" rows="4">Passionate traveler and adventure seeker!</textarea>
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Travel Preferences</div>
          <form>
            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="travel-style">Travel Style</label>
                <select id="travel-style">
                  <option>Sports</option>
                  <option>Adventure</option>
                  <option>Relaxation</option>
                  <option>Culture</option>
                  <option>Luxury</option>
                  <option>Budget</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="avg-budget">Average Budget/Trip</label>
                <select id="avg-budget">
                  <option>$0 - $1,000</option>
                  <option>$1,000 - $2,500</option>
                  <option>$2,500 - $5,000</option>
                  <option>$5,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="trip-duration">Preferred Duration</label>
                <select id="trip-duration">
                  <option>Weekend</option>
                  <option>1-2 weeks</option>
                  <option>2-4 weeks</option>
                  <option>1+ months</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="groups">Travel With</label>
                <select id="groups">
                  <option>Solo</option>
                  <option>Partner</option>
                  <option>Family</option>
                  <option>Friends</option>
                  <option>Group Tours</option>
                </select>
              </div>
            </div>
            <div className="preference-interests">
              <label className="preference-interests-title">Interests (Select all that apply)</label>
              <div className="preference-interests-grid">
                <label className="preference-interest-item"><input type="checkbox" defaultChecked /> Beach</label>
                <label className="preference-interest-item"><input type="checkbox" defaultChecked /> Mountains</label>
                <label className="preference-interest-item"><input type="checkbox" /> Culture</label>
                <label className="preference-interest-item"><input type="checkbox" /> Food</label>
                <label className="preference-interest-item"><input type="checkbox" /> Entertainment</label>
                <label className="preference-interest-item"><input type="checkbox" /> Luxury</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Save Preferences</button>
          </form>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Total Trips</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">25</div>
            <div className="stat-label">Countries Visited</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">$15k</div>
            <div className="stat-label">Total Spent</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">120</div>
            <div className="stat-label">Days Traveled</div>
          </div>
        </div>
    </div>
  );
}


