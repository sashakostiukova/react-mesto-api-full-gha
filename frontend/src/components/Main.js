import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile, 
  onAddPlace, 
  onEditAvatar, 
  onCardClick, 
  onCardLike, 
  onCardDeleteClick, 
  cardToDelete, 
  cards}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__avatar-cover">
          <img src={currentUser.avatar} alt="аватар пользователя" className="profile__image" />
          <button className="profile__update-avatar-button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__text-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button className="profile__edit-button opacity-transition" type="button" 
          aria-label="Кнопка редактирования профиля" onClick={onEditProfile}/>
        </div>
        <button className="add-button opacity-transition" type="button" 
        aria-label="Кнопка загрузки нового изображения на сайт" onClick={onAddPlace} />
      </section>
      <section className="places section" aria-label="секция с карточками мест">

        {cards.map((item) => (
          <Card 
            key={item._id} 
            card={item} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike} 
            onCardDeleteClick={onCardDeleteClick} 
            cardToDelete={cardToDelete}
            />
        ))}

      </section>
    </main>
  );
}

export default Main; 