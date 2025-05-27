import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Star, MapPin, Coffee, Wifi, Utensils } from 'lucide-react';
import HotelSearch from '../components/search/HotelSearch';
import { useHotel } from '../contexts/HotelContext';

const HomePage: React.FC = () => {
  const { hotels } = useHotel();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Rajiv Patel',
      location: 'Mumbai, India',
      rating: 5,
      text: 'The service at SriLuxe Colombo was exceptional. The staff went above and beyond to make our stay comfortable and memorable.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      name: 'Emma Thompson',
      location: 'London, UK',
      rating: 5,
      text: 'Beautiful rooms with stunning views of Kandy. The cultural experiences arranged by the hotel were authentic and enjoyable.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      name: 'David Chen',
      location: 'Singapore',
      rating: 4,
      text: 'The beachfront location in Galle is unbeatable. Great value for money with excellent amenities and friendly staff.',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="text-center md:text-left max-w-2xl animate-slideUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Experience Luxury in Sri Lanka
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover our premium accommodations across three stunning locations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/rooms" className="btn bg-secondary text-white hover:bg-secondary/90 px-6 py-3 text-lg">
                Browse Rooms
              </Link>
              <Link to="/about" className="btn bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-3 text-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg -mt-20 relative z-10 p-6">
            <HotelSearch />
          </div>
        </div>
      </section>

      {/* Our Hotels Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Luxury Hotels</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience unparalleled comfort and service at our three premium locations across Sri Lanka
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="card group">
                <div className="relative overflow-hidden h-60">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-secondary" />
                      <span className="ml-1 text-white">{hotel.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 mb-4">{hotel.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-secondary" />
                      <span className="ml-1 font-medium">{hotel.rating}/5</span>
                    </div>
                    <Link 
                      to={`/hotels/${hotel.id}`}
                      className="flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      View Details
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience World-Class Amenities</h2>
              <p className="text-lg text-gray-600 mb-8">
                At SriLuxe Hotels, we pride ourselves on offering premium amenities and services to make your stay exceptional.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Fine Dining</h3>
                    <p className="mt-2 text-gray-600">Experience authentic Sri Lankan cuisine and international dishes at our restaurants.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">High-Speed WiFi</h3>
                    <p className="mt-2 text-gray-600">Stay connected with complimentary high-speed internet throughout our properties.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Room Service</h3>
                    <p className="mt-2 text-gray-600">Enjoy 24/7 room service with a selection of local and international dishes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Prime Locations</h3>
                    <p className="mt-2 text-gray-600">Our hotels are situated in prime locations with easy access to attractions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Hotel amenities"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-gray-800 font-semibold">Starting from</p>
                <p className="text-2xl font-bold text-primary">LKR 15,000<span className="text-sm text-gray-600">/night</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied guests about their experiences at SriLuxe Hotels
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg shadow-md p-8">
                      <div className="flex items-center mb-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="h-14 w-14 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                          <p className="text-gray-600">{testimonial.location}</p>
                        </div>
                        <div className="ml-auto flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? 'text-secondary fill-secondary' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 italic">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${activeTestimonial === index ? 'bg-primary' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience SriLuxe?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Book your stay today and enjoy our special rates for direct bookings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rooms" className="btn bg-white text-primary hover:bg-gray-100 px-6 py-3 text-lg">
              View Rooms & Suites
            </Link>
            <Link to="/contact" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;