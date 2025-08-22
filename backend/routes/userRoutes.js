const express = require('express');
const router = express.Router(); // Initialisation AVANT utilisation
const userController = require('../controllers/userController');

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

module.exports = router;