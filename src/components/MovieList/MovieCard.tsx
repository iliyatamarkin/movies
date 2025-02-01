import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Chip 
} from '@mui/material';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => (
  <Card 
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.02)',
        transition: 'transform 0.2s'
      }
    }}
    onClick={onClick}
  >
    <CardMedia
      component="img"
      height="200"
      image={movie.imageUrl}
      alt={movie.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="h2">
        {movie.title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {movie.genre.map((g) => (
          <Chip 
            key={g} 
            label={g} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.rating}/10
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.duration} mins
        </Typography>
      </Box>
    </CardContent>
  </Card>
); 