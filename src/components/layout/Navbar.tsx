import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Hotel, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Hotel className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">SriLuxe Hotels</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/rooms" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Rooms
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
            
            {user ? (
              <div className="relative ml-3 flex items-center space-x-3">
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center text-gray-700 hover:text-primary">
                  <User className="h-5 w-5 mr-1" />
                  <span>{user.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-primary"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="flex items-center btn btn-outline">
                  <LogIn className="h-4 w-4 mr-1" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="flex items-center btn btn-primary">
                  <UserPlus className="h-4 w-4 mr-1" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/rooms" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Rooms
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                  {user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;