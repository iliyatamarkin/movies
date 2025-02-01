import { SeatLayout } from "./Seat";

export interface Theater {
  id: string;
  name: string;
  seatLayout: SeatLayout[];
}

export interface Showtime {
  id: string;
  movieId: string;
  theater: Theater;
  startTime: string;
  availableSeats: number;
  totalSeats: number;
}
