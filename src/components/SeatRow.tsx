import { Grid, Typography, Box } from '@mui/material';
import {  SeatComponent } from './Seat';
import { Seat, SeatLayout } from '../types/Seat';
import React from 'react';

interface SeatRowProps {
  rowConfig: SeatLayout;
  seats: Seat[];
  showtimeId: string;
}

export const SeatRow = React.memo(({ rowConfig, seats,showtimeId }: SeatRowProps) => {
  const rowSeats = seats.filter(seat => seat.row === rowConfig.row);
  
  return (
    <Grid container spacing={1} justifyContent="center" sx={{ mb: 1 }}>
      <Grid item xs={1}>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {rowConfig.row}
        </Typography>
      </Grid>
      {rowSeats.map((seat, index) => (
        <Grid item key={seat.id}>
          {index > 0 && index % rowConfig.gap === 0 && <Box sx={{ mr: 2 }} />}
          <SeatComponent id={seat.id} price={seat.price} row={seat.row} number={seat.number} status={seat.status} type={seat.type} showtimeId={showtimeId} />
        </Grid>
      ))}
    </Grid>
  );
}, (prev, next) => prev.rowConfig.row === next.rowConfig.row); 