import auth from '@react-native-firebase/auth';
import storeObject from "../../store/store";
import globalStore from "../../redux/globalStore";
import {setIsLoggedIn} from "../../redux/actions/personalsActions";

const authState = async () => {
    try{

        const user = auth().currentUser
        if(user != null) {
            storeObject.setIsLoggedIn(true)
            globalStore.dispatch(setIsLoggedIn(true))
        }
        else {
            storeObject.setIsLoggedIn(false)

            //TODO: BUILD:: make this false while building
            globalStore.dispatch(setIsLoggedIn(false))
        }


        // storeObject.setIsLoggedIn(true)
        // globalStore.dispatch(setIsLoggedIn(true))
    }
    catch(e) {
        new Promise.reject(e)
    }

}

export default authState
