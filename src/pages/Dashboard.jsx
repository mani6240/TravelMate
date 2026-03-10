import React, { useEffect } from 'react';
import { userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const navigate = useNavigate();
  const currentUser = userManager.getCurrentUser();
  const displayName = currentUser?.name?.trim() || 'Traveler';

  useEffect(() => {
    if (!userManager.isLoggedIn()) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const pos = sessionStorage.getItem('dashboard-scroll');
    if (pos) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(pos, 10));
        sessionStorage.removeItem('dashboard-scroll');
      }, 0);
    }
  }, []);

  function logout(){
    userManager.logout();
    showToast('Logged out successfully', 'success');
    setTimeout(() => navigate('/'), 800);
  }

  return (
    <div className="main-content">
        <h1>Welcome, {displayName} ! 👋</h1>
        <p style={{color: 'var(--text-light)', marginBottom: '2rem'}}>Here's your travel summary</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Active Trips</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">$2,450</div>
            <div className="stat-label">Total Spent</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">Saved Destinations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Bookings</div>
          </div>
        </div>

        <div className="card" style={{marginBottom: '2rem'}}>
          <div className="card-header">Quick Actions</div>
          <div className="grid grid-3 mobile-swipe-grid">
            <a href="/trip-planner" className="btn btn-primary" style={{textAlign: 'center', textDecoration: 'none'}}>+ New Trip</a>
            <button
              className="btn btn-outline"
              style={{textAlign: 'center'}}
              onClick={() => {
                sessionStorage.setItem('dashboard-scroll', String(window.scrollY || 0));
                navigate('/accommodation');
              }}
            >
              Find Hotel
            </button>
            <a href="/transport" className="btn btn-outline" style={{textAlign: 'center', textDecoration: 'none'}}>Book Flight</a>
          </div>
        </div>

        <div className="card" style={{marginBottom: '2rem'}}>
          <div className="card-header">Your Active Trips</div>
          <div className="table-responsive">
          <table className="table mobile-card-table">
            <thead>
              <tr>
                <th>Trip Name</th>
                <th>Destination</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Trip Name">Summer Vacation</td>
                <td data-label="Destination">Paris, France</td>
                <td data-label="Dates">Jul 15 - Jul 25, 2026</td>
                <td data-label="Status"><span className="badge badge-warning">In Planning</span></td>
                <td data-label="Action" className="mobile-table-action"><a href="/itinerary" className="btn btn-sm btn-outline">View</a></td>
              </tr>
              <tr>
                <td data-label="Trip Name">Beach Getaway</td>
                <td data-label="Destination">Maldives</td>
                <td data-label="Dates">Aug 1 - Aug 8, 2026</td>
                <td data-label="Status"><span className="badge badge-success">Confirmed</span></td>
                <td data-label="Action" className="mobile-table-action"><a href="/itinerary" className="btn btn-sm btn-outline">View</a></td>
              </tr>
              <tr>
                <td data-label="Trip Name">Mountain Adventure</td>
                <td data-label="Destination">Switzerland</td>
                <td data-label="Dates">Sep 10 - Sep 20, 2026</td>
                <td data-label="Status"><span className="badge badge-info">Booking</span></td>
                <td data-label="Action" className="mobile-table-action"><a href="/itinerary" className="btn btn-sm btn-outline">View</a></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Recent Bookings</div>
          <table className="table">
            <thead>
              <tr>
                <th>Booking Type</th>
                <th>Details</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>✈️ Flight</td>
                <td>NYC to Paris</td>
                <td>$850</td>
                <td>Jan 10, 2026</td>
              </tr>
              <tr>
                <td>🏨 Hotel</td>
                <td>Hilton Paris 5 nights</td>
                <td>$1,200</td>
                <td>Jan 11, 2026</td>
              </tr>
              <tr>
                <td>🚗 Transport</td>
                <td>Car Rental - 5 days</td>
                <td>$250</td>
                <td>Jan 12, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}

