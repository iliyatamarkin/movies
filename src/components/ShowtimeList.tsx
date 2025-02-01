import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchShowtimes } from '../store/showtimesSlice';
import { ShowtimeGrid } from './ShowtimeList/ShowtimeGrid';
import { useEffect } from 'react';

export const ShowtimeList: React.FC = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { showtimes, loading } = useSelector((state: RootState) => state.showtimes);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchShowtimes(movieId));
    }
  }, [movieId, dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        fontWeight="bold" 
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
      >
        Showtimes
      </Typography>
      <ShowtimeGrid showtimes={showtimes} movieId={movieId!} />
    </Box>
  );
}; 