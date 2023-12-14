import React from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

export default function ImagePopup({card}) {

  const CurrentAppContext = React.useContext(AppContext);
  usePopupClose(card?.link, CurrentAppContext.closeAllPopups);

  return (
    <div className={`popup popup-imageview ${card && 'popup_opened'}`}>
      <figure className="popup-imageview__figure">
        <button className="popup__close-button opacity-transition" type="button" 
        aria-label="Кнопка закрытия окна просмотра изображения" onClick={CurrentAppContext.closeAllPopups}/>
        <img 
          src={card ? (card.link) : ('#')}
          alt={card ? (card.name) : ('')}
          className="popup-imageview__img" 
        />
        <figcaption className="popup-imageview__caption">{card ? (card.name) : ('')}</figcaption>
      </figure>
    </div>
  )
}