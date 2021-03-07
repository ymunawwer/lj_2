import personalConstants from "../constants/personalConstants";

export const setIsLoggedIn = data => (
  {
    type: personalConstants.SET_IS_LOGGED_IN,
    payload: data,
  }
);

export const setUser = data => (
  {
    type: personalConstants.SET_USER,
    payload: data,
  }
);

export const setFirstUseData = data => (
  {
    type: personalConstants.SET_FIRST_USE_DATA,
    payload: data,
  }
);

export const setCurrentBookId = data => (
  {
    type: personalConstants.SET_CURRENT_BOOK_ID,
    payload: data,
  }
);

export const setCurrentLanguage = data => (
  {
    type: personalConstants.SET_CURRENT_LANGUAGE,
    payload: data,
  }
);

export const setCurrentBookData = data => (
  {
    type: personalConstants.SET_CURRENT_BOOK_DATA,
    payload: data,
  }
);

export const setCurrentCurrency = data => (
  {
    type: personalConstants.SET_CURRENT_CURRENCY,
    payload: data,
  }
);

export const resetPersonals = data => (
  {
    type: personalConstants.RESET_PERSONALS_STATE,
    payload: data,
  }
);
