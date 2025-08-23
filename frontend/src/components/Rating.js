// frontend/src/components/Rating.js
import React, { useState } from 'react';
import {
  Box,
  Rating,
  Typography,
  Button,
  Modal,
  TextField,
  Paper,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Rating = ({ 
  value, 
  count, 
  readOnly = false, 
  onRate, 
  size = 'medium',
  showAverage = true,
  reviews = []
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(value || 0);
  const [comment, setComment] = useState('');
  const theme = useTheme();

  const handleOpen = () => {
    if (!readOnly) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRating(value || 0);
    setComment('');
  };

  const handleSubmit = () => {
    if (onRate) {
      onRate(rating, comment);
    }
    handleClose();
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return { fontSize: '1rem' };
      case 'large':
        return { fontSize: '2rem' };
      default:
        return { fontSize: '1.5rem' };
    }
  };

  const renderStars = (ratingValue) => {
    return (
      <Rating
        name="rating"
        value={ratingValue}
        precision={0.5}
        readOnly={readOnly}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon fontSize="inherit" />}
        sx={getSize()}
      />
    );
  };

  const renderReviews = () => {
    if (reviews.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          Aucun avis pour le moment
        </Typography>
      );
    }

    return (
      <Box sx={{ mt: 2 }}>
        {reviews.slice(0, 3).map((review, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar src={review.user.avatar} sx={{ mr: 1 }}>
                {review.user.username.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{review.user.username}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {renderStars(review.rating)}
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {review.comment && (
              <Typography variant="body2" sx={{ ml: 5 }}>
                {review.comment}
              </Typography>
            )}
            {index < reviews.length - 1 && <Divider sx={{ mt: 1 }} />}
          </Box>
        ))}
        {reviews.length > 3 && (
          <Button variant="text" onClick={() => setOpen(true)}>
            Voir tous les avis ({reviews.length})
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showAverage && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {renderStars(value)}
          {count !== undefined && (
            <Typography variant="body2" color="text.secondary">
              ({count})
            </Typography>
          )}
        </Box>
      )}
      
      {!readOnly && (
        <Button size="small" onClick={handleOpen}>
          Évaluer
        </Button>
      )}

      {showAverage && reviews.length > 0 && (
        <Button size="small" onClick={() => setOpen(true)}>
          Voir les avis
        </Button>
      )}

      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Évaluer cette expérience
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            {renderStars(rating)}
          </Box>
          
          <TextField
            label="Commentaire (optionnel)"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleClose}>Annuler</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Soumettre
            </Button>
          </Box>
          
          {reviews.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Avis précédents ({reviews.length})
              </Typography>
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {reviews.map((review, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardHeader
                      avatar={
                        <Avatar src={review.user.avatar}>
                          {review.user.username.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {renderStars(review.rating)}
                          <Typography variant="caption" color="text.secondary">
                            {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                      title={review.user.username}
                      subheader={review.date}
                    />
                    {review.comment && (
                      <CardContent>
                        <Typography variant="body2">
                          {review.comment}
                        </Typography>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default Rating;