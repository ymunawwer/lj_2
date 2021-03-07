import booksDataConstants from "../constants/booksDataConstants";

export const setAllActiveBooks = data => (
  {
    type: booksDataConstants.SET_ALL_ACTIVE_BOOKS,
    payload: data,
  }
);

export const setExistingCustomers = data => (
  {
    type: booksDataConstants.SET_EXISTING_CUSTOMERS,
    payload: data,
  }
);

export const resetBooksData = data => (
  {
    type: booksDataConstants.RESET_BOOKS_DATA_STATE,
    payload: data,
  }
);
