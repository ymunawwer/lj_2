import booksDataConstants from "../constants/booksDataConstants";

const INITIAL_STATE = {
  allActiveBooks:[],
  existingCustomers:{},
}

const booksDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case booksDataConstants.SET_ALL_ACTIVE_BOOKS:
      return {...state, allActiveBooks: action.payload}

    case booksDataConstants.SET_EXISTING_CUSTOMERS:
      return {...state, existingCustomers: action.payload}

    case booksDataConstants.RESET_BOOKS_DATA_STATE:
      return INITIAL_STATE

    default:
      return state
  }
}

export default booksDataReducer
