import React, { useState } from 'react';
import axios from 'axios';

const ContactButton = ({ offerId }) => {
  const [message, setMessage] = useState('');

  const handleContact = async () => {
    try {
      await axios.post(`/api/offers/contact/${offerId}`, { message });
      alert('Message envoyé!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <textarea 
        placeholder="Votre message..." 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleContact}>Contacter</button>
    </div>
  );
};

export default ContactButton;