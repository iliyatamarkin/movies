import { Seat } from "./Seat"; // Adjust the import based on your project structure

export interface BookingState {
  selectedSeats: Seat[];
  totalPrice: number;
  showtimeId: string | null;
}

export interface Booking {
  showtimeId: string;
  seats: string[];
  totalPrice: number;
}

export interface BookedSeats {
  showtimeId: string;
  seats: string[];
}
