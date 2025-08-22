import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OffersList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/offers`);
        setOffers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="offers-list">
      <h2>Offres disponibles</h2>
      {offers.length === 0 ? (
        <p>Aucune offre pour le moment</p>
      ) : (
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer._id} className="offer-card">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <div className="skills">
                <span>Offre: {offer.skillsOffered?.join(', ')}</span>
                <span>Recherche: {offer.skillsWanted?.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersList;