export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  rating: number;
  duration: number; // Duration in minutes
  imageUrl: string; // URL for the movie poster
}
