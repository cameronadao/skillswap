const express = require('express');
const router = express.Router(); // Initialisation AVANT utilisation
const userController = require('../controllers/userController');

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;