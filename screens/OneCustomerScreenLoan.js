import React, {useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles/globalStyle';
import {AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons} from '@expo/vector-icons';
import YouGaveScreenLoan from './YouGaveScreenLoan';
import YouGotScreenLoan from './YouGotScreenLoan';
import sendSms from "../components/Logic_Repository/sendSms";
import AppLink from 'react-native-app-link';
import storeObject from "../store/store";
import dbObject from "../components/database/db";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DialogInput from 'react-native-dialog-input';
import LoanOneCustomerTable from "../components/UI_components/LoanScreenEssencials/LoanOneCustomerTable";
import {ActivityIndicator, Button, Caption, Switch} from "react-native-paper";
import Colors from "../constants/Colors";
import {FloatingAction} from "react-native-floating-action";
import * as Print from 'expo-print';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'


function OneCustomerScreenLoan(props) {
  const {route, navigation} = props
  console.log('check',route)

  const [mRecords, setRecords] = useState([])
  const [mNet, setNet] = useState(null)
  const [mIsPos, setIsPos] = useState(null)
  const [inputBoxVisibility, setInputBoxVisibility] = useState(false)
  const [inputBoxVisibility1, setInputBoxVisibility1] = useState(false)
  const [recordsLoadStatus, setRecordsLoadStatus] = useState(false)
  const [isLoanAccountActive, setIsLoanAccountActive] = useState(false)

  const fabRef = useRef(null)

  const actions = [
    {
      text: "You Got",
      icon: <FontAwesome5 name={'money-bill'} color={"#fff"}/>,
      name: "bt_you_got",
      position: 2,
      color: "#303030"
    },
    {
      text: "You Gave",
      icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
      name: "bt_you_gave",
      position: 1,
      color: "#303030"
    },

  ];


  useEffect(() => {

    const backAction = () => {
      navigation.navigate('Loan')
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // route.params.phoneNumber.toString()

    // dbObject.getUserData()

    dbObject.getLoanRecordsOfUser(route.params.phoneNumber, props.personals.currentBookId).then(function (records) {
      console.log('loan records',records)
      setRecords(records['_array'])
      setRecordsLoadStatus(true)
      storeObject.setLoanRecords(records['_array'])
      // getNetAmount(mRecords)
      var totalGive = 0
      var totalTake = 0
      var sum = 0
      mRecords.forEach(function (item) {
        if (item.take === 0) {
          totalGive = totalGive + (getTotalAmount(item.amountGiven, item.interest, item.installment, item.totalMonths) + item.amountGiven)
        } else {
          totalTake = totalTake + (getTotalAmount(item.amountTaken, item.interest, item.installment, item.totalMonths) + item.amountTaken)
        }
      })
      sum = totalTake - totalGive
      if (sum < 0) {
        setIsPos(0)
        setNet(sum)
      } else {
        setIsPos(1)
        setNet(-sum)
      }
    })


    // return () => mRecords(null)
    return () => backHandler.remove();


  }, [mRecords, storeObject.state.loanRecords]);
  let phone = route.params.phoneNumber.toString()


    // Pdf share

    const sharePdf = (url) => {
      Sharing.shareAsync(url)
  }
  

    // pdf

    const Prints = () =>{
      return `<style>
       
       </style>
   
       <div id="demo">
     <h1>Lekha Jokha Report</h1>
     <h2>`+route.params.name +'-'+mRecords?.[0].contactno+`</h2>
     <h3>`+new Date()+`</h3>
     
     <table>
     <thead>
       <tr>
         <th>Amount Taken</th>
         <th>Amount Given</th>
         <th> Mode </th>
         <th> Remark </th>
         <th> Date </th>
        
       </tr>
     </thead>
     <tbody>`
     }
  



  
    
    
    const print = async (html) => {
      try {
        console.log(mRecords)
        mRecords.forEach(element => {
          html = html+`<tr>
          <td data-column="Amount Taken">  `+element?.amountTaken+`  </td>
          <td data-column="Amount Given">  `+element?.amountGiven+`  </td>
        
          <td data-column="Mode">  `+element?.mode+`  </td>
          <td data-column="Remark">    `+element?.remarks+`  </td>
          <td data-column="Date">    `+element?.date+`  </td>
          </tr>`
          
        });
        html=html+`</tbody></table>`
        const { uri } = await Print.printToFileAsync({ 'html':html });
        
        if (Platform.OS === "ios") {
          await Sharing.shareAsync(uri);
          return uri;
        } else {
          const permission = await MediaLibrary.requestPermissionsAsync();      if (permission.granted) {
          //     const asset =await MediaLibrary.createAssetAsync(uri);
          //   alert(console.log(asset))
          //   return uri;
          var currentdate = new Date(); 
          var datetime = currentdate.getDate() + "_"
              + (currentdate.getMonth()+1)  + "_" 
              + currentdate.getFullYear() + "-"  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds();
          const pdfName = `${uri.slice(
              0,
              uri.lastIndexOf('/') + 1
          )}Report_${datetime}.pdf`
  
          await FileSystem.moveAsync({
              from: uri,
              to: pdfName,
          })
          sharePdf(pdfName)
      }
  
     
        }  } catch (error) {
        console.error(error);
      }
    };

  // pdf end


  
    // pdf share end

  // function to handle normal sms sending
  const handleSendSms = async () => {


    try {
      const ph_no = route.params.phoneNumber
      const upiid = "stewpeed@kotak"
      const amount = mNet
      const rem = "Payment to" + storeObject.getUser().fullname
      const name = storeObject.getUser().fullname
      const link = "https://lekha-jhoka-59408.web.app/upipay.html?upiid=" + upiid + "&name=" + name + "&amount=" + amount + "&rem=" + rem
      const urlencoded = encodeURIComponent(link)
      await sendSms(ph_no, "Please pay your due amount by clicking on this link : " + urlencoded)
    } catch (e) {
      Alert.alert('Sorry! Cannot send sms')
      console.log(e)
    }
  }

  const handleWhatsappSend = async () => {
    try {
      const appStoreId = '310633997'
      const playStoreId = 'com.whatsapp'
      const appName = 'WhatsApp Messenger'
      const appStoreLocale = 'us'

      const ph_no = route.params.phoneNumber.toString().replace(/[^\d.-]/g, '')
      const upiid = "stewpeed@kotak"
      const amount = mNet
      const rem = "Payment to" + storeObject.getUser().fullname
      const name = storeObject.getUser().fullname
      const link = "https://lekha-jhoka-59408.web.app/upipay.html?upiid=" + upiid + "&name=" + name + "&amount=" + amount + "&rem=" + rem
      const urlencoded = encodeURIComponent(link)

      let url = 'whatsapp://send?text=' + urlencoded + '&phone=91' + ph_no.slice(-10);
      await AppLink.maybeOpenURL(url, {appName, appStoreId, appStoreLocale, playStoreId})
      setInputBoxVisibility(false)
    } catch (e) {
      Alert.alert('Sorry! Cannot send msg')
      console.log(e)
    }
  }

  return (


    <SafeAreaView style={[styleI.wrapper, {paddingTop: 0, backgroundColor: "#fff", width: "100%"}]}>

      <DialogInput isDialogVisible={inputBoxVisibility}
                   title={"Enter UPI ID"}
                   message={""}
                   hintInput={"UPI ID"}
                   submitInput={(inputText) => {
                     handleWhatsappSend(inputText)
                   }}
                   closeDialog={() => {
                     setInputBoxVisibility(false)
                   }}>
      </DialogInput>
      <DialogInput isDialogVisible={inputBoxVisibility1}
                   title={"Enter UPI ID"}
                   message={""}
                   hintInput={"UPI ID"}
                   submitInput={(inputText) => {
                   }}
                   closeDialog={() => {
                     setInputBoxVisibility1(false)
                   }}>
      </DialogInput>

      <View style={[styles.row, {
        paddingTop: 8,
        paddingBottom: 8,
        elevation: 6,
        backgroundColor: Colors.primary,
        minHeight: 60
      }]}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={20} color="white" style={[{marginRight: 20}]}/>
        </TouchableOpacity>

        {/*<Text style={[styles.normalText, {
              flex: 2,
              color: 'white'
          }]}>{route.params.phoneNumber + ":" + route.params.name}</Text>*/}
        <Switch value={isLoanAccountActive} onValueChange={() => setIsLoanAccountActive(!isLoanAccountActive)}/>


      </View>

      <View style={{backgroundColor: "#fff"}}>

        <View style={styles.container}>

          <View style={{borderRadius: 8, elevation: 8}}>
            <View style={[styles.row, styleI.topRow]}>

              <View>

                <View style={[{flexDirection: "row",}]}>
                  <View style={[styles.initialsCont]}>
                    <Entypo size={23} name="user" color={"#ffffff"}/>
                  </View>


                  <View>
                    <Text style={styles.cName}>{route.params.name}</Text>
                    <Text style={styles.cTime}>{route.params.phoneNumber}</Text>
                  </View>
                </View>

                <TouchableOpacity
                    style={{borderRadius: 20,
                      backgroundColor: 'inherit',
                      borderWidth: 0.5,
                      borderColor: Colors.primary,
                      padding: 5,
                      marginTop: 5,
                      alignItems: "center",

                    }}
                    onPress={() => {
                      navigation.navigate('OneCustomerProfileScreen',route.params)
                    }}
                >
                  <Text style={{color: Colors.primary}}>SEE PROFILE</Text>

                </TouchableOpacity>

              </View>

              {mIsPos === 0 ?

                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <Text style={styles.normalText}> You'll Get </Text><Text
                  style={styles.giveAmountText}> ₹{Math.round(-mNet)}</Text>
                </View>

                :
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <Text style={styles.takeAmountText}> ₹{Math.round(-mNet)} </Text>
                  <Text style={styles.normalText}> You'll Give </Text>
                </View>

              }

            </View>

          </View>
        </View>
      </View>

      <View style={[styles.row, {borderBottomColor: '#dedede', borderBottomWidth: 1, justifyContent: 'space-around'}]}>
      
        <View style={[styles.column, styleI.cIcon, {backgroundColor: '#ffccd1'}]}>
        <TouchableOpacity onPress={()=>{print(Prints())}}  disabled={mRecords.length<=0} style={styles.column}>
          <AntDesign name="pdffile1" size={22} color="#fc4e5f"/>
          <Text style={[styles.blueTextSm, {color: '#fc4e5f', fontSize: 10}]}>Reports</Text>
          </TouchableOpacity>
        </View>


        <View style={[styles.column, styleI.cIcon, {backgroundColor: '#c2ffd4'}]}>
          <TouchableOpacity onPress={() => toggleBottomSheetView()}  disabled={mRecords.length<=0} style={styles.column}>
            <FontAwesome name="whatsapp" size={22} color="#33bd5c"/>
            <Text style={[styles.blueTextSm, {color: '#33bd5c', fontSize: 10}]}>WhatsApp</Text>
          </TouchableOpacity>
        </View>


        <View style={[styles.column, styleI.cIcon, {backgroundColor: '#c4ddf5'}]}>
          <TouchableOpacity onPress={() => handleSendSms()}  disabled={mRecords.length<=0} style={styles.column}>
            <FontAwesome5 name="sms" size={22} color="#3298fa"/>
            <Text style={[styles.blueTextSm, {color: '#3298fa', fontSize: 10}]}>Send Sms</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards */}

      {
        recordsLoadStatus ?
          (
            mRecords.length > 0 ?

              <LoanOneCustomerTable
                data={mRecords}
                getTotalAmount={getTotalAmount}
                navigation={navigation}
              />
              :
              <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 20, width: "100%"}}>
                <Caption style={{fontWeight: "bold"}}>Let's add first record...</Caption>
                <Button
                  style={{marginTop: 10}}
                  icon="cash"
                  mode="outlined"
                  onPress={() => {
                    fabRef.current.animateButton()
                  }}
                >
                  Add new record
                </Button>
              </View>
          )
          :
          (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
              <ActivityIndicator animating={true} color={Colors.warningText}/>
              <Caption>Loading the records. Please Wait...</Caption>
            </View>
          )

      }

      <FloatingAction
        ref={fabRef}
        actions={actions}
        color={Colors.secondary}
        onPressItem={name => {
          switch (name) {
            case "bt_you_got":
              storeObject.setContact(phone)
              navigation.navigate('YouGotScreenLoan', {contact: phone, loanName: route.params.loanName, name: route.params.name})
              break;
            case "bt_you_gave":
              storeObject.setContact(phone)
              navigation.navigate('YouGaveScreenLoan', {contact: phone, loanName: route.params.loanName, name: route.params.name})
              break;
          }
        }}
      />

    </SafeAreaView>
  );
}

