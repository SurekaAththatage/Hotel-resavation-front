import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Hotel className="h-8 w-8 text-secondary" />
              <span className="ml-2 text-xl font-bold text-white">SriLuxe Hotels</span>
            </div>
            <p className="text-gray-400 mb-4">
              Experience luxury and comfort across our three premier locations in Sri Lanka. 
              From the bustling streets of Colombo to the serene beaches of the coast.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Locations</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Colombo (Main Branch)</p>
                  <p className="text-gray-400">123 Galle Road, Colombo 03</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Kandy</p>
                  <p className="text-gray-400">45 Temple Street, Kandy</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Galle</p>
                  <p className="text-gray-400">78 Fort Road, Galle</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/rooms" className="text-gray-400 hover:text-secondary transition-colors">
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-secondary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-2" />
                <span className="text-gray-400">+94 11 234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-2" />
                <span className="text-gray-400">info@sriluxehotels.lk</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-white">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary w-full"
                />
                <button className="bg-secondary text-white px-4 py-2 rounded-r-md hover:bg-secondary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SriLuxe Hotels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;