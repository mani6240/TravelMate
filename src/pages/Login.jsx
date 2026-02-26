import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userManager } from '../lib/managers';
import { showToast } from '../lib/ui';

export default function Login(){
  const navigate = useNavigate();
  const location = useLocation();
  const isSignupOnly = location.pathname === '/signup' || location.pathname === '/signup.html';
  const [tab, setTab] = useState(isSignupOnly ? 'signup' : 'signin');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setFormError('');
    setTab(isSignupOnly ? 'signup' : 'signin');
  }, [isSignupOnly]);

  function handleLogin(e){
    e.preventDefault();
    setFormError('');
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const result = userManager.login(email, password);
    if (!result.ok) {
      setFormError(result.error);
      showToast(result.error, 'error');
      return;
    }
    showToast('Login successful!', 'success');
    setTimeout(() => navigate('/dashboard'), 800);
  }

  function handleSignup(e){
    e.preventDefault();
    setFormError('');
    const form = e.target;
    const name = form.name.value.trim();
    const email = form['signup-email'].value.trim();
    const password = form['signup-password'].value;
    const confirmPassword = form['confirm-password'].value;
    const result = userManager.signup({ name, email, password, confirmPassword });
    if (!result.ok) {
      setFormError(result.error);
      showToast(result.error, 'error');
      return;
    }
    showToast('Account created successfully!', 'success');
    setTimeout(() => navigate('/dashboard'), 800);
  }

  return (
    <div
      className="auth-page"
      style={{
        backgroundImage:"linear-gradient(rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.62)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80')"
      }}
    >
      <div className="card auth-card">
        <h1 className="auth-title">{isSignupOnly ? 'Create Account' : 'Welcome Back'}</h1>

        {!isSignupOnly && (
        <div id="signin-form" className={`tab-content ${tab==='signin' ? 'active' : ''}`}>
          <form onSubmit={handleLogin}>
            {formError && tab === 'signin' && (
              <p style={{color:'#dc2626', marginBottom:'1rem'}}>{formError}</p>
            )}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required minLength={8} />
            </div>
            <div className="auth-remember-row">
              <label className="auth-remember-label">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="auth-forgot-link">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Sign In</button>
          </form>
        </div>
        )}

        <div id="signup-form" className={`tab-content ${isSignupOnly || tab==='signup' ? 'active' : ''}`}>
          <form onSubmit={handleSignup}>
            {formError && tab === 'signup' && (
              <p style={{color:'#dc2626', marginBottom:'1rem'}}>{formError}</p>
            )}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required minLength={2} />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input type="email" id="signup-email" name="signup-email" required />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input type="password" id="signup-password" name="signup-password" required minLength={8} />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirm-password" required minLength={8} />
            </div>
            <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Create Account</button>
          </form>
        </div>

        {!isSignupOnly && (
        <div className="auth-tab-switch">
          <button type="button" className={`tab-btn auth-tab-btn ${tab==='signin' ? 'active' : ''}`} onClick={() => { setTab('signin'); setFormError(''); }}>Sign In</button>
          <button type="button" className={`tab-btn auth-tab-btn ${tab==='signup' ? 'active' : ''}`} onClick={() => { setTab('signup'); setFormError(''); }}>Sign Up</button>
        </div>
        )}

        <p className="auth-legal">By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
}
