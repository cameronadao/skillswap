// frontend/src/pages/NotificationsPage.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  useTheme,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondary,
  IconButton,
  Divider,
  Paper,
  TextField,
  InputAdornment,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  MarkEmailReadIcon,
  DeleteIcon,
  PersonIcon,
  EventIcon,
  StarIcon,
  MessageIcon,
  PaymentIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import NotificationService from '../services/notificationService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`notifications-tabpanel-${index}`}
      aria-labelledby={`notifications-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await NotificationService.getNotifications();
      setNotifications(data);
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleMarkAsRead = async (notificationId) => {
    await NotificationService.markAsRead(notificationId);
    setNotifications(prev =>
      prev.map(notif =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = async () => {
    await NotificationService.markAllAsRead();
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDelete = async (notificationId) => {
    // Implémenter la suppression de notification
    setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageIcon />;
      case 'exchange':
        return <EventIcon />;
      case 'review':
        return <StarIcon />;
      case 'payment':
        return <PaymentIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'message':
        return 'primary';
      case 'exchange':
        return 'secondary';
      case 'review':
        return 'success';
      case 'payment':
        return 'warning';
      default:
        return 'info';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) || 
      (filter === 'read' && notification.read);
    
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    
    return matchesFilter && matchesSearch && matchesType;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification._id);
    }
    
    // Naviguer vers la page correspondante
    switch (notification.type) {
      case 'message':
        navigate(`/chat/${notification.data.exchangeId}`);
        break;
      case 'exchange':
        navigate(`/exchanges/${notification.data.exchangeId}`);
        break;
      case 'review':
        navigate(`/profile/${notification.data.userId}`);
        break;
      case 'payment':
        navigate(`/payment/success`);
        break;
      default:
        navigate('/dashboard');
    }
  };

  const renderNotification = (notification) => {
    const color = getNotificationColor(notification.type);
    
    return (
      <Card
        key={notification._id}
        sx={{
          mb: 2,
          borderLeft: `4px solid ${theme.palette[color].main}`,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateX(5px)',
            boxShadow: 3,
            cursor: 'pointer'
          },
          bgcolor: notification.read ? 'background.paper' : `${color}.main`,
          color: notification.read ? 'text.primary' : 'white'
        }}
        onClick={() => handleNotificationClick(notification)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Avatar sx={{ bgcolor: notification.read ? `${color}.main` : 'rgba(255, 255, 255, 0.2)', color: notification.read ? 'white' : 'inherit' }}>
              {getNotificationIcon(notification.type)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: notification.read ? 'normal' : 'bold',
                  color: notification.read ? 'text.primary' : 'inherit'
                }}
              >
                {notification.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: notification.read ? 'text.secondary' : 'rgba(255, 255, 255, 0.8)'
                }}
              >
                {notification.message}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Chip
                  size="small"
                  label={notification.type}
                  sx={{
                    bgcolor: notification.read ? 'grey.200' : 'rgba(255, 255, 255, 0.2)',
                    color: notification.read ? 'text.secondary' : 'inherit'
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: notification.read ? 'text.secondary' : 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                    locale: fr
                  })}
                </Typography>
              </Box>
            </Box>
            <ListItemSecondary>
              {!notification.read && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsRead(notification._id);
                  }}
                  sx={{ color: notification.read ? 'text.secondary' : 'inherit' }}
                >
                  <MarkEmailReadIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(notification._id);
                }}
                sx={{ color: notification.read ? 'text.secondary' : 'inherit' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondary>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Notifications
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleMenuClick}
          >
            Filtres
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="contained"
              startIcon={<MarkEmailReadIcon />}
              onClick={handleMarkAllAsRead}
            >
              Tout marquer comme lu
            </Button>
          )}
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={filter}
          onChange={(e, newValue) => setFilter(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={
              <Badge badgeContent={notifications.length} color="primary">
                Toutes
              </Badge>
            }
            value="all"
          />
          <Tab
            label={
              <Badge badgeContent={unreadCount} color="error">
                Non lues
              </Badge>
            }
            value="unread"
          />
          <Tab label="Lues" value="read" />
        </Tabs>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Rechercher des notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          onClick={handleMenuClick}
          startIcon={<FilterListIcon />}
        >
          Type
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => setTypeFilter('all')}>
          Tous les types
        </MenuItem>
        <MenuItem onClick={() => setTypeFilter('message')}>
          Messages
        </MenuItem>
        <MenuItem onClick={() => setTypeFilter('exchange')}>
          Échanges
        </MenuItem>
        <MenuItem onClick={() => setTypeFilter('review')}>
          Évaluations
        </MenuItem>
        <MenuItem onClick={() => setTypeFilter('payment')}>
          Paiements
        </MenuItem>
      </Menu>

      {filteredNotifications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Aucune notification trouvée
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Essayez de modifier vos filtres ou revenez plus tard
          </Typography>
        </Paper>
      ) : (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {filteredNotifications.length} notification{filteredNotifications.length > 1 ? 's' : ''} trouvée{filteredNotifications.length > 1 ? 's' : ''}
          </Typography>
          {filteredNotifications.map(renderNotification)}
        </Box>
      )}
    </Container>
  );
};

export default NotificationsPage;