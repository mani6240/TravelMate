import React, { useEffect, useState } from 'react';
import { openModal, closeModal, showToast } from '../lib/ui';
import { userManager } from '../lib/managers';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Itinerary(){
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => { if (!userManager.isLoggedIn()) navigate('/login'); }, [navigate]);

  useEffect(() => {
    if (location && location.state && location.state.openAddDay) {
      openModal('addDayModal');
    }
  }, [location]);

  const [days, setDays] = useState([
    { id: 1, title: 'Day 1: Arrival - July 15', date: '', activities: [{ id: 1, time: '', name: 'Arrive at CDG Airport', notes: '' }] }
  ]);
  const [modalMode, setModalMode] = useState('activity');
  const [editingDayId, setEditingDayId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');

  function addDay(event){
    event.preventDefault();
    const date = document.getElementById('day-date')?.value || '';
    const title = document.getElementById('day-title')?.value || `Day ${days.length+1}`;
    const newDay = { id: Date.now(), title: title + (date ? ` - ${date}` : ''), date, activities: [] };
    setDays(prev => [...prev, newDay]);
    showToast('Day added!', 'success');
    closeModal('addDayModal');
  }

  function startEditDay(day){
    setEditingDayId(day.id);
    setEditTitle(day.title || '');
    setEditDate(day.date || '');
  }

  function saveEditDay(){
    setDays(prev => prev.map(d => d.id === editingDayId ? { ...d, title: editTitle + (editDate ? ` - ${editDate}` : ''), date: editDate } : d));
    showToast('Day updated', 'success');
    setEditingDayId(null);
    setEditTitle('');
    setEditDate('');
  }

  function cancelEditDay(){
    setEditingDayId(null);
    setEditTitle('');
    setEditDate('');
  }

  function removeDay(id){
    setDays(prev => prev.filter(d => d.id !== id));
    showToast('Day removed', 'info');
  }

  function loadItinerary(){ showToast('Itinerary loaded!', 'info'); }

  function addActivity(event){
    event.preventDefault();
    const name = document.getElementById('activity-name')?.value || 'Activity';
    const time = document.getElementById('activity-time')?.value || '';
    const date = document.getElementById('activity-date')?.value || '';
    const locationVal = document.getElementById('activity-location')?.value || '';
    const cost = document.getElementById('activity-cost')?.value || '';
    const notes = document.getElementById('activity-notes')?.value || '';

    const activity = { id: Date.now(), name, time, location: locationVal, cost, notes };

    setDays(prev => {
      const idx = prev.findIndex(d => d.date && d.date === date);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], activities: [...copy[idx].activities, activity] };
        return copy;
      }
      if (prev.length > 0) {
        const copy = [...prev];
        copy[copy.length - 1] = { ...copy[copy.length - 1], activities: [...copy[copy.length - 1].activities, activity] };
        return copy;
      }
      return [{ id: Date.now()+1, title: `Day ${prev.length+1}` + (date ? ` - ${date}` : ''), date, activities: [activity] } , ...prev];
    });

    showToast(`${name} added to your itinerary!`, 'success');
    closeModal('addDayModal');
    const f = event.target; if (f) f.reset();
  }

  return (
    <div className="main-content">
        <h1>Trip Itinerary</h1>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Select Trip</div>
          <select id="trip-select" onChange={loadItinerary} style={{marginBottom:0}}>
            <option value="1">Summer Vacation - Paris (Jul 15-25)</option>
          </select>
        </div>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Day-by-Day Plan</div>
          {days.map(d => (
            <div key={d.id} className="itinerary-day-card" style={{border:'1px solid var(--border-color)', padding:16, marginBottom:16, borderRadius:8}}>
              {editingDayId === d.id ? (
                <div>
                  <div className="form-group"><label>Day Date</label><input value={editDate} onChange={e => setEditDate(e.target.value)} type="date" /></div>
                  <div className="form-group"><label>Day Title</label><input value={editTitle} onChange={e => setEditTitle(e.target.value)} type="text" /></div>
                  <div className="itinerary-edit-actions" style={{display:'flex', gap:8}}>
                    <button className="btn btn-primary" onClick={saveEditDay}>Save</button>
                    <button className="btn btn-outline" onClick={cancelEditDay}>Cancel</button>
                    <button className="btn btn-outline" onClick={() => removeDay(d.id)}>Remove</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={{color:'var(--primary-color)'}}>{d.title}</h3>
                  <div className="itinerary-day-layout" style={{display:'flex', gap:16, flexWrap:'wrap'}}>
                    <div className="itinerary-activities" style={{flex:1, minWidth:250}}>
                      {d.activities.map(a => (
                        <p key={a.id}><strong>Activity {a.time || 'Morning'}:</strong> {a.name}</p>
                      ))}
                    </div>
                    <div className="itinerary-actions" style={{display:'flex', flexDirection:'column', gap:8}}>
                      <button className="btn btn-outline btn-sm" onClick={() => { setModalMode('activity'); openModal('addDayModal'); }}>+ Add Activity</button>
                      <button className="btn btn-outline btn-sm" onClick={() => startEditDay(d)}>Edit</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="itinerary-add-row" style={{display:'flex', gap:8}}>
            <button className="btn btn-primary" onClick={() => { setModalMode('day'); openModal('addDayModal'); }}>+ Add Day</button>
          </div>
        </div>

        <div id="addDayModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                {modalMode === 'activity' && (
                  <button className="btn btn-outline" onClick={() => setModalMode('day')} style={{marginRight:8}}>Back</button>
                )}
                <button className={modalMode === 'day' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setModalMode('day')}>Add Day</button>
                <button className={modalMode === 'activity' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setModalMode('activity')}>Add Activity</button>
              </div>
              <button className="modal-close" onClick={() => closeModal('addDayModal')}>&times;</button>
            </div>

            {modalMode === 'day' && (
              <form onSubmit={addDay}>
                <div className="form-group"><label htmlFor="day-date">Date</label><input type="date" id="day-date" required /></div>
                <div className="form-group"><label htmlFor="day-title">Day Title</label><input type="text" id="day-title" placeholder="e.g., Day 2: Explore Paris" required /></div>
                <div style={{display:'flex', gap:16}}>
                  <button type="submit" className="btn btn-primary" style={{flex:1}}>Add Day</button>
                  <button type="button" className="btn btn-outline" style={{flex:1}} onClick={() => closeModal('addDayModal')}>Back</button>
                </div>
              </form>
            )}

            {modalMode === 'activity' && (
              <form onSubmit={addActivity}>
                <div className="form-group"><label htmlFor="activity-date">Date</label><input type="date" id="activity-date" required /></div>
                <div className="form-group"><label htmlFor="activity-name">Activity Name</label><input type="text" id="activity-name" placeholder="e.g., Museum Visit" required /></div>
                <div className="form-group"><label htmlFor="activity-time">Time</label><input type="time" id="activity-time" required /></div>
                <div className="form-group"><label htmlFor="activity-location">Location</label><input type="text" id="activity-location" required /></div>
                <div className="form-group"><label htmlFor="activity-cost">Cost</label><input type="number" id="activity-cost" step="0.01" /></div>
                <div className="form-group"><label htmlFor="activity-notes">Notes</label><textarea id="activity-notes" rows={3}></textarea></div>
                <div style={{display:'flex', gap:16}}>
                  <button type="submit" className="btn btn-primary" style={{flex:1}}>Add Activity</button>
                  <button type="button" className="btn btn-outline" style={{flex:1}} onClick={() => setModalMode('day')}>Back</button>
                </div>
              </form>
            )}
          </div>
        </div>
    </div>
  );
}


