import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Alert, Button} from 'react-native';
import apiRequest from "../components/Logic_Repository/apiRequest";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function webQrScanScreen() {

     const [hasPermission, setHasPermission] = useState(null);
      const [scanned, setScanned] = useState(false);
      const [sessionId, setSessionId] = useState(null)

      useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    async function handleScan() {
        //set session_id doc using api
        try {
            if(sessionId != null) {
                const response = await apiRequest('post', 'updateSessionDoc', {sessionId:sessionId}, 'json', true)
                return response.data
            }
            else {
                Alert.alert('session id is empty')
            }
        }
        catch (e) {
            console.log(e)
            new Promise.reject(e)
        }
    }

      const handleBarCodeScanned = async ({ type, data }) => {

        try {
            await setScanned(true);
            await setSessionId(data)
            const response = await handleScan()

            if(response.data['isError']) {
                console.log("success " + response)
                Alert.alert('Web login successful')
            }
            else {
                console.log(response + ' unsuccesful')
                Alert.alert("Web login unsuccessful due to some unavoidable circumstances")
            }
        }
        catch (e) {
            Alert.alert('Sorry! something went wrong')
        }

      };

      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
      );
}

