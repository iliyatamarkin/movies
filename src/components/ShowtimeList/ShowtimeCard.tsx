import { Card, CardContent, CardActions, Typography, Box, Button } from '@mui/material';
import { AccessTime, LocationOn, EventSeat } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Showtime } from '../../types';
import { useEffect } from 'react';
import { updateBookedSeats } from '../../store/seatsSlice';
import { bookingService } from '../../services/bookingService';

interface ShowtimeCardProps {
  showtime: Showtime;
  movieId: string;
}

export const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ showtime, movieId }) => {
  const navigate = useNavigate();
  const bookedSeats = useSelector((state: RootState) => state.seats.bookedSeats[showtime.id] || []);
    const dispatch = useDispatch();
  useEffect(() => {
    const pollBookings = async () => {
      try {
        const bookedSeats = await bookingService.getBookings(showtime.id);
        dispatch(updateBookedSeats(bookedSeats.seats || []));
      } catch (error) {
        console.error('Error polling bookings:', error);
      }
    };

    // Initial poll
    pollBookings();

    // Set up polling interval (every 5 seconds)
    const pollInterval = setInterval(pollBookings, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(pollInterval);
  }, [showtime.id, dispatch]);
  
  
  let totalSeats = 0;
  showtime.theater.seatLayout.forEach(row => {
    totalSeats += row.seatsPerRow;
  });
  const availableSeats = totalSeats - bookedSeats.length;

  return (
    <Card 
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <LocationOn sx={{ mr: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} color="primary" />
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' },
              wordBreak: 'break-word'
            }}
          >
            {showtime.theater.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <AccessTime sx={{ mr: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} color="primary" />
          <Typography 
            variant="body1"
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {new Date(showtime.startTime).toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EventSeat sx={{ mr: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} color="primary" />
          <Typography 
            variant="body1"
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {availableSeats} seats available
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<EventSeat />}
          onClick={() => navigate(`/seats/${movieId}/${showtime.id}`)}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1
          }}
        >
          View Seats
        </Button>
      </CardActions>
    </Card>
  );
}; 