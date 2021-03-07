import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Modal,
    FlatList,
    Picker,
    Image,
    Keyboard,
    TouchableOpacity, ScrollView
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
import reactNativeImagePicker from "../components/Logic_Repository/searchLibrary/reactNativeImagePicker";
import {RoundedInput} from "../components/UI_components/Inputs";
import StepIndicator from "react-native-step-indicator";
import MStepIndicator from "../components/UI_components/StepIndicator";
import Colors from "../constants/Colors";
import {RoundedBtn} from "../components/UI_components/Buttons";
import openImagePickerAsync from "../components/Logic_Repository/openImagePickerAsync";
import calcTypes from "../store/reducers/types/calcTypes";

function YouGaveScreenLoan(props) {
    const { navigation, themeColor = "red", isGotScreen = false, route } = props
    const {contact,customerName,loanName} = route.params
    // props.personals.currentBookData.id
    console.log('params',contact,customerName,loanName)
    let type = "Sales";
    let installment = "Monthly";
    let interest = 0;
    let months = 0;

    const [selectedValue, setSelectedValue] = useState("Sales");
    const [selectedValueI, setSelectedValueI] = useState("Monthly");
    const [mode, setMode] = useState("Mode");

    const [principle, setPrinciple] = useState("");
    const [remark, setRemark] = useState("");
    const [numberofinstallment, setnoi] = useState(null)
    const [installmentAmount, setinstallmentamount] = useState(null)
    const [interestRate, setInterestRate] = useState(null)
    const [tabIndex, setTabIndex] = useState(0)
    const [interval, setIntervalPeriod] = useState(1)

    let rem={remark: ''};
    let duedate = '';
    let today = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();

    const initialState = {
        calcExpVisible: false,
        moreDetailsVisible: false,
        invalidAmountVisible: false,
        amountText: null,
        calcExpText: null,
        isOperatorActive: false,
        activeOperator: null,
        isFirstOperatorAlready: false,
        totals: [],
        expArray: [],
        isMrcActive:false,
        mrcText:[],
        mrcValue:0
    }

    const [state, dispatch] = useReducer(calcReducer, initialState)
    const [mDate, setDate] = useState(today)
    const [mDueDate, setDueDate] = useState(today)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    const openImagePicker = async () => {
        try {
            const pickerResult = await openImagePickerAsync(true, false)
            if (pickerResult.cancelled === true) {
                return;
            }
            setSelectedImage(pickerResult.uri);
        }
        catch (e) {
            alert("something went wrong")
            console.log(e)
        }
    };


    function _renderMoreDetails() {

            return (
              <ScrollView>
                  <View>
                      <RoundedInput label="Enter Details" onChangeText={text => setRemark(text)}/>


                      <View style={[{flexDirection: 'row', justifyContent: 'space-between', margin: 10}]}>
                          <TouchableOpacity style={{borderWidth: .4, borderColor: '#dedede'}}>
                              <View style={[styles.row, {justifyContent: 'center', width: 180, padding: 0, height: 40}]}>
                                  <AntDesign name="calendar" size={24} color={themeColor}/>
                                  <DatePicker
                                    date={mDate}
                                    mode="date"
                                    placeholder="Date"
                                    format="YYYY-MM-DD"
                                    minDate="2010-06-01"
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
                                        setDate(date)
                                    }}
                                  />

                                  {/* <AntDesign name="caretdown" size={10} color="red" /> */}
                              </View>
                          </TouchableOpacity>


                          <TouchableOpacity style={{borderWidth: .4, borderColor: '#dedede'}} onPress={() => openImagePicker()}>


                              <View style={[styles.row, {width: 130, height: 40}]} >

                                  {
                                      selectedImage?
                                        <View style={[{marginRight:5}]}>
                                            {/*<Entypo name="circle-with-cross" size={10} color="red" style={[{position:'absolute',top:0,left:'70%',zIndex:99}]} />*/}
                                            <Image style={{width: 22, height: 22,position:'relative',zIndex:2,borderRadius:8}} source={{ uri: selectedImage }}/>
                                        </View>:console.log('')
                                  }


                                  <AntDesign name="camera" size={24} color={themeColor}/><Text> Attach Bills</Text>
                              </View>
                          </TouchableOpacity>

                      </View>


                  </View>
              </ScrollView>

            );

    }

    function _renderSaveButton() {

            return (

                    <View style={{width: '100%'}}>
                        {
                             <TouchableOpacity
                             style={{backgroundColor: themeColor,
                                 height: 50,
                                justifyContent: 'center',
                                 alignItems: 'center',
                             }}

                             onPress={() => handleSave2()}
                         >
                             <Text style={{color: 'white', fontWeight: 'bold'}}>SAVE</Text>
                         </TouchableOpacity>
                    }
                    </View>
            )


    }


    function loanDetailsTab2(state, dispatch) {
        return (
          <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                  <View style={[styles.row, {

                      borderRadius: 5,
                      marginHorizontal:10,
                      marginVertical:5,
                      elevation:5
                  }]}>
                      <Picker
                        selectedValue={selectedValue}
                        style={[styles.blueText, {height: 50, width: '50%', backgroundColor: 'rgba(0,0,250,.1)',margin:2,borderRadius:5}]}
                        onValueChange={(itemValue, itemIndex) =>
                        {
                            type = itemValue
                            setSelectedValue(itemValue)
                        }
                        }
                      >
                          <Picker.Item label="Sales" value="Sales"/>
                          <Picker.Item label="Purchases" value="Purchases"/>
                          <Picker.Item label="Income" value="Income"/>
                          <Picker.Item label="Expenses" value="Expenses"/>
                      </Picker>

                      <Picker
                        selectedValue={selectedValueI}
                        style={[styles.blueText, {height: 50, width: '50%', backgroundColor: 'rgba(0,0,250,.1)',margin:2,borderRadius:5}]}
                        onValueChange={(itemValue, itemIndex) =>
                        {
                            installment = itemValue
                            setIntervalPeriod(getIntervalValue(itemValue))
                            setSelectedValueI(itemValue)
                        }
                        }
                      >
                          <Picker.Item label="Monthly" value="Monthly"/>
                          <Picker.Item label="Quarterly" value="Quarterly"/>
                          <Picker.Item label="Half Yearly" value="Half Yearly"/>
                          <Picker.Item label="Annually" value="Annually"/>
                      </Picker>
                  </View>
                  <View style={[styles.row, {
                      // backgroundColor: 'white',
                      // marginHorizontal: 10,
                      // elevation: 5,
                      // height: 50,
                      // justifyContent: 'center',
                      borderRadius: 5,
                      marginHorizontal:10,
                      marginVertical:5,
                      elevation:5
                  }]}>
                      <Picker
                        selectedValue={mode}
                        style={[styles.blueText, {height: 50, width: '50%', backgroundColor: 'rgba(0,0,250,.1)',margin:2,borderRadius:5}]}
                        onValueChange={(itemValue, itemIndex) =>
                        {
                            type = itemValue
                            setMode(itemValue)
                        }
                        }
                      >
                          <Picker.Item label="Mode" value="Mode"/>
                          <Picker.Item label="Cash" value="Cash"/>
                          <Picker.Item label="Other" value="Other"/>
                      </Picker>
                      <TouchableOpacity style={{borderWidth: .4, borderColor: '#dedede'}}>
                          <View style={[styles.row, {justifyContent: 'center', width: 180, padding: 0, height: 40}]}>
                              <AntDesign name="calendar" size={24} color={themeColor}/>

                              <DatePicker
                                date={mDueDate}
                                mode="date"
                                placeholder="Date"
                                format="YYYY-MM-DD"
                                minDate={today}
                                maxDate="2300-06-01"
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

                                    setDueDate(date)
                                }}
                              />

                              {/* <AntDesign name="caretdown" size={10} color="red" /> */}
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={[ {
                      marginVertical:5,
                      flexDirection: "row"
                  }]}>
                      <RoundedInput
                        placeholder="Interest Rate"
                        label={"Interest Rate"}
                        keyboardType='numeric'
                        maxLength={3}
                        onChangeText={text => {
                            interest = text
                            setInterestRate(text)
                        }}
                        containerStyle={{flex: 1}}
                      />

                      <RoundedInput
                        placeholder="Installment Amount"
                        label={"Installment Amount"}
                        value={parseFloat(parseFloat(installmentAmount*interval)+parseFloat((installmentAmount/interval) * interestRate/100)).toFixed(2)}
                        onChangeText={text => {

                        }}
                        containerStyle={{flex: 1}}
                      />


                  </View>

                      <RoundedInput
                        label="Enter Number of Installment"
                        keyboardType='numeric'
                        onChangeText={(text)=> {
                            let a = state.amountText/text
                            setinstallmentamount(a + "")
                        }}
                        maxLength={3}  //setting limit of input
                      />

              </View>

              {_renderSaveButton()}
          </View>
        );
    }

    function loanDetailsTab1(state, dispatch) {
        return (
          <View style={{flex: 1}}>
              <View style={{flex: 1, width: "100%"}}>
                  <View style={[{
                      justifyContent: 'center',
                  }]}>
                      <RoundedInput
                        style={[{color: themeColor}]}
                        label="Principle Amount"
                        onChangeText={text => {
                            dispatch({type: calcTypes.setAmountText, payload: text})
                        }}
                        value={state.amountText}
                        keyboardType="phone-pad"
                      />

                  </View>

                  <View>
                      {_renderMoreDetails()}
                  </View>
              </View>

              <View style={{ width: "100%"}}>

                      <RoundedBtn
                        style={{ borderRadius: 0}}
                        containerStyle={{borderRadius: 0, backgroundColor: themeColor}}
                        text={"NEXT"}
                        onPress={() => {
                            setTabIndex(1)
                        }}
                      />

              </View>
          </View>
        );
    }

    return (

        <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#fff", paddingTop: 10}}>

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
                        {/*
                        <TouchableHighlight
                            style={{...styleI.openButton, backgroundColor: "#2196F3"}}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styleI.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    */}
                    </View>
                </View>
            </Modal>

            <MStepIndicator
              currentPosition={tabIndex}
              labels={["Basic Details", "Installment Details"]}
              stepCount={2}
              renderStepIndicator={({position, stepStatus}) => {
                  switch(position) {
                      case 0:
                          return <AntDesign name={"profile"} color={stepStatus === 'finished' ? '#ffffff' : Colors.primary} size={15} />
                      case 1:
                          return <AntDesign name={"contacts"} color={stepStatus === 'finished' ? '#ffffff' : Colors.primary} size={15}/>
                  }
              }}
              onPress={(pos) => {
                  setTabIndex(pos)
              }}
            />

            {
                tabIndex === 0 ?
                  loanDetailsTab1(state, dispatch)
                  :
                  loanDetailsTab2(state, dispatch)
            }


        </View>
    );

    function getIntervalValue(value){
      var i = 1

      if(value === "Monthly"){i=1}
        else if(value === "Quarterly"){i=3}
          else if(value === "Half Yearly"){i=6}
            else if(value === "Annually"){i=12}


      return i
    }

    async function handleSave2() {

        const bookid = props.personals.currentBookId
         let amount = state.amountText
        /*if (state.totals.length > 0) {
            if(state.isFirstOperatorAlready) {
                amount = state.totals[state.totals.length - 1]
            }
            else if(!state.isFirstOperatorAlready && state.amountText !== state.totals[state.totals.length - 1]) {
                amount = state.amountText
            }
            else {
                amount = state.totals[state.totals.length - 1]
            }
        }*/

        let give
        let take

        if(isGotScreen === false) {
            give = 1
            take = 0
        }
        else {
            give = 0
            take = 1
        }
        const attachment = selectedImage
        const remarks = remark
        const date = mDate
        const duedated = mDueDate
        const partner_contact = contact
        const installmentdb = installment
        const totalMonths = months
        const typedb = type
        const modedb = mode
        const contactid = 10
        const interestdb = interest
        const interestRatedb = interestRate
        const installmentAmountdb = installmentAmount
        // const loanName = route.params.loanName

        // Alert.alert(duedate)
        if (amount < 1) {
            Alert.alert('Invalid Amount')
        } else {
          if(installmentAmountdb==="Infinity" || installmentAmountdb==="NaN" || interestRatedb===""){
            Alert.alert("Error! Enter Valid Interest Rate and Installment Amount")
          }else{
            if(modedb==="Mode"){
              Alert.alert("Choose Payment mode")
            }else{
                  // if(parseInt(interestdb)<1)
                // {
                //     Alert.alert('Invalid Interest Rate')
                // }else{
                  // console.log(bookid, amount, date, duedated, give, take, attachment, remarks, partner_contact, contactid, typedb, modedb, installmentdb, totalMonths,interestdb, loanName, installmentAmountdb)
                    setModalVisible(true);
                    if(give === 1 && take ===0){
                         
                         
                        await dbObject.setLoanGivenRecord(bookid, amount, date, duedated, give, take, attachment, remarks, partner_contact,customerName, contactid, typedb, modedb, installmentdb, totalMonths,interestdb, loanName, installmentAmountdb)

                    }
                    if(give===0 && take === 1){
                        await dbObject.setLoanTakenRecord(bookid, amount, date, duedated, give, take, attachment, remarks, partner_contact,customerName, contactid, typedb, modedb, installmentdb, totalMonths,interestdb, loanName, installmentAmountdb)

                    }
                   
                    storeObject.setLoanRecords({bookid, amount, date, duedated, give, take, attachment, remarks, partner_contact, contactid, typedb, modedb, installmentdb, totalMonths,interestdb, loanName, installmentAmountdb})

                    setTimeout(function(){
                        navigation.goBack()
                    },2000)
            // }
            }
          }



        }

    }
}


const styleI = StyleSheet.create({
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
    const { personals, booksData } = state
    return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(YouGaveScreenLoan)
