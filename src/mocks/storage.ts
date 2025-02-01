import { Booking } from "../types";

export const BookingStorage = {
  getBookings: (): Record<string, Booking> => {
    const bookings = localStorage.getItem(`bookings`);
    return bookings ? JSON.parse(bookings) : {};
  },

  setBookings: (booking: Record<string, Booking>) => {
    localStorage.setItem(`bookings`, JSON.stringify(booking));
  },

  addBooking: (booking: Record<string, Booking>) => {
    BookingStorage.setBookings(booking);
  },
};
