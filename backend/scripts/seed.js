const mongoose = require('mongoose');
const Offer = require('../models/Offer');
const User = require('../models/User');

const seedData = async () => {
  // Créer des utilisateurs de test
  const users = await User.create([
    {
      username: 'guitariste_pro',
      email: 'guitariste@example.com',
      password: 'password123',
      profile: {
        firstName: 'Jean',
        lastName: 'Dupont',
        bio: 'Guitariste professionnel avec 10 ans d\'expérience',
        location: 'Paris'
      },
      skills: {
        offered: [{ name: 'Guitare', level: 'Expert' }],
        wanted: [{ name: 'Piano', level: 'Beginner' }]
      }
    },
    {
      username: 'piano_teacher',
      email: 'piano@example.com',
      password: 'password123',
      profile: {
        firstName: 'Marie',
        lastName: 'Martin',
        bio: 'Professeur de piano diplômée',
        location: 'Lyon'
      },
      skills: {
        offered: [{ name: 'Piano', level: 'Expert' }],
        wanted: [{ name: 'Chant', level: 'Intermediate' }]
      }
    }
  ]);

  // Créer des offres de test
  await Offer.create([
    {
      title: 'Cours de guitare pour débutants',
      description: 'Apprenez les bases de la guitare avec un professionnel',
      user: users[0]._id,
      skillsOffered: [{ name: 'Guitare', level: 'Expert' }],
      skillsWanted: [{ name: 'Piano', level: 'Beginner' }]
    },
    {
      title: 'Cours de piano classique',
      description: 'Leçons de piano pour tous niveaux',
      user: users[1]._id,
      skillsOffered: [{ name: 'Piano', level: 'Expert' }],
      skillsWanted: [{ name: 'Chant', level: 'Intermediate' }]
    }
  ]);

  console.log('Données de test ajoutées avec succès !');
  process.exit(0);
};

// Connexion à la base de données et exécution du seed
mongoose.connect(process.env.MONGO_URI)
  .then(() => seedData())
  .catch(err => console.error(err));