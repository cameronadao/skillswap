import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import {
  Dashboard,
  Work,
  Person,
  Message,
  Notifications,
  Payment,
  Star,
  Add,
  Home
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const menuItems = [
    { text: 'Accueil', icon: <Home />, path: '/' },
    { text: 'Offres', icon: <Work />, path: '/offers' },
  ];

  const authMenuItems = [
    { text: 'Tableau de bord', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Créer une offre', icon: <Add />, path: '/create-offer' },
    { text: 'Mes échanges', icon: <Work />, path: '/exchanges' },
    { text: 'Messages', icon: <Message />, path: '/messages' },
    { text: 'Notifications', icon: <Notifications />, path: '/notifications' },
    { text: 'Paiements', icon: <Payment />, path: '/payments' },
    { text: 'Évaluations', icon: <Star />, path: '/reviews' },
    { text: 'Profil', icon: <Person />, path: '/profile' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          mt: 8, // Hauteur de la navbar
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        {isAuthenticated && (
          <>
            <Divider />
            <Typography variant="subtitle2" sx={{ pl: 2, pt: 1, pb: 1 }}>
              Mon compte
            </Typography>
            <List>
              {authMenuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton onClick={() => navigate(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;