import personalConstants from "../constants/personalConstants";

const INITIAL_STATE = {
  isLoggedIn: false,
  user:{},
  firstUseData: {},
  currentLan:"english",
  currentCurrency:"INR",
  currentBookId:0,
  currentBookData:{},
}

const personalsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case personalConstants.SET_IS_LOGGED_IN:
      return {...state, isLoggedIn: action.payload}

    case personalConstants.SET_USER:
      return {...state, user: action.payload}

    case personalConstants.SET_FIRST_USE_DATA:
      return {...state, firstUseData: action.payload}

    case personalConstants.SET_CURRENT_LANGUAGE:
      return {...state, currentLan: action.payload}

    case personalConstants.SET_CURRENT_CURRENCY:
      return {...state, currentCurrency: action.payload}

    case personalConstants.SET_CURRENT_BOOK_ID:
      return {...state, currentBookId: action.payload}

    case personalConstants.SET_CURRENT_BOOK_DATA:
      return {...state, currentBookData: action.payload}

    case personalConstants.RESET_PERSONALS_STATE:
      return INITIAL_STATE

    default:
      return state
  }
}

export default personalsReducer
