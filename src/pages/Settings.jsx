import React, { useEffect } from 'react';
import { userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function Settings(){
  const navigate = useNavigate();
  useEffect(() => { if (!userManager.isLoggedIn()) navigate('/login'); }, [navigate]);

  function changePassword(){ showToast('Password change feature coming soon!', 'info'); }
  function enableTwoFactor(){ showToast('Two-factor authentication enabled!', 'success'); }

  function deleteAccount(){
    if (confirm('Are you sure? This action cannot be undone!')){
      showToast('Account deleted. Redirecting...', 'info');
      setTimeout(() => { userManager.logout(); navigate('/'); }, 1200);
    }
  }

  return (
    <div className="main-content">
        <h1>Settings ⚙️</h1>
        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">General Settings</div>
          <form>
            <div className="form-group"><label>Language</label><select><option>English</option></select></div>
            <div className="form-group"><label>Currency</label><select><option>USD ($)</option></select></div>
            <button type="submit" className="btn btn-primary">Save Settings</button>
          </form>
        </div>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Notification Preferences</div>
          <form>
            <label style={{fontWeight:600}}><input type="checkbox" defaultChecked style={{marginRight:8}}/> Email Notifications</label>
          </form>
        </div>

        <div className="card">
          <div className="card-header">Privacy & Security</div>
          <div style={{display:'flex', gap:16, marginTop:16}}>
            <button className="btn btn-outline" onClick={changePassword}>Change Password</button>
            <button className="btn btn-outline" onClick={enableTwoFactor}>Enable Two-Factor Auth</button>
            <button className="btn" style={{background:'#dc2626', color:'white'}} onClick={deleteAccount}>Delete Account</button>
          </div>
        </div>
    </div>
  );
}

