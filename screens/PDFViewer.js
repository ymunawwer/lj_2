import React, {useState, useRef} from 'react';
import PDFReader from 'rn-pdf-reader-js'

export default function PDFViewer({route}) {
    const {uri} = route.params
    return (
        <PDFReader
            source={{
                uri: uri,
            }}
        />

        );

}
