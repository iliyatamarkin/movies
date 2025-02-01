import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { clearBooking } from '../store/bookingSlice';
import { BookingState } from '../types/Booking'; // Update import
import { resetSelectedSeats } from '../store/seatsSlice';


export const BookingSummary: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Cast the state to the correct type
  const { selectedSeats, totalPrice, showtimeId } = useSelector(
    (state: RootState) => state.booking as BookingState
  );
  const showtime = useSelector((state: RootState) => 
    showtimeId ? state.showtimes.showtimes[showtimeId] : null
  );
  const movie = useSelector((state: RootState) => 
    showtime ? state.movies.items.find(m => m.id === showtime.movieId) : null
  );

  const handleBooking = async () => {
    try {
      dispatch(clearBooking());
      dispatch(resetSelectedSeats());
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (!showtime || !movie) return null;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
      <div className="space-y-2">
        <p><strong>Movie:</strong> {movie.title}</p>
        <p><strong>Theater:</strong> {showtime.theater.name}</p>
        <p><strong>Time:</strong> {new Date(showtime.startTime).toLocaleString()}</p>
        <p><strong>Selected Seats:</strong> {
          selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')
        }</p>
        <p className="text-lg font-bold mt-4">Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <button
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        onClick={handleBooking}
        disabled={selectedSeats.length === 0}
      >
        Confirm Booking
      </button>
    </div>
  );
}; 