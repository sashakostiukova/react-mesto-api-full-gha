import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';
import { AppContext } from '../contexts/AppContext';

export default function EditAvatarPopup({isOpen, onUpdateAvatar}) {

  const CurrentAppContext = React.useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onTouched" });

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

  React.useEffect(() => {
    reset();
  }, [isOpen]);

  function handleSubmitUpdateAvatarForm(data) {
    onUpdateAvatar(data.link);
  }

  return (
    <PopupWithForm 
      name="update-avatar" 
      title="Обновить аватар" 
      isOpen={isOpen} 
      buttonText={CurrentAppContext.isLoading? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit(handleSubmitUpdateAvatarForm)}>
        <input 
          id="avatar-link-input" name="link" className="popup__input popup__input_type_link" 
          type="url" placeholder="Ссылка на картинку" {...linkRegister}/>
        <span className={`popup__error ${errors.link && 'popup__error_visible'}`}>{errors.link && errors.link.message}</span>
    </PopupWithForm>
  )
}