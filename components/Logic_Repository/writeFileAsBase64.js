import * as FileSystem from "expo-file-system";

export default function writeFileAsBase64(content, localUrl) {
    return new Promise((resolve, reject) => {
        try {
            FileSystem.writeAsStringAsync(localUrl, content, {encoding:FileSystem.EncodingType.Base64})
                .then(function () {
                    resolve(localUrl)
                })
        }
        catch (e) {
            reject(e)
        }
    })
}
