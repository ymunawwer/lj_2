import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal'
import storeObject from "../store/store";
import dbObject from "../components/database/db";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setExistingCustomers} from "../redux/actions/booksDataActions";
import {RoundedInput} from "../components/UI_components/Inputs";
import {backupNewCustomer} from "../components/Logic_Repository/backupLogics";

function AddNewCustomerScreen(props) {
  const  { navigation, isCustom = false } = props

    const [customerName, setCustomerName] = useState(null)
    const [ph_no, setPhoneNumber] = useState(null)
    const [savedCustomerName, setSavedCustomerName] = useState(null)
    const [savedPh_no, setSavedPhoneNumber] = useState(null)
    const [countryCode, setCountryCode] = useState('IN')
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const defaultCountry = {
            "callingCode":[
                "91",
                ],
            "cca2": "IN",
            "currency":[
                "INR",
                ],
            "flag": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAqZQTFRF53MA5HIC43ID53MB9XcA+3oA9ngA53QB83cA6XMCpV8oX0hPR0RkSUVlXkdPpF8o53EA428B9ncArmIkL0OAG02vZo3TfJ3agqLcZYzTJFSzLkJ/6X0R6X0S5XsS+IQOl2E+BDqjgJ7X5eny5enz5uv05er05OjyjancCD6llmE+/fXu+/Ps///zvMPUCDefqbre8fP32ODwyNPpwMzmwc3mxNDo1N3u8fL3v8znEj+kucHS/////v//NVuwf5bK9/n7vcrkma3WgZnMf5fLlKnUusjjzdfr+Pn7iZ/OOmCz/f7///7+/Pz9tcPgGUWh4efz2eDwvMrkf5nMXH2+aojDa4jEW3y9gJnMuMbi6u/3Jk+ms8Hf+/z9aofDXn2+9ff70Nrsm6/XXHy+jKPRxNDnxdHol6vVWXq8kqfTz9ns9vj7co3Ga4fD/P3+UHK5dZDI8fT5w8/ngpvNaIbDxM/nvMnku8jkcIzGfZfLws7m8/b6iaDQU3W6dI/H8vT6aIbCu8nkucfjydTpepXK9Pb6UnS67vL4ztfrmKzWWnu9kKbTmK3WW3u9kqjTy9Xq8PP5cY3GbIjD/v/+GEWh4ujz1t7ugZrNbInEfJbL7fH4JlCns8LgOVuxfpbKzNbqlqrUfpbLe5TKytTqj6XRPWCz/v7/8fju7vXt/v/zssXUCTigs8Hi8fT309zuxtHo0Nns7vL2wMznFECkr8LT///0QJkUQJoUPpcVSKIRKHVADDqki6DY4+ny4ujy4Oby4ejyl6ndEj+mJ3Q/LpAAL5AALI4BNZgAJHomD0iAJk6xd47Uip7bjqHceI7VLlW0LY4BM5IEM5MEMZEFNZcAMpMDIXUqDFZQDE9lDlBmDFVQMpIDNpgAOJsANpkAOZsAMZEGMpEFwJ5XlQAAAAFiS0dEPKdqYc8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAGtSURBVDjLY2AY1oCRiRGICCtjZmFlY2NlYcZQyo4CGDk4ubh5ePn4OTkYUWUYBJCBoJCwiKiYuISklLSwkCCKFIMMAsjKySsoKimrqKqpq2toasnLySJJMmgjgI6unr6BoZGxiamZuYWllbWuDpIkgw0c2NrY2tk7mDk6Obu4url7eHp5A4XggMEHDnxt/PwDAoOCQ0LDwiMi3aOiY2x8EbJIJsbaxMUnJCYlp6SmpWdkZmXn5AKFECYimHk2+QWFRcUlpWXlxhWVVdU1tUAhHArr6k0jGooam5orWkxaa9pwKIy1yY1v7+js6k4t6unt658wcRKK1ZPhINbGb8rUaeXTw0NndM1sMp81e45NLEIWJXhs5s5zmF+2YOGivsjFDkuWLkMJnuUIsGLlqtVr1q5bXxZUumHjps1btq5AkmTYhgDbd+zctXvP3n1T9x/Ye/DQ4Z07tiNJMhxBAkePHT9x8tTpM2fPnT954viFo8hyDBeRwKVLl69cvXb9xs1b125fuXzpErIcw21UcPn2nbv37t2/A2SgAnSFQKUPHj58cBlDGFMhDjAUFAIALMfjyKVz+egAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTAtMDdUMTM6MTQ6MzQrMDI6MDDj9ijFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTEwLTA3VDEzOjE0OjM0KzAyOjAwkquQeQAAAABJRU5ErkJggg==",
            "name": "India",
            "region": "Asia",
            "subregion": "Southern Asia",
        }

        setCountry(defaultCountry)

        return () => setCountry(null)

    }, [])

    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    }

    function validatePhoneNumber(ph_no) {
        if(ph_no != null && ph_no !== '') {
            let regExp = /^\d{10}$/;
            return regExp.test(ph_no)
        }
        else {
            return false
        }

    }

    function validateSaved() {

        const fullPhoneNum = '+' + country.callingCode[0] + ph_no.toString()

        return savedPh_no === fullPhoneNum && customerName === savedCustomerName;

    }
    function PhoneNumberEntry(isCustom) {
      return (
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'black',
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 6,
              backgroundColor: 'white',
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/*
                        Object {
                              "callingCode": Array [
                                "91",
                              ],
                              "cca2": "IN",
                              "currency": Array [
                                "INR",
                              ],
                              "flag": "data:image/png;base64,iVBORw0KGgoAAAANS......",
                              "name": "India",
                              "region": "Asia",
                              "subregion": "Southern Asia",
                            }

                        */}

            <CountryPicker
              {...{
                countryCode,
                withFilter: true,
                withFlag: true,
                withAlphaFilter: true,
                withCallingCode: true,
                withEmoji: false,
                withCallingCodeButton: true,
                onSelect,
              }}
            />

          </View>


          <RoundedInput
            containerStyle={{flex:1}}
            label={"Customer phone number"}
            placeholder={"Customer phone number"}
            value={ph_no}
            onChangeText={text => setPhoneNumber(text)}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />

        </View>
      );
    }

    function _renderPhoneNumberEntry() {
        if (isCustom === false && customerName != null && customerName !== '') {
          return PhoneNumberEntry(isCustom)
        } else if(isCustom && props?.customerName != null && props?.customerName !== '') {
          return PhoneNumberEntry(isCustom)
        }
        else {
          return null
        }
    }

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>


              <RoundedInput
                label={"Customer Name"}
                placeholder={"Customer name..."}
                value={isCustom? props?.customerName : customerName}
                onChangeText={text => {
                  if(isCustom) {
                    props?.onChangeTextCustomerName(text)
                  }
                  else {
                    setCustomerName(text)
                  }
                }}
              />


            {_renderPhoneNumberEntry()}

            <View style={{position: 'absolute', bottom: 0, width: "100%"}}>
                <View style={{marginBottom: 6}}>
                    <View style={{margin: 10}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: customerName == null || customerName === '' || ph_no == null || ph_no === '' || validatePhoneNumber(ph_no) === false || validateSaved() === true? 'grey' : '#4e54c8',
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 6
                            }}
                            disabled={customerName == null || customerName === '' || ph_no == null || ph_no === '' || validatePhoneNumber(ph_no) === false || validateSaved() === true}
                            onPress={() => {
                              (async () => {
                                if(isCustom) {
                                  props?.onPressSaveBtn()
                                }
                                else {
                                  await handleSaveBtn()
                                }

                              })();

                            }}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold'}}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )

    async function handleSaveBtn() {
        try {

            const fullPhoneNumber = '+' + country.callingCode[0] + ph_no.toString()

            const bookId = props.personals.currentBookId
            const res = await dbObject.checkAndInsertContact(fullPhoneNumber, bookId, customerName, storeObject.getOpenLoan())

            if (res === 1) {
              const updatedContacts = await dbObject.getExistingContacts(bookId)
              props.setExistingCustomers(updatedContacts)
              const recent = updatedContacts[0]

              setSavedCustomerName(customerName)
              setSavedPhoneNumber(fullPhoneNumber)

              //TODO: uncomment while building the app
              /**const backupRes = await backupNewCustomer(recent.recordid, bookid, props.booksData.currentBookData.remoteid, phone.toString(), name, recent.lastupdated, loan, recent.address, recent.rAmount, recent.pAmount, recent.netAmount)
               if(backupRes.statusCode === 200) {
               const customerRemoteId = backupRes.customersRemoteId
               await dbObject.setRemoteIdContactWithRecord(recent.recordid, customerRemoteId)
              }**/


                Alert.alert('Customer Saved')
            } else {
                console.log('error occurred')
            }

        } catch (e) {
            Alert.alert('some error occurred')
            console.log(e)
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
    setExistingCustomers
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCustomerScreen)

