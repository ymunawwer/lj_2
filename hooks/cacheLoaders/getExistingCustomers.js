import dbObject from "../../components/database/db";
import storeObject from "../../store/store";
import globalStore from "../../redux/globalStore";
import {setExistingCustomers} from "../../redux/actions/booksDataActions";

const getExistingCustomers = async () => {
    console.log("getExistingCustomers: started...")
    const currentTable = await dbObject.getCurrentBook();
    const data = await dbObject.getExistingContacts(currentTable)
    storeObject.setExistingCustomers(data)
    globalStore.dispatch(setExistingCustomers(data))


}

export default getExistingCustomers
