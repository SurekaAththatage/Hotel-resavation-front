import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface Room {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CheckoutData {
  checkIn: string;
  checkOut: string;
  guests: number;
  room: Room;
  totalNights: number;
  totalPrice: number;
  specialRequests?: string;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    if (location.state) {
      setCheckoutData(location.state as CheckoutData);
    } else {
      // Redirect if no checkout data
      navigate('/my-reservations');
    }
  }, [location.state, navigate]);

  if (!checkoutData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading checkout details...</h1>
        </div>
      </div>
    );
  }

  const handleProcessCheckout = () => {
    // Here you would typically integrate with a payment gateway
    alert('Checkout process will be implemented here!');
    // After successful checkout, you might navigate to a confirmation page
    // navigate('/confirmation', { state: { reservationId: 'some-id' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout Summary</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reservation Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reservation Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-medium">{format(new Date(checkoutData.checkIn), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-medium">{format(new Date(checkoutData.checkOut), 'MMMM d, yyyy')}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Guests</p>
                <p className="font-medium">{checkoutData.guests} {checkoutData.guests === 1 ? 'Guest' : 'Guests'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Length of Stay</p>
                <p className="font-medium">{checkoutData.totalNights} {checkoutData.totalNights === 1 ? 'Night' : 'Nights'}</p>
              </div>
              {checkoutData.specialRequests && (
                <div>
                  <p className="text-sm text-gray-600">Special Requests</p>
                  <p className="font-medium text-gray-800">{checkoutData.specialRequests}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Room Details</h2>
            <div className="flex items-start space-x-4">
              <img
                src={checkoutData.room.imageUrl}
                alt={checkoutData.room.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{checkoutData.room.name}</h3>
                <p className="text-sm text-gray-600 mt-1">${checkoutData.room.price} per night</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information & Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Room Price ({checkoutData.totalNights} nights)</span>
                <span>${checkoutData.totalPrice}</span>
              </div>
              {/* Add more items like taxes, fees here */}
              <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                <span>Total</span>
                <span>${checkoutData.totalPrice}</span>
              </div>
            </div>
            
            {/* Placeholder for Payment Form */}
            <div className="mt-6 pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              <div className="bg-gray-100 p-4 rounded-md text-center text-gray-600">
                Payment form integration goes here.
              </div>
            </div>

            <button
              onClick={handleProcessCheckout}
              className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors mt-6"
            >
              Process Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 