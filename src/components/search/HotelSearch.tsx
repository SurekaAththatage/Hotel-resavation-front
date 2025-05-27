import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users } from 'lucide-react';
import { useHotel } from '../../contexts/HotelContext';

const HotelSearch: React.FC = () => {
  const navigate = useNavigate();
  const { hotels } = useHotel();
  
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location || !checkIn || !checkOut) {
      alert('Please fill in all required fields');
      return;
    }
    
    const searchParams = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests: guests.toString()
    });
    
    navigate(`/rooms?${searchParams.toString()}`);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-input appearance-none pl-10"
              required
            >
              <option value="">Select location</option>
              {hotels.map(hotel => (
                <option key={hotel.id} value={hotel.location}>
                  {hotel.location}
                </option>
              ))}
            </select>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
            Check In
          </label>
          <div className="relative">
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="form-input pl-10"
              required
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
            Check Out
          </label>
          <div className="relative">
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="form-input pl-10"
              required
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="flex">
            <div className="relative flex-grow">
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                min={1}
                max={10}
                className="form-input pl-10"
                required
              />
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              type="submit"
              className="ml-2 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelSearch;