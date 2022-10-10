import { useRef } from 'react';
import { buttonType } from '../constants';
import { PopupWithForm } from './PopupWithForm';

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef(null);

  const clearAvatar = () => {
    avatar.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
      clearAvatar
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonName={buttonType.SAVE}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="avatar"
          name="avatar"
          type="url"
          required=""
          className="popup__input popup__input_type_title"
          placeholder="Ссылка"
          autoComplete="off"
          minLength={2}
          ref={avatar}
        />
        <span className="avatar-error" />
      </label>
    </PopupWithForm>
  );
}
