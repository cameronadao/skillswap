const express = require('express');
const router = express.Router(); // Initialisation AVANT utilisation
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;