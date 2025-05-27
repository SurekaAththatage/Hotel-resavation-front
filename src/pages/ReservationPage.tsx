import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';

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

interface ReservationData {
  checkIn: string;
  checkOut: string;
  guests: number;
  room: Room;
}

const ReservationPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [totalNights, setTotalNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  useEffect(() => {
    if (location.state) {
      const data = location.state as ReservationData;
      setReservationData(data);
      
      const nights = differenceInDays(
        new Date(data.checkOut),
        new Date(data.checkIn)
      );
      setTotalNights(nights);
      setTotalPrice(nights * data.room.price);
    } else {
      // Redirect if no reservation data
      navigate('/rooms');
    }
  }, [location.state, navigate]);

  if (!reservationData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading reservation details...</h1>
        </div>
      </div>
    );
  }

  const handleConfirmReservation = () => {
    // Here you would typically make an API call to save the reservation
    navigate(`/checkout/${roomId}`, {
      state: {
        ...reservationData,
        totalNights,
        totalPrice,
        specialRequests
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Confirm Your Reservation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reservation Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reservation Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-medium">{format(new Date(reservationData.checkIn), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-medium">{format(new Date(reservationData.checkOut), 'MMMM d, yyyy')}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Guests</p>
                <p className="font-medium">{reservationData.guests} {reservationData.guests === 1 ? 'Guest' : 'Guests'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Length of Stay</p>
                <p className="font-medium">{totalNights} {totalNights === 1 ? 'Night' : 'Nights'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Special Requests</h2>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests or requirements?"
              className="w-full p-3 border rounded-md h-32 resize-none"
            />
          </div>
        </div>

        {/* Room Details and Price Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Room Details</h2>
            <div className="flex items-start space-x-4">
              <img
                src={reservationData.room.imageUrl}
                alt={reservationData.room.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{reservationData.room.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{reservationData.room.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {reservationData.room.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Rs.{reservationData.room.price} × {totalNights} nights</span>
                <span>Rs.{totalPrice}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                <span>Total</span>
                <span>Rs.{totalPrice}</span>
              </div>
            </div>
            <button
              onClick={handleConfirmReservation}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mt-6"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage; 