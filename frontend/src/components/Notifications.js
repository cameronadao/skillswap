// frontend/src/components/Notifications.js
import React, { useState, useEffect } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  useTheme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondary,
  Chip,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import MessageIcon from '@mui/icons-material/Message';
import PaymentIcon from '@mui/icons-material/Payment';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale';
import NotificationService from '../services/notificationService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await NotificationService.getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    };

    if (user) {
      fetchNotifications();
      
      // Configurer les notifications push
      if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission();
      }
    }
  }, [user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (notificationId) => {
    await NotificationService.markAsRead(notificationId);
    setNotifications(prev =>
      prev.map(notif =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => prev - 1);
  };

  const handleMarkAllAsRead = async () => {
    await NotificationService.markAllAsRead();
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const handleDelete = async (notificationId) => {
    // Implémenter la suppression de notification
    setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
    if (!notifications.find(n => n._id === notificationId)?.read) {
      setUnreadCount(prev => prev - 1);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <Avatar sx={{ bgcolor: 'primary.main' }}><MessageIcon /></Avatar>;
      case 'exchange':
        return <Avatar sx={{ bgcolor: 'secondary.main' }}><EventIcon /></Avatar>;
      case 'review':
        return <Avatar sx={{ bgcolor: 'success.main' }}><StarIcon /></Avatar>;
      case 'payment':
        return <Avatar sx={{ bgcolor: 'warning.main' }}><PaymentIcon /></Avatar>;
      default:
        return <Avatar sx={{ bgcolor: 'info.main' }}><NotificationsIcon /></Avatar>;
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
    
    handleClose();
  };

  const renderNotification = (notification) => {
    const color = getNotificationColor(notification.type);
    
    return (
      <ListItem
        key={notification._id}
        sx={{
          bgcolor: notification.read ? 'transparent' : `${color}.main`,
          '&:hover': {
            bgcolor: notification.read ? 'action.hover' : `${color}.dark`,
            cursor: 'pointer'
          },
          py: 1.5,
          px: 2,
          mb: 0.5,
          borderRadius: 1,
          transition: 'all 0.2s'
        }}
        onClick={() => handleNotificationClick(notification)}
      >
        <ListItemAvatar>
          {getNotificationIcon(notification.type)}
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                fontWeight: notification.read ? 'normal' : 'bold',
                color: notification.read ? 'text.primary' : 'white'
              }}
            >
              {notification.title}
            </Typography>
          }
          secondary={
            <React.Fragment>
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
              {notification.data && (
                <Chip
                  size="small"
                  label={notification.data.type}
                  sx={{
                    ml: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: notification.read ? 'text.secondary' : 'white'
                  }}
                />
              )}
            </React.Fragment>
          }
        />
        <ListItemSecondary>
          {!notification.read && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsRead(notification._id);
              }}
              sx={{ color: notification.read ? 'text.secondary' : 'white' }}
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
            sx={{ color: notification.read ? 'text.secondary' : 'white' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItemSecondary>
      </ListItem>
    );
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 500,
            width: '400px',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllAsRead}
              startIcon={<MarkEmailReadIcon />}
            >
              Tout marquer comme lu
            </Button>
          )}
        </Box>
        <Divider />
        
        {notifications.length === 0 ? (
          <MenuItem>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              Aucune notification
            </Typography>
          </MenuItem>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map(renderNotification)}
          </List>
        )}
        
        {notifications.length > 0 && (
          <>
            <Divider />
            <MenuItem
              sx={{ justifyContent: 'center', py: 1 }}
              onClick={() => navigate('/notifications')}
            >
              <Typography variant="body2" color="primary">
                Voir toutes les notifications
              </Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default Notifications;