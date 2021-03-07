import { combineReducers } from "redux";
import personalsReducer from "./personalsReducer";
import booksDataReducer from "./booksDataReducer";
import phoneContactsReducer from "./phoneContactsReducer";

export default combineReducers({
  //all reducers go here
  personals: personalsReducer,
  booksData: booksDataReducer,
  phoneContacts: phoneContactsReducer
})
