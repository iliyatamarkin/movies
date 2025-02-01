import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types/Booking';
import { resetSelectedSeats, updateBookedSeats } from '../store/seatsSlice';
import { clearBooking } from '../store/bookingSlice';

interface BookingButtonProps {
  showtimeId: string;
  setBookingSummary: (summary: string) => void;
  setOpenModal: (open: boolean) => void;
}
    
export const BookingButton = ({  showtimeId, setBookingSummary, setOpenModal }: BookingButtonProps) => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state: RootState) => state.seats.selectedSeats);
  const bookedSeats = useSelector((state: RootState) => state.seats.bookedSeats[showtimeId] || []    );
  const handleBookSeats = async () => {
    try {
        const booking = {
            showtimeId,
            seats: selectedSeats.map(seat => seat.id),
            totalPrice: selectedSeats.reduce((acc,seat)=>acc + seat.price,0)
        } as Booking
      const response = await bookingService.createBooking(booking)
      if (response.status == "confirmed") {
        const newBookedSeats = [...bookedSeats, ...selectedSeats.map(seat => seat.id)];
        dispatch(updateBookedSeats({showtimeId,seats:newBookedSeats} ));
        //show alert with summery of booked seats with total price
        setBookingSummary(`Booked ${selectedSeats.length} seats for $${booking.totalPrice}. Seats: ${selectedSeats.map(s => s.id).join(', ')}`);
        setOpenModal(true);
        dispatch(clearBooking());
        dispatch(resetSelectedSeats());
      }
    } catch (error) {
      console.error('Booking failed:', error);
    }
  }
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={selectedSeats.length === 0}
      onClick={handleBookSeats}
      sx={{
        minWidth: 200,
        py: 1.5,
        fontSize: '1.1rem',
        textTransform: 'none'
      }}
    >
      Book {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}
    </Button>
  );
}; 