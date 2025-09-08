import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  SelectChangeEvent
} from '@mui/material';
import { 
  Close as CloseIcon,
  Delete as ClearAllIcon,
  Check as ApplyIcon,
  Search as SearchIcon,
  Category as CategoryIcon,
  Euro as EuroIcon
} from '@mui/icons-material';
import { Filters } from '../../../../hooks/useTransactionFilters';
import { CATEGORY_OPTIONS } from '../../utils/constants';

interface FilterPopupProps {
  isOpen: boolean;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClose: () => void;
  showTitleDropdown: boolean;
  selectedTitleIndex: number;
  onShowTitleDropdownChange: (show: boolean) => void;
  onSelectedTitleIndexChange: (index: number) => void;
  filteredTitles: string[];
  onClearFilters: () => void;
}

export function FilterPopup({
  isOpen,
  filters,
  onFiltersChange,
  onClose,
  showTitleDropdown,
  selectedTitleIndex,
  onShowTitleDropdownChange,
  onSelectedTitleIndexChange,
  filteredTitles,
  onClearFilters
}: FilterPopupProps) {
  if (!isOpen) return null;

  const handleTitleChange = (value: string) => {
    onFiltersChange({ ...filters, title: value });
    onShowTitleDropdownChange(true);
    onSelectedTitleIndexChange(-1);
  };

  const handleTitleSelect = (title: string) => {
    onFiltersChange({ ...filters, title });
    onShowTitleDropdownChange(false);
    onSelectedTitleIndexChange(-1);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({ ...filters, category: event.target.value });
  };

  const handleAmountChange = (field: 'min' | 'max', value: string) => {
    onFiltersChange({
      ...filters,
      amount: { ...filters.amount, [field]: value }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showTitleDropdown || filteredTitles.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        onSelectedTitleIndexChange(
          selectedTitleIndex < filteredTitles.length - 1 ? selectedTitleIndex + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        onSelectedTitleIndexChange(
          selectedTitleIndex > 0 ? selectedTitleIndex - 1 : filteredTitles.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedTitleIndex >= 0 && selectedTitleIndex < filteredTitles.length) {
          handleTitleSelect(filteredTitles[selectedTitleIndex]);
        }
        break;
      case 'Escape':
        onShowTitleDropdownChange(false);
        onSelectedTitleIndexChange(-1);
        break;
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Filter Transactions
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 0, px: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3, pb: 1 }}>
          {/* Title Filter */}
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              label="Title"
              placeholder="Search by transaction title..."
              value={filters.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onFocus={() => onShowTitleDropdownChange(true)}
              onBlur={() => {
                setTimeout(() => {
                  onShowTitleDropdownChange(false);
                  onSelectedTitleIndexChange(-1);
                }, 200);
              }}
              onKeyDown={handleKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: filters.title && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleTitleChange('')}
                      size="small"
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Autocomplete Dropdown */}
            {showTitleDropdown && filters.title.length >= 2 && filteredTitles.length > 0 && (
              <Paper
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  mt: 0.5,
                  maxHeight: 200,
                  overflow: 'auto',
                  zIndex: 10,
                  boxShadow: 3
                }}
              >
                <List dense>
                  {filteredTitles.map((title, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        selected={selectedTitleIndex === index}
                        onClick={() => handleTitleSelect(title)}
                      >
                        <ListItemText primary={title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          {/* Category Filter */}
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={handleCategoryChange}
              label="Category"
              startAdornment={
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Amount Range Filter */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Amount Range
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                label="Min amount"
                type="number"
                value={filters.amount.min}
                onChange={(e) => handleAmountChange('min', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ step: "1" }}
              />
              <Typography sx={{ color: 'text.secondary' }}>to</Typography>
              <TextField
                label="Max amount"
                type="number"
                value={filters.amount.max}
                onChange={(e) => handleAmountChange('max', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ step: "1" }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onClearFilters}
          startIcon={<ClearAllIcon />}
          sx={{ flex: 1 }}
        >
          Clear All
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          startIcon={<ApplyIcon />}
          sx={{ 
            flex: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            }
          }}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}