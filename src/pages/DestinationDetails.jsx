import React, { useEffect, useMemo, useState } from 'react';
import { wishlistManager, userManager } from '../lib/managers';
import { showToast } from '../lib/ui';
import { useNavigate } from 'react-router-dom';

export default function DestinationDetails(){
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const destinations = useMemo(() => ([
    {
      id: 1,
      name: 'Paris, France',
      summary: 'The City of Love - Culture, Art and Architecture',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      summary: 'Historic temples, gardens and traditional neighborhoods',
      category: 'History',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 3,
      name: 'Santorini, Greece',
      summary: 'Sunset views, whitewashed houses and island escapes',
      category: 'Beach',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 4,
      name: 'Bali, Indonesia',
      summary: 'Nature, wellness retreats and tropical adventures',
      category: 'Nature',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 5,
      name: 'New York, USA',
      summary: 'Iconic skyline, food, museums and nightlife',
      category: 'City',
      image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 6,
      name: 'Rome, Italy',
      summary: 'Ancient landmarks and world-class cuisine',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 7,
      name: 'Cape Town, South Africa',
      summary: 'Mountains, beaches and scenic coastal drives',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1576485375217-d6a95e34d043?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 8,
      name: 'Dubai, UAE',
      summary: 'Luxury, architecture and desert experiences',
      category: 'Luxury',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 9,
      name: 'Barcelona, Spain',
      summary: 'Art, beaches and vibrant street life',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 10,
      name: 'Queenstown, New Zealand',
      summary: 'Adventure capital with lakes and mountain views',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 11,
      name: 'Istanbul, Turkey',
      summary: 'Where Europe and Asia meet with rich heritage',
      category: 'History',
      image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 12,
      name: 'Reykjavik, Iceland',
      summary: 'Northern lights, glaciers and geothermal landscapes',
      category: 'Nature',
      image: 'https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?auto=format&fit=crop&w=800&q=60'
    }
  ]), []);

  useEffect(() => { if (!userManager.isLoggedIn()) navigate('/login'); }, [navigate]);

  function addToWishlist(destination){
    const item = {
      id: `destination-${destination.id}`,
      name: destination.name,
      type: 'destination',
      summary: destination.summary,
      image: destination.image,
      category: destination.category,
      savedDate: new Date().toLocaleDateString()
    };
    if (wishlistManager.addItem(item)) showToast(`${destination.name} added to wishlist!`, 'success');
    else showToast(`${destination.name} is already in your wishlist`, 'info');
  }

  const filteredDestinations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return destinations;
    return destinations.filter((destination) =>
      destination.name.toLowerCase().includes(query) ||
      destination.summary.toLowerCase().includes(query) ||
      destination.category.toLowerCase().includes(query)
    );
  }, [destinations, searchTerm]);

  const visibleDestinations = filteredDestinations.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDestinations.length;

  return (
    <div className="main-content">
        <h1>Explore Destinations</h1>

        <div className="card" style={{marginBottom:'2rem'}}>
          <input
            type="text"
            id="search-dest"
            placeholder="Search destinations by name, category, or keyword..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setVisibleCount(6);
            }}
            style={{marginBottom:'0.75rem'}}
          />
          <p className="text-muted" style={{margin:0}}>
            Showing {Math.min(visibleDestinations.length, filteredDestinations.length)} of {filteredDestinations.length} destinations
          </p>
        </div>

        <div className="grid grid-3 mobile-swipe-grid">
          {visibleDestinations.map((destination) => (
            <div className="card" key={destination.id}>
              <img src={destination.image} alt={destination.name} style={{height:200, width:'100%', objectFit:'cover', borderRadius:8, marginBottom:16}} />
              <h3>{destination.name}</h3>
              <p className="text-muted">{destination.summary}</p>
              <div style={{display:'flex', gap:8, marginBottom:16}}><span className="badge badge-info">{destination.category}</span></div>
              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm" style={{flex:1}}>Learn More</button>
                <button className="btn btn-outline btn-sm" onClick={() => addToWishlist(destination)}>Save</button>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="card" style={{marginTop:'1.5rem'}}>
            <p className="text-muted" style={{margin:0}}>No destinations found. Try another keyword.</p>
          </div>
        )}

        {hasMore && (
          <div style={{display:'flex', justifyContent:'center', marginTop:'1.5rem'}}>
            <button className="btn btn-outline" onClick={() => setVisibleCount((count) => count + 6)}>
              Load More Destinations
            </button>
          </div>
        )}
    </div>
  );
}

