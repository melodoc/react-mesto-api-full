export const baseRequestParams = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '3c1fcffa-d896-45ce-aee1-75cf9173f520',
    'Content-Type': 'application/json'
  }
};

export const authRequestParams = {
  ...baseRequestParams,
  baseUrl: 'https://auth.nomoreparties.co'
};
