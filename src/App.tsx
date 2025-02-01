import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import type { Store } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store';
import { MovieList } from './components/MovieList';
import { ShowtimeList } from './components/ShowtimeList';
import { SeatMap } from './components/SeatMap';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Provider store={store as Store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:movieId" element={<ShowtimeList />} />
            <Route path="/seats/:movieId/:showtimeId" element={<SeatMap />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 