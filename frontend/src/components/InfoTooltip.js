import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { usePopupClose } from '../hooks/usePopupClose';

import registrationDoneIco from "../images/registration-done.svg";
import registrationErrorIco from "../images/registration-error.svg";

export default function InfoTooltip({ isOpen, isRegistrationSuccessful, successMessage, errorMessage }) {

  const CurrentAppContext = React.useContext(AppContext);
  usePopupClose(isOpen, CurrentAppContext.closeAllPopups);

  return (

    <div className={`popup popup-tooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup-tooltip__container">
   
        <button className="popup__close-button opacity-transition" type="button" 
        aria-label="Кнопка закрытия попапа" onClick={CurrentAppContext.closeAllPopups}/>
        {isRegistrationSuccessful 
          ? <img alt={''} src={registrationDoneIco} className="popup-tooltip__img" />
          : <img alt={''} src={registrationErrorIco} className="popup-tooltip__img" />}
        <h2 className="popup__title popup-tooltip__message">
          {isRegistrationSuccessful ? successMessage : errorMessage}
        </h2>

      </div>
    </div>
  )
}
