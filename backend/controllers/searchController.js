// backend/controllers/searchController.js
const Offer = require('../models/Offer');
const User = require('../models/User');

exports.search = async (req, res) => {
  try {
    const { query, skills, location, availability, rating, page = 1, limit = 10 } = req.query;
    
    // Construire la requête de recherche
    const searchQuery = {};
    
    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (skills) {
      const skillsArray = skills.split(',');
      searchQuery.$and = [
        { 'skillsOffered.name': { $in: skillsArray } },
        { 'skillsWanted.name': { $in: skillsArray } }
      ];
    }
    
    if (location) {
      searchQuery['user.profile.location'] = { $regex: location, $options: 'i' };
    }
    
    if (availability) {
      searchQuery['user.availability'] = availability;
    }
    
    if (rating) {
      searchQuery['user.averageRating'] = { $gte: parseFloat(rating) };
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Exécuter la recherche
    const results = await Offer.find(searchQuery)
      .populate('user', 'username profile.avatar profile.location averageRating')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Offer.countDocuments(searchQuery);
    
    res.json({
      success: true,
      data: results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};