import Grid from '@mui/material/Grid2';
import { ShowtimeCard } from './ShowtimeCard';
import { Showtime } from '../../types';

interface ShowtimeGridProps {
  showtimes: Record<string, Showtime>;
  movieId: string;
}

export const ShowtimeGrid: React.FC<ShowtimeGridProps> = ({ showtimes, movieId }) => (
  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
    {Object.values(showtimes).map(showtime => (
      <Grid  size={{ xs:12, sm:6, md:4 }} key={showtime.id}>
        <ShowtimeCard showtime={showtime} movieId={movieId} />
      </Grid>
    ))}
  </Grid>
); 