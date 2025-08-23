// frontend/src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Fade,
  Grow,
  CardMedia
} from '@mui/material';
import {
  School,
  SwapHoriz,
  Star,
  LocationOn,
  Search,
  Chat,
  Notifications,
  ArrowForward,
  CheckCircle,
  Group,
  TrendingUp,
  People,
  Handshake,
  Lightbulb
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <SwapHoriz fontSize="large" />,
      title: 'Échange de compétences',
      description: 'Échangez vos compétences avec d\'autres membres de la communauté.'
    },
    {
      icon: <Search fontSize="large" />,
      title: 'Recherche avancée',
      description: 'Trouvez facilement des offres correspondant à vos compétences.'
    },
    {
      icon: <LocationOn fontSize="large" />,
      title: 'Localisation',
      description: 'Connectez-vous avec des personnes près de chez vous.'
    },
    {
      icon: <Star fontSize="large" />,
      title: 'Notation et évaluations',
      description: 'Évaluez vos expériences et construisez votre réputation.'
    },
    {
      icon: <Chat fontSize="large" />,
      title: 'Chat en temps réel',
      description: 'Communiquez directement avec vos partenaires d\'échange.'
    },
    {
      icon: <Notifications fontSize="large" />,
      title: 'Notifications',
      description: 'Soyez notifié des nouvelles offres et messages.'
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle fontSize="large" />,
      title: 'Gratuit',
      description: 'Accédez à toutes les fonctionnalités sans frais.'
    },
    {
      icon: <Group fontSize="large" />,
      title: 'Communauté',
      description: 'Rejoignez une communauté passionnée d\'apprentissage.'
    },
    {
      icon: <TrendingUp fontSize="large" />,
      title: 'Développez vos compétences',
      description: 'Apprenez et enseignez en même temps.'
    }
  ];

  const testimonials = [
    {
      name: 'Sophie M.',
      role: 'Guitariste',
      content: 'Grâce à SkillSwap, j\'ai appris le piano en échange de cours de guitare. C\'est génial !',
      avatar: '/avatars/sophie.jpg'
    },
    {
      name: 'Thomas L.',
      role: 'Développeur',
      content: 'J\'ai perfectionné mes compétences en design graphique. La plateforme est intuitive.',
      avatar: '/avatars/thomas.jpg'
    },
    {
      name: 'Emma K.',
      role: 'Photographe',
      content: 'J\'ai rencontré des personnes incroyables et développé mon portfolio.',
      avatar: '/avatars/emma.jpg'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134 7-7 7 3.134 7 7-7 7-7-3.134-7-7-7zm0 14c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-7 7 7-3.134 7-7-7zm-1-5h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2zm-5 9h-2v-6h2v6zm4-6h2v6h-2v-6zm-8 0h2v6h-2v-6z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E"),
            opacity: 0.3
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Fade in timeout={1000}>
                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Échangez vos compétences, développez votre potentiel
                </Typography>
              </Fade>
              <Fade in timeout={1500}>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                  SkillSwap est la plateforme qui connecte les gens pour qu'ils puissent apprendre les uns des autres, sans argent, juste par l'échange de savoir.
                </Typography>
              </Fade>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Fade in timeout={2000}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/offers')}
                    endIcon={<Search />}
                    sx={{ borderRadius: 8 }}
                  >
                    Découvrir les offres
                  </Button>
                </Fade>
                <Fade in timeout={2500}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForward />}
                    sx={{ borderRadius: 8, color: 'white', borderColor: 'white' }}
                  >
                    Commencer
                  </Button>
                </Fade>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Grow in timeout={3000}>
                <Box
                  component="img"
                  src="/images/hero-image.svg"
                  alt="Échange de compétences"
                  sx={{ width: '100%', height: 'auto' }}
                />
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Fonctionnalités clés
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 64,
                          height: 64,
                          mb: 2
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Pourquoi choisir SkillSwap ?
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 2,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                    {benefit.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h3">
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Comment ça marche ?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { step: 1, title: 'Inscrivez-vous', description: 'Créez votre compte et remplissez votre profil.' },
              { step: 2, title: 'Créez une offre', description: 'Proposez une compétence que vous souhaitez enseigner.' },
              { step: 3, title: 'Trouvez un partenaire', description: 'Cherchez des offres qui vous intéressent.' },
              { step: 4, title: 'Échangez', description: 'Contactez le partenaire et échangez vos compétences.' }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box textAlign="center">
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '2rem'
                    }}
                  >
                    {item.step}
                  </Avatar>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Ce que disent nos utilisateurs
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="h6">{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h2" color="primary.main">10K+</Typography>
                <Typography variant="h6">Utilisateurs actifs</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h2" color="secondary.main">5K+</Typography>
                <Typography variant="h6">Échanges réussis</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h2" color="success.main">50+</Typography>
                <Typography variant="h6">Compétences</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h2" color="warning.main">4.8/5</Typography>
                <Typography variant="h6">Note moyenne</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Prêt à commencer votre aventure d'apprentissage ?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Rejoignez notre communauté dès maintenant et développez vos compétences.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            endIcon={<ArrowForward />}
            sx={{ borderRadius: 8 }}
          >
            S'inscrire gratuitement
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;