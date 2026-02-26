import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { userManager } from '../lib/managers';

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userManager.isLoggedIn()) {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="main-layout app-shell">
      <Sidebar />
      <div className="app-shell-content">
        <Outlet />
      </div>
    </div>
  );
}
