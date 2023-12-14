import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';
import { AppContext } from "../contexts/AppContext";

export default function EditProfilePopup({isOpen, onUpdateUser}) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const CurrentAppContext = React.useContext(AppContext);

  React.useEffect(() => {
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onTouched" });

  const nameRegister = register('name', {
    required: {
      value: true,
      message: "Заполните поле",
    },
    minLength: {
      value: 2,
      message: "Минимальное количество символов: 2",
    },
    maxLength: {
      value: 40,
      message: "Максимальное количество символов: 40",
    }
  })

  const aboutRegister = register('about', {
    required: {
      value: true,
      message: "Заполните поле",
    },
    minLength: {
      value: 2,
      message: "Минимальное количество символов: 2",
    },
    maxLength: {
      value: 200,
      message: "Максимальное количество символов: 200",
    }
  })

  function handleSubmitEditProfileForm({name, about}) { 
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm 
      name="edit-profile" 
      title="Редактировать профиль" 
      isOpen={isOpen}
      buttonText={CurrentAppContext.isLoading? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit(handleSubmitEditProfileForm)}>
        <input 
          id="name-input" name="name" className="popup__input popup__input_type_name" 
          type="text" placeholder="Имя" 
          defaultValue={currentUser.name} {...nameRegister}/>
        <span className={`popup__error ${errors.name && 'popup__error_visible'}`}>
          {errors.name && errors.name.message}
        </span>
        <input 
          id="description-input" name="description" className="popup__input popup__input_type_description" 
          type="text" placeholder="О себе" 
          defaultValue={currentUser.about} {...aboutRegister}/>
        <span className={`popup__error ${errors.about && 'popup__error_visible'}`}>
          {errors.about && errors.about.message}
        </span>
    </PopupWithForm>
  )
}
