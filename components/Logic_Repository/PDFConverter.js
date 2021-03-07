import React from 'react';
import * as Print from 'expo-print';

export default function PDFConverter(html) {
    return new Promise((resolve, reject) => {
        try {
            const convertOptions = {
                html: html,
                height:842,
                width:595,
                base64:true
            }
            Print.printToFileAsync(convertOptions)
                .then(function(FileObject) {

                    //FileObject is a object which has
                    // uri (string)
                    //numberOfPages (number)
                    //base64 (string)
                    resolve(FileObject)
                })
                .catch(function (e) {
                    reject(e)
                })
        }
        catch (error) {
            reject(error);
        }
    })

}
