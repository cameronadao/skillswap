// frontend/src/components/OfferForm.js
import React, { useState } from 'react';
import axios from 'axios';

const OfferForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsOffered: '',
    skillsWanted: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/offers`, {
        ...formData,
        skillsOffered: formData.skillsOffered.split(',').map(s => s.trim()),
        skillsWanted: formData.skillsWanted.split(',').map(s => s.trim())
      });
      alert('Offre créée avec succès !');
      setFormData({title: '', description: '', skillsOffered: '', skillsWanted: ''});
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="offer-form">
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Titre" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="skillsOffered" value={formData.skillsOffered} onChange={handleChange} placeholder="Compétences offertes (séparées par des virgules)" required />
      <input name="skillsWanted" value={formData.skillsWanted} onChange={handleChange} placeholder="Compétences recherchées (séparées par des virgules)" required />
      <button type="submit">Créer l'offre</button>
    </form>
  );
};

export default OfferForm;