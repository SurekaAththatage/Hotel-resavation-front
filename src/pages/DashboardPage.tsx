import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useReservation } from '../contexts/ReservationContext';
import { format } from 'date-fns';
import { Calendar, Clock, Users, CreditCard, AlertCircle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const { reservations, loading } = useReservation();

  const userReservations = user ? reservations.filter(r => r.userId === user.id) : [];
  const activeReservations = userReservations.filter(r => 
    r.status !== 'cancelled' && r.status !== 'checked-out'
  );
  const pastReservations = userReservations.filter(r => 
    r.status === 'checked-out' || r.status === 'cancelled'
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="mt-2 text-gray-600">Manage your reservations and view your stay details</p>
      </div>

      {/* Active Reservations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Reservations</h2>
        {activeReservations.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">You have no active reservations</p>
            <button className="mt-4 btn btn-primary">Book a Room</button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeReservations.map(reservation => (
              <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`badge ${
                    reservation.status === 'confirmed' ? 'badge-primary' :
                    reservation.status === 'checked-in' ? 'badge-accent' :
                    'badge-secondary'
                  }`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </span>
                  {reservation.hasCreditCard && (
                    <CreditCard className="h-5 w-5 text-green-500" />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm">
                      {format(new Date(reservation.checkInDate), 'MMM dd, yyyy')} - {format(new Date(reservation.checkOutDate), 'MMM dd, yyyy')}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm">
                      Check-in: 2:00 PM, Check-out: 11:00 AM
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm">{reservation.guests} Guests</span>
                  </div>

                  {!reservation.hasCreditCard && (
                    <div className="flex items-center text-amber-600 bg-amber-50 p-2 rounded">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm">Credit card required by 7 PM</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-lg font-semibold">Total: LKR {reservation.totalAmount.toLocaleString()}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="btn btn-outline flex-1">View Details</button>
                  {reservation.status === 'confirmed' && (
                    <button className="btn btn-error flex-1">Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Reservations */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Reservations</h2>
        {pastReservations.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">No past reservations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pastReservations.map(reservation => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(reservation.checkInDate), 'MMM dd, yyyy')} - {format(new Date(reservation.checkOutDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${
                        reservation.status === 'checked-out' ? 'badge-accent' : 'badge-error'
                      }`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reservation.guests}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      LKR {reservation.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="btn btn-outline btn-sm">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;