import React, { useEffect, useMemo, useState } from 'react';
import { bookingManager, userManager, wishlistManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

const defaultImage = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60';

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (!userManager.isLoggedIn()) {
      navigate('/login');
      return;
    }
    setWishlistItems(wishlistManager.getItems());
  }, [navigate]);

  function removeFromWishlist(item) {
    wishlistManager.removeItem(item.id);
    setWishlistItems((items) => items.filter((entry) => entry.id !== item.id));
    showToast(`${item.name} removed from wishlist`, 'info');
  }

  function bookFromWishlist(item) {
    const bookingType = item.type === 'destination' ? 'Destination Package' : 'Accommodation';
    const bookingAmount = item.type === 'destination' ? '$1,500' : '$900';

    bookingManager.createPendingBooking({
      type: bookingType,
      title: item.name,
      details: item.summary || item.category || item.type || 'Travel booking',
      travelDate: '-',
      amount: item.amount || bookingAmount
    });

    showToast(`Proceeding to payment for ${item.name}`, 'info');
    navigate('/payment');
  }

  const stats = useMemo(() => {
    const destinations = wishlistItems.filter((item) => item.type === 'destination').length;
    const accommodations = wishlistItems.filter((item) => item.type === 'accommodation').length;
    return {
      total: wishlistItems.length,
      destinations,
      accommodations,
      others: Math.max(0, wishlistItems.length - destinations - accommodations)
    };
  }, [wishlistItems]);

  return (
    <div className="main-content">
        <div className="flex-between">
          <h1>My Wishlist</h1>
          <div><button className="btn btn-outline btn-sm">Share</button></div>
        </div>

        {wishlistItems.length === 0 && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <p className="text-muted" style={{ margin: 0 }}>
              Your wishlist is empty. Save places from Destination Details to see them here.
            </p>
          </div>
        )}

        <div className="grid grid-3 mobile-swipe-grid">
          {wishlistItems.map((item) => (
            <div className="card" key={item.id}>
              <img
                src={item.image || defaultImage}
                alt={item.name}
                style={{ height: 200, width: '100%', objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
              />
              <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>
                {(item.type || 'Item').toString().replace(/^./, (char) => char.toUpperCase())}
                {' '}
                • Added {item.savedDate || 'recently'}
              </p>
              <div style={{ marginBottom: 16, padding: '0.75rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  <strong>Category:</strong> {item.category || 'Travel'}
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  <strong>Notes:</strong> {item.summary || 'Saved for future planning'}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => bookFromWishlist(item)}>Book Now</button>
                <button className="btn btn-outline btn-sm" onClick={() => removeFromWishlist(item)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-grid" style={{ marginTop: '2rem' }}>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--primary-color)' }}>{stats.total}</div>
            <div className="stat-label">Items in Wishlist</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--secondary-color)' }}>{stats.destinations}</div>
            <div className="stat-label">Destinations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--accent-color)' }}>{stats.accommodations}</div>
            <div className="stat-label">Accommodations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--danger-color)' }}>{stats.others}</div>
            <div className="stat-label">Other Items</div>
          </div>
        </div>
    </div>
  );
}

