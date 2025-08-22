import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OffersList from './pages/OffersList';
import OfferDetails from './pages/OfferDetails';
import CreateOffer from './pages/CreateOffer';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ExchangeList from './pages/ExchangeList';
import ExchangeDetails from './pages/ExchangeDetails';
import Chat from './pages/Chat';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import NotFound from './pages/NotFound';
import Loading from './components/UI/Loading';
import Alert from './components/UI/Alert';
import { useAuth } from './context/AuthContext';
import axios from 'axios';
import './App.css';

// Créer un thème Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        borderRadius: 8,
        textTransform: 'none',
      },
    },
    MuiCard: {
      styleOverrides: {
        borderRadius: 12,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
});

function App() {
  const { isAuthenticated, loading } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié au chargement
    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/me');
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (loading || isCheckingAuth) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <Router>
              <div className="app-container">
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                      <Route path="/offers" element={<OffersList />} />
                      <Route path="/offers/:id" element={<OfferDetails />} />
                      <Route path="/create-offer" element={isAuthenticated ? <CreateOffer /> : <Navigate to="/login" />} />
                      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                      <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
                      <Route path="/exchanges" element={isAuthenticated ? <ExchangeList /> : <Navigate to="/login" />} />
                      <Route path="/exchanges/:id" element={isAuthenticated ? <ExchangeDetails /> : <Navigate to="/login" />} />
                      <Route path="/chat/:exchangeId" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
                      <Route path="/payment/:exchangeId" element={isAuthenticated ? <Payment /> : <Navigate to="/login" />} />
                      <Route path="/payment/success" element={isAuthenticated ? <PaymentSuccess /> : <Navigate to="/login" />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
                <Footer />
              </div>
              <Alert />
            </Router>
          </SocketProvider>
        </AuthProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  );
}

export default App;