// Exemple de route dans offerRoutes.js
router.post('/', auth, async (req, res) => {
    const { title, description, skillsOffered, skillsWanted } = req.body;
    try {
      const newOffer = new Offer({
        user: req.user.id,
        title,
        description,
        skillsOffered,
        skillsWanted
      });
      await newOffer.save();
      res.json(newOffer);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

  const express = require('express');
  const router = express.Router(); // 2. Initialiser le routeur AVANT de l'utiliser
  const auth = require('../middleware/auth');
  const offerController = require('../controllers/offerController');


  
  router.put('/:id', auth, async (req, res) => {
    // Vérifier que l'utilisateur est bien le propriétaire
    const offer = await Offer.findById(req.params.id);
    if (offer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    // Mettre à jour l'offre...
  });

  // Vos routes existantes
  router.post('/', auth, offerController.createOffer);
  router.get('/', offerController.getAllOffers);
  router.get('/:id', offerController.getOfferById);
  router.put('/:id', auth, offerController.updateOffer);
  router.delete('/:id', auth, offerController.deleteOffer);

  module.exports = router;