import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { usePopupClose } from '../hooks/usePopupClose';

export default function PopupWithForm({name, title, children, isOpen, buttonText, onSubmit}) {

  const CurrentAppContext = React.useContext(AppContext);

  usePopupClose(isOpen, CurrentAppContext.closeAllPopups);

  return (
    <div className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button opacity-transition" type="button" 
        aria-label="Кнопка закрытия попапа" onClick={CurrentAppContext.closeAllPopups}/>
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}-form`} className={`popup__form ${name}-form`} onSubmit={onSubmit}>
          
          {children}

          <button type="submit" className={`popup__button ${name}-submit-button`}>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}