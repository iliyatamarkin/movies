import axios from "axios";
import { Booking } from "../types";
import { API_BASE_URL } from "../config/constants";

export const bookingService = {
  createBooking: async (booking: Booking) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings`, booking);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to create booking");
      }
      throw error;
    }
  },

  getBookings: async (showtimeId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/${showtimeId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch booking");
      }
      throw error;
    }
  },

  cancelBooking: async (bookingId: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to cancel booking");
      }
      throw error;
    }
  },
};
