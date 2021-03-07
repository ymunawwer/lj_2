import phoneContactsConstants from "../constants/phoneConatctsContants";

const INITIAL_STATE = {
  contacts: [],
  indexingArray: [],
  isReady: false
}

const phoneContactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case phoneContactsConstants.SET_CONTACTS:
      return {...state, contacts: action.payload}

    case phoneContactsConstants.SET_INDEXING_ARRAY:
      return {...state, indexingArray: action.payload}

    case phoneContactsConstants.SET_IS_READY:
      return {...state, isReady: action.payload}

    case phoneContactsConstants.RESET_PHONE_CONTACTS_STATE:
      return INITIAL_STATE

    default:
      return state
  }
}

export default phoneContactsReducer
