import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert, TextInput} from 'react-native';
//import {NativeModules} from "react-native";
import {styles} from "../styles/globalStyle";
import * as Contacts from 'expo-contacts';
import dbObject from '../components/database/db'
import storeObject from "../store/store";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {SearchBar, RoundedInput} from "../components/UI_components/Inputs";
import {RoundedBtn} from "../components/UI_components/Buttons";
import {OrDivider} from "../components/UI_components/microComponents";
import debounce from "lodash/debounce";
import {setExistingCustomers} from "../redux/actions/booksDataActions";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as lang from "../translations/lang.json";
import {Searchbar, Caption, ActivityIndicator} from "react-native-paper";
import {backupNewCustomer} from "../components/Logic_Repository/backupLogics";
import getContactsAsync from "../components/Logic_Repository/getContactsAsync";

function ContactScreen(props) {
  //const ContactSearch = NativeModules.ContactSearch
  const {navigation, isCustom = false} = props

  let lan = props.personals.currentLan
  const sortType = Contacts.SortTypes.FirstName;

  const [mContacts, setContacts] = useState(null)
  const [errorCheckComplete, setErrorCheckComplete] = useState(false);
  const [contactFetchStatus, setContactFetchStatus] = useState(false)
  const [filteredContacts, setFilteredContacts] = useState([])
  const [permStatus, setPermStatus] = useState(false)
  const [originalContacts, setOriginalContacts] = useState(null)
  const [countFilteredItems, setCountFilteredItems] = useState(-1)
  const [manualCustomerName, setManualCustomerName] = useState("")

  //const searchDebounced = useDebounce((text) => searchContacts(text), 250)

  async function searchContacts(filteringText) {
    // passing the inserted text in textInput
    console.log("search filter function ")
    try {
      if(filteringText === "" || filteringText == null) {
        setFilteredContacts(originalContacts)
      }
      else {
        //ContactSearch.search(originalContacts, filteringText, successCallback, errCallback)

      }
    } catch (e) {
      console.log(e)
    }

  }

  function successCallback(filter) {
    setFilteredContacts(filter)
  }

  function errCallback(e) {
    console.log(e)
  }

  async function requestContactsPermission() {

    try {


      const {status} = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        setPermStatus(true)
        const {data} = await Contacts.getContactsAsync({
        fields: [
          Contacts.PHONE_NUMBERS
        ],
  
      });

        if (data.length > 0) {

          setContacts(data)
          setContactFetchStatus(true)
          errorcheck(data)
        }
      }
      else {
        setPermStatus(false)
      }

    }
    catch(e) {
          console.log(e)
    }

  }

  useEffect(() => {
    (async () => {
      await requestContactsPermission()
    })();

  }, []);

  function errorcheck(contacts) {
    console.log("error check")

    try {
      let filteredCont = filteredContacts
      contacts.map((contact) => {


        if("phoneNumbers" in contact && contact.phoneNumbers[0]) {
          filteredCont.push(contact)

        }
      })
      setFilteredContacts(filteredCont)
      setOriginalContacts(filteredCont)
      setErrorCheckComplete(true);
    }
    catch(e) {
      console.log(e)
    }


  }


  return (
    <View style={{backgroundColor: "#ffffff", flex: 1}}>

      {
        permStatus?
          <>
            <Caption style={{marginLeft: 10}}>
              Add a Customer from Contacts :
            </Caption>

            <Searchbar
              style={{margin:5, borderRadius: 30}}
              placeholder={lang[lan]['search']}
              onChangeText={text => searchContacts(text)}
            />
            {/* Search End */}


            {/* One Contact */}

            {
              errorCheckComplete ?

                <FlatList
                  style={{flex: 1}}
                  data={filteredContacts}
                  renderItem={({item}) => (

                    <TouchableOpacity
                      onPress={() => {
                        (async() => {
                          if(isCustom) {
                            props?.onPressEachContact(item.name, item.phoneNumbers[0].number)
                          }
                          else {
                            await gotoOneCustomerScreen(navigation, item.phoneNumbers[0].number, item.name)
                          }

                        })();

                      }}>
                      <View style={[styles.row]}>
                        <View style={styles.initialsCont}>
                          <Text style={styles.initialText}>{item.name[0]}</Text>
                          <Image style={stylesI.memI} source={require('../assets/images/logo.jpg')}/>
                        </View>
                        <View style={styles.cNameTimeCont}>
                          <Text style={styles.cName}>{item.name}</Text>

                          <Text style={[styles.greyTextSm, {
                            margin: 0,
                            paddingHorizontal: 0
                          }]}>{item.phoneNumbers[0].number}</Text>

                        </View>
                      </View>

                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}

                /> :

                  <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                    <ActivityIndicator animating={true} color={Colors.warningText}/>
                    <Caption>Fetching Your Contacts. Please Wait...</Caption>
                  </View>

            }
          </>
          :
          <>
            <RoundedBtn
              style={{marginTop: 25, marginHorizontal: 10}}
              containerStyle={{paddingHorizontal: 15}}
              text={"Add a Customer from Contacts"}
              onPress={() => requestContactsPermission()}
            />
          </>
      }

      <OrDivider />

      <View style={{marginBottom: 10}}>

          <RoundedBtn
            style={{ marginHorizontal: 10}}
            containerStyle={{borderRadius: 30}}
            text={"ADD CUSTOMER MANUALLY"}
            onPress={() => {
              if(isCustom) {
                props?.onPressManualAddBtn(manualCustomerName)
              }
              else {
                navigation.navigate('AddNewCustomerScreen', { customerName: manualCustomerName })
              }
            }}
          />
        </View>

    </View>
  )

  // function to search contacts according to search text

  async function gotoOneCustomerScreen(navigation, phone, name) {

    try {
      let loan = 0


      if (storeObject.getOpenLoan() === 0) {
        navigation.navigate('OneCustomerScreen', {
          phoneNumber: phone,
          name: name
        })

      } else {
        navigation.navigate('OneCustomerScreenLoan', {
          phoneNumber: phone,
          name: name
        })

        loan = 1
      }

      const bookid = props.personals.currentBookId
      
      const res = await dbObject.checkAndInsertContact(phone, bookid, name, loan)


      if (res === 1) {
        const updatedContacts = await dbObject.getExistingContacts(bookid)
        props.setExistingCustomers(updatedContacts)
        const recent = updatedContacts[0]

        //TODO: uncomment while building the app
        /**const backupRes = await backupNewCustomer(recent.recordid, bookid, props.booksData.currentBookData.remoteid, phone.toString(), name, recent.lastupdated, loan, recent.address, recent.rAmount, recent.pAmount, recent.netAmount)
        if(backupRes.statusCode === 200) {
          const customerRemoteId = backupRes.customersRemoteId
          await dbObject.setRemoteIdContactWithRecord(recent.recordid, customerRemoteId)
        }**/

      } else {
        console.log('error occurred')
      }
    } catch (e) {
      console.log('exception catched' + e)
    }

  }

}

const stylesI = StyleSheet.create({
  memI: {
    width: 15,
    height: 15,
    borderRadius: 50 / 2,
    position: "absolute",
    bottom: "3%",
    right: "3%",
    borderWidth: .5
  },

  headings: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 15
  }

});

const mapStateToProps = (state) => {
  const {personals, booksData, contactSearch} = state
  return {personals, booksData, contactSearch}
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
    setExistingCustomers
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen)
