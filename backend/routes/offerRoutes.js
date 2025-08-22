const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const offerController = require('../controllers/offerController');

router.post('/', auth, offerController.createOffer);
router.get('/', offerController.getAllOffers);
router.get('/:id', offerController.getOfferById);
router.put('/:id', auth, offerController.updateOffer);
router.delete('/:id', auth, offerController.deleteOffer);

module.exports = router;