import {Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles/globalStyle';
import Header from '../navigation/shared/header';
import dbObject from '../components/database/db'
import ViewReportScreen from './ViewReportScreen';
import * as lang from "../translations/lang.json"
import homeScreenSearch from "../components/Logic_Repository/searchLibrary/homeScreenSearch";
import RBSheet from "react-native-raw-bottom-sheet";
import RadioButtonRN from 'radio-buttons-react-native';
import filterAlgo from "../components/Logic_Repository/filterAlgo";
import sortAlgo from "../components/Logic_Repository/sortAlgo";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {FabBtn, RoundedBtn} from "../components/UI_components/Buttons";
import HomeTable from "../components/UI_components/Homescreen_essencials/HomeTable";
import storeObject from "../store/store";
import {ActivityIndicator, Button, Caption, Searchbar, Subheading} from 'react-native-paper';
import Colors from "../constants/Colors";
import HomeTab1CustomersComponent from "../components/UI_components/Homescreen_essencials/HomeTab1CustomersComponent";
import DuePayableScreen from "./DuePayableScreen";
import HomeTab2DuePayableComponent from "../components/UI_components/Homescreen_essencials/HomeTab2DuePayableComponent";
import HomeTab3GaveGotComponent from "../components/UI_components/Homescreen_essencials/HomeTab3GaveGotComponent";
// import ImagePicker from 'react-native-image-picker';

// const options = {
//   title: 'Select Avatar',
//   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

const Tab = createMaterialTopTabNavigator();

function HomeScreen(props) {
  const {navigation} = props

    return (

      <SafeAreaView style={[styles.wrapper, {paddingTop: 0, backgroundColor: "#FFFFFF"}]}>
        <Header navigation={navigation}/>

        <Tab.Navigator
          initialRouteName={"Dashboard"}
          tabBarOptions={{
            labelStyle: { fontSize: 12, color: "#fff", fontWeight: "bold"},
            style: { backgroundColor: Colors.primary },
            indicatorStyle: { backgroundColor: Colors.secondary }
          }}
        >
          <Tab.Screen name="Dashboard" component={HomeTab1CustomersComponent} />
          <Tab.Screen name="Recble / Payble" component={HomeTab2DuePayableComponent} />
          <Tab.Screen name="Gave / Got" component={HomeTab3GaveGotComponent} />
        </Tab.Navigator>
      </SafeAreaView>
      )

}




const mapStateToProps = (state) => {
  const {personals, booksData} = state
  return {personals, booksData}
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
