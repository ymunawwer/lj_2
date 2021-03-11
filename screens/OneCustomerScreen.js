import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles/globalStyle';
import {AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons} from '@expo/vector-icons';
import YouGaveScreen from './YouGaveScreen';
import YouGotScreen from './YouGotScreen';
import sendSms from "../components/Logic_Repository/sendSms";
import AppLink from 'react-native-app-link';
import EntryDetails from './EntryDetails';
import storeObject from "../store/store";
import dbObject from '../components/database/db';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DialogInput from 'react-native-dialog-input';
import Colors from "../constants/Colors";
import {FloatingAction} from "react-native-floating-action";
import {transactionTypes} from "../constants/Constansts";
import * as Print from 'expo-print';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'


function OneCustomerScreen(props) {
    const {route, navigation} = props
    

    const [mRecords, setRecords] = useState([])
    const [mNet, setNet] = useState(null)
    const [mIsPos, setIsPos] = useState(null)
    const [inputBoxVisibility, setInputBoxVisibility] = useState(false)
    const [inputBoxVisibility1, setInputBoxVisibility1] = useState(false)

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
        {
            text: "Receivable",
            icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
            name: "bt_receivable",
            position: 3,
            color: "#303030"
        },
        {
            text: "Payable",
            icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
            name: "bt_payable",
            position: 4,
            color: "#303030"
        }
    ];


    useEffect(() => {

        (async () => {

            try {
                const records = await dbObject.getRecordsOfUser(route.params.phoneNumber, props.personals.currentBookId)
                console.log("Records = ", records)
                storeObject.setRecords(records)

                setRecords(records['_array'])

                //console.log("Records:", records['_array'])
                let takeSum = 0;
                let giveSum = 0;
                const map = mRecords.map(a => {
                    if (a.take === 1 || a.take === 2) {
                        takeSum += a.amount;
                        console.log("take Sum : ", takeSum)
                    } else {
                        giveSum += a.amount;
                        console.log("Give Sum  : ", giveSum)
                    }
                })

                let net = takeSum - giveSum;

                if (net < 0) {
                    setIsPos(false)
                } else {
                    setIsPos(true)
                }

                if (mIsPos) {
                    setNet(net)
                } else {
                    setNet(-net)
                }

                return () => setRecords(null)
            } catch (e) {
                console.log('OneCustomerScreen.js: Error: ' + e)
            }

        })();

    }, [storeObject.state.records]);

    let phone = route.params.phoneNumber.toString()


    // pdf

    const Prints = () =>{
        return `<style>
         
         </style>
     
         <div id="demo">
       <h1>Lekha Jokha Report</h1>
       <h2>`+mRecords?.[0].name +'-'+mRecords?.[0].partner_contact+`</h2>
       <h3>`+new Date()+`</h3>
       
       <table>
       <thead>
         <tr>
           <th>You Gave</th>
           <th>You Got</th>
           <th> Mode </th>
           <th> Remark </th>
           <th> Date </th>
          
         </tr>
       </thead>
       <tbody>`
       }
    


const sharePdf = (url) => {
    Sharing.shareAsync(url)
}
    
      
      
      const print = async (html) => {
        try {
          console.log(mRecords)
          mRecords.forEach(element => {
            html = html+`<tr>
            <td data-column="Amount">  `+element?.amount+`  </td>
            <td data-column="Amount">  `+element?.amount+`  </td>
            <td data-column="Mode">  `+element?.mode+`  </td>
            <td data-column="Remark">    `+element?.remarks+`  </td>
            <td data-column="Date">    `+element?.lastupdated+`  </td>
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
        <SafeAreaView style={[styleI.wrapper, {paddingTop: 0}]}>

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
                paddingTop: 5,
                paddingBottom: 5,
                elevation: 6,
                backgroundColor: '#4e54c8',
                minHeight: 60
            }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="md-arrow-back" size={20} color="white" style={[{marginRight: 20}]}/>
                </TouchableOpacity>

            </View>



                        <View
                            style={[styles.row, {marginVertical: 10, marginHorizontal: 10, paddingHorizontal: 0, paddingVertical: 0, borderRadius: 8, backgroundColor: "#fff", elevation: 8}]}
                        >

                            <View style={{paddingVertical: 10, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', flex: 1}}>
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

                                {mIsPos ?
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <Text style={styles.normalText}> You'll Give </Text>
                                        {mNet ? <Text style={styles.takeAmountText}> ₹{mNet} </Text> :
                                            <Text style={styles.takeAmountText}> ₹0 </Text>}
                                    </View>

                                    :
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <Text style={styles.normalText}> You'll Get </Text>
                                        {mNet ? <Text style={styles.giveAmountText}> ₹{-mNet} </Text> :
                                            <Text style={styles.giveAmountText}> ₹0 </Text>}

                                    </View>


                                }
                            </View>

                        </View>


            <View style={[styles.row, {
                borderTopColor: '#dedede',
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                justifyContent: 'space-around'
            }]}>

                <View style={[styles.column, styleI.cIcon, {backgroundColor: '#ffccd1'}]}  >
                <TouchableOpacity onPress={()=>{print(Prints())}}
                disabled={mRecords.length<=0}
                 style={styles.column}>
                    <AntDesign name="pdffile1" size={22} color="#fc4e5f"/>
                    <Text style={[styles.blueTextSm, {color: '#fc4e5f', fontSize: 10}]}>Reports</Text>
                    </TouchableOpacity>
                </View>


                <View style={[styles.column, styleI.cIcon, {backgroundColor: '#c2ffd4'}]}>
                    <TouchableOpacity onPress={() => {
                        setInputBoxVisibility(true)
                        // toggleBottomSheetView()
                    }
                    }
                    disabled={mRecords.length<=0}
                     style={styles.column}>
                        <FontAwesome name="whatsapp" size={22} color="#33bd5c"/>
                        <Text style={[styles.blueTextSm, {color: '#33bd5c', fontSize: 10}]}>WhatsApp</Text>
                    </TouchableOpacity>
                </View>


                <View style={[styles.column, styleI.cIcon, {backgroundColor: '#c4ddf5'}]}>
                    <TouchableOpacity onPress={() => {
                        handleSendSms()
                        // setInputBoxVisibility1(true)
                    }
                    }
                    disabled={mRecords.length<=0}
                     style={styles.column}>
                        <FontAwesome5 name="sms" size={22} color="#3298fa"/>
                        <Text style={[styles.blueTextSm, {color: '#3298fa', fontSize: 10}]}>Send Sms</Text>
                    </TouchableOpacity>
                </View>

            </View>

                
            <View style={[styles.row, styles.noBackground]}>
                {/* <Text style={[styles.greyTextSm,styleI.entriesText]}>ENTRIES</Text>
                <Text style={styles.greyTextSm}>YOU GAVE</Text>
                <Text style={styles.greyTextSm}>YOU GOT</Text> */}
                <Text style={[styles.greyTextSm, styleI.timeDate]}>ENTRIES</Text>
                <View>
                    <Text style={styles.greyTextSm}>YOU GAVE</Text>
                </View>
                <View style={styleI.cardTakeAmt}>
                    <Text style={styles.greyTextSm}>YOU GOT</Text>
                </View>
            </View>


            {

                mRecords ?
                    <FlatList
                        data={mRecords}
                        renderItem={({item}) => (


                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EntryDetails')
                                storeObject.setRecordId(item.recordid)
                                storeObject.setRecordLoanYes(0)
                            }
                            }
                            >

                                <View style={styles.card}>
                                    <Text
                                        style={[styles.greyTextSm, styleI.timeDate, {paddingHorizontal: 2}]}>{item.date.slice(4, 15) + ' - ' + item.date.slice(16, 25)}
                                        {

                                            item.remarks ?
                                                <Text>{'\n' + item.remarks}</Text> : console.log('')
                                        }
                                        {
                                            item.type ?
                                                <Text>{'\n' + item.type}</Text> : console.log('')
                                        }

                                    </Text>
                                    {
                                        item.attachment ?
                                            <View style={[{marginRight: 2}]}>
                                                <Image style={{width: 22, height: 22, borderRadius: 8}}
                                                       source={{uri: item.attachment}}/>
                                            </View> : console.log('')

                                    }

                                    <View style={styleI.cardGiveAmt}>
                                        <Text style={[styles.greyTextSm, styles.giveAmountText]}>
                                            {
                                                item.give === 1 || item.give === 2 ?
                                                    '₹ ' + item.amount : console.log('')


                                            }
                                        </Text>
                                    </View>
                                    <View style={styleI.cardTakeAmt}>
                                        <Text style={[styles.greyTextSm, styles.takeAmountText]}>
                                            {


                                                item.give === 0 ?
                                                    '₹ ' + item.amount : console.log('')


                                            }

                                        </Text>

                                    </View>


                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.recordid.toString()}
                    />
                    : <Text>Loading</Text>

            }

            <FloatingAction
                ref={fabRef}
                actions={actions}
                color={Colors.secondary}
                onPressItem={name => {
                    switch (name) {
                        case "bt_you_got":
                            navigation.navigate('YouGotScreen', {
                                transactionType: transactionTypes.GOT,
                                customerPhone: phone,
                                customerName: route.params.name
                            })
                            break;
                        case "bt_you_gave":
                            navigation.navigate('YouGaveScreen', {
                                transactionType: transactionTypes.GAVE,
                                customerPhone: phone,
                                customerName: route.params.name
                            })
                            break;
                        case "bt_payable":
                            navigation.navigate('YouGotScreen', {
                                transactionType: transactionTypes.PAYABLE,
                                customerPhone: phone,
                                customerName: route.params.name
                            })
                            break;
                        case "bt_receivable":
                            navigation.navigate('YouGaveScreen', {
                                transactionType: transactionTypes.RECEIVABLE,
                                customerPhone: phone,
                                customerName: route.params.name
                            })
                            break;
                    }
                }}
            />


        </SafeAreaView>
    );
}

const styleI = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff"
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
        backgroundColor: "rgba(255,0,0,.1)",
        alignItems: 'flex-end'
    },

    cardTakeAmt: {
        width: 90,
        alignItems: 'flex-end'
    },

    bottomBtns: {
        position: 'absolute',
        bottom: "0%",
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

export default connect(mapStateToProps, mapDispatchToProps)(OneCustomerScreen)
