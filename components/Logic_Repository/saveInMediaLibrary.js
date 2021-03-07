import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

const saveCardInMediaLibrary = async (privateUri, copyAsset) => {
    try {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(privateUri)
            await MediaLibrary.createAlbumAsync("Business Cards", asset, copyAsset)
            return asset.uri
        }
        else {
            alert('Storage Permission not granted')
            new Promise.reject('Storage Permission not granted')
        }
    }
    catch (e) {
        new Promise.reject(e)
    }
}

export default saveCardInMediaLibrary
