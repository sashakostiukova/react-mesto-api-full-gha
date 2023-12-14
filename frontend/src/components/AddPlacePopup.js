import React from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';
import { useForm } from 'react-hook-form';

export default function AddPlacePopup({isOpen, onAddPlace}) {

  const CurrentAppContext = React.useContext(AppContext);

  React.useEffect(() => {
    reset();
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onTouched" });

  const titleRegister = register('title', {
    required: {
      value: true,
      message: "Заполните поле",
    },
    minLength: {
      value: 2,
      message: "Минимальное количество символов: 2",
    },
    maxLength: {
      value: 30,
      message: "Максимальное количество символов: 30",
    }
  })

  const linkRegister = register('link', {
    required: {
      value: true,
      message: "Заполните поле"
    },
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: "Введите url"
    }
  })

  function handleSubmitAddPlaceForm({title, link}) {
    onAddPlace({
      name: title,
      link,
    })
  };

  return (
    <PopupWithForm 
      name="add-place" 
      title="Новое место" 
      isOpen={isOpen} 
      buttonText={CurrentAppContext.isLoading ? 'Сохранение...' : 'Добавить'}
      onSubmit={handleSubmit(handleSubmitAddPlaceForm)}>
        <input 
          id="title-input" name="title" className="popup__input popup__input_type_title" 
          type="text" placeholder="Название" {...titleRegister}/>
        <span className={`popup__error ${errors.title && 'popup__error_visible'}`}>
          {errors.title && errors.title.message}
        </span>
        <input 
          id="link-input" name="link" className="popup__input popup__input_type_link" 
          type="url" placeholder="Ссылка на картинку" {...linkRegister}/>
        <span className={`popup__error ${errors.link && 'popup__error_visible'}`}>
          {errors.link && errors.link.message}
        </span>
    </PopupWithForm>
  )
}
