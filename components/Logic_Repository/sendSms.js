import * as SMS from "expo-sms";
import {Alert} from "react-native";

const sendSms = async (addresses, message) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
        // do your SMS stuff here
        const { result } = await SMS.sendSMSAsync(addresses, message);
        return result
    } else {
        // misfortune... there's no SMS available on this device
        Alert.alert('Sorry, SMS service not available')
    }
}

export default sendSms
