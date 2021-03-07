import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import SplashScreen from 'react-native-splash-screen';
import * as React from 'react';
import getExistingCustomers from "./cacheLoaders/getExistingCustomers";
import getUserData from "./cacheLoaders/getUserData";
import getMainInfoFromSqlite from "./cacheLoaders/getMainInfoFromSqlite";
import authState from './cacheLoaders/authState';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        //SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        //this will load existing customer details in redux store
        await getExistingCustomers()

        await getUserData()

        await getMainInfoFromSqlite()
        await authState()

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide()
      }
    }



    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
