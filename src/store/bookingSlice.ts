import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Seat } from "../types/Seat"; // Adjust the import based on your project structure
import { BookingState } from "../types/Booking"; // Update import

const initialState: BookingState = {
  selectedSeats: [],
  totalPrice: 0, // Initialize totalPrice
  showtimeId: null, // Initialize showtimeId
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectSeat(state, action: PayloadAction<Seat>) {
      state.selectedSeats.push(action.payload);
    },
    deselectSeat(state, action: PayloadAction<Seat>) {
      state.selectedSeats = state.selectedSeats.filter((seat) => seat.id !== action.payload.id);
    },
    clearBooking(state) {
      state.selectedSeats = [];
      state.totalPrice = 0; // Reset totalPrice when clearing booking
      state.showtimeId = null; // Reset showtimeId when clearing booking
    },
    // Add other reducers as needed
  },
});

export const { selectSeat, deselectSeat, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
