import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingManager, userManager } from '../lib/managers';
import { showToast } from '../lib/ui';

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingZip: ''
  });
  const [pendingBooking, setPendingBooking] = useState(() => bookingManager.getPendingBooking());

  useEffect(() => {
    if (!userManager.isLoggedIn()) navigate('/login');
  }, [navigate]);

  const recentPayments = useMemo(
    () => bookingManager.getBookings().slice(0, 5),
    [pendingBooking]
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!pendingBooking) {
      showToast('No pending booking found. Start a booking first.', 'error');
      return;
    }

    if (method === 'card') {
      const normalizedNumber = form.cardNumber.replace(/\s+/g, '');
      if (!/^\d{16}$/.test(normalizedNumber)) {
        showToast('Please enter a valid 16-digit card number', 'error');
        return;
      }
      if (!/^\d{3,4}$/.test(form.cvv)) {
        showToast('Please enter a valid CVV', 'error');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
        showToast('Use expiry format MM/YY', 'error');
        return;
      }
    }

    const methodLabel = method === 'card' ? 'Card' : method === 'wallet' ? 'Digital Wallet' : 'Bank Transfer';
    const confirmed = bookingManager.confirmPendingBooking(methodLabel);

    if (!confirmed) {
      showToast('Unable to complete payment. Try again.', 'error');
      return;
    }

    showToast('Payment successful. Booking added to history.', 'success');
    setPendingBooking(null);
    setTimeout(() => navigate('/booking-history'), 900);
  }

  return (
    <div className="main-content">
        <h1>Payment</h1>
        <p className="text-muted mb-2">Complete secure payment for your travel booking.</p>

        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          <div className="card">
            <div className="card-header">Checkout Details</div>
            {pendingBooking ? (
              <>
                <p><strong>Booking:</strong> {pendingBooking.title}</p>
                <p><strong>Type:</strong> {pendingBooking.type}</p>
                <p><strong>Details:</strong> {pendingBooking.details}</p>
                <p><strong>Travel Date:</strong> {pendingBooking.travelDate || '-'}</p>
                <p><strong>Amount Due:</strong> {pendingBooking.amount || '-'}</p>
                <p><strong>Status:</strong> <span className="badge badge-warning">Pending Payment</span></p>
              </>
            ) : (
              <div className="alert alert-info">
                No pending booking available. Create a booking in Accommodation or Transport first.
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-header">Payment Method</div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="method">Choose Method</label>
                <select id="method" value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option value="card">Credit / Debit Card</option>
                  <option value="wallet">Digital Wallet</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {method === 'card' && (
                <>
                  <div className="form-group">
                    <label htmlFor="cardName">Cardholder Name</label>
                    <input id="cardName" name="cardName" value={form.cardName} onChange={updateField} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input id="cardNumber" name="cardNumber" placeholder="1234123412341234" value={form.cardNumber} onChange={updateField} required />
                  </div>
                  <div className="grid grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="expiry">Expiry (MM/YY)</label>
                      <input id="expiry" name="expiry" placeholder="08/29" value={form.expiry} onChange={updateField} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input id="cvv" name="cvv" placeholder="123" value={form.cvv} onChange={updateField} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="billingZip">Billing ZIP Code</label>
                    <input id="billingZip" name="billingZip" value={form.billingZip} onChange={updateField} required />
                  </div>
                </>
              )}

              {method !== 'card' && (
                <div className="alert alert-info">
                  You selected {method === 'wallet' ? 'Digital Wallet' : 'Bank Transfer'}. You can continue to confirm payment.
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={!pendingBooking}>
                {pendingBooking ? `Pay ${pendingBooking.amount || ''}` : 'No Pending Booking'}
              </button>
            </form>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-header">Recent Payments</div>
          <div className="table-responsive">
            <table className="table mobile-card-table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Booking</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No payments yet.</td>
                  </tr>
                )}
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td data-label="Payment ID">{payment.paymentId || '-'}</td>
                    <td data-label="Booking">{payment.title}</td>
                    <td data-label="Date">{formatDate(payment.paidAt)}</td>
                    <td data-label="Amount">{payment.amount || '-'}</td>
                    <td data-label="Status"><span className="badge badge-success">Paid</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

