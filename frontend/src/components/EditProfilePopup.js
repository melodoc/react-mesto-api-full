import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { buttonType } from '../constants';
import { PopupWithForm } from './PopupWithForm';

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleOnClose = () => {
    onClose();
    setName(currentUser.name);
    setDescription(currentUser.about);
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={handleOnClose}
      buttonName={buttonType.SAVE}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="name"
          value={name}
          onChange={handleChangeName}
          name="name"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          autoComplete="off"
          required=""
          minLength={2}
          maxLength={40}
        />
        <span className="name-error" />
      </label>
      <label className="popup__field">
        <input
          id="about"
          value={description}
          onChange={handleChangeDescription}
          name="about"
          className="popup__input popup__input_type_about"
          placeholder="О себе"
          autoComplete="off"
          required=""
          minLength={2}
          maxLength={200}
        />
        <span className="about-error" />
      </label>
    </PopupWithForm>
  );
}
