import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: '\uD83D\uDCCA Dashboard' },
  { to: '/trip-planner', label: '\uD83D\uDDD3\uFE0F Trip Planner' },
  { to: '/accommodation', label: '\uD83C\uDFE8 Accommodation' },
  { to: '/transport', label: '\u2708\uFE0F Transport' },
  { to: '/booking-history', label: '\uD83D\uDCDC Booking History' },
  { to: '/payment', label: '\uD83D\uDCB3 Payments' },
  { to: '/budget-planner', label: '\uD83D\uDCB0 Budget' },
  { to: '/itinerary', label: '\uD83D\uDCCB Itinerary' },
  { to: '/destination-details', label: '\uD83C\uDF0D Destinations' },
  { to: '/wishlist', label: '\u2764\uFE0F Wishlist' },
  { to: '/settings', label: '\u2699\uFE0F Settings' },
  { to: '/explore-travelmate', label: '\uD83E\uDDED Explore TravelMate' },
  { to: '/help', label: '\u2753 Help' }
];

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileOpen) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  return (
    <>
      <button
        type="button"
        className={isMobileOpen ? 'sidebar-mobile-toggle active' : 'sidebar-mobile-toggle'}
        aria-label={isMobileOpen ? 'Close sidebar menu' : 'Open sidebar menu'}
        aria-expanded={isMobileOpen}
        onClick={() => setIsMobileOpen((open) => !open)}
      >
        {isMobileOpen ? '\u2715 Menu' : '\u2630 Menu'}
      </button>

      {isMobileOpen && (
        <button
          type="button"
          className="sidebar-mobile-backdrop"
          aria-label="Close sidebar menu"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={isMobileOpen ? 'sidebar sidebar-mobile-open' : 'sidebar'}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="sidebar-item"
            onClick={() => setIsMobileOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
