import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { userManager } from '../lib/managers';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isImageBackgroundPage = ['/', '/index.html', '/login', '/login.html'].includes(location.pathname);
  const showBackButton = location.pathname !== '/' && location.pathname !== '/dashboard';

  useEffect(() => {
    // Check for saved dark mode preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDark(shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    // Check login status
    const loggedIn = userManager.isLoggedIn();
    setIsLoggedIn(loggedIn);
    setCurrentUser(loggedIn ? userManager.getCurrentUser() : null);
  }, [location]);

  useEffect(() => {
    if (navRef.current) {
      if (open) navRef.current.classList.add('active');
      else navRef.current.classList.remove('active');
    }
  }, [open]);

  const toggleDarkMode = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className={isImageBackgroundPage ? 'header-on-image' : ''}>
      <button
        className="back-btn"
        aria-label="Go back"
        onClick={() => {
          setOpen(false);
          if (window.history.length > 1) navigate(-1);
          else navigate('/');
        }}
        style={{ display: showBackButton ? undefined : 'none' }}
      >
        {'\uD83D\uDD19'}
      </button>
      <Link to={isLoggedIn ? '/dashboard' : '/'} className="logo">
        <span className="logo-emblem" aria-hidden="true">
          <svg className="logo-emblem-svg" viewBox="0 0 34 34" role="img">
            <rect x="1" y="1" width="32" height="32" rx="10" fill="#1d4ed8" />
            <path d="M9 22.5L14.2 12.5L19.1 19.4L22.3 15.8L25 22.5" stroke="#93c5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="22.3" cy="15.8" r="1.8" fill="#fbbf24" />
          </svg>
        </span>
        <span className="logo-wordmark">
          <span className="logo-wordmark-main">Travel</span>
          <span className="logo-wordmark-accent">Mate</span>
        </span>
      </Link>
      <button
        className={open ? 'menu-toggle active' : 'menu-toggle'}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      />

      <nav ref={navRef} className={open ? 'active' : ''}>
        <ul className="nav-links">
          {!isLoggedIn && (
            <li><NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink></li>
          )}
        </ul>
        <div className="nav-buttons">
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
          </button>
          {isLoggedIn ? (
            <NavLink to="/profile" className="header-profile-link" onClick={() => setOpen(false)}>
              <span className="header-profile-avatar" aria-hidden="true">
                {(currentUser?.name || 'U').trim().charAt(0).toUpperCase()}
              </span>
              <span className="header-profile-label">{currentUser?.name || 'Profile'}</span>
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline" onClick={() => setOpen(false)}>Login</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}




