import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Modal,
    KeyboardAvoidingView ,
    Keyboard,
    FlatList,
    Picker,
    
    Image,
    TouchableOpacity
} from 'react-native';
import {styles} from '../styles/globalStyle';
import {AntDesign} from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import React, {useState, useReducer, useEffect} from 'react'
import calcReducer from "../store/reducers/calcReducer";
import dbObject from '../components/database/db';
import * as calcFunctions from '../components/Logic_Repository/calcLogic/calcLogics'
import storeObject from "../store/store";
import calculatorButtons from "./UiComponents/calculatorButtons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import reactNativeImagePicker from "../components/Logic_Repository/reactNativeImagePicker";
import {backupNewCustomerRecord} from "../components/Logic_Repository/backupLogics";
import openImagePickerAsync from "../components/Logic_Repository/openImagePickerAsync";
import calcTypes from "../store/reducers/types/calcTypes";
import {RoundedInput} from "../components/UI_components/Inputs";
import {transactionTypes} from "../constants/Constansts";
import {
    getTypeOrModeSelection,
    SelectionChip, SwitchSelectorComponent
} from "./UiComponents/transactionComponents";
import {Snackbar, Subheading} from "react-native-paper";
import { ScrollView } from 'react-native';

function YouGaveScreen(props) {
    const {navigation, themeColor = "red", isGotScreen = false, route} = props

    
    // const customerName = route.params.customerName
    // const customerPhone = route.params.customerPhone

    const {transactionType, customerPhone,customerData,customerName} = route.params
    console.log('customer Data-',customerPhone)


    const initialState = {
        calcExpVisible: false,
        moreDetailsVisible: false,
        invalidAmountVisible: false,
        amountText: null,
        calcExpText: null,
        isOperatorActive: false,
        activeOperator: null,
        isFirstOperatorAlready: false,
        isPercentActive: false,
        totals: [],
        expArray: [],
        isMrcActive: false,
        mrcText: [],
        mrcValue: 0
    }

    let rem = {remark: ''};
    let type = "Sales";
    let duedate = '';
    let today = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();

    const [state, dispatch] = useReducer(calcReducer, initialState)
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(today)
    const [selectedValue, setSelectedValue] = useState("");
    const [typeOfTransGaveGot, setTypeOfTransGaveGot] = useState("Others")
    const [loanName, setLoanName] = useState("")
    const [installmentNo, setInstallmentNo] = useState("")
    const [toastVisibility, setToastVisibility] = useState(false)


    useEffect(() => {
        (async()=>{

            await dbObject.getRecordId(customerPhone, props.personals.currentBookId)
            if(transactionType === transactionTypes.RECEIVABLE) {
                setSelectedValue("Sales")
                return
            }
    
            if(transactionType === transactionTypes.PAYABLE) {
                setSelectedValue("Purchases")
                return
            }
    
            if(transactionType === transactionTypes.GAVE || transactionType === transactionTypes.GOT) {
                setSelectedValue("Cash")
            }

        })()
      

    }, []);


    async function openImagePicker() {
        console.log("image picker clicked...")
        try {
            const pickerResult = await reactNativeImagePicker();
            if (pickerResult.didCancel) {
                console.log('User cancelled image picker');
            } else if (pickerResult.errorCode) {
                console.log('ImagePicker Error: ', pickerResult.errorCode);
                alert(pickerResult.errorMessage);
            } else if (pickerResult.customButton) {
                console.log('User tapped custom button: ', pickerResult.customButton);
            } else {
                setSelectedImage(pickerResult.uri)
            }
        } catch (e) {
            alert("something went wrong")
            console.log(e)
        }
    }



    function _renderMoreDetails() {
        //if (state.moreDetailsVisible) {
        return (
            
            <View style={{marginTop: 10}}>

                {/* selection chips */}
                <View
                    style={{marginHorizontal: 10, marginBottom: 10}}
                >
                    <Subheading>{transactionType === transactionTypes.RECEIVABLE || transactionType === transactionTypes.PAYABLE ? "Select Type of transaction" : "Select Mode"}</Subheading>

                    <SwitchSelectorComponent
                        values={getTypeOrModeSelection(transactionType)}
                        onPress={(val) => {
                            setSelectedValue(val)
                            type = val
                        }}
                        defaultSelected={0}
                        selectedBgColor={themeColor}
                    />

                </View>
                {/* selection chips end */}

                {/* date and attachment row*/}
                <View style={[{flexDirection: 'row', justifyContent: 'space-between', margin: 10}]}>

                    {/* date picker start */}
                    <TouchableOpacity style={{borderWidth: .4, borderColor: '#dedede'}}>
                        <View style={[styles.row, {justifyContent: 'center', width: 180, padding: 0, height: 40}]}>
                            <AntDesign name="calendar" size={24} color={themeColor}/>
                            <DatePicker
                                date={date}
                                mode="date"
                                placeholder="Date"
                                format="YYYY-MM-DD"
                                minDate="2000-06-01"
                                maxDate={today}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none',
                                        visibility: 'hidden'
                                    },
                                    dateInput: {
                                        marginHorizontal: 0,
                                        border: 0,
                                        outline: 0,
                                        borderWidth: 0
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {
                                    duedate = date
                                    // Alert.alert(duedate)
                                    setDate(duedate)
                                }}
                            />

                            {/* <AntDesign name="caretdown" size={10} color="red" /> */}
                        </View>
                    </TouchableOpacity>
                    {/* date picker end */}

                    {/*attachment starts */}
                    <TouchableOpacity style={{borderWidth: .4, borderColor: '#dedede'}}
                                      onPress={() => openImagePicker()}>


                        <View style={[styles.row, {width: 130, height: 40}]}>
                            {
                                selectedImage ?
                                    <View style={[{marginRight: 5}]}>
                                        {/*<Entypo name="circle-with-cross" size={10} color="red" style={[{position:'absolute',top:0,left:'70%',zIndex:99}]} />*/}
                                        <Image style={{
                                            width: 22,
                                            height: 22,
                                            position: 'relative',
                                            zIndex: 2,
                                            borderRadius: 8
                                        }} source={{uri: selectedImage}}/>
                                    </View> : console.log('')
                            }
                            <AntDesign name="camera" size={24} color={themeColor}/><Text> Attach Bills</Text>
                        </View>
                    </TouchableOpacity>
                    {/* attachment ends */}

                </View>
                <View style={[{
                    justifyContent: 'center',
                }]}>
                    <RoundedInput
                        style={[{color: themeColor}]}
                        label="Customer Name"
                        editable={false}
                        value={customerName}
                        
                    />
                </View>
                


                {
                    typeOfTransGaveGot === "Loan EMI" ?
                    
                        <View>
                            <View style={[{
                                justifyContent: 'center',
                            }]}>
                                <RoundedInput
                                    style={[{color: themeColor}]}
                                    label="Loan Name"
                                    onChangeText={text => {
                                        dispatch({type: calcTypes.setAmountText, payload: text})
                                    }}
                                />
                            </View>
                            
                            

                            <View style={{borderWidth: 1, borderColor:'#303030', borderRadius: 5, marginVertical: 10, marginHorizontal: 10}}>
                                <Picker
                                    selectedValue={installmentNo}
                                    style={{ height: 55, borderWidth: 1, borderColor:'#dedede' }}
                                    onValueChange={(itemValue, itemIndex) => setInstallmentNo(itemValue)}
                                >
                                    <Picker.Item label="Select Installment No." value="" />
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                </Picker>
                            </View>
                        </View>
                        :
                        null
                }

                {/*Principle amount input box*/}
                <View style={[{
                    justifyContent: 'center',
                }]}>
                    <RoundedInput
                        style={[{color: themeColor}]}
                        label="Amount"
                        onChangeText={text => {
                            dispatch({type: calcTypes.setAmountText, payload: text})
                        }}
                        value={state.amountText}
                        keyboardType="phone-pad"
                    />
                </View>
                  {/*interest amount input box*/}
                  {
                      typeOfTransGaveGot !== "Others"?
                  <View style={[{
                    justifyContent: 'center',
                }]}>
                    <RoundedInput
                        style={[{color: themeColor}]}
                        label="Interest Amount"
                      editable={false}
                        value={JSON.stringify(Math.round(state.amountText*0.09*(4/12)* 100)/100)} //t in years month/12
                        keyboardType="phone-pad"
                    />
                </View>:null
    }
                {/*remarks input box*/}
                <RoundedInput label="Remarks"
                 onChangeText={text => rem.remark = text}/>

            </View>
            
        );

    }


    function _renderSaveButton() {

            return (
                
                <View style={{marginBottom: 6}}>
                    <View style={{margin: 10}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: themeColor,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 6
                                
                            }}

                            onPress={() => handleSave()}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold'}}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )

    }

    return (
        <KeyboardAvoidingView style={{flex:1}} enabled={true}>
            
        <ScrollView style={{ backgroundColor: "#fff", width: "100%"}}>


            <Modal
                style={{height: '100%', width: '100%', flex: 1}}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styleI.centeredView}>
                    <View style={styleI.modalView}>

                        <AntDesign name="checkcircleo" size={80} color="#2196F3" style={{marginBottom: 20}}/>
                        <Text style={styleI.modalText}>Transaction Saved!</Text>


                    </View>
                </View>
            </Modal>

            <View>
                {
                    transactionType === transactionTypes.GAVE || transactionType === transactionTypes.GOT ?
                        <View
                            style={{marginHorizontal: 10, marginBottom: 10}}
                        >
                            <Subheading>Select Type of transaction</Subheading>

                            <SwitchSelectorComponent
                                values={["Others", "Loan EMI"]}
                                onPress={(val) => {
                                    setTypeOfTransGaveGot(val)
                                }}
                                defaultSelected={0}
                                selectedBgColor={themeColor}
                            />


                            {
                                typeOfTransGaveGot === "Others" || typeOfTransGaveGot === "Loan EMI" ?
                                    _renderMoreDetails()
                                    :
                                    null
                            }

                        </View>
                        :
                        _renderMoreDetails()
                }

            </View>

            <View >
                

                {_renderSaveButton()}

            </View>

            <Snackbar
                visible={toastVisibility}
                onDismiss={() => {
                    setToastVisibility(false)
                }}
                duration={3000}
            >
                <Text>Please select type of transaction as Others or Loan EMI.</Text>
            </Snackbar>

        
        </ScrollView>
        </KeyboardAvoidingView>
    );


    async function handleSave() {
        const bookId = props.personals.currentBookId
        let amount = state.amountText
        let recordid = await dbObject.getRecordId(customerPhone, props.personals.currentBookId)

        const duedated = duedate
        let give;
        let take

        if (isGotScreen) {
            give = 0

            if (transactionType === transactionTypes.GOT || transactionType === transactionTypes.GAVE) {
                take = 1
            } else {
                take = 2
            }
        } else {

            if (transactionType === transactionTypes.GOT || transactionType === transactionTypes.GAVE) {
                give = 1//gave
            } else {
                give = 2// due
            }

            take = 0
        }


        const attachment = selectedImage
        const remarks = rem.remark
        const partner_contact = customerPhone
        const typedb = selectedValue
        const phoneid = 10

        if (give === 2) {
            await dbObject.insertPayableDueYes(partner_contact, bookId, 0)
        } else {
            await dbObject.insertGaveGotYes(partner_contact, bookId, 0)
        }
        // Alert.alert("Take = " + take + " Due = " + give)
        // Alert.alert(duedate)
        if (selectedValue === "" || selectedValue === "Select") {
            Alert.alert("Select value from dropdown")
        } else {
            if (amount < 1) {
                Alert.alert('Invalid Amount')
            } else {
                setModalVisible(true);
                await dbObject.setrecord(recordid,bookId, amount, duedate, give, take, attachment, remarks, partner_contact, phoneid, typedb)
                storeObject.setRecords({
                    bookId,
                    amount,
                    duedate,
                    give,
                    take,
                    attachment,
                    remarks,
                    partner_contact,
                    phoneid,
                    typedb
                })

                /**
                 *   const backupRes = await backupNewCustomerRecord("", bookId, props.booksData.currentBookData.remoteid, amount, date, duedate, remarks, give, take, attachment, partner_contact, phoneid, typedb)
                 */
                setTimeout(function () {
                    navigation.goBack()
                }, 1000)

            }
        }


    }
}


const styleI = StyleSheet.create({
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    calcBtn: {
        backgroundColor: 'white',
        width: 90,
        justifyContent: 'center',
        elevation: 2,
        borderRadius: 5,
        height: 40

    },
    blueBack: {
        backgroundColor: 'rgba(0,0,220,.1)'
    },
    oneCalcCont: {
        alignItems: 'center',
        borderRadius: 5,
        height: '100%'
    },
    oncCalcRow: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        marginVertical: 4,
        justifyContent: 'space-between'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
    },
    modalView: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        // flex:1,
        backgroundColor: "white",
        // borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 100
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: '100%',
        width: '100%'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(YouGaveScreen)
