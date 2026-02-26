import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppShell from './components/AppShell';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Accommodation from './pages/Accommodation';
import BookingHistory from './pages/BookingHistory';
import BudgetPlanner from './pages/BudgetPlanner';
import DestinationDetails from './pages/DestinationDetails';
import Help from './pages/Help';
import Itinerary from './pages/Itinerary';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Transport from './pages/Transport';
import TripPlanner from './pages/TripPlanner';
import Wishlist from './pages/Wishlist';
import ExploreTravelMate from './pages/ExploreTravelMate';
import Payment from './pages/Payment';
import initAll from './lib/init';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try { initAll(); } catch (e) { console.warn('initAll failed', e); }
    }
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.slice(1);
    const target = document.getElementById(sectionId);
    if (!target) return;

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login.html" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/signup.html" element={<Login />} />

        <Route element={<AppShell />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile.html" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
          <Route path="/destination-details" element={<DestinationDetails />} />
          <Route path="/help" element={<Help />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/explore-travelmate" element={<ExploreTravelMate />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment.html" element={<Payment />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
