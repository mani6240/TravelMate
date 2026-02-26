import React, { useEffect, useState } from 'react';
import { bookingManager, userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function Transport() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');

  useEffect(() => {
    if (!userManager.isLoggedIn()) navigate('/login');
  }, [navigate]);

  function bookTransport(booking) {
    bookingManager.createPendingBooking({
      type: booking.type,
      title: booking.title,
      details: booking.details,
      travelDate: booking.travelDate,
      amount: booking.amount
    });
    showToast(`Proceeding to payment for ${booking.title}`, 'info');
    navigate('/payment');
  }

  return (
    <div className="main-content">
        <h1>Book Your Transport</h1>
        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'flights' ? 'active' : ''}`} onClick={() => setActiveTab('flights')}>Flights</button>
          <button className={`tab-btn ${activeTab === 'cars' ? 'active' : ''}`} onClick={() => setActiveTab('cars')}>Car Rental</button>
          <button className={`tab-btn ${activeTab === 'trains' ? 'active' : ''}`} onClick={() => setActiveTab('trains')}>Trains</button>
          <button className={`tab-btn ${activeTab === 'buses' ? 'active' : ''}`} onClick={() => setActiveTab('buses')}>Buses</button>
        </div>

        {activeTab === 'flights' && (
          <div id="flights" className="tab-content active">
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">Search Flights</div>
              <div className="grid grid-4">
                <div className="form-group"><label>From</label><input placeholder="e.g., NYC" /></div>
                <div className="form-group"><label>To</label><input placeholder="e.g., Paris" /></div>
                <div className="form-group"><label>Departure</label><input type="date" /></div>
                <div className="form-group"><label>Return</label><input type="date" /></div>
                <div className="form-group"><label>Passengers</label><select><option>1 Passenger</option><option>2 Passengers</option><option>3 Passengers</option><option>4+ Passengers</option></select></div>
                <div className="form-group"><label>Class</label><select><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First Class</option></select></div>
                <div className="form-group transport-flights-search-action">
                  <button className="btn btn-primary">Search Flights</button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">Available Flights</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ border: '1px solid var(--border-color)', padding: 16, borderRadius: 8 }}>
                  <div className="flex-between" style={{ marginBottom: 16 }}>
                    <div><p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>09:00 - 19:30</p><p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>American Airlines | 10h 30m</p></div>
                    <div style={{ textAlign: 'right' }}><p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)', margin: 0 }}>$650</p><p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>per person</p></div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>NYC (JFK) to Paris (CDG)</strong> | Direct Flight | Economy</p>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: 16 }}
                    onClick={() => bookTransport({
                      type: 'Flight',
                      title: 'Flight AA101',
                      details: 'NYC (JFK) to Paris (CDG) - Direct',
                      travelDate: 'Jul 15, 2026',
                      amount: '$650'
                    })}
                  >
                    Book Flight
                  </button>
                </div>

                <div style={{ border: '1px solid var(--border-color)', padding: 16, borderRadius: 8 }}>
                  <div className="flex-between" style={{ marginBottom: 16 }}>
                    <div><p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>14:15 - 23:45</p><p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>United Airlines | 9h 30m (1 stop)</p></div>
                    <div style={{ textAlign: 'right' }}><p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)', margin: 0 }}>$480</p><p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>per person</p></div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>NYC (LGA) to Paris (CDG)</strong> | 1 Stop | Economy</p>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: 16 }}
                    onClick={() => bookTransport({
                      type: 'Flight',
                      title: 'Flight UA205',
                      details: 'NYC (LGA) to Paris (CDG) - 1 Stop',
                      travelDate: 'Jul 15, 2026',
                      amount: '$480'
                    })}
                  >
                    Book Flight
                  </button>
                </div>

                <div style={{ border: '1px solid var(--border-color)', padding: 16, borderRadius: 8 }}>
                  <div className="flex-between" style={{ marginBottom: 16 }}>
                    <div><p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>20:00 - 07:00+1</p><p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Air France | 11h | Direct</p></div>
                    <div style={{ textAlign: 'right' }}><p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)', margin: 0 }}>$720</p><p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>per person</p></div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>NYC (JFK) to Paris (ORY)</strong> | Premium Economy | Direct</p>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: 16 }}
                    onClick={() => bookTransport({
                      type: 'Flight',
                      title: 'Flight AF301',
                      details: 'NYC (JFK) to Paris (ORY) - Direct',
                      travelDate: 'Jul 15, 2026',
                      amount: '$720'
                    })}
                  >
                    Book Flight
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cars' && (
          <div id="cars" className="tab-content active">
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">Search Car Rental</div>
              <div className="grid grid-4">
                <div className="form-group"><label>Pickup Location</label><input placeholder="City or Airport" /></div>
                <div className="form-group"><label>Pickup Date</label><input type="date" /></div>
                <div className="form-group"><label>Return Date</label><input type="date" /></div>
                <div className="form-group"><label>Car Type</label><select><option>Economy</option><option>Compact</option><option>SUV</option><option>Luxury</option></select></div>
                <div className="form-group transport-cars-search-action">
                  <button className="btn btn-primary">Search Cars</button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">Available Cars</div>
              <div className="table-responsive">
                <table className="table mobile-card-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Car Model</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Type</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Per Day</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Total (5 days)</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Rating</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td data-label="Car Model" style={{ padding: '1rem' }}>Toyota Corolla</td>
                      <td data-label="Type" style={{ padding: '1rem' }}>Economy</td>
                      <td data-label="Per Day" style={{ padding: '1rem' }}>$35</td>
                      <td data-label="Total (5 days)" style={{ padding: '1rem' }}>$175</td>
                      <td data-label="Rating" style={{ padding: '1rem' }}>4.5 / 5</td>
                      <td data-label="Action" className="mobile-table-action" style={{ padding: '1rem' }}>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => bookTransport({
                            type: 'Car Rental',
                            title: 'Toyota Corolla',
                            details: 'Economy rental (5 days)',
                            travelDate: 'Jul 15 - Jul 20, 2026',
                            amount: '$175'
                          })}
                        >
                          Rent
                        </button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td data-label="Car Model" style={{ padding: '1rem' }}>BMW X5</td>
                      <td data-label="Type" style={{ padding: '1rem' }}>SUV</td>
                      <td data-label="Per Day" style={{ padding: '1rem' }}>$85</td>
                      <td data-label="Total (5 days)" style={{ padding: '1rem' }}>$425</td>
                      <td data-label="Rating" style={{ padding: '1rem' }}>4.8 / 5</td>
                      <td data-label="Action" className="mobile-table-action" style={{ padding: '1rem' }}>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => bookTransport({
                            type: 'Car Rental',
                            title: 'BMW X5',
                            details: 'SUV rental (5 days)',
                            travelDate: 'Jul 15 - Jul 20, 2026',
                            amount: '$425'
                          })}
                        >
                          Rent
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td data-label="Car Model" style={{ padding: '1rem' }}>Mercedes-Benz C-Class</td>
                      <td data-label="Type" style={{ padding: '1rem' }}>Luxury</td>
                      <td data-label="Per Day" style={{ padding: '1rem' }}>$120</td>
                      <td data-label="Total (5 days)" style={{ padding: '1rem' }}>$600</td>
                      <td data-label="Rating" style={{ padding: '1rem' }}>4.9 / 5</td>
                      <td data-label="Action" className="mobile-table-action" style={{ padding: '1rem' }}>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => bookTransport({
                            type: 'Car Rental',
                            title: 'Mercedes-Benz C-Class',
                            details: 'Luxury rental (5 days)',
                            travelDate: 'Jul 15 - Jul 20, 2026',
                            amount: '$600'
                          })}
                        >
                          Rent
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trains' && (
          <div id="trains" className="tab-content active">
            <div className="card">
              <div className="card-header">Train Bookings Coming Soon</div>
              <p>Train booking feature will be available soon!</p>
            </div>
          </div>
        )}

        {activeTab === 'buses' && (
          <div id="buses" className="tab-content active">
            <div className="card">
              <div className="card-header">Bus Bookings Coming Soon</div>
              <p>Bus booking feature will be available soon!</p>
            </div>
          </div>
        )}
    </div>
  );
}

