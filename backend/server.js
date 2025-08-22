const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ajoutez ce code après les middlewares
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API SkillSwap',
    status: 'Opérationnel',
    endpoints: {
      auth: '/api/auth',
      offers: '/api/offers',
      users: '/api/users'
    }
  });
});

// Import des routes
const authRoutes = require('./routes/authRoutes');
const offerRoutes = require('./routes/offerRoutes');
const userRoutes = require('./routes/userRoutes');

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/users', userRoutes);

// Connexion DB et démarrage serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));