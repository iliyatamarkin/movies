import { EventSeat } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleSeatSelection } from '../store/seatsSlice';
import React from 'react';
import { Seat } from '../types/Seat';
import { shallowEqual } from 'react-redux';


export const SeatComponent = React.memo(({ id,price,row,number,status,type,showtimeId  }: Seat) => {
  const dispatch = useDispatch();
  const { isBooked, isSelected } = useSelector((state: RootState) => ({
    isBooked: state.seats.bookedSeats[showtimeId]?.includes(id),
    isSelected: state.seats.selectedSeats.find(s => s.id === id)?.status
  }), shallowEqual);

  const handleClick = () => {
    if (!isBooked) {
        const seat = { id, price, row, number, status, type ,showtimeId};
      dispatch(toggleSeatSelection(seat));
    }
  };
  console.log("render seat", id);
  return (
    <EventSeat 
      onClick={handleClick}
      sx={{
        color: isBooked 
          ? 'grey.500' 
          : isSelected 
            ? 'primary.main' 
            : 'text.primary',
        cursor: isBooked ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: !isBooked ? 'scale(1.1)' : 'none',
          color: isBooked 
            ? 'grey.500' 
            : 'primary.light'
        }
      }} 
    />
  );
}, (prev, next) => prev.id === next.id); 