import { createContext, useContext, useState, useEffect } from "react";

const BookingsContext = createContext(null);
const STORAGE_KEY = "homeserve_bookings";

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  function addBooking(booking) {
    const newBooking = {
      ...booking,
      id: Date.now(), 
      status: "Pending",
    };
    setBookings((prev) => [...prev, newBooking]);
  }

  function updateBooking(id, updates) {
      setBookings((prev) =>
    prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
  );
  }

  function removeBooking(id) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  const value = { bookings, addBooking, updateBooking, removeBooking };

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingsContext);
}