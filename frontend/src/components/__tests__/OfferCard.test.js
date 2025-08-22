// Exemple: frontend/src/components/__tests__/OfferCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OfferCard from '../Offers/OfferCard';

const mockOffer = {
  _id: '1',
  title: 'Cours de guitare',
  description: 'Apprenez la guitare avec moi',
  skillsOffered: ['Guitare'],
  skillsWanted: ['Piano'],
  user: {
    _id: 'user1',
    username: 'guitarist123',
    profile: {
      avatar: 'avatar.jpg'
    }
  }
};

test('renders offer card with correct information', () => {
  render(<OfferCard offer={mockOffer} />);
  
  expect(screen.getByText('Cours de guitare')).toBeInTheDocument();
  expect(screen.getByText('Apprenez la guitare avec moi')).toBeInTheDocument();
  expect(screen.getByText('guitarist123')).toBeInTheDocument();
});

test('calls onContact when contact button is clicked', () => {
  const mockOnContact = jest.fn();
  render(<OfferCard offer={mockOffer} onContact={mockOnContact} />);
  
  fireEvent.click(screen.getByText('Contacter'));
  expect(mockOnContact).toHaveBeenCalledWith(mockOffer._id);
});