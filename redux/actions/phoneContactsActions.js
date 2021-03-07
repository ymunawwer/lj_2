import phoneContactsConstants from "../constants/phoneConatctsContants";

export const setContacts = data => (
  {
    type: phoneContactsConstants.SET_CONTACTS,
    payload: data,
  }
);

export const setIndexingArray = data => (
  {
    type: phoneContactsConstants.SET_INDEXING_ARRAY,
    payload: data,
  }
);

export const setIsReady = data => (
  {
    type: phoneContactsConstants.SET_IS_READY,
    payload: data,
  }
);

export const resetContacts = () => (
  {
    type: phoneContactsConstants.RESET_PHONE_CONTACTS_STATE,
  }
);
