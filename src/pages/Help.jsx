import React, { useEffect } from 'react';
import { userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function Help(){
  const navigate = useNavigate();
  useEffect(() => { if (!userManager.isLoggedIn()) navigate('/login'); }, [navigate]);

  function toggleFAQ(e){
    const btn = e.currentTarget;
    const answer = btn.nextElementSibling;
    const arrow = btn.querySelector('span');
    if (answer.style.display === 'none' || answer.style.display === '') { answer.style.display = 'block'; if (arrow) arrow.textContent = '▼'; }
    else { answer.style.display = 'none'; if (arrow) arrow.textContent = '▶'; }
  }

  function reportIssue(event){
    event.preventDefault();
    showToast("Issue reported successfully! We'll get back to you soon.", 'success');
    const form = event.target; if (form) form.reset();
  }

  return (
    <div className="main-content">
        <h1>Help & Support ❓</h1>
        <div className="card" style={{marginBottom:'2rem'}}>
          <input type="text" id="search-help" placeholder="Search for help..." style={{marginBottom:0}} />
        </div>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Get in Touch</div>
          <div className="grid grid-3" style={{gap:16}}>
            <div style={{textAlign:'center', padding:16, background:'var(--light-bg)', borderRadius:8}}>
              <p style={{fontSize:'2rem'}}>💬</p>
              <h4>Live Chat</h4>
              <button className="btn btn-primary btn-sm" style={{width:'100%'}}>Start Chat</button>
            </div>
          </div>
        </div>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Frequently Asked Questions</div>
          <div style={{borderBottom:'1px solid var(--border-color)', padding:'1.5rem 0'}}>
            <button onClick={toggleFAQ} style={{width:'100%', textAlign:'left', background:'none', border:'none', cursor:'pointer', padding:0, fontSize:'1rem', fontWeight:600}}>
              <span style={{color:'var(--primary-color)'}}>▶</span> How do I create a trip?
            </button>
            <div className="faq-answer" style={{display:'none', marginTop:16, paddingTop:16, borderTop:'1px solid var(--border-color)'}}>
              <p>To create a trip, go to the Trip Planner section and click on "Create a New Trip".</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Report a Bug or Issue</div>
          <form onSubmit={reportIssue}>
            <div className="form-group"><label htmlFor="issue-type">Issue Type</label><select id="issue-type" required><option>Bug Report</option></select></div>
            <div className="form-group"><label htmlFor="issue-description">Description</label><textarea id="issue-description" rows={5} required></textarea></div>
            <div className="form-group"><label htmlFor="issue-email">Email</label><input type="email" id="issue-email" required /></div>
            <button type="submit" className="btn btn-primary">Submit Report</button>
          </form>
        </div>
    </div>
  );
}

