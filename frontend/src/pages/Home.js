// frontend/src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenue sur SkillSwap
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Plateforme d'échange de compétences où tout le monde peut apprendre et enseigner.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/offers')}
            sx={{ mr: 2 }}
          >
            Découvrir les offres
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            onClick={() => navigate('/register')}
          >
            S'inscrire
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;