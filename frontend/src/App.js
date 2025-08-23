// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
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

// Composant pour les routes protégées
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Ajout de l'import ici

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Composant principal de l'application
function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SocketProvider>
          <Router>
            <div className="app-container">
              <Navbar onMenuClick={toggleSidebar} />
              <div className="main-content">
                {!isMobile && <Sidebar />}
                <div className="content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/offers" element={<OffersList />} />
                    <Route path="/offers/:id" element={<OfferDetails />} />
                    
                    <Route path="/create-offer" element={
                      <ProtectedRoute>
                        <CreateOffer />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/edit-profile" element={
                      <ProtectedRoute>
                        <EditProfile />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/exchanges" element={
                      <ProtectedRoute>
                        <ExchangeList />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/exchanges/:id" element={
                      <ProtectedRoute>
                        <ExchangeDetails />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/chat/:exchangeId" element={
                      <ProtectedRoute>
                        <Chat />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/payment/:exchangeId" element={
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/payment/success" element={
                      <ProtectedRoute>
                        <PaymentSuccess />
                      </ProtectedRoute>
                    } />
                    
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
    </ThemeProvider>
  );
}

export default App;