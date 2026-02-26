import React, { useEffect } from 'react';
import { userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function BudgetPlanner(){
  const navigate = useNavigate();

  useEffect(() => {
    if (!userManager.isLoggedIn()) navigate('/login');
  }, [navigate]);

  function addExpense(event){
    event.preventDefault();
    const amount = document.getElementById('exp-amount')?.value || '0';
    showToast(`Expense of $${amount} added!`, 'success');
    const form = event.target;
    if (form) form.reset();
  }

  return (
    <div className="main-content">
        <h1>Budget Planner 💰</h1>
        <div className="stats-grid" style={{marginBottom:'2rem'}}>
          <div className="stat-card"><div className="stat-number" style={{color:'var(--secondary-color)'}}>$5,000</div><div className="stat-label">Total Budget</div></div>
          <div className="stat-card"><div className="stat-number" style={{color:'var(--primary-color)'}}>$3,420</div><div className="stat-label">Spent</div></div>
          <div className="stat-card"><div className="stat-number" style={{color:'var(--accent-color)'}}>$1,580</div><div className="stat-label">Remaining</div></div>
          <div className="stat-card"><div className="stat-number" style={{color:'var(--danger-color)'}}>68%</div><div className="stat-label">Budget Used</div></div>
        </div>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Budget Breakdown by Category</div>
          <div className="table-responsive">
            <table className="table mobile-card-table">
              <thead>
                <tr><th>Category</th><th>Budgeted</th><th>Spent</th><th>Remaining</th><th>Progress</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Category">Flights</td>
                  <td data-label="Budgeted">$1,800</td>
                  <td data-label="Spent">$1,450</td>
                  <td data-label="Remaining">$350</td>
                  <td data-label="Progress">
                    <div className="budget-progress"><span style={{width:'81%'}} /></div>
                  </td>
                </tr>
                <tr>
                  <td data-label="Category">Accommodation</td>
                  <td data-label="Budgeted">$1,600</td>
                  <td data-label="Spent">$1,120</td>
                  <td data-label="Remaining">$480</td>
                  <td data-label="Progress">
                    <div className="budget-progress"><span style={{width:'70%'}} /></div>
                  </td>
                </tr>
                <tr>
                  <td data-label="Category">Transport</td>
                  <td data-label="Budgeted">$650</td>
                  <td data-label="Spent">$420</td>
                  <td data-label="Remaining">$230</td>
                  <td data-label="Progress">
                    <div className="budget-progress"><span style={{width:'65%'}} /></div>
                  </td>
                </tr>
                <tr>
                  <td data-label="Category">Food & Activities</td>
                  <td data-label="Budgeted">$950</td>
                  <td data-label="Spent">$430</td>
                  <td data-label="Remaining">$520</td>
                  <td data-label="Progress">
                    <div className="budget-progress"><span style={{width:'45%'}} /></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{marginBottom:'2rem'}}>
          <div className="card-header">Add Expense</div>
          <form onSubmit={addExpense}>
            <div className="grid grid-3">
              <div className="form-group"><label htmlFor="exp-category">Category</label><select id="exp-category" required><option>Flights</option><option>Accommodation</option><option>Transport</option><option>Food</option><option>Activities</option></select></div>
              <div className="form-group"><label htmlFor="exp-description">Description</label><input type="text" id="exp-description" required /></div>
              <div className="form-group"><label htmlFor="exp-amount">Amount</label><input type="number" id="exp-amount" step="0.01" required /></div>
              <div className="form-group"><label htmlFor="exp-date">Date</label><input type="date" id="exp-date" required /></div>
              <div className="form-group"><label htmlFor="exp-trip">Trip</label><select id="exp-trip" required><option>Summer Vacation</option></select></div>
              <button type="submit" className="btn btn-primary" style={{marginTop:'2.1rem'}}>Add Expense</button>
            </div>
          </form>
        </div>
    </div>
  );
}

