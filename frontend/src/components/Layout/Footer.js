import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid
} from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              À propos de SkillSwap
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Plateforme d'échange de compétences où tout le monde peut apprendre et enseigner.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Liens rapides
            </Typography>
            <Box>
              <Link href="/" color="inherit" display="block">Accueil</Link>
              <Link href="/offers" color="inherit" display="block">Offres</Link>
              <Link href="/about" color="inherit" display="block">À propos</Link>
              <Link href="/contact" color="inherit" display="block">Contact</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Légal
            </Typography>
            <Box>
              <Link href="/terms" color="inherit" display="block">Conditions d'utilisation</Link>
              <Link href="/privacy" color="inherit" display="block">Politique de confidentialité</Link>
              <Link href="/cookies" color="inherit" display="block">Politique de cookies</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: contact@skillswap.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Téléphone: +33 1 23 45 67 89
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://skillswap.com/">
              SkillSwap
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;