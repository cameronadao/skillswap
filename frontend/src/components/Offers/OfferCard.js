import React from 'react';
import { Link } from 'react-router-dom';
import ContactButton from '../ContactButton';

const OfferCard = ({ offer }) => {
  return (
    <div className="offer-card">
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
      <div>
        <strong>Offre:</strong> {offer.skillsOffered.join(', ')}
      </div>
      <div>
        <strong>Recherche:</strong> {offer.skillsWanted.join(', ')}
      </div>
      <ContactButton offerId={offer._id} />
      <Link to={`/offers/${offer._id}`}>Voir détails</Link>
    </div>
  );
};

export default OfferCard;