import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
  description: string;
  size: string;
  bedType: string;
  view: string;
}

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);

  // Mock data - replace with actual API call
  const room: Room = {
    id: Number(id),
    name: "Deluxe Suite",
    type: "suite",
    price: 299,
    capacity: 2,
    amenities: ["King Bed", "Ocean View", "Mini Bar", "Free WiFi", "Air Conditioning", "Room Service"],
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description: "Experience luxury in our Deluxe Suite featuring a king-size bed, private balcony with ocean views, and premium amenities. Perfect for couples seeking a romantic getaway or business travelers looking for comfort and style.",
    size: "45 m²",
    bedType: "King Size",
    view: "Ocean View"
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    navigate(`/reservation/${id}`, {
      state: {
        checkIn,
        checkOut,
        guests,
        room
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Images */}
        <div className="space-y-4">
          <img
            src={room.imageUrl}
            alt={room.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src={room.imageUrl}
              alt={`${room.name} - View 2`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src={room.imageUrl}
              alt={`${room.name} - View 3`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Room Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
            <p className="text-gray-600">{room.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Room Size</h3>
              <p className="text-gray-600">{room.size}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Bed Type</h3>
              <p className="text-gray-600">{room.bedType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">View</h3>
              <p className="text-gray-600">{room.view}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Capacity</h3>
              <p className="text-gray-600">{room.capacity} persons</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Book This Room</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  {[...Array(room.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-4">
                <p className="text-2xl font-bold mb-4">
                  ${room.price} <span className="text-sm font-normal">per night</span>
                </p>
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage; 