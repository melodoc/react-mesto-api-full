export function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonName,
  onSubmit
}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} id={name}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__button popup__button_action_close"
          type="button"
          title="Закрыть"
        />
        <form
          className="popup__form"
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <div
            className={`popup__wrapper popup__wrapper_type_${name}`}
          >
            <h3 className="popup__heading">{title}</h3>
            {children}
            <button
              value={buttonName}
              className="popup__button popup__button_action_submit"
              type="submit"
              title={buttonName}
            >
              {buttonName}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
