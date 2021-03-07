import * as FileSystem from "expo-file-system";

export default function DownloadFile(downloadUrl, localUrl) {
    return new Promise((resolve, reject) => {
        try {
            FileSystem.downloadAsync(downloadUrl, localUrl)
                .then(function (downloadResult) {
                    resolve(downloadResult.uri)
                })
        }
        catch (e) {
            reject(e)
        }
    })
}
