// frontend/src/pages/NotFound.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <SentimentVeryDissatisfied sx={{ fontSize: 64, color: 'text.secondary' }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Page non trouvée
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          La page que vous recherchez n'existe pas ou a été déplacée.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/"
            size="large"
          >
            Retour à l'accueil
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;