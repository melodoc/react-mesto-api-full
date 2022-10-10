export function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_zoom_image ${card && 'popup_opened'}`}
      id="zoom-img"
    >
      <div className="popup__container popup__container_zoom_image">
        <button
          onClick={onClose}
          className="popup__button popup__button_action_close popup__button_action_zoom-out"
          type="button"
          title="Закрыть"
        />
        <div>
          <img
            className="popup__image"
            src={card?.link}
            alt={card?.name}
          />
          <p className="popup__description">{card?.name}</p>
        </div>
      </div>
    </div>
  );
}
