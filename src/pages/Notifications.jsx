import React, { useEffect } from 'react';
import { userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function Notifications(){
  const navigate = useNavigate();
  useEffect(() => { if (!userManager.isLoggedIn()) navigate('/login'); }, [navigate]);

  function markAllRead(){
    document.querySelectorAll('.badge-success, .badge-info').forEach(badge => {
      if (badge.textContent === 'Unread') {
        badge.classList.remove('badge-success','badge-info');
        badge.classList.add('badge-warning');
        badge.textContent = 'Read';
      }
    });
    showToast('All notifications marked as read','success');
  }

  return (
    <div className="main-content">
        <div className="flex-between">
          <h1>Notifications 🔔</h1>
          <button className="btn btn-outline btn-sm" onClick={markAllRead}>Mark All as Read</button>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <div className="card" style={{borderLeft:'4px solid var(--primary-color)'}}>
            <div className="flex-between">
              <div>
                <h3>✈️ Flight Confirmation</h3>
                <p className="text-muted">Your flight to Paris has been confirmed!</p>
              </div>
              <div style={{textAlign:'right'}}>
                <span className="badge badge-success">Unread</span>
                <p style={{marginTop:16, fontSize:'0.875rem', color:'var(--text-light)'}}>2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

