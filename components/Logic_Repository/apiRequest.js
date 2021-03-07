import axios from "axios";
import auth from '@react-native-firebase/auth';


const apiRequest = async (method, api, data, contentType, isAuth) => {
    let apiConfig
    if(isAuth) {
        const user = auth().currentUser
        const token = await user.getIdToken()
        const url = 'postAuthApi/' + api
        apiConfig = {
            method: method,
            url: 'https://us-central1-lekha-jhoka-59408.cloudfunctions.net/companyApis/' + url,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'authorization':'Bearer '+token
            },
            data: data
        }
    }
    else {
        const url = 'authApi/' + api
        apiConfig = {
            method: method,
            url: 'https://us-central1-lekha-jhoka-59408.cloudfunctions.net/companyApis/' + url,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
            },
            data: data
        }
    }

    return axios(apiConfig);
}

export default apiRequest
