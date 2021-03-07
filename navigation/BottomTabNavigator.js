import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import Loan from '../screens/Loan';
import More from "../screens/More";
import Header from './shared/header';
import * as lang from "../translations/lang.json"
import {Image} from 'react-native';
import globalStore from "../redux/globalStore";
import Colors from "../constants/Colors";

const BottomTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'HomeContainer';
let lan = globalStore.getState().personals.currentLan

export default function BottomTabNavigator({navigation, route}) {

    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({headerTitle: getHeaderTitle(route, navigation)});

    return (
        <BottomTab.Navigator
          initialRouteName={INITIAL_ROUTE_NAME}
          barStyle={{ backgroundColor: '#ffffff', elevation:  10}}
          activeColor={Colors.primary}
        >
            <BottomTab.Screen
                name="HomeContainer"
                component={HomeScreen}
                options={{
                  //    title:"home",

                    tabBarIcon: ({focused}) =>  (
            focused
            ? <Image style={{width: 18, height: 18}} source={require('../assets/icons/home.png')}/>
            : <Image style={{width: 18, height: 18}} source={require('../assets/icons/homegrey.png')}/>
         ),
                    tabBarLabel: lang[lan]['home']
                }}
            />

            <BottomTab.Screen
                name="Loan"
                component={Loan}
                options={{
                    // title: 'Loan',

                    tabBarIcon: ({focused}) =>  (
            focused
            ? <Image style={{width: 18, height: 18}} source={require('../assets/icons/loan.png')}/>
            : <Image style={{width: 18, height: 18}} source={require('../assets/icons/loangrey.png')}/>
         ),
                    tabBarLabel: lang[lan]['loan']
                }}
            />

            <BottomTab.Screen
                name="More"
                component={More}
                options={{
                    // title: 'More',

                    tabBarIcon: ({focused}) =>  (
            focused
            ? <Image style={{width: 18, height: 18}} source={require('../assets/icons/more.png')}/>
            : <Image style={{width: 18, height: 18}} source={require('../assets/icons/moregrey.png')}/>
         ),

                    tabBarLabel: lang[lan]['more']
                }}
            />

        </BottomTab.Navigator>

    );
}

function getHeaderTitle(route, navigation) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return () => <Header navigation={navigation}/>;
        case 'Loan':
            return () => <Header navigation={navigation}/>;
        case 'More':
            return () => <Header navigation={navigation}/>;
    }
}
