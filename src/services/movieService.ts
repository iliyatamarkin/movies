import axios from "axios";
import { Movie } from "../types/Movie"; // Adjust the import based on your project structure
import { API_BASE_URL } from "../config/constants";

export const movieService = {
  getMovies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`); // Adjust the API endpoint as needed
      return response.data as Movie[]; // Assuming the API returns an array of movies
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch movies");
      }
      throw error;
    }
  },
};
