import { Showtime } from "../types/Showtime";
import { API_BASE_URL } from "../config/constants";

export const showtimeService = {
  getShowtimesByMovieId: async (movieId: string): Promise<{ [key: string]: Showtime }> => {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}/showtimes`);
    if (!response.ok) {
      throw new Error("Failed to fetch showtimes");
    }
    return response.json();
  },
};
