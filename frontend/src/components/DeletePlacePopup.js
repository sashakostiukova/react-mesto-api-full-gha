import React from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

export default function DeletePlacePopup({isOpen, onCardDelete, cardToDelete}) {

  const CurrentAppContext = React.useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(cardToDelete);
  };

  return (
    <PopupWithForm 
      name="delete-place" 
      title="Вы уверены?" 
      isOpen={isOpen} 
      buttonText={CurrentAppContext.isLoading? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
      />
  )
}
