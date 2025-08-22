// 1. Importer les modules
const express = require('express');
const auth = require('../middleware/auth');
const offerController = require('../controllers/offerController');

// 2. Initialiser le routeur (AVANT de l'utiliser)
const router = express.Router();

// 3. Définir les routes
router.post('/', auth, offerController.createOffer);
router.get('/', offerController.getAllOffers);
router.get('/:id', offerController.getOfferById);
router.put('/:id', auth, offerController.updateOffer);
router.delete('/:id', auth, offerController.deleteOffer);

// 4. Exporter le routeur
module.exports = router;