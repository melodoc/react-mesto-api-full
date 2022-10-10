import { useState } from 'react';
import { buttonType } from '../constants';
import { PopupWithForm } from './PopupWithForm';

export const AddPlacePopup = ({
  isOpen,
  onClose,
  onAddPlaceSubmit
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const clearInputs = () => {
    setTitle('');
    setUrl('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlaceSubmit({
      name: title,
      link: url,
      clearInputs
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      buttonName={buttonType.SAVE}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="title"
          value={title}
          onChange={handleChangeTitle}
          name="title"
          type="text"
          required=""
          className="popup__input popup__input_type_title"
          placeholder="Название"
          autoComplete="off"
          minLength={2}
          maxLength={30}
        />
        <span className="title-error" />
      </label>
      <label className="popup__field">
        <input
          id="url"
          value={url}
          onChange={handleChangeUrl}
          name="url"
          type="url"
          required=""
          className="popup__input popup__input_type_url"
          placeholder="Ссылка на картинку"
          autoComplete="off"
        />
        <span className="url-error" />
      </label>
    </PopupWithForm>
  );
};
