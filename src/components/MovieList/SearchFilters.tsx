import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Stack, 
  Box, 
  Chip, 
  OutlinedInput 
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchFiltersProps {
  searchQuery: string;
  selectedGenres: string[];
  allGenres: string[];
  onSearchChange: (query: string) => void;
  onGenresChange: (genres: string[]) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  selectedGenres,
  allGenres,
  onSearchChange,
  onGenresChange,
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
  </Stack>
); 