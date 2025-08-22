const Offer = require('../models/Offer');

exports.createOffer = async (req, res) => {
  try {
    const newOffer = new Offer({
      ...req.body,
      user: req.user.id
    });
    const offer = await newOffer.save();
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    // Logique pour récupérer toutes les offres
    res.status(200).json({ message: 'Liste des offres' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    // Logique pour récupérer une offre par ID
    res.status(200).json({ message: 'Détails de l\'offre' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOffer = async (req, res) => {
  try {
    // Logique pour créer une offre
    res.status(201).json({ message: 'Offre créée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    // Logique pour mettre à jour une offre
    res.status(200).json({ message: 'Offre mise à jour avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    // Logique pour supprimer une offre
    res.status(200).json({ message: 'Offre supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate('user', 'username');
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate('user', 'username');
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    if (offer.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    if (offer.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await offer.remove();
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};