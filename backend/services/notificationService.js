// backend/services/notificationService.js
const User = require('../models/User');
const Notification = require('../models/Notification');

exports.sendNotification = async (userId, type, title, message, data = {}) => {
  try {
    // Créer la notification dans la base de données
    const notification = await Notification.create({
      user: userId,
      type,
      title,
      message,
      data
    });
    
    // Récupérer les préférences de notification de l'utilisateur
    const user = await User.findById(userId);
    
    // Envoyer la notification en temps réel via Socket.io si l'utilisateur est connecté
    if (user.preferences.notifications.push) {
      const io = require('../config/socket').getIO();
      io.to(userId.toString()).emit('notification', {
        _id: notification._id,
        type,
        title,
        message,
        data,
        createdAt: notification.createdAt,
        read: false
      });
    }
    
    // Envoyer un email si l'utilisateur a activé les notifications par email
    if (user.preferences.notifications.email) {
      const sendEmail = require('./emailService');
      await sendEmail({
        email: user.email,
        subject: title,
        message: `
          <h2>${title}</h2>
          <p>${message}</p>
          <p>Connectez-vous à votre compte pour plus de détails.</p>
        `
      });
    }
    
    return notification;
  } catch (err) {
    console.error('Error in sendNotification:', err);
    throw err;
  }
};

exports.sendExchangeRequestNotification = async (recipientId, offerId, senderId) => {
  const Offer = require('../models/Offer');
  const offer = await Offer.findById(offerId).populate('user', 'username');
  
  return exports.sendNotification(
    recipientId,
    'exchange',
    'Nouvelle demande d\'échange',
    `${offer.user.username} a envoyé une demande d'échange pour l'offre "${offer.title}"`,
    { offerId, senderId }
  );
};

exports.sendExchangeAcceptedNotification = async (recipientId, exchangeId) => {
  return exports.sendNotification(
    recipientId,
    'exchange',
    'Demande d\'échange acceptée',
    'Votre demande d\'échange a été acceptée. Vous pouvez maintenant commencer à discuter.',
    { exchangeId }
  );
};

exports.sendMessageNotification = async (recipientId, exchangeId, senderId) => {
  const User = require('../models/User');
  const sender = await User.findById(senderId);
  
  return exports.sendNotification(
    recipientId,
    'message',
    'Nouveau message',
    `Vous avez reçu un nouveau message de ${sender.username}`,
    { exchangeId, senderId }
  );
};

exports.sendReviewNotification = async (recipientId, exchangeId, reviewerId, rating) => {
  const User = require('../models/User');
  const reviewer = await User.findById(reviewerId);
  
  return exports.sendNotification(
    recipientId,
    'review',
    'Nouvelle évaluation',
    `${reviewer.username} vous a évalué avec ${rating} étoiles`,
    { exchangeId, reviewerId, rating }
  );
};

exports.sendPaymentNotification = async (recipientId, exchangeId, amount) => {
  return exports.sendNotification(
    recipientId,
    'payment',
    'Paiement reçu',
    `Vous avez reçu un paiement de ${amount}€ pour un échange.`,
    { exchangeId, amount }
  );
};