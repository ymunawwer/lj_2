import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View, Text, ScrollView} from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import globalStore from "./redux/globalStore";
import { Provider } from "react-redux"
import Routes from "./navigation/Routes";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from "./constants/Colors";

export default function App(props) {

    const isLoadingComplete = useCachedResources();

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: Colors.primary,
        },
    };

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <View style={stylesI.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="dark-content"/>}

                <Provider store={globalStore}>
                    <NavigationContainer linking={LinkingConfiguration}>
                        <PaperProvider theme={theme}>
                            <View style={{flex: 1}}>
                                <Routes />
                            </View>
                        </PaperProvider>
                    </NavigationContainer>
                </Provider>

            </View>
        );
    }
}

const stylesI = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardGroup: {
        padding: 20,
        justifyContent: 'center',
    }
});

