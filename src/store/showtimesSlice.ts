import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Showtime } from "../types/Showtime"; // Update import
import { API_BASE_URL } from "../config/constants";
import { showtimeService } from "../services/showtimeService";

// Define the ShowtimesState interface
interface ShowtimesState {
  showtimes: { [key: string]: Showtime };
  loading: boolean;
}

const initialState: ShowtimesState = {
  showtimes: {},
  loading: false,
};

// Async thunk to fetch showtimes
export const fetchShowtimes = createAsyncThunk("showtimes/fetchShowtimes", async (movieId: string) => {
  return await showtimeService.getShowtimesByMovieId(movieId);
});

const showtimesSlice = createSlice({
  name: "showtimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtimes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        state.showtimes = action.payload;
        state.loading = false;
      })
      .addCase(fetchShowtimes.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default showtimesSlice.reducer;
