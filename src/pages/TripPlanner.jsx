import React, { useEffect, useState } from 'react';
import { tripManager, userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function TripPlanner(){
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => { if (!userManager.isLoggedIn()) navigate('/login'); }, [navigate]);

  function createTrip(event){
    event.preventDefault();
    const trip = {
      id: Date.now(),
      tripName: document.getElementById('trip-name')?.value || 'Trip',
      destination: document.getElementById('destination')?.value || '',
      startDate: document.getElementById('start-date')?.value || '',
      endDate: document.getElementById('end-date')?.value || '',
      budget: document.getElementById('budget')?.value || 0,
      travelers: document.getElementById('travelers')?.value || 1,
      description: document.getElementById('description')?.value || ''
    };
    tripManager.addTrip(trip);
    showToast('Trip created successfully!', 'success');
    const form = event.target; if (form) form.reset();
    setTrips(prev => [trip, ...prev]);
  }

  useEffect(() => {
    const loaded = tripManager.getTrips() || [];
    setTrips(loaded);
  }, []);

  return (
    <div className="main-content">
        <h1>Plan Your Next Trip 🗺️</h1>
        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Create a New Trip</div>
          <form onSubmit={createTrip}>
            <div className="grid grid-2">
              <div className="form-group"><label htmlFor="trip-name">Trip Name</label><input type="text" id="trip-name" required /></div>
              <div className="form-group"><label htmlFor="destination">Destination</label><input type="text" id="destination" required /></div>
              <div className="form-group"><label htmlFor="start-date">Start Date</label><input type="date" id="start-date" required /></div>
              <div className="form-group"><label htmlFor="end-date">End Date</label><input type="date" id="end-date" required /></div>
              <div className="form-group"><label htmlFor="budget">Budget</label><input type="number" id="budget" step="0.01" required /></div>
              <div className="form-group"><label htmlFor="travelers">Number of Travelers</label><input type="number" id="travelers" defaultValue={1} min={1} required /></div>
            </div>
            <div className="form-group"><label htmlFor="description">Trip Description</label><textarea id="description" rows={4}></textarea></div>
            <button type="submit" className="btn btn-primary">Create Trip</button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">Your Trips</div>
          <div className="table-responsive">
          <table className="table mobile-card-table">
            <thead>
              <tr><th>Trip Name</th><th>Destination</th><th>Duration</th><th>Budget</th><th>Travelers</th><th>Action</th></tr>
            </thead>
            <tbody>
              {trips.length === 0 && (
                <tr><td colSpan={6} style={{textAlign:'center'}}>No trips yet</td></tr>
              )}
              {trips.map(trip => {
                const start = new Date(trip.startDate || Date.now());
                const end = new Date(trip.endDate || Date.now());
                const duration = Math.max(1, Math.ceil((end - start) / (1000*60*60*24)) + 1);
                return (
                  <tr key={trip.id}>
                    <td data-label="Trip Name">{trip.tripName}</td>
                    <td data-label="Destination">{trip.destination}</td>
                    <td data-label="Duration">{duration} days</td>
                    <td data-label="Budget">{trip.budget}</td>
                    <td data-label="Travelers">{trip.travelers}</td>
                    <td data-label="Action" className="trip-table-actions mobile-table-action">
                      <button className="btn btn-sm btn-outline" onClick={() => navigate('/itinerary', { state: { tripId: trip.id } })}>Edit</button>
                      <button className="btn btn-sm btn-primary" onClick={() => navigate('/itinerary', { state: { openAddDay: true, tripId: trip.id } })}>+ Add Day</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
    </div>
  );
}

