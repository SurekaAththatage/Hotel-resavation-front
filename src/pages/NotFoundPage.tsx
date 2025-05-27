import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</p>
      <p className="text-gray-500 mb-8">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage; 