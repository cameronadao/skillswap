import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  Avatar,
  Tooltip,
  Container
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person,
  Logout,
  Dashboard,
  Work,
  Message,
  Notifications
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            SkillSwap
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => { navigate('/'); handleCloseNavMenu(); }}>
                <Typography textAlign="center">Accueil</Typography>
              </MenuItem>
              <MenuItem onClick={() => { navigate('/offers'); handleCloseNavMenu(); }}>
                <Typography textAlign="center">Offres</Typography>
              </MenuItem>
              {isAuthenticated && (
                <>
                  <MenuItem onClick={() => { navigate('/dashboard'); handleCloseNavMenu(); }}>
                    <Typography textAlign="center">Tableau de bord</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/exchanges'); handleCloseNavMenu(); }}>
                    <Typography textAlign="center">Échanges</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            SkillSwap
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => { navigate('/'); }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Accueil
            </Button>
            <Button
              onClick={() => { navigate('/offers'); }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Offres
            </Button>
            {isAuthenticated && (
              <>
                <Button
                  onClick={() => { navigate('/dashboard'); }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Tableau de bord
                </Button>
                <Button
                  onClick={() => { navigate('/exchanges'); }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Échanges
                </Button>
              </>
            )}
          </Box>

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Ouvrir les paramètres">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.username} src={user?.profile?.avatar}>
                    {user?.username?.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { navigate('/dashboard'); handleCloseUserMenu(); }}>
                  <Dashboard sx={{ mr: 1 }} />
                  <Typography>Tableau de bord</Typography>
                </MenuItem>
                <MenuItem onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                  <Person sx={{ mr: 1 }} />
                  <Typography>Profil</Typography>
                </MenuItem>
                <MenuItem onClick={() => { navigate('/exchanges'); handleCloseUserMenu(); }}>
                  <Work sx={{ mr: 1 }} />
                  <Typography>Échanges</Typography>
                </MenuItem>
                <MenuItem onClick={() => { navigate('/messages'); handleCloseUserMenu(); }}>
                  <Message sx={{ mr: 1 }} />
                  <Typography>Messages</Typography>
                </MenuItem>
                <MenuItem onClick={() => { navigate('/notifications'); handleCloseUserMenu(); }}>
                  <Notifications sx={{ mr: 1 }} />
                  <Typography>Notifications</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  <Typography>Déconnexion</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={() => { navigate('/login'); }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Connexion
              </Button>
              <Button
                onClick={() => { navigate('/register'); }}
                sx={{ my: 2, color: 'white', display: 'block' }}
                variant="outlined"
              >
                Inscription
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;