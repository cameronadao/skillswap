// backend/services/matchingService.js
const User = require('../models/User');
const Offer = require('../models/Offer');

const calculateMatchScore = (userSkills, offerSkills) => {
  let score = 0;
  
  // Calculer le nombre de compétences correspondantes
  const matchingSkills = userSkills.filter(userSkill => 
    offerSkills.some(offerSkill => 
      userSkill.name.toLowerCase() === offerSkill.name.toLowerCase()
    )
  );
  
  score = matchingSkills.length;
  
  // Pondérer par le niveau de compétence
  matchingSkills.forEach(skill => {
    const offerSkill = offerSkills.find(s => s.name.toLowerCase() === skill.name.toLowerCase());
    if (offerSkill) {
      // Bonus pour les niveaux correspondants
      if (skill.level === offerSkill.level) {
        score += 2;
      } else if (
        (skill.level === 'Expert' && offerSkill.level === 'Advanced') ||
        (skill.level === 'Advanced' && offerSkill.level === 'Intermediate') ||
        (skill.level === 'Intermediate' && offerSkill.level === 'Beginner')
      ) {
        score += 1;
      }
    }
  });
  
  return score;
};

exports.findRecommendedOffers = async (userId) => {
  try {
    // Récupérer l'utilisateur
    const user = await User.findById(userId);
    
    // Récupérer toutes les offres sauf celles de l'utilisateur
    const offers = await Offer.find({ user: { $ne: userId } })
      .populate('user', 'username profile.avatar profile.firstName profile.lastName')
      .sort({ createdAt: -1 });
    
    // Calculer le score de correspondance pour chaque offre
    const recommendedOffers = offers.map(offer => {
      const offeredScore = calculateMatchScore(user.skills.wanted, offer.skillsOffered);
      const wantedScore = calculateMatchScore(user.skills.offered, offer.skillsWanted);
      const totalScore = offeredScore + wantedScore;
      
      return {
        ...offer.toObject(),
        matchScore: totalScore,
        offeredScore,
        wantedScore
      };
    });
    
    // Trier par score de correspondance
    recommendedOffers.sort((a, b) => b.matchScore - a.matchScore);
    
    // Retourner les 10 meilleures offres
    return recommendedOffers.slice(0, 10);
  } catch (err) {
    console.error('Error in findRecommendedOffers:', err);
    throw err;
  }
};

exports.findRecommendedUsers = async (userId) => {
  try {
    // Récupérer l'utilisateur
    const user = await User.findById(userId);
    
    // Récupérer tous les utilisateurs sauf l'utilisateur actuel
    const users = await User.find({ _id: { $ne: userId } })
      .select('-password -emailVerificationToken -passwordResetToken -passwordResetExpire');
    
    // Calculer le score de correspondance pour chaque utilisateur
    const recommendedUsers = users.map(otherUser => {
      const offeredScore = calculateMatchScore(user.skills.wanted, otherUser.skills.offered);
      const wantedScore = calculateMatchScore(user.skills.offered, otherUser.skills.wanted);
      const totalScore = offeredScore + wantedScore;
      
      return {
        ...otherUser.toObject(),
        matchScore: totalScore,
        offeredScore,
        wantedScore
      };
    });
    
    // Trier par score de correspondance
    recommendedUsers.sort((a, b) => b.matchScore - a.matchScore);
    
    // Retourner les 10 meilleurs utilisateurs
    return recommendedUsers.slice(0, 10);
  } catch (err) {
    console.error('Error in findRecommendedUsers:', err);
    throw err;
  }
};