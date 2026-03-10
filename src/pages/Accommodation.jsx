import React, { useEffect } from 'react';
import { bookingManager, wishlistManager, userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function Accommodation(){
  const navigate = useNavigate();

  useEffect(() => {
    if (!userManager.isLoggedIn()) navigate('/login');
  }, [navigate]);

  function bookAccommodation(booking){
    bookingManager.createPendingBooking({
      type: 'Accommodation',
      title: booking.hotelName,
      details: booking.location,
      travelDate: booking.travelDate,
      amount: booking.amount
    });
    showToast(`Proceeding to payment for ${booking.hotelName}`, 'info');
    navigate('/payment');
  }

  function addToWishlist(hotelName){
    const item = { id: Date.now(), name: hotelName, type: 'accommodation', savedDate: new Date().toLocaleDateString() };
    if (wishlistManager.addItem(item)) showToast(`${hotelName} added to wishlist!`, 'success');
    else showToast(`${hotelName} is already in your wishlist`, 'info');
  }

  function logout(){
    userManager.logout();
    showToast('Logged out successfully', 'success');
    setTimeout(() => navigate('/'), 800);
  }

  return (
    <div className="main-content">
        <h1>Find Your Perfect Stay 🏨</h1>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Search Accommodations</div>
          <div className="grid grid-4">
            <div className="form-group">
              <label htmlFor="city">Destination</label>
              <input type="text" id="city" placeholder="e.g., Paris" defaultValue="Paris" />
            </div>
            <div className="form-group">
              <label htmlFor="check-in">Check-in</label>
              <input type="date" id="check-in" />
            </div>
            <div className="form-group">
              <label htmlFor="check-out">Check-out</label>
              <input type="date" id="check-out" />
            </div>
            <div className="form-group">
              <label htmlFor="rooms">Rooms</label>
              <select id="rooms"><option>1 Room</option><option>2 Rooms</option></select>
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select id="type"><option>All Types</option><option>Hotel</option></select>
            </div>
            <div className="form-group">
              <label htmlFor="price-range">Price Range</label>
              <select id="price-range"><option>Any Price</option></select>
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <select id="rating"><option>All Ratings</option></select>
            </div>
            <div className="form-group accommodation-search-action">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>

        <div className="grid grid-2 mobile-swipe-grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=60" alt="The Grand Hotel Paris" style={{height:200, width:'100%', objectFit:'cover', borderRadius:8, marginBottom:16}} />
            <h3>The Grand Hotel Paris</h3>
            <p className="text-muted" style={{marginBottom:'0.5rem'}}>5-star Hotel • Champs-Élysées, Paris</p>
            <div style={{marginBottom:16}}>
              <p style={{margin: '0.5rem 0'}}><strong>Price:</strong> $320/night</p>
              <p style={{margin: '0.5rem 0'}}><strong>Rating:</strong> ⭐⭐⭐⭐⭐ 4.8/5 (245 reviews)</p>
              <p style={{margin: '0.5rem 0'}}><strong>Room Type:</strong> Deluxe Suite</p>
            </div>
            <div style={{marginBottom:16, padding:'0.5rem', background:'var(--surface-color)', border:'1px solid var(--border-color)', borderRadius:'0.5rem'}}>
              <p style={{margin:0, fontSize:'0.875rem'}}><strong>Amenities:</strong> Free WiFi, Spa, Pool, Gym, Restaurant</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                style={{flex:1}}
                onClick={() => bookAccommodation({
                  hotelName: 'The Grand Hotel Paris',
                  location: 'Champs-Elysees, Paris',
                  travelDate: 'Jul 15 - Jul 20, 2026',
                  amount: '$1,600'
                })}
              >
                Book Now
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => addToWishlist('Grand Hotel')}>❤️</button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=60" alt="Boutique Hotel Le Marais" style={{height:200, width:'100%', objectFit:'cover', borderRadius:8, marginBottom:16}} />
            <h3>Boutique Hotel Le Marais</h3>
            <p className="text-muted" style={{marginBottom:'0.5rem'}}>4-star Hotel • Le Marais, Paris</p>
            <div style={{marginBottom:16}}>
              <p style={{margin: '0.5rem 0'}}><strong>Price:</strong> $180/night</p>
              <p style={{margin: '0.5rem 0'}}><strong>Rating:</strong> ⭐⭐⭐⭐ 4.5/5 (180 reviews)</p>
              <p style={{margin: '0.5rem 0'}}><strong>Room Type:</strong> Standard Room</p>
            </div>
            <div style={{marginBottom:16, padding:'0.5rem', background:'var(--surface-color)', border:'1px solid var(--border-color)', borderRadius:'0.5rem'}}>
              <p style={{margin:0, fontSize:'0.875rem'}}><strong>Amenities:</strong> Free WiFi, Bar, Terrace</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                style={{flex:1}}
                onClick={() => bookAccommodation({
                  hotelName: 'Boutique Hotel Le Marais',
                  location: 'Le Marais, Paris',
                  travelDate: 'Jul 15 - Jul 20, 2026',
                  amount: '$900'
                })}
              >
                Book Now
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => addToWishlist('Boutique Hotel')}>❤️</button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=60" alt="Budget Inn Paris" style={{height:200, width:'100%', objectFit:'cover', borderRadius:8, marginBottom:16}} />
            <h3>Budget Inn Paris</h3>
            <p className="text-muted" style={{marginBottom:'0.5rem'}}>3-star Hotel • Latin Quarter, Paris</p>
            <div style={{marginBottom:16}}>
              <p style={{margin: '0.5rem 0'}}><strong>Price:</strong> $85/night</p>
              <p style={{margin: '0.5rem 0'}}><strong>Rating:</strong> ⭐⭐⭐⭐ 4.3/5 (120 reviews)</p>
              <p style={{margin: '0.5rem 0'}}><strong>Room Type:</strong> Basic Room</p>
            </div>
            <div style={{marginBottom:16, padding:'0.5rem', background:'var(--surface-color)', border:'1px solid var(--border-color)', borderRadius:'0.5rem'}}>
              <p style={{margin:0, fontSize:'0.875rem'}}><strong>Amenities:</strong> Free WiFi, Breakfast Available</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                style={{flex:1}}
                onClick={() => bookAccommodation({
                  hotelName: 'Budget Inn Paris',
                  location: 'Latin Quarter, Paris',
                  travelDate: 'Jul 15 - Jul 20, 2026',
                  amount: '$425'
                })}
              >
                Book Now
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => addToWishlist('Budget Inn')}>❤️</button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=60" alt="Luxury Resort Versailles" style={{height:200, width:'100%', objectFit:'cover', borderRadius:8, marginBottom:16}} />
            <h3>Luxury Resort Versailles</h3>
            <p className="text-muted" style={{marginBottom:'0.5rem'}}>5-star Resort • Versailles, Paris</p>
            <div style={{marginBottom:16}}>
              <p style={{margin: '0.5rem 0'}}><strong>Price:</strong> $450/night</p>
              <p style={{margin: '0.5rem 0'}}><strong>Rating:</strong> ⭐⭐⭐⭐⭐ 4.9/5 (320 reviews)</p>
              <p style={{margin: '0.5rem 0'}}><strong>Room Type:</strong> Presidential Suite</p>
            </div>
            <div style={{marginBottom:16, padding:'0.5rem', background:'var(--surface-color)', border:'1px solid var(--border-color)', borderRadius:'0.5rem'}}>
              <p style={{margin:0, fontSize:'0.875rem'}}><strong>Amenities:</strong> Full Spa, Multiple Pools, 5 Restaurants, Golf Course</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                style={{flex:1}}
                onClick={() => bookAccommodation({
                  hotelName: 'Luxury Resort Versailles',
                  location: 'Versailles, Paris',
                  travelDate: 'Jul 15 - Jul 20, 2026',
                  amount: '$2,250'
                })}
              >
                Book Now
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => addToWishlist('Luxury Resort')}>❤️</button>
            </div>
          </div>
        </div>
    </div>
  );
}

