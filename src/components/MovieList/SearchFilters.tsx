import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Stack, 
  Box, 
  Chip, 
  OutlinedInput,
  Slider,
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchFiltersProps {
  searchQuery: string;
  selectedGenres: string[];
  allGenres: string[];
  minRating: number;
  onSearchChange: (value: string) => void;
  onGenresChange: (value: string[]) => void;
  onRatingChange: (value: number) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  selectedGenres,
  allGenres,
  minRating,
  onSearchChange,
  onGenresChange,
  onRatingChange,
}) => (
  <Stack 
    direction={{ xs: 'column', sm: 'row' }} 
    spacing={2} 
    sx={{ mb: 4 }}
    alignItems="center"
  >
    <TextField
      placeholder="Search movies..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{ minWidth: 200 }}
      InputProps={{
        startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
      }}
    />
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Filter by Genre</InputLabel>
      <Select
        multiple
        value={selectedGenres}
        onChange={(e) => onGenresChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
        input={<OutlinedInput label="Filter by Genre" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} size="small" />
            ))}
          </Box>
        )}
      >
        {allGenres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel shrink>Minimum Rating</InputLabel>
      <Slider
        value={minRating}
        onChange={(_, value) => onRatingChange(value as number)}
        min={0}
        max={10}
        step={0.5}
        valueLabelDisplay="auto"
        marks={[
          { value: 0, label: '0' },
          { value: 10, label: '10' }
        ]}
      />
    </FormControl>
  </Stack>
); 