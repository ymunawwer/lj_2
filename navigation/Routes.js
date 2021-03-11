import React from "react";
import CollectionScreen from "../screens/CollectionScreen";
import OneCustomerScreen from "../screens/OneCustomerScreen";
import OneCustomerScreenLoan from "../screens/OneCustomerScreenLoan";
import YouGaveScreenLoan from "../screens/YouGaveScreenLoan";
import YouGotScreenLoan from "../screens/YouGotScreenLoan";
import YouGaveScreen from "../screens/YouGaveScreen";
import YouGotScreen from "../screens/YouGotScreen";
import QrCodeGen from "../screens/QrCodeGen";
import webQrScanScreen from "../screens/webQrScanScreen";
import ViewReportScreen from "../screens/ViewReportScreen";
import ViewReportScreenLoan from "../screens/ViewReportScreenLoan";
import ContactScreen from "../screens/ContactScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import BusinessCard from "../screens/BusinessCard";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import PDFViewer from "../screens/PDFViewer";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import EntryDetails from "../screens/EntryDetails";
import BusinessCardEdit from "../screens/BusinessCardEdit";
import AddNewCustomerScreen from "../screens/AddNewCustomerScreen";
import Login from "../screens/login";
import profitLoss from "../screens/profitLoss";
import MainScreen from "../screens/MainScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import * as lang from "../translations/lang.json";
import {createStackNavigator} from "@react-navigation/stack";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import bin from "../screens/bin";
import CashLedgerScreen from "../screens/CashLedgerScreen";
import DuePayableScreen from "../screens/DuePayableScreen";
import addLoanInput from "../screens/addLoanInputs";
import AddNewRecordsHomeTab2_3 from "../components/UI_components/Homescreen_essencials/AddNewRecordHomeScreenTab2&3";
import OneCustomerProfileScreen from "../screens/OneCustomerProfileScreen";
import {getTitleOfScreens} from "../screens/UiComponents/transactionComponents";

const Stack = createStackNavigator();

function Routes(props) {

  let lan = props.personals.currentLan

  function otherStacks() {
    return (
      <>
        <Stack.Screen name="CollectionScreen" component={CollectionScreen}
                      options={{title: 'My Collection'}}/>

        <Stack.Screen name="OneCustomerScreen" component={OneCustomerScreen}
                      options={{
                        headerShown: false,
                        headerRight: null,
                        headerLeft: null
                      }}/>

        <Stack.Screen name="OneCustomerScreenLoan" component={OneCustomerScreenLoan} options={{
          headerShown: false,
          headerRight: null,
          headerLeft: null
        }}/>


        <Stack.Screen name="YouGaveScreenLoan" component={YouGaveScreenLoan}
                      options={({route}) => ({
                        title: 'You Gave Loan: '+route.params.name,
                        headerStyle: {backgroundColor: '#f1f2f3'},
                        headerTintColor: 'red'
                      })
                    }/>


        <Stack.Screen name="YouGotScreenLoan" component={YouGotScreenLoan}
                      options={({route}) => ({
                        title: 'You Got Loan: '+route.params.name,
                        headerStyle: {backgroundColor: '#f1f2f3'},
                        headerTintColor: 'green'
                      })
                    }/>

        <Stack.Screen name="YouGaveScreen" component={YouGaveScreen}
                      options={({route}) => ({
                        title: getTitleOfScreens(route.params.transactionType),
                        headerStyle: {backgroundColor: '#f1f2f3'},
                        headerTintColor: 'red'
                      })
                      }/>

        <Stack.Screen name="YouGotScreen" component={YouGotScreen} options={({route}) => ({
          title: getTitleOfScreens(route.params.transactionType),
          headerStyle: {backgroundColor: '#f1f2f3'},
          headerTintColor: 'green'
        })
        }/>


        <Stack.Screen name="QrCodeGen" component={QrCodeGen} options={{title: 'Order QR code'}}/>

          <Stack.Screen name="OneCustomerProfileScreen" component={OneCustomerProfileScreen} options={{title: "Customer Profile"}}/>

        <Stack.Screen name="webQrScanScreen" component={webQrScanScreen} options={{title: 'Web Scan'}}/>

        <Stack.Screen name="ViewReportScreen" component={ViewReportScreen} options={{
          title: 'View Report',
          headerStyle: {backgroundColor: '#4e54c8'},
          headerTintColor: 'white'
        }}/>

        <Stack.Screen name="ViewReportScreenLoan" component={ViewReportScreenLoan} options={{
                  title: 'View Report Loan',
                  headerStyle: {backgroundColor: '#4e54c8'},
                  headerTintColor: 'white'
                }}/>

        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{
            title: 'Add Contact',
            headerStyle: {
              backgroundColor: '#4e54c8',
            },
            headerTintColor: '#fff',
          }}
        />


        <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen}
                      options={{title: 'Edit Profile'}}/>





<Stack.Screen name="profitLoss" component={profitLoss}
                      options={{title: 'ProfitLoss'}}/>

{/* <Stack.Screen name="addLoanInput" component={addLoanInput}
                      options={({navigation}) => ({{title: 'Add New Loan'}})/> */}

                      <Stack.Screen name="addLoanInputs" component={addLoanInput} options={({navigation}) => ({
                        title: 'Add New Loan'
                       } )} />

        <Stack.Screen name="CashLedgerScreen" component={CashLedgerScreen}
                      options={{title: 'CashLedger'}}/>

        <Stack.Screen name="DuePayableScreen" component={DuePayableScreen}
                      options={{title: 'Due & Payable'}}/>

        <Stack.Screen name="BusinessCard" component={BusinessCard} options={({navigation}) => ({
          title: 'Business Cards',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#4e54c8'},
          headerRight: () => <TouchableOpacity
            onPress={() => navigation.navigate('BusinessCardEdit')}><View><Entypo name="edit"
                                                                                  size={25}
                                                                                  color="white"
                                                                                  style={{marginRight: 20}}/></View></TouchableOpacity>
        })}/>

        <Stack.Screen name="AddNewRecordsHomeTab2_3" component={AddNewRecordsHomeTab2_3} options={({screenTitle}) => ({
          title: null
        })}/>

        <Stack.Screen name="PDFViewer" component={PDFViewer}/>

        <Stack.Screen name="PaymentHistoryScreen" component={PaymentHistoryScreen} options={{
          title: 'Payment History',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#4e54c8'},
          headerRight: () => <TouchableOpacity style={{flexDirection: "row"}}><Entypo name="home"
                                                                                      size={25}
                                                                                      color="white"/></TouchableOpacity>
        }}/>

        <Stack.Screen name="EntryDetails" component={EntryDetails} options={{title: 'Entry Details'}}/>


        <Stack.Screen name="BusinessCardEdit" component={BusinessCardEdit}
                      options={{title: 'Business Card Details'}}/>

        <Stack.Screen name="AddNewCustomerScreen" component={AddNewCustomerScreen}
                      options={{title: 'Add New Customer'}}/>

        <Stack.Screen name="Bin" component={bin} />

      </>
    )
  }

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#4e54c8'
      },
      headerTintColor: '#fff'
    }}>


      {
        props.personals.firstUseData['firstuse'] === 1 ?
            <Stack.Screen name="MainScreen" component={MainScreen}
                          options={{
                            headerShown: false,
                            headerRight: null,
                            headerLeft: null
                          }}

            />

          :

            <>
              {
               props.personals.isLoggedIn === false
                 ?
                  <Stack.Screen name="Login" component={Login} options={{title: 'Log In'}}/>

                :
                 (
                  renderAllActiveBooksRoutes()
                )
              }
            </>

      }

    </Stack.Navigator>
  );

  function renderAllActiveBooksRoutes() {
    console.log('Route test logging')
    console.log(props.booksData)
    if(props.booksData.allActiveBooks.length > 0) {
      return (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
              headerRight: null,
              headerLeft: null
            }}
          />

          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}
                        options={{
                          title: <Text
                            style={{color: '#4e54c8'}}>{lang[lan]['lekha jhoka']}</Text>,
                          headerLeft: () => <Image
                            style={{width: 50, height: 50}}
                            source={require('../assets/images/logo.jpg')}/>

                        }}/>

          {otherStacks()}

        </>
      );
    }
    else {
      return (
        <>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}
                        options={{
                          title: <Text
                            style={{color: '#4e54c8'}}>{lang[lan]['lekha jhoka']}</Text>,
                          headerLeft: () => <Image
                            style={{width: 50, height: 50}}
                            source={require('../assets/images/logo.jpg')}/>

                        }}/>

          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
              headerRight: null,
              headerLeft: null
            }}
          />

          {otherStacks()}
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { personals, booksData } = state
  return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
   //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
