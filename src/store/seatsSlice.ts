import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Seat } from "../types/Seat";
import { BookedSeats, Booking } from "../types/Booking";

interface SeatsState {
  bookedSeats: Record<string, string[]>;
  selectedSeats: Seat[];
}

const initialState: SeatsState = {
  bookedSeats: {},
  selectedSeats: [],
};

export const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    updateBookedSeats: (state, action: PayloadAction<BookedSeats>) => {
      const showtimeId = action.payload.showtimeId;
      state.bookedSeats[showtimeId] = action.payload.seats || [];
    },
    toggleSeatSelection: (state, action: PayloadAction<Seat>) => {
      const seat = action.payload;
      const seatAlreadySelected = state.selectedSeats.find((s) => s.id === seat.id);
      if (seatAlreadySelected) {
        state.selectedSeats = state.selectedSeats.filter((s) => s.id !== seat.id);
      } else {
        state.selectedSeats.push(seat);
      }
    },
    resetSelectedSeats: (state) => {
      state.selectedSeats = [];
    },
  },
});

export const { updateBookedSeats, toggleSeatSelection, resetSelectedSeats } = seatsSlice.actions;
export default seatsSlice.reducer;
