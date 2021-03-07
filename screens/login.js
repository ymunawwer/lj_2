import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ProgressBarAndroid,
} from 'react-native';
import {styles} from '../styles/globalStyle';
import dbObject from "../components/database/db";
import auth from '@react-native-firebase/auth';
import RBSheet from "react-native-raw-bottom-sheet";
import CountryPicker from 'react-native-country-picker-modal'
import layout from '../constants/Layout';
import {bindActionCreators} from "redux";
import {setIsLoggedIn} from "../redux/actions/personalsActions";
import {connect} from "react-redux";

function Login(props) {



  const refRBSheet = useRef(null)

  const [isProgress, setIsProgress] = useState(false)
  const [autoVerificationProgress, setAutoVerificationProgress] = useState(true)

  const [ph_no, setPhoneNumber] = useState('')
  const [verificationId, setVerificationId] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [alreadyVerifiedAuto, setAlreadyVerifiedAuto] = useState(false)

  const [countryCode, setCountryCode] = useState('IN')
  const [country, setCountry] = useState(null)

  const setUserDataInSqlite = async (user) => {
    try {
      await dbObject.setPhoneNo(user.phoneNumber)
      user.displayName === undefined ? await dbObject.setFullName(null) : await dbObject.setFullName(user.displayName)
      await dbObject.setFirstSignIn(user.metadata.creationTime)
      user.metadata.lastSignInTime === undefined ? await dbObject.setLastSignIn(null) : await dbObject.setLastSignIn(user.metadata.lastSignInTime)
      user.email === undefined ? await dbObject.setEmail(null) : await dbObject.setEmail(user.email)
      await dbObject.setIsEmailVerified(user.emailVerified)
      user.photoURL === undefined ? await dbObject.setPhotoUrl(null) : await dbObject.setPhotoUrl(user.photoURL)
      await dbObject.setUid(user.uid)
    } catch (e) {
      new Promise.reject(e)
    }

  }

  // Handle user state changes
  async function onAuthStateChanged(user) {
    try {
      if (user) {
        await setUserDataInSqlite(user)
        refRBSheet.current.close()
        props.setIsLoggedIn(true)

        setIsProgress(false)

      } else {
        // User is signed out.
        // ...
      }
    } catch (e) {
      props.setIsLoggedIn(false)
      setIsProgress(false)
    }

  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    const defaultCountry = {
      "callingCode": [
        "91",
      ],
      "cca2": "IN",
      "currency": [
        "INR",
      ],
      "flag": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAqZQTFRF53MA5HIC43ID53MB9XcA+3oA9ngA53QB83cA6XMCpV8oX0hPR0RkSUVlXkdPpF8o53EA428B9ncArmIkL0OAG02vZo3TfJ3agqLcZYzTJFSzLkJ/6X0R6X0S5XsS+IQOl2E+BDqjgJ7X5eny5enz5uv05er05OjyjancCD6llmE+/fXu+/Ps///zvMPUCDefqbre8fP32ODwyNPpwMzmwc3mxNDo1N3u8fL3v8znEj+kucHS/////v//NVuwf5bK9/n7vcrkma3WgZnMf5fLlKnUusjjzdfr+Pn7iZ/OOmCz/f7///7+/Pz9tcPgGUWh4efz2eDwvMrkf5nMXH2+aojDa4jEW3y9gJnMuMbi6u/3Jk+ms8Hf+/z9aofDXn2+9ff70Nrsm6/XXHy+jKPRxNDnxdHol6vVWXq8kqfTz9ns9vj7co3Ga4fD/P3+UHK5dZDI8fT5w8/ngpvNaIbDxM/nvMnku8jkcIzGfZfLws7m8/b6iaDQU3W6dI/H8vT6aIbCu8nkucfjydTpepXK9Pb6UnS67vL4ztfrmKzWWnu9kKbTmK3WW3u9kqjTy9Xq8PP5cY3GbIjD/v/+GEWh4ujz1t7ugZrNbInEfJbL7fH4JlCns8LgOVuxfpbKzNbqlqrUfpbLe5TKytTqj6XRPWCz/v7/8fju7vXt/v/zssXUCTigs8Hi8fT309zuxtHo0Nns7vL2wMznFECkr8LT///0QJkUQJoUPpcVSKIRKHVADDqki6DY4+ny4ujy4Oby4ejyl6ndEj+mJ3Q/LpAAL5AALI4BNZgAJHomD0iAJk6xd47Uip7bjqHceI7VLlW0LY4BM5IEM5MEMZEFNZcAMpMDIXUqDFZQDE9lDlBmDFVQMpIDNpgAOJsANpkAOZsAMZEGMpEFwJ5XlQAAAAFiS0dEPKdqYc8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAGtSURBVDjLY2AY1oCRiRGICCtjZmFlY2NlYcZQyo4CGDk4ubh5ePn4OTkYUWUYBJCBoJCwiKiYuISklLSwkCCKFIMMAsjKySsoKimrqKqpq2toasnLySJJMmgjgI6unr6BoZGxiamZuYWllbWuDpIkgw0c2NrY2tk7mDk6Obu4url7eHp5A4XggMEHDnxt/PwDAoOCQ0LDwiMi3aOiY2x8EbJIJsbaxMUnJCYlp6SmpWdkZmXn5AKFECYimHk2+QWFRcUlpWXlxhWVVdU1tUAhHArr6k0jGooam5orWkxaa9pwKIy1yY1v7+js6k4t6unt658wcRKK1ZPhINbGb8rUaeXTw0NndM1sMp81e45NLEIWJXhs5s5zmF+2YOGivsjFDkuWLkMJnuUIsGLlqtVr1q5bXxZUumHjps1btq5AkmTYhgDbd+zctXvP3n1T9x/Ye/DQ4Z07tiNJMhxBAkePHT9x8tTpM2fPnT954viFo8hyDBeRwKVLl69cvXb9xs1b125fuXzpErIcw21UcPn2nbv37t2/A2SgAnSFQKUPHj58cBlDGFMhDjAUFAIALMfjyKVz+egAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTAtMDdUMTM6MTQ6MzQrMDI6MDDj9ijFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTEwLTA3VDEzOjE0OjM0KzAyOjAwkquQeQAAAABJRU5ErkJggg==",
      "name": "India",
      "region": "Asia",
      "subregion": "Southern Asia",
    }

    setCountry(defaultCountry)

    return subscriber; // unsubscribe on unmount
  }, []);

  function validatePhoneNumber() {
    let regExp = /^\d{10}$/;
    return regExp.test(ph_no)
  }


  async function handleSignIn() {

    try {
      if (ph_no != null && ph_no !== '' && validatePhoneNumber()) {
        setIsProgress(true)

        const fullPhoneNum = '+' + country.callingCode[0] + ph_no.toString()

        /*const confirmation = await auth().signInWithPhoneNumber(fullPhoneNum);
        setVerificationId(confirmation);*/

        auth().verifyPhoneNumber(fullPhoneNum, 60, true)
          .on('state_changed', async (phoneAuthSnapshot) => {

            switch (phoneAuthSnapshot.state) {

              case auth.PhoneAuthState.AUTO_VERIFIED:
                setVerificationId(phoneAuthSnapshot.verificationId)
                setVerificationCode(phoneAuthSnapshot.code)
                await confirmCode(phoneAuthSnapshot.verificationId, phoneAuthSnapshot.code)
                setIsProgress(false)
                return (phoneAuthSnapshot)

              case auth.PhoneAuthState.CODE_SENT:
                setVerificationId(phoneAuthSnapshot.verificationId)
                refRBSheet.current.open()
                setIsProgress(false)
                return (phoneAuthSnapshot)

              case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
                setIsProgress(false)
                setVerificationId(phoneAuthSnapshot.verificationId)
                refRBSheet.current.open()
                return (phoneAuthSnapshot)


              case auth.PhoneAuthState.ERROR:
                if (phoneAuthSnapshot.error) {
                  Alert.alert(phoneAuthSnapshot.error.code)

                }

                new Promise.reject(phoneAuthSnapshot)
                break

            }

          })

      } else {
        if (ph_no == null && ph_no === '') {
          Alert.alert('Phone Number cannot be empty!')
        } else if (!validatePhoneNumber()) {
          Alert.alert('Please provide acceptable phone Number!')
        } else {
          Alert.alert('Something went wrong!')
        }
      }

    } catch (e) {
      Alert.alert("something went wrong")
      console.log(e)
      setIsProgress(false)
    }

  }

  async function confirmCode(id, code) {
    try {
      const credential = await auth.PhoneAuthProvider.credential(id, code)
      setAlreadyVerifiedAuto(true)
      return auth().signInWithCredential(credential)
    } catch (e) {
      console.log(e)
      Alert.alert(e.code)
      new Promise.reject(e)
    }
  }

  async function handleVerificationCode() {

    try {
      await confirmCode(verificationId, verificationCode)
    } catch (error) {
      Alert.alert("CODE INVALID !!")
      setIsProgress(false)
    }

  }

  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

  return (
    <View style={[styles.wrapper, styleI.container, {marginHorizontal: 5}]}>

      <View style={{width: layout.window.width, position: "absolute", top: 0}}>
        <ProgressBarAndroid styleAttr={"Horizontal"} animating={isProgress} color={'#4e54c8'}/>
      </View>

      <Image source={require('../assets/images/logopng.png')} style={{height:layout.window.width * 0.5, width: layout.window.width * 0.5}}/>

      <View style={{flexDirection: 'row'}}>
        <View style={{
          padding: 10,
          margin: 5,
          backgroundColor: 'white',
          borderRadius: 25,
          elevation: 1,
        }}>
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

        <TextInput
          style={{
            flex: 1,
            padding: 15,
            margin: 5,
            backgroundColor: 'white',
            borderRadius: 25,
            elevation: 1,
          }}
          placeholder="Phone Number"
          value={ph_no}
          onChangeText={ph_no => setPhoneNumber(ph_no)}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
        />
      </View>

      <TouchableOpacity
        style={[styles.container, {
          width: '100%',
          borderRadius: 25,
          padding: 15,
          marginTop: 10,
          backgroundColor: '#0255e3',
          alignItems: 'center'
        }]}
        onPress={() => {

          (async () => {
            try {
              await handleSignIn()
            }
            catch (e) {
              Alert.alert("error!!")
              console.log(e)
            }
          })();
        }}
      >
        <Text style={[styles.normalText, {color: 'white'}]}>Get OTP</Text>
      </TouchableOpacity>

      <View style={{marginTop: 10}}>
        <Text style={[styles.greyTextSm]}>SMS Charges may apply. *</Text>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        closeOnPressBack={true}
        height={250}
      >
        <View style={styleI.bottomSheetView}>

          <View style={{}}>
            <ProgressBarAndroid animating={autoVerificationProgress} color={'#4e54c8'}/>
            <Text>Auto Verifying...</Text>
          </View>

          <TextInput
            style={{
              width: '100%',
              padding: 15,
              margin: 5,
              backgroundColor: 'white',
              borderRadius: 25,
              elevation: 1,
            }}
            placeholder="Enter OTP"
            value={verificationCode}
            onChangeText={otp => setVerificationCode(otp)}
            editable={!!verificationId}
            keyboardType="phone-pad"
          />

          {/*<View style={{flexDirection:"row", width:"100%", marginHorizontal:5 }}>*/}
            <TouchableOpacity
              style={[ {
                borderRadius: 25,
                padding: 15,
                marginTop: 10,
                backgroundColor: !!verificationCode? '#0255e3': 'grey',
                alignItems: 'center',
                width:"100%"
              }]}
              onPress={() => handleVerificationCode()}
              disabled={!verificationId && !verificationCode}
            >
              <Text style={[styles.normalText, {color: 'white'}]}>GO</Text>
            </TouchableOpacity>

            {/*<TouchableOpacity
              style={[styles.container, {
                borderRadius: 25,
                padding: 15,
                marginTop: 10,
                backgroundColor: '#0255e3',
                alignItems: 'center'
              }]}
              onPress={() => handleVerificationCode()}
            >
              <Text style={[styles.normalText, {color: 'white'}]}>RESEND</Text>
            </TouchableOpacity>
          </View>*/}

        </View>
      </RBSheet>

    </View>
  )
}


const styleI = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSheetView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
});

const mapStateToProps = (state) => {
  const { personals, booksData } = state
  return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
    setIsLoggedIn
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login)
