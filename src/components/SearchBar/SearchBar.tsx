import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length >= 3 || value.length === 0) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <Box sx={{ width: { xs: '100%', sm: 400 } }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search transactions..."
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.8)',
            },
          },
          '& .MuiInputBase-input': {
            color: '#1e293b',
            '&::placeholder': {
              color: '#64748b',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#64748b' }} />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                aria-label="Clear search"
                sx={{ color: '#64748b' }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
