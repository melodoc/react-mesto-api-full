export const buttonType = {
  LOADING: 'LOADING',
  UPLOADED: 'UPLOADED'
};

export const messageType = {
  SAVE: 'SAVE',
  DELETE: 'DELETE'
};

export const renderLoading = (button, type, message) => {
  const buttonText =
    message === messageType.DELETE
      ? {
          loading: 'Удаление...',
          uploaded: 'Да'
        }
      : {
          loading: 'Сохранение...',
          uploaded: 'Сохранить'
        };

  if (type === buttonType.LOADING) {
    button.textContent = buttonText.loading;
  } else {
    button.textContent = buttonText.uploaded;
  }
};
