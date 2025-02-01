import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../store/moviesSlice';
import { RootState, AppDispatch } from '../store';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Container, Box, Typography } from '@mui/material';
import { SearchFilters } from './MovieList/SearchFilters';
import { MovieCard } from './MovieList/MovieCard';

export const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state: RootState) => state.movies);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  
  const allGenres = Array.from(
    new Set(items.flatMap(movie => movie.genre))
  ).sort();

  const filteredMovies = items.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || 
      selectedGenres.some(genre => movie.genre.includes(genre));
    return matchesSearch && matchesGenre;
  });

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return (
    <Box display="flex" justifyContent="center" p={4}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Typography color="error" align="center">
      Error: {error}
    </Typography>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SearchFilters
        searchQuery={searchQuery}
        selectedGenres={selectedGenres}
        allGenres={allGenres}
        onSearchChange={setSearchQuery}
        onGenresChange={setSelectedGenres}
      />

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
      </Typography>

      <Grid container spacing={{ xs: 1.5, sm: 2 ,md: 3}}>
        {filteredMovies.map((movie) => (
          <Grid  size={{ md: 4 }} key={movie.id}>
            <MovieCard
              movie={movie}
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 