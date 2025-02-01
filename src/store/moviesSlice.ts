import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieService } from "../services/movieService";
import { Movie } from "../types/Movie";

interface MoviesState {
  items: Movie[];
  filteredItems: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const movies = await movieService.getMovies();
  return movies;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    filterByGenre: (state, action) => {
      state.filteredItems = state.items.filter((movie) => movie.genre.includes(action.payload));
    },
    searchByTitle: (state, action) => {
      state.filteredItems = state.items.filter((movie) => movie.title.toLowerCase().includes(action.payload.toLowerCase()));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { filterByGenre, searchByTitle } = moviesSlice.actions;
export default moviesSlice.reducer;
