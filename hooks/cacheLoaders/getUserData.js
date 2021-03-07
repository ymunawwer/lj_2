import dbObject from "../../components/database/db";
import storeObject from "../../store/store";
import globalStore from "../../redux/globalStore";
import {setCurrentCurrency, setCurrentLanguage, setUser} from "../../redux/actions/personalsActions";

const getUserData = async () => {

    const data = await dbObject.getUserData()
    storeObject.setUser(data)
    storeObject.setCurrentLan(data.language)  //current language
    storeObject.setCurrentCurrency(data.currency)  //current currency using

    //update redux store state
    globalStore.dispatch(setUser(data))
    globalStore.dispatch(setCurrentLanguage(data.language))
    globalStore.dispatch(setCurrentCurrency(data.currency))

}

export default getUserData
