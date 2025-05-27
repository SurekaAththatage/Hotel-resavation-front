import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './UserContext';

export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out' | 'no-show';
  hasCreditCard: boolean;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bill {
  id: string;
  reservationId: string;
  userId: string;
  items: BillItem[];
  totalAmount: number;
  paymentMethod?: 'cash' | 'credit_card';
  paymentStatus: 'pending' | 'paid';
  createdAt: Date;
  updatedAt: Date;
}

export interface BillItem {
  id: string;
  description: string;
  amount: number;
  category: 'room' | 'restaurant' | 'room_service' | 'laundry' | 'telephone' | 'other';
}

interface ReservationContextType {
  reservations: Reservation[];
  bills: Bill[];
  loading: boolean;
  createReservation: (
    roomId: string,
    userId: string,
    checkInDate: Date,
    checkOutDate: Date,
    guests: number,
    hasCreditCard: boolean
  ) => Promise<Reservation>;
  updateReservation: (
    id: string,
    updates: Partial<Reservation>
  ) => Promise<Reservation>;
  cancelReservation: (id: string) => Promise<void>;
  checkIn: (reservationId: string) => Promise<void>;
  checkOut: (reservationId: string, paymentMethod: 'cash' | 'credit_card') => Promise<Bill>;
  getReservationsByUser: (userId: string) => Reservation[];
  getReservationById: (id: string) => Reservation | undefined;
  getBillByReservation: (reservationId: string) => Bill | undefined;
  addBillItem: (reservationId: string, item: Omit<BillItem, 'id'>) => Promise<void>;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mock data
    loadMockData();
  }, []);

  const loadMockData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockReservations: Reservation[] = [
        {
          id: 'res1',
          roomId: 'r1',
          userId: '3',
          checkInDate: new Date(2025, 5, 15),
          checkOutDate: new Date(2025, 5, 18),
          guests: 2,
          status: 'confirmed',
          hasCreditCard: true,
          totalAmount: 75000, // 3 nights at 25000 LKR
          createdAt: new Date(2025, 4, 20),
          updatedAt: new Date(2025, 4, 20)
        },
        {
          id: 'res2',
          roomId: 'r4',
          userId: '3',
          checkInDate: new Date(2025, 6, 10),
          checkOutDate: new Date(2025, 6, 15),
          guests: 2,
          status: 'confirmed',
          hasCreditCard: true,
          totalAmount: 110000, // 5 nights at 22000 LKR
          createdAt: new Date(2025, 4, 25),
          updatedAt: new Date(2025, 4, 25)
        }
      ];
      
      const mockBills: Bill[] = [
        {
          id: 'bill1',
          reservationId: 'res1',
          userId: '3',
          items: [
            {
              id: 'item1',
              description: 'Room charge - Deluxe King Room (3 nights)',
              amount: 75000,
              category: 'room'
            },
            {
              id: 'item2',
              description: 'Restaurant - Dinner on June 15',
              amount: 8500,
              category: 'restaurant'
            }
          ],
          totalAmount: 83500,
          paymentStatus: 'pending',
          createdAt: new Date(2025, 5, 15),
          updatedAt: new Date(2025, 5, 15)
        }
      ];
      
      setReservations(mockReservations);
      setBills(mockBills);
    } catch (error) {
      console.error('Failed to load reservation data', error);
    } finally {
      setLoading(false);
    }
  };

  const createReservation = async (
    roomId: string,
    userId: string,
    checkInDate: Date,
    checkOutDate: Date,
    guests: number,
    hasCreditCard: boolean
  ): Promise<Reservation> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    // In a real app, we'd calculate this based on the room price
    const roomPrice = 25000; // Example price in LKR
    const totalAmount = nights * roomPrice;
    
    const newReservation: Reservation = {
      id: `res${Math.random().toString(36).substr(2, 9)}`,
      roomId,
      userId,
      checkInDate,
      checkOutDate,
      guests,
      status: 'confirmed',
      hasCreditCard,
      totalAmount,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setReservations(prev => [...prev, newReservation]);
    return newReservation;
  };

  const updateReservation = async (
    id: string,
    updates: Partial<Reservation>
  ): Promise<Reservation> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reservation = reservations.find(r => r.id === id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    
    const updatedReservation = {
      ...reservation,
      ...updates,
      updatedAt: new Date()
    };
    
    setReservations(prev => 
      prev.map(r => r.id === id ? updatedReservation : r)
    );
    
    return updatedReservation;
  };

  const cancelReservation = async (id: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setReservations(prev => 
      prev.map(r => r.id === id ? { ...r, status: 'cancelled', updatedAt: new Date() } : r)
    );
  };

  const checkIn = async (reservationId: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setReservations(prev => 
      prev.map(r => r.id === reservationId ? { ...r, status: 'checked-in', updatedAt: new Date() } : r)
    );
  };

  const checkOut = async (
    reservationId: string, 
    paymentMethod: 'cash' | 'credit_card'
  ): Promise<Bill> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    
    // Update reservation status
    setReservations(prev => 
      prev.map(r => r.id === reservationId ? { ...r, status: 'checked-out', updatedAt: new Date() } : r)
    );
    
    // Check if bill already exists
    let bill = bills.find(b => b.reservationId === reservationId);
    
    if (bill) {
      // Update existing bill
      const updatedBill: Bill = {
        ...bill,
        paymentMethod,
        paymentStatus: 'paid',
        updatedAt: new Date()
      };
      
      setBills(prev => 
        prev.map(b => b.id === bill?.id ? updatedBill : b)
      );
      
      return updatedBill;
    } else {
      // Create new bill
      const newBill: Bill = {
        id: `bill${Math.random().toString(36).substr(2, 9)}`,
        reservationId,
        userId: reservation.userId,
        items: [
          {
            id: `item${Math.random().toString(36).substr(2, 9)}`,
            description: `Room charge (${reservation.roomId})`,
            amount: reservation.totalAmount,
            category: 'room'
          }
        ],
        totalAmount: reservation.totalAmount,
        paymentMethod,
        paymentStatus: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setBills(prev => [...prev, newBill]);
      return newBill;
    }
  };

  const getReservationsByUser = (userId: string): Reservation[] => {
    return reservations.filter(r => r.userId === userId);
  };

  const getReservationById = (id: string): Reservation | undefined => {
    return reservations.find(r => r.id === id);
  };

  const getBillByReservation = (reservationId: string): Bill | undefined => {
    return bills.find(b => b.reservationId === reservationId);
  };

  const addBillItem = async (
    reservationId: string, 
    item: Omit<BillItem, 'id'>
  ): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const bill = bills.find(b => b.reservationId === reservationId);
    
    if (bill) {
      // Add item to existing bill
      const newItem: BillItem = {
        ...item,
        id: `item${Math.random().toString(36).substr(2, 9)}`
      };
      
      const updatedBill: Bill = {
        ...bill,
        items: [...bill.items, newItem],
        totalAmount: bill.totalAmount + item.amount,
        updatedAt: new Date()
      };
      
      setBills(prev => 
        prev.map(b => b.id === bill.id ? updatedBill : b)
      );
    } else {
      // Create new bill for the reservation
      const reservation = reservations.find(r => r.id === reservationId);
      if (!reservation) {
        throw new Error('Reservation not found');
      }
      
      const newItem: BillItem = {
        ...item,
        id: `item${Math.random().toString(36).substr(2, 9)}`
      };
      
      const newBill: Bill = {
        id: `bill${Math.random().toString(36).substr(2, 9)}`,
        reservationId,
        userId: reservation.userId,
        items: [newItem],
        totalAmount: item.amount,
        paymentStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setBills(prev => [...prev, newBill]);
    }
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        bills,
        loading,
        createReservation,
        updateReservation,
        cancelReservation,
        checkIn,
        checkOut,
        getReservationsByUser,
        getReservationById,
        getBillByReservation,
        addBillItem,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = (): ReservationContextType => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};