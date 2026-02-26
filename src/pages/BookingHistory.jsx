import React, { useEffect, useMemo, useState } from 'react';
import { bookingManager, userManager } from '../lib/managers';
import { closeModal, openModal } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BookingHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    if (!userManager.isLoggedIn()) {
      navigate('/login');
      return;
    }
    setBookings(bookingManager.getBookings());
  }, [navigate]);

  function viewBooking(booking) {
    setSelectedBooking(booking);
    openModal('bookingModal');
  }

  function statusClass(status) {
    if (status === 'Confirmed') return 'badge badge-success';
    if (status === 'Pending Payment') return 'badge badge-warning';
    return 'badge badge-info';
  }

  const availableTypes = useMemo(() => {
    const typeSet = new Set(bookings.map((booking) => booking.type).filter(Boolean));
    return Array.from(typeSet);
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(todayStart);
    sevenDaysAgo.setDate(todayStart.getDate() - 7);
    const thirtyDaysAgo = new Date(todayStart);
    thirtyDaysAgo.setDate(todayStart.getDate() - 30);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    return bookings.filter((booking) => {
      if (typeFilter !== 'all' && booking.type !== typeFilter) return false;
      if (statusFilter !== 'all' && booking.status !== statusFilter) return false;

      if (dateFilter !== 'all') {
        const bookingDate = new Date(booking.paidAt || booking.createdAt);
        if (Number.isNaN(bookingDate.getTime())) return false;

        if (dateFilter === 'today' && bookingDate < todayStart) return false;
        if (dateFilter === 'last7' && bookingDate < sevenDaysAgo) return false;
        if (dateFilter === 'last30' && bookingDate < thirtyDaysAgo) return false;
        if (dateFilter === 'year' && bookingDate < yearStart) return false;
      }

      return true;
    });
  }, [bookings, dateFilter, statusFilter, typeFilter]);

  return (
    <div className="main-content">
        <h1>Booking History</h1>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="grid grid-4">
            <div className="form-group">
              <label htmlFor="filter-type">Type</label>
              <select id="filter-type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option value="all">All Bookings</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="filter-status">Status</label>
              <select id="filter-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending Payment">Pending Payment</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="filter-date">Date Range</label>
              <select id="filter-date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="booking-filter-action">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setTypeFilter('all');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">All Bookings</div>
          <div className="table-responsive">
            <table className="table mobile-card-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>
                      {bookings.length === 0 ? 'No bookings yet. Complete a payment to see history.' : 'No bookings match the selected filters.'}
                    </td>
                  </tr>
                )}
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td data-label="Booking ID">{booking.id}</td>
                    <td data-label="Type">{booking.type}</td>
                    <td data-label="Details">{booking.details}</td>
                    <td data-label="Date">{booking.travelDate || formatDate(booking.createdAt)}</td>
                    <td data-label="Total Amount">{booking.amount || '-'}</td>
                    <td data-label="Status"><span className={statusClass(booking.status)}>{booking.status}</span></td>
                    <td data-label="Actions" className="mobile-table-action">
                      <button className="btn btn-sm btn-outline" onClick={() => viewBooking(booking)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="bookingModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span>Booking Details</span>
              <button className="modal-close" onClick={() => closeModal('bookingModal')}>&times;</button>
            </div>
            {selectedBooking && (
              <div>
                <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
                <p><strong>Type:</strong> {selectedBooking.type}</p>
                <p><strong>Title:</strong> {selectedBooking.title}</p>
                <p><strong>Details:</strong> {selectedBooking.details}</p>
                <p><strong>Travel Date:</strong> {selectedBooking.travelDate || '-'}</p>
                <p><strong>Amount:</strong> {selectedBooking.amount || '-'}</p>
                <p><strong>Status:</strong> {selectedBooking.status}</p>
                <p><strong>Payment Method:</strong> {selectedBooking.paymentMethod || '-'}</p>
                <p><strong>Payment Date:</strong> {formatDate(selectedBooking.paidAt)}</p>
                <p style={{ margin: '1rem 0', padding: '1rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}>
                  <strong>Need Help?</strong> Contact support at <a href="mailto:support@travelmate.com" style={{ color: 'var(--primary-color)' }}>support@travelmate.com</a>
                </p>
              </div>
            )}
            <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => closeModal('bookingModal')}>Close</button>
              <button className="btn btn-primary" style={{ flex: 1 }}>Download Receipt</button>
            </div>
          </div>
        </div>
    </div>
  );
}

