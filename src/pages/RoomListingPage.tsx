import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
}

const RoomListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Mock data - replace with actual API call
  const rooms: Room[] = [
    {
      id: 1,
      name: "Deluxe Suite",
      type: "suite",
      price: 299,
      capacity: 2,
      amenities: ["King Bed", "Ocean View", "Mini Bar", "Free WiFi"],
      imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      name: "Standard Room",
      type: "standard",
      price: 199,
      capacity: 2,
      amenities: ["Queen Bed", "City View", "Free WiFi"],
      imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      name: "Family Suite",
      type: "suite",
      price: 399,
      capacity: 4,
      amenities: ["2 Queen Beds", "Kitchen", "Living Room", "Free WiFi"],
      imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const typeMatch = selectedType === 'all' || room.type === selectedType;
    const priceMatch = room.price >= priceRange[0] && room.price <= priceRange[1];
    return typeMatch && priceMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>

      {/* Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="standard">Standard</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full p-2 border rounded-md"
                placeholder="Min"
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full p-2 border rounded-md"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
              <p className="text-gray-600 mb-2">${room.price} per night</p>
              <p className="text-gray-600 mb-2">Capacity: {room.capacity} persons</p>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Amenities:</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate(`/rooms/${room.id}`)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomListingPage; 