import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({card, onCardClick, onCardLike, onCardDeleteClick}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `place__like-button ${isLiked && 'place__like-button_active'}`
  );

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  return (
    <article className="place">
      <img 
        src={card.link} 
        alt={card.name} 
        className="place__image" 
        onClick={handleClick}
      />
      <div className="place__caption-container">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка поставить или убрать лайк" onClick={handleLikeClick}/>
          <h3 className="place__likes-counter">{card.likes.length > 0 && card.likes.length}</h3>
        </div>
      </div>
      {isOwn && <button className="place__delete-button" type="button" aria-label="Кнопка удаления карточки" onClick={handleDeleteClick} />}
    </article>
  )
}
