import { http } from "msw";
import { Seat } from "../types/Seat";
import { showtimes } from "./showtimes";
import { movies } from "./movies";
import { BookingStorage } from "./storage";

const API_BASE_URL = "http://localhost:3001/api";

// Mock data

export const handlers = [
  // Get all movies
  http.get(`${API_BASE_URL}/movies`, () => {
    return new Response(JSON.stringify(movies), { status: 200, headers: { "Content-Type": "application/json" } });
  }),

  // Get movie by ID
  http.get(`${API_BASE_URL}/movies/:id`, ({ params }) => {
    const movie = movies.find((m: { id: string }) => m.id === params.id);
    if (!movie) {
      return new Response(null, { status: 404 });
    }
    return new Response(JSON.stringify(movie), { status: 200, headers: { "Content-Type": "application/json" } });
  }),

  // Get showtimes for a movie
  http.get(`${API_BASE_URL}/movies/:movieId/showtimes`, ({ params }) => {
    const movieId = params.movieId as keyof typeof showtimes;
    const movieShowtimes = showtimes[movieId];
    let showtimesObject: Record<string, (typeof movieShowtimes)[0]> = {};
    if (!movieShowtimes) {
      return new Response(JSON.stringify(showtimesObject), { status: 404, headers: { "Content-Type": "application/json" } });
    }
    showtimesObject = movieShowtimes.reduce((acc, showtime) => {
      acc[showtime.id] = showtime;
      return acc;
    }, {} as Record<string, (typeof movieShowtimes)[0]>);

    return new Response(JSON.stringify(showtimesObject), { status: 200, headers: { "Content-Type": "application/json" } });
  }),

  // Create booking
  http.post(`${API_BASE_URL}/bookings`, async ({ request }) => {
    const booking = (await request.json()) as { showtimeId: string; seats: string[] };
    const showtimeId = booking.showtimeId;
    const currentBookings = BookingStorage.getBookings() || [];
    if (!currentBookings[showtimeId]) {
      currentBookings[showtimeId] = {
        showtimeId: showtimeId,
        seats: [],
        totalPrice: 0,
      };
    }
    currentBookings[showtimeId].seats = [...currentBookings[showtimeId].seats, ...booking.seats];
    BookingStorage.addBooking(currentBookings);

    return new Response(
      JSON.stringify({
        id: Date.now().toString(),
        ...booking,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }),

  // Get booked seats for a showtime
  http.get(`${API_BASE_URL}/bookings/:showtimeId`, ({ params }) => {
    const bookedSeats = BookingStorage.getBookings();
    return new Response(JSON.stringify(bookedSeats[params.showtimeId as string]), { status: 200, headers: { "Content-Type": "application/json" } });
  }),

  // Get showtime details (updated to include theaterId)
  http.get(`${API_BASE_URL}/showtimes/:id`, ({ params }) => {
    const showtime = showtimes[params.id as keyof typeof showtimes];
    if (!showtime) {
      return new Response(null, { status: 404 });
    }
    return new Response(
      JSON.stringify({
        ...showtime,
        theaterId: "theater1", // In real app, this would be actual theater ID
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  // Get booked seats for a showtime
  // http.get(`${API_BASE_URL}/showtimes/:showtimeId/seats`, ({ params }) => {
  //   const bookedSeats = bookings.filter((booking) => booking.showtimeId === params.showtimeId).flatMap((booking) => booking.seats);

  //   return new Response(JSON.stringify(bookedSeats), { status: 200, headers: { "Content-Type": "application/json" } });
  // }),
];
