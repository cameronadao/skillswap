// frontend/src/components/OfferCard.js - Lazy loading
import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OfferCard = memo(({ offer, onContact }) => {
  return (
    <div className="offer-card">
      <LazyLoadImage
        alt={offer.user.username}
        effect="blur"
        src={offer.user.profile.avatar || '/default-avatar.png'}
        threshold={100}
      />
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
      <button onClick={() => onContact(offer._id)}>Contacter</button>
    </div>
  );
});

export default OfferCard;