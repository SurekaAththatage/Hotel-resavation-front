import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface Reservation {
  id: string;
  roomId: number;
  roomName: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  guests: number;
}

const MyReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'active' | 'completed' | 'cancelled'>('all');

  // Mock data - replace with actual API call
  const reservations: Reservation[] = [
    {
      id: '1',
      roomId: 1,
      roomName: 'Deluxe Suite',
      roomImage: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      checkIn: '2024-04-01',
      checkOut: '2024-04-05',
      totalPrice: 1196,
      status: 'upcoming',
      guests: 2
    },
    {
      id: '2',
      roomId: 2,
      roomName: 'Standard Room',
      roomImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      checkIn: '2024-03-15',
      checkOut: '2024-03-20',
      totalPrice: 995,
      status: 'completed',
      guests: 1
    },
    {
      id: '3',
      roomId: 3,
      roomName: 'Family Suite',
      roomImage: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      checkIn: '2024-03-10',
      checkOut: '2024-03-12',
      totalPrice: 798,
      status: 'cancelled',
      guests: 4
    }
  ];

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'all') return true;
    return reservation.status === filter;
  });

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelReservation = () => {
    // Here you would typically make an API call to cancel the reservation
    alert('Reservation cancellation functionality will be implemented here');
  };

  const handleViewDetails = (reservationId: string) => {
    navigate(`/reservation-details/${reservationId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Reservations</h1>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="p-2 border rounded-md"
          >
            <option value="all">All Reservations</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={reservation.roomImage}
                    alt={reservation.roomName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{reservation.roomName}</h2>
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-600">
                        Check-in: {format(new Date(reservation.checkIn), 'MMMM d, yyyy')}
                      </p>
                      <p className="text-gray-600">
                        Check-out: {format(new Date(reservation.checkOut), 'MMMM d, yyyy')}
                      </p>
                      <p className="text-gray-600">
                        Guests: {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </span>
                  <p className="text-xl font-bold mt-2">${reservation.totalPrice}</p>
                  <div className="mt-4 space-x-2">
                    <button
                      onClick={() => handleViewDetails(reservation.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View Details
                    </button>
                    {reservation.status === 'upcoming' && (
                      <button
                        onClick={() => handleCancelReservation()}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">No reservations found</h3>
            <p className="text-gray-500 mt-2">Try changing your filters or make a new reservation</p>
            <button
              onClick={() => navigate('/rooms')}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Browse Rooms
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationsPage; 