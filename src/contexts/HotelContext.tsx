import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  province: string;
  description: string;
  image: string;
  rating: number;
  amenities: string[];
  isMainBranch: boolean;
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  images: string[];
  amenities: string[];
  isAvailable: boolean;
}

interface HotelContextType {
  hotels: Hotel[];
  rooms: Room[];
  loading: boolean;
  getHotelById: (id: string) => Hotel | undefined;
  getRoomById: (id: string) => Room | undefined;
  getRoomsByHotelId: (hotelId: string) => Room[];
  searchAvailableRooms: (
    location: string,
    checkIn: Date,
    checkOut: Date,
    guests: number
  ) => Promise<Room[]>;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mock data
    loadMockData();
  }, []);

  const loadMockData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockHotels: Hotel[] = [
        {
          id: 'h1',
          name: 'SriLuxe Colombo',
          location: 'Colombo',
          province: 'Western Province',
          description: 'Our flagship hotel in the heart of Colombo with stunning city views and modern amenities.',
          image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.8,
          amenities: ['Free WiFi', 'Pool', 'Spa', 'Fitness Center', 'Restaurant'],
          isMainBranch: true
        },
        {
          id: 'h2',
          name: 'SriLuxe Kandy',
          location: 'Kandy',
          province: 'Central Province',
          description: 'Experience cultural heritage and luxury in our Kandy hotel near the Temple of the Tooth.',
          image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.6,
          amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar'],
          isMainBranch: false
        },
        {
          id: 'h3',
          name: 'SriLuxe Galle',
          location: 'Galle',
          province: 'Southern Province',
          description: 'Beachfront luxury with colonial charm in the historic Galle Fort area.',
          image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          amenities: ['Free WiFi', 'Beach Access', 'Pool', 'Spa', 'Restaurant'],
          isMainBranch: false
        }
      ];
      
      const mockRooms: Room[] = [
        // Colombo Rooms
        {
          id: 'r1',
          hotelId: 'h1',
          name: 'Deluxe King Room',
          type: 'Deluxe',
          description: 'Spacious room with a king-sized bed and city view.',
          price: 25000, // in LKR
          capacity: 2,
          images: [
            'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          amenities: ['King Bed', 'City View', 'Air Conditioning', 'Mini Bar', 'Free WiFi'],
          isAvailable: true
        },
        {
          id: 'r2',
          hotelId: 'h1',
          name: 'Executive Suite',
          type: 'Suite',
          description: 'Luxury suite with separate living area and premium amenities.',
          price: 45000, // in LKR
          capacity: 2,
          images: [
            'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          amenities: ['King Bed', 'Separate Living Area', 'City View', 'Jacuzzi', 'Mini Bar', 'Free WiFi'],
          isAvailable: true
        },
        {
          id: 'r3',
          hotelId: 'h1',
          name: 'Family Room',
          type: 'Family',
          description: 'Spacious room with two queen beds, perfect for families.',
          price: 35000, // in LKR
          capacity: 4,
          images: [
            'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          amenities: ['Two Queen Beds', 'City View', 'Air Conditioning', 'Mini Bar', 'Free WiFi'],
          isAvailable: true
        },
        
        // Kandy Rooms
        {
          id: 'r4',
          hotelId: 'h2',
          name: 'Mountain View Room',
          type: 'Deluxe',
          description: 'Comfortable room with stunning mountain views.',
          price: 22000, // in LKR
          capacity: 2,
          images: [
            'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          amenities: ['Queen Bed', 'Mountain View', 'Air Conditioning', 'Free WiFi'],
          isAvailable: true
        },
        {
          id: 'r5',
          hotelId: 'h2',
          name: 'Heritage Suite',
          type: 'Suite',
          description: 'Luxurious suite with traditional Sri Lankan decor and modern amenities.',
          price: 40000, // in LKR
          capacity: 2,
          images: [
            'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          amenities: ['King Bed', 'Mountain View', 'Jacuzzi', 'Mini Bar', 'Free WiFi'],
          isAvailable: true
        },
        
        // Galle Rooms
        {
          id: 'r6',
          hotelId: 'h3',
          name: 'Ocean View Room',
          type: 'Deluxe',
          description: 'Comfortable room with breathtaking ocean views.',
          price: 28000, // in LKR
          capacity: 2,
          images: [
            'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          amenities: ['Queen Bed', 'Ocean View', 'Air Conditioning', 'Mini Bar', 'Free WiFi'],
          isAvailable: true
        },
        {
          id: 'r7',
          hotelId: 'h3',
          name: 'Beach Villa',
          type: 'Villa',
          description: 'Private villa with direct beach access and luxury amenities.',
          price: 60000, // in LKR
          capacity: 4,
          images: [
            'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-53464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          amenities: ['King Bed', 'Private Pool', 'Beach Access', 'Jacuzzi', 'Kitchen', 'Free WiFi'],
          isAvailable: true
        }
      ];
      
      setHotels(mockHotels);
      setRooms(mockRooms);
    } catch (error) {
      console.error('Failed to load hotel data', error);
    } finally {
      setLoading(false);
    }
  };

  const getHotelById = (id: string) => {
    return hotels.find(hotel => hotel.id === id);
  };

  const getRoomById = (id: string) => {
    return rooms.find(room => room.id === id);
  };

  const getRoomsByHotelId = (hotelId: string) => {
    return rooms.filter(room => room.hotelId === hotelId);
  };

  const searchAvailableRooms = async (
    location: string,
    checkIn: Date,
    checkOut: Date,
    guests: number
  ) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find hotel by location
    const hotel = hotels.find(
      h => h.location.toLowerCase() === location.toLowerCase()
    );
    
    if (!hotel) return [];
    
    // Filter rooms by hotel and capacity
    return rooms.filter(
      room => room.hotelId === hotel.id && 
              room.isAvailable && 
              room.capacity >= guests
    );
  };

  return (
    <HotelContext.Provider
      value={{
        hotels,
        rooms,
        loading,
        getHotelById,
        getRoomById,
        getRoomsByHotelId,
        searchAvailableRooms,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = (): HotelContextType => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};