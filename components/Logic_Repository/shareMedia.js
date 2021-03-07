import * as Sharing from "expo-sharing";

const shareMedia = async (uri, mimeType, dialogTitle, UTI) => {
    try {
        const res = await Sharing.isAvailableAsync()

        if(res === true) {
            const shareOptions = {
                mimeType: mimeType,
                dialogTitle: dialogTitle,
                UTI: UTI
            }
            await Sharing.shareAsync(uri, shareOptions)
        }
        else {
            alert('Sorry, sharing is not available on your device.')
        }
    }
    catch (e) {
        new Promise.reject(e)
    }
}

export default shareMedia
