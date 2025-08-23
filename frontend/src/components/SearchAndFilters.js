// frontend/src/components/SearchAndFilters.js
import React, { useState, useEffect } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Chip,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Slider,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  Badge
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';

const SearchAndFilters = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [ratingFilter, setRatingFilter] = useState([0, 5]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState([0, 100]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Charger les compétences et localisations depuis l'API
    const fetchFilters = async () => {
      try {
        // Remplacer par les vrais appels API
        setSkills(['Guitare', 'Piano', 'Chant', 'Dessin', 'Photographie', 'Programmation', 'Anglais', 'Espagnol', 'Cuisine', 'Yoga']);
        setLocations(['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Bordeaux', 'Lille', 'Strasbourg']);
      } catch (error) {
        console.error('Erreur lors du chargement des filtres:', error);
      }
    };

    fetchFilters();
  }, []);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      onFilterChange({ 
        skills: newSkills, 
        location: selectedLocation,
        rating: ratingFilter,
        availability: availabilityFilter,
        distance: distanceFilter
      });
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(newSkills);
    onFilterChange({ 
      skills: newSkills, 
      location: selectedLocation,
      rating: ratingFilter,
      availability: availabilityFilter,
      distance: distanceFilter
    });
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    onFilterChange({ 
      skills: selectedSkills, 
      location,
      rating: ratingFilter,
      availability: availabilityFilter,
      distance: distanceFilter
    });
  };

  const handleRatingChange = (event, newValue) => {
    setRatingFilter(newValue);
    onFilterChange({ 
      skills: selectedSkills, 
      location: selectedLocation,
      rating: newValue,
      availability: availabilityFilter,
      distance: distanceFilter
    });
  };

  const handleAvailabilityChange = (event) => {
    const value = event.target.value;
    const newAvailability = availabilityFilter.includes(value)
      ? availabilityFilter.filter(item => item !== value)
      : [...availabilityFilter, value];
    
    setAvailabilityFilter(newAvailability);
    onFilterChange({ 
      skills: selectedSkills, 
      location: selectedLocation,
      rating: ratingFilter,
      availability: newAvailability,
      distance: distanceFilter
    });
  };

  const handleDistanceChange = (event, newValue) => {
    setDistanceFilter(newValue);
    onFilterChange({ 
      skills: selectedSkills, 
      location: selectedLocation,
      rating: ratingFilter,
      availability: availabilityFilter,
      distance: newValue
    });
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSelectedLocation('');
    setRatingFilter([0, 5]);
    setAvailabilityFilter([]);
    setDistanceFilter([0, 100]);
    onFilterChange({ 
      skills: [], 
      location: '',
      rating: [0, 5],
      availability: [],
      distance: [0, 100]
    });
  };

  const openFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setAnchorEl(null);
  };

  const activeFiltersCount = [
    selectedSkills.length > 0,
    selectedLocation !== '',
    ratingFilter[0] > 0,
    availabilityFilter.length > 0,
    distanceFilter[1] < 100
  ].filter(Boolean).length;

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          boxShadow: 2
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Rechercher des offres..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <IconButton type="button" sx={{ p: '10px' }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton sx={{ p: '10px' }} onClick={openFilterMenu}>
          <Badge badgeContent={activeFiltersCount} color="primary">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Paper>

      {/* Filtres sélectionnés */}
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedSkills.map((skill, index) => (
          <Chip
            key={index}
            icon={<SchoolIcon />}
            label={skill}
            onDelete={() => handleSkillRemove(skill)}
            color="primary"
            variant="outlined"
          />
        ))}
        {selectedLocation && (
          <Chip
            icon={<LocationOnIcon />}
            label={selectedLocation}
            onDelete={() => handleLocationChange('')}
            color="secondary"
            variant="outlined"
          />
        )}
        {ratingFilter[0] > 0 && (
          <Chip
            icon={<StarIcon />}
            label={`${ratingFilter[0]}+ étoiles`}
            onDelete={() => setRatingFilter([0, 5])}
            color="warning"
            variant="outlined"
          />
        )}
        {availabilityFilter.length > 0 && (
          <Chip
            label={`${availabilityFilter.join(', ')}`}
            onDelete={() => setAvailabilityFilter([])}
            color="info"
            variant="outlined"
          />
        )}
        {distanceFilter[1] < 100 && (
          <Chip
            label={`Moins de ${distanceFilter[1]}km`}
            onDelete={() => setDistanceFilter([0, 100])}
            color="success"
            variant="outlined"
          />
        )}
        {activeFiltersCount > 0 && (
          <Chip
            icon={<ClearIcon />}
            label="Effacer tout"
            onDelete={clearAllFilters}
            color="error"
            variant="outlined"
          />
        )}
      </Box>

      {/* Menu des filtres */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeFilterMenu}
        PaperProps={{
          style: {
            maxHeight: 500,
            width: '40ch',
          },
        }}
      >
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Compétences</InputLabel>
            <Select
              multiple
              value={selectedSkills}
              onChange={(e) => {
                setSelectedSkills(e.target.value);
                onFilterChange({ 
                  skills: e.target.value, 
                  location: selectedLocation,
                  rating: ratingFilter,
                  availability: availabilityFilter,
                  distance: distanceFilter
                });
              }}
              label="Compétences"
            >
              {skills.map((skill, index) => (
                <MenuItem key={index} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Localisation</InputLabel>
            <Select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                onFilterChange({ 
                  skills: selectedSkills, 
                  location: e.target.value,
                  rating: ratingFilter,
                  availability: availabilityFilter,
                  distance: distanceFilter
                });
              }}
              label="Localisation"
            >
              <MenuItem value="">
                <em>Toutes les localisations</em>
              </MenuItem>
              {locations.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom>Note minimale</Typography>
            <Slider
              value={ratingFilter}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              marks={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
              ]}
            />
          </Box>
        </MenuItem>
        <MenuItem>
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom>Distance (km)</Typography>
            <Slider
              value={distanceFilter}
              onChange={handleDistanceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              marks={[
                { value: 0, label: '0' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 75, label: '75' },
                { value: 100, label: '100' },
              ]}
            />
          </Box>
        </MenuItem>
        <MenuItem>
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom>Disponibilité</Typography>
            <FormGroup>
              {['Full-time', 'Part-time', 'Weekends', 'Flexible'].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={availabilityFilter.includes(option)}
                      onChange={handleAvailabilityChange}
                      value={option}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </Box>
        </MenuItem>
        <MenuItem>
          <Button 
            fullWidth 
            variant="outlined" 
            onClick={clearAllFilters}
            startIcon={<ClearIcon />}
          >
            Effacer tous les filtres
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SearchAndFilters;