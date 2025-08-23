// frontend/src/pages/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Divider,
  useTheme,
  Card,
  CardContent,
  Chip,
  Button,
  Tooltip,
  Badge
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import api from '../services/api';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale';

const Chat = () => {
  const { exchangeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [exchange, setExchange] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const response = await api.get(`/api/exchanges/${exchangeId}`);
        setExchange(response.data);
        
        // Déterminer l'autre utilisateur
        const otherUserId = response.data.user1._id === user._id 
          ? response.data.user2._id 
          : response.data.user1._id;
        
        const userResponse = await api.get(`/api/users/${otherUserId}`);
        setOtherUser(userResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'échange:', error);
        navigate('/exchanges');
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/api/messages/exchange/${exchangeId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des messages:', error);
      }
    };

    fetchExchange();
    fetchMessages();
  }, [exchangeId, user, navigate]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', exchangeId);

      socket.on('newMessage', (message) => {
        setMessages(prev => [...prev, message]);
        setIsTyping(false);
      });

      socket.on('typing', (data) => {
        if (data.userId !== user._id) {
          setIsTyping(true);
          clearTimeout(typingTimeout);
          setTypingTimeout(setTimeout(() => setIsTyping(false), 3000));
        }
      });

      socket.on('stopTyping', () => {
        setIsTyping(false);
      });

      return () => {
        socket.off('newMessage');
        socket.off('typing');
        socket.off('stopTyping');
      };
    }
  }, [socket, exchangeId, user._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    // Envoyer l'événement "typing"
    if (socket && e.target.value.trim() !== '') {
      socket.emit('typing', { 
        exchangeId, 
        userId: user._id,
        username: user.username 
      });
    } else {
      socket.emit('stopTyping', { exchangeId, userId: user._id });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        exchangeId,
        content: newMessage,
        sender: user._id
      };

      // Envoyer via socket pour le temps réel
      if (socket) {
        socket.emit('sendMessage', messageData);
        socket.emit('stopTyping', { exchangeId, userId: user._id });
      }

      // Sauvegarder dans la base de données
      await api.post('/api/messages', messageData);

      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Logique pour gérer les fichiers joints
      console.log('Fichier joint:', file);
      // Ici, vous pouvez implémenter l'upload de fichier
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEndExchange = async () => {
    try {
      await api.put(`/api/exchanges/${exchangeId}/complete`);
      // Afficher un message de succès
    } catch (error) {
      console.error('Erreur lors de la clôture de l\'échange:', error);
    }
  };

  const renderMessage = (message) => {
    const isSender = message.sender._id === user._id;
    
    return (
      <Box
        key={message._id}
        sx={{
          display: 'flex',
          justifyContent: isSender ? 'flex-end' : 'flex-start',
          mb: 2
        }}
      >
        <Box
          sx={{
            maxWidth: '70%',
            p: 2,
            borderRadius: 2,
            bgcolor: isSender ? 'primary.main' : 'grey.200',
            color: isSender ? 'white' : 'text.primary',
            position: 'relative'
          }}
        >
          <Typography variant="body1">{message.content}</Typography>
          {message.file && (
            <Box sx={{ mt: 1 }}>
              <Chip
                icon={<AttachFileIcon />}
                label={message.file.name}
                size="small"
                clickable
                onClick={() => window.open(message.file.url, '_blank')}
              />
            </Box>
          )}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              opacity: 0.7,
              textAlign: isSender ? 'right' : 'left'
            }}
          >
            {formatDistanceToNow(new Date(message.createdAt), {
              addSuffix: true,
              locale: fr
            })}
          </Typography>
        </Box>
      </Box>
    );
  };

  if (!exchange || !otherUser) {
    return <div>Chargement...</div>;
  }

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* En-tête du chat */}
      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={otherUser.profile.avatar} alt={otherUser.username} />
          <Box>
            <Typography variant="h6">{otherUser.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              Échange: {exchange.offer.title}
            </Typography>
            {isTyping && (
              <Typography variant="caption" color="primary.main">
                {otherUser.username} est en train d'écrire...
              </Typography>
            )}
          </Box>
        </Box>
        <Box>
          <Badge
            badgeContent={exchange.unreadCount}
            color="error"
            invisible={exchange.unreadCount === 0}
          >
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </Badge>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Voir le profil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Signaler</MenuItem>
            <MenuItem onClick={handleEndExchange}>Clôturer l'échange</MenuItem>
          </Menu>
        </Box>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          bgcolor: theme.palette.grey[100],
          backgroundImage: 'url("/images/chat-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Commencez la conversation avec {otherUser.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Soyez poli et respectueux
            </Typography>
          </Box>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Paper
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <IconButton onClick={handleFileAttach}>
          <AttachFileIcon />
        </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={3}
        />
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Chat;