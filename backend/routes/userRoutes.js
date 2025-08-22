const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// L'erreur est probablement ici - vérifiez que userController.getProfile existe
router.get('/profile', userController.getProfile); // Ligne 5
router.put('/profile', userController.updateProfile);

module.exports = router;