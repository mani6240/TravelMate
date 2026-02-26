import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title }){
  return (
    <div className="container" style={{padding:'2rem'}}>
      <div className="card">
        <h1>{title}</h1>
        <p>This page has been converted to React. Content preserved in original project files; you can replace this placeholder with the full page markup if desired.</p>
        <Link to="/" className="btn btn-outline">Back to Home</Link>
      </div>
    </div>
  );
}
