import dbObject from "../../components/database/db";
import storeObject from "../../store/store";
import globalStore from "../../redux/globalStore";
import {setCurrentBookData, setCurrentBookId, setFirstUseData} from "../../redux/actions/personalsActions";
import {setAllActiveBooks} from "../../redux/actions/booksDataActions";

const getMainInfoFromSqlite = async () => {

    const data = await dbObject.isFirstUse()
    storeObject.setFirstUseData(data['rows']['_array'][0])
    globalStore.dispatch(setFirstUseData(data['rows']['_array'][0]))  //update redux state

    const activeBooks = await dbObject.getAllActiveBooks()
    storeObject.setAllActiveBooks(activeBooks['_array'])
    globalStore.dispatch(setAllActiveBooks(activeBooks['_array']))

    const currentBookId = await dbObject.getCurrentBook()
    const currentBook = await dbObject.getBook(currentBookId)
    storeObject.setCurrentBook(currentBookId)
    storeObject.setCurrentBookData(currentBook)

    globalStore.dispatch(setCurrentBookId(currentBookId))  //update redux state
    globalStore.dispatch(setCurrentBookData(currentBook))  //update redux state


}

export default getMainInfoFromSqlite
