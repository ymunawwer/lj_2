import * as Contacts from "expo-contacts";

const getContactsAsync = async (contactsQuery) => {
  try {
    return await Contacts.getContactsAsync(contactsQuery);
  }
  catch (e) {
    new Promise.reject(e)
  }
}

export default getContactsAsync
