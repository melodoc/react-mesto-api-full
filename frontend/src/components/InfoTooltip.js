export function InfoTooltip({ isOpened, onClose, isSuccess }) {
  const statusClass = `popup__status ${
    isSuccess
      ? 'popup__status_state_success'
      : 'popup__status_state_failed'
  }`;

  return (
    <div
      className={`popup popup_zoom_image ${
        isOpened && 'popup_opened'
      }`}
      id="info-tooltip"
    >
      <div className="popup__container popup__container_zoom_image">
        <button
          onClick={onClose}
          className="popup__button popup__button_action_close popup__button_action_zoom-out"
          type="button"
          title="Закрыть"
        />
        <div className="popup__card">
          <div className="popup__card-container">
            <div className={statusClass}></div>
            <p className="popup__label">
              {isSuccess
                ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
