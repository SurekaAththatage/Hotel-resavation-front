import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Rooms Management Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Rooms Management</h2>
          <button
            onClick={() => navigate('/admin/rooms')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Manage Rooms
          </button>
        </div>

        {/* Users Management Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Users Management</h2>
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Manage Users
          </button>
        </div>

        {/* Reservations Management Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Reservations</h2>
          <button
            onClick={() => navigate('/admin/reservations')}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            View Reservations
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 