// backend/services/recommendationService.js
const User = require('../models/User');
const Offer = require('../models/Offer');

class RecommendationService {
  static async getRecommendedOffers(userId) {
    const user = await User.findById(userId);
    
    // Algorithmes de recommandation
    const recommendations = await this.collaborativeFiltering(user);
    const contentBased = await this.contentBasedFiltering(user);
    
    // Combiner les résultats
    return this.combineRecommendations(recommendations, contentBased);
  }
  
  static async collaborativeFiltering(user) {
    // Trouver des utilisateurs similaires
    const similarUsers = await User.find({
      'skills.offered.name': { $in: user.skills.wanted.map(s => s.name) },
      _id: { $ne: user._id }
    }).limit(10);
    
    // Trouver les offres de ces utilisateurs
    const offers = await Offer.find({
      user: { $in: similarUsers.map(u => u._id) },
      skillsWanted: { $in: user.skills.offered.map(s => s.name) }
    }).populate('user');
    
    return offers;
  }
  
  static async contentBasedFiltering(user) {
    // Basé sur le contenu des offres précédemment consultées
    const offers = await Offer.find({
      $or: [
        { skillsOffered: { $in: user.skills.wanted.map(s => s.name) } },
        { skillsWanted: { $in: user.skills.offered.map(s => s.name) } }
      ]
    }).populate('user');
    
    return offers;
  }
  
  static combineRecommendations(collaborative, contentBased) {
    // Combiner et pondérer les résultats
    const combined = [...collaborative, ...contentBased];
    
    // Éliminer les doublons
    const unique = combined.filter((offer, index, self) =>
      index === self.findIndex(o => o._id.toString() === offer._id.toString())
    );
    
    // Trier par pertinence
    return unique.sort((a, b) => {
      // Calculer un score de pertinence
      const scoreA = this.calculateRelevanceScore(a);
      const scoreB = this.calculateRelevanceScore(b);
      return scoreB - scoreA;
    }).slice(0, 10);
  }
  
  static calculateRelevanceScore(offer) {
    // Logique de calcul de score basée sur divers facteurs
    let score = 0;
    
    // Plus l'offre est récente, plus elle a de points
    const daysSinceCreation = (Date.now() - offer.createdAt) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 10 - daysSinceCreation);
    
    // Plus l'utilisateur a de bonnes évaluations, plus l'offre a de points
    if (offer.user.averageRating) {
      score += offer.user.averageRating * 2;
    }
    
    return score;
  }
}

module.exports = RecommendationService;