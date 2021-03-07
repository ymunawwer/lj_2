import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const fetchTemplate = async (requireStatement) => {
    try{
        const asset = Asset.fromModule(requireStatement)

        if(!asset.localUri) {
            await asset.downloadAsync()
            const str = await FileSystem.readAsStringAsync(asset.localUri)
            return str
        }
        else {
            const str = await FileSystem.readAsStringAsync(asset.localUri)
            return str
        }
    }
    catch (e) {
       await Promise.reject(e)
    }

}

export default fetchTemplate
