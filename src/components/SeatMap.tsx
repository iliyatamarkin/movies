import { Box, Typography, CircularProgress,Button,Modal, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { Seat, SeatLayout } from '../types/Seat';
import { bookingService } from '../services/bookingService';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { updateBookedSeats } from '../store/seatsSlice';
import { BookingButton } from './BookingButton';
import { SeatRow } from './SeatRow';

export const SeatMap = () => {
  const dispatch = useDispatch();
  const { movieId, showtimeId='' } = useParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [bookingSummary, setBookingSummary] = useState('');
  const showtimeData = useSelector((state: RootState) => state.showtimes.showtimes[showtimeId ?? '']);
  const navigate = useNavigate();

  // Initialize seats only once
  useEffect(() => {
    const initializeSeats = async () => {
      try {
        const initialSeats: Seat[] = [];
        showtimeData.theater.seatLayout.forEach(({ row, seatsPerRow, type, gap, price }: SeatLayout) => {
          for (let i = 1; i <= seatsPerRow; i++) {
            initialSeats.push({
              id: `${row}${i}`,
              row,
              number: i,
              status: 'available',
              type,
              price,
              showtimeId
            });
          }
        });
        setSeats(initialSeats);
        setLoading(false);
      } catch (error) {
        console.error('Error initializing seats:', error);
        setLoading(false);
      }
    };
    
    initializeSeats();
  }, [showtimeData?.theater.seatLayout]);






  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        {showtimeData?.theater.name}
      </Typography>
      <Box 
        sx={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          mt: 4,
          transform: 'perspective(1000px) rotateX(5deg)',
          '& .MuiGrid-container': {
            transform: 'scale(1.02)',
          }
        }}
      >
        {showtimeData?.theater.seatLayout.map((rowConfig) => (
          <SeatRow key={rowConfig.row} rowConfig={rowConfig} seats={seats} showtimeId={showtimeId} />
        ))}
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <BookingButton showtimeId={showtimeId} setBookingSummary={setBookingSummary} setOpenModal={setOpenModal} />
      </Box>
      <Modal
  open={openModal}
  onClose={() => navigate(-1)}
  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
  <Paper sx={{ p: 4, maxWidth: 400, textAlign: 'center' }}>
    <Typography variant="h6" gutterBottom>
      Booking Confirmed!
    </Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      {bookingSummary}
    </Typography>
    <Button variant="contained" onClick={() => navigate(-1)}>
      Done
    </Button>
  </Paper>
</Modal>
    </Box>
  );
};
