// Dans offerController.js
exports.searchOffers = async (req, res) => {
    const { skill } = req.query;
    try {
      const offers = await Offer.find({
        $or: [
          { skillsOffered: { $regex: skill, $options: 'i' } },
          { skillsWanted: { $regex: skill, $options: 'i' } }
        ]
      }).populate('user', 'username');
      res.json(offers);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };