import React, {useEffect, useRef, useState} from 'react';
import dbObject from "../../database/db";
import {SafeAreaView} from "react-native";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import HomeTabsCommonComponents from "./HomeTabsCommonComponent";
import storeObject from "../../../store/store";
import Moment from 'moment';
function HomeTab1CustomersComponent(props) {
  const {navigation} = props

  let lan = props.personals.currentLan

  // ImagePicker.showImagePicker(options, (response) => {
  //   console.log('Response = ', response);

  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //   } else if (response.customButton) {
  //     console.log('User tapped custom button: ', response.customButton);
  //   } else {
  //     const source = { uri: response.uri };

  //     // You can also display the image using data:
  //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };

  //     Alert.alert(source)
  //   }
  // });
  const navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null
  };


  const [mContacts, setContacts] = useState([])
  const [mGiveSum, setGiveSum] = useState(null)
  const [mTakeSum, setTakeSum] = useState(null)
  const [sumArr, setSumArr] = useState([])

  

  const [isModalVisible, setModalVisibility] = useState(false)

  useEffect(() => {


    /**
     *  Object {
            "address": null,
            "bookid": 1,
            "contact": "+916358963586",
            "lastupdated": "Sun Aug 09 2020 14:10:45 GMT+0530 (IST)",
            "loanYes": 0,
            "name": "Fg",
            "netAmount": null,
            "pAmount": null,
            "rAmount": null,
            "recordid": 2,
            "remoteid": null,
          },

     * */

    (async () => {

       dbObject.getSumOfAllRed(props.personals.currentBookId).then(function (res) {
          setGiveSum(res)
        })
          .catch(function (e) {
            // console.log('homeScreen:: line 89' + e)
          })
        dbObject.getSumOfAllGreen(props.personals.currentBookId).then(function (res) {
          setTakeSum(res)
        })
          .catch(function (e) {
            // console.log('homeScreen:: line 95' + e)
          })

      dbObject.getExistingContacts(props.personals.currentBookId).then(function(res){
        // console.log("currentBookId ", props.personals.currentBookId)
        // console.log("All", res)
        setContacts(res)

      })

      //console.log("Contacts ", props.booksData.existingCustomers)


      if (props.booksData.existingCustomers) {
        const contactList = props.booksData.existingCustomers
        let tempSum = []
        for (let i = 0; i < contactList.length; i++) {
          if (contactList[i].loanYes === 0) {
            const s = await getUserSum(contactList[i].contact)
            tempSum.push(s)

          }
        }

        setSumArr(tempSum)

      }
    })();

    return () => {
      setContacts([])
    }


  }, [props.booksData.existingCustomers]);


  return (

    <SafeAreaView style={{flex: 1}}>
      <HomeTabsCommonComponents  key = {navigation}
        tableData={{
          sumArray: sumArr,
          data: mContacts,
          onPressEmptyTableAction: () => {
            storeObject.setOpenLoan(0)
            navigation.navigate('ContactScreen')
          }
        }}
        componentName={"dashboard"}
        cardsData={[
          {
            title: "Gave / Payable",
            amount: mTakeSum
          },
          {
            title: "Got/ Receivable",
            amount: mGiveSum
          }
        ]}
        
        navigation={navigation}
        lan={lan}
        fabBtnData={{
          onPress: () => {
            storeObject.setOpenLoan(0)
            navigation.navigate('ContactScreen')
          }
        }}
      />

    </SafeAreaView>

  );


  async function gotoOneCustomerScreen(navigation, phone) {

    try {
      const bookid = '1'//make bookid dynamic
      await dbObject.checkAndInsertContact(phone, bookid, record =>
        navigation.navigate('OneCustomerScreen', {
          phoneNumber: phone
        })
      )
    } catch (e) {
      // console.log('HomeScreen.js:: gotToOneCustomerScreen' + e)
    }

  }


  async function getUserSum(id) {
    let sumT
    let sumG
    sumT = await dbObject.getSumOfTakesContact(props.personals.currentBookId, id)
    sumG = await dbObject.getSumOfGavesContact(props.personals.currentBookId, id)
    return sumT - sumG

  }

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab1CustomersComponent)
