import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Tabs,
  Tab,
  Badge,
  Paper,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Work,
  Star,
  Message,
  Payment,
  Notifications,
  TrendingUp,
  Add,
  Edit,
  MoreVert
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const socket = useSocket();
  const [value, setValue] = useState(0);
  const [offers, setOffers] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalOffers: 0,
    activeExchanges: 0,
    completedExchanges: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Récupérer les offres de l'utilisateur
        const offersRes = await axios.get('/api/offers/user');
        setOffers(offersRes.data);

        // Récupérer les échanges de l'utilisateur
        const exchangesRes = await axios.get('/api/exchanges/user');
        setExchanges(exchangesRes.data);

        // Récupérer les statistiques
        const statsRes = await axios.get('/api/users/stats');
        setStats(statsRes.data);

        // Récupérer les notifications
        const notificationsRes = await axios.get('/api/users/notifications');
        setNotifications(notificationsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
      });
    }
  }, [socket]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCreateOffer = () => {
    window.location.href = '/create-offer';
  };

  const handleEditProfile = () => {
    window.location.href = '/edit-profile';
  };

  const markNotificationAsRead = async (id) => {
    try {
      await axios.put(`/api/users/notifications/${id}`);
      setNotifications(prev => prev.map(notif => 
        notif._id === id ? { ...notif, read: true } : notif
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* En-tête du tableau de bord */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar
                src={user?.profile?.avatar}
                sx={{ width: 80, height: 80 }}
              >
                {user?.username?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h4" component="h1">
                  Bienvenue, {user?.profile?.firstName || user?.username}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user?.profile?.bio || 'Pas de biographie'}
                </Typography>
                <Box display="flex" gap={1} mt={1}>
                  <Chip icon={<LocationOn />} label={user?.profile?.location || 'Non spécifié'} size="small" />
                  <Chip icon={<Work />} label={user?.availability || 'Flexible'} size="small" />
                </Box>
              </Box>
            </Box>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateOffer}
              >
                Créer une offre
              </Button>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEditProfile}
              >
                Modifier le profil
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Cartes de statistiques */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Offres totales
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {stats.totalOffers}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <Work />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Échanges actifs
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {stats.activeExchanges}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Échanges terminés
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {stats.completedExchanges}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'green' }}>
                  <Star />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Note moyenne
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {stats.averageRating.toFixed(1)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'orange' }}>
                  <Star />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Onglets du tableau de bord */}
        <Grid item xs={12}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                label={
                  <Badge badgeContent={offers.length} color="primary">
                    Mes offres
                  </Badge>
                }
                id="dashboard-tab-0"
                aria-controls="dashboard-tabpanel-0"
              />
              <Tab
                label={
                  <Badge badgeContent={exchanges.length} color="primary">
                    Mes échanges
                  </Badge>
                }
                id="dashboard-tab-1"
                aria-controls="dashboard-tabpanel-1"
              />
              <Tab
                label={
                  <Badge badgeContent={unreadNotifications} color="secondary">
                    Notifications
                  </Badge>
                }
                id="dashboard-tab-2"
                aria-controls="dashboard-tabpanel-2"
              />
            </Tabs>
            <Divider />
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                {offers.length > 0 ? (
                  offers.map((offer) => (
                    <Grid item xs={12} md={6} lg={4} key={offer._id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {offer.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {offer.description.substring(0, 100)}...
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                            {offer.skillsOffered.map((skill, index) => (
                              <Chip key={index} label={skill.name} size="small" color="primary" />
                            ))}
                          </Box>
                          <Box display="flex" justifyContent="space-between" mt={2}>
                            <Typography variant="caption">
                              {format(new Date(offer.createdAt), 'dd MMM yyyy', { locale: fr })}
                            </Typography>
                            <Box>
                              <IconButton size="small">
                                <Edit />
                              </IconButton>
                              <IconButton size="small">
                                <MoreVert />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box textAlign="center" py={5}>
                      <Typography variant="h6" color="text.secondary">
                        Vous n'avez pas encore d'offres
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<Add />}
                        sx={{ mt: 2 }}
                        onClick={handleCreateOffer}
                      >
                        Créer votre première offre
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <List>
                {exchanges.length > 0 ? (
                  exchanges.map((exchange) => (
                    <React.Fragment key={exchange._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            src={exchange.otherUser.profile.avatar}
                          >
                            {exchange.otherUser.username.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="h6">
                                Échange avec {exchange.otherUser.username}
                              </Typography>
                              <Chip
                                label={exchange.status}
                                color={
                                  exchange.status === 'active' ? 'primary' :
                                  exchange.status === 'completed' ? 'success' :
                                  exchange.status === 'cancelled' ? 'error' : 'default'
                                }
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {exchange.offer.title}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                              >
                                {format(new Date(exchange.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <IconButton
                          edge="end"
                          aria-label="chat"
                          onClick={() => window.location.href = `/chat/${exchange._id}`}
                        >
                          <Message />
                        </IconButton>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
                ) : (
                  <Box textAlign="center" py={5}>
                    <Typography variant="h6" color="text.secondary">
                      Vous n'avez pas encore d'échanges
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Commencez par créer une offre ou contacter d'autres utilisateurs
                    </Typography>
                  </Box>
                )}
              </List>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <List>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <React.Fragment key={notification._id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          bgcolor: notification.read ? 'transparent' : theme.palette.action.hover,
                          cursor: 'pointer'
                        }}
                        onClick={() => markNotificationAsRead(notification._id)}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            {notification.type === 'message' && <Message />}
                            {notification.type === 'exchange' && <Work />}
                            {notification.type === 'review' && <Star />}
                            {notification.type === 'payment' && <Payment />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={notification.title}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {notification.message}
                              </Typography>
                              <Typography
                                component="span"
                                variant="caption"
                                color="text.secondary"
                              >
                                {format(new Date(notification.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
                ) : (
                  <Box textAlign="center" py={5}>
                    <Notifications sx={{ fontSize: 48, color: 'text.secondary' }} />
                    <Typography variant="h6" color="text.secondary" mt={2}>
                      Vous n'avez pas de notifications
                    </Typography>
                  </Box>
                )}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;