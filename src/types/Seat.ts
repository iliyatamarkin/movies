export interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
  status: "available" | "booked" | "selected";
  type: "regular" | "premium" | "recliner";
  showtimeId: string;
}
export interface SeatLayout {
  row: string;
  seatsPerRow: number;
  type: "regular" | "premium" | "recliner";
  gap: number;
  price: number;
}
