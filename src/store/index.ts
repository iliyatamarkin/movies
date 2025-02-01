import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import showtimesReducer from "./showtimesSlice";
import bookingReducer from "./bookingSlice";
import seatsReducer from "./seatsSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    showtimes: showtimesReducer,
    booking: bookingReducer,
    seats: seatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