function getTotalAmount(amount, interest, installment, numberOfMonths) {

  switch (installment) {
    case "Monthly":
      return Math.round((amount * interest * numberOfMonths / 100) * 100) / 100;

    case "Quarterly":
      return Math.round((amount * interest * (numberOfMonths / 3) / 100) * 100) / 100;

    case "Half Yearly":
      return Math.round((amount * interest * (numberOfMonths / 6) / 100) * 100) / 100;

    case "Annually":
      return Math.round((amount * interest * (numberOfMonths / 12) / 100) * 100) / 100;

  }
}


const styleI = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  bottomSheetView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  greenBack: {
    backgroundColor: "rgba(42,187,155,.1)",
    height: "100%",
    justifyContent: 'center'
  },

  entriesText: {
    flex: 2
  },

  timeDate: {
    flex: 2
  },

  cardGiveAmt: {
    width: 90,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: "rgba(900,0,0,.1)",
    alignItems: 'flex-end'
  },

  cardTakeAmt: {
    width: 90,
    alignItems: 'flex-end',

  },

  bottomBtns: {
    width: "100%"
  },

  bottomBtn: {
    flex: 1,
    margin: 5,
    elevation: 2,
  },

  bottomGaveBtn: {
    backgroundColor: 'red',
    flex: 1,
    height: '100%',
    width: '100%'
  },

  topRow: {
    paddingVertical: 15,
    borderRadius: 8
  },
  cIcon: {borderRadius: 60 / 2, width: 60, height: 60}

});

const mapStateToProps = (state) => {
  const {personals, booksData} = state
  return {personals, booksData}
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OneCustomerScreenLoan)
