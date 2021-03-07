import React, {useState, useEffect} from 'react';
import { View, Text,TextInput, StyleSheet, ProgressBarAndroid, Image, TouchableOpacity} from 'react-native';
import {styles} from '../styles/globalStyle';
import { Feather } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import dbObject from "../components/database/db";
import layout from '../constants/Layout'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setCurrentBookData, setUser} from "../redux/actions/personalsActions";
import {setAllActiveBooks} from "../redux/actions/booksDataActions";
import apiRequest from "../components/Logic_Repository/apiRequest";
import reactNativeImagePicker from "../components/Logic_Repository/searchLibrary/reactNativeImagePicker";
import openImagePickerAsync from "../components/Logic_Repository/openImagePickerAsync";

function ProfileEditScreen(props) {

    const { navigation } = props

    const [ph_no, setPhoneNumber] = useState(null)
    const [name, setUserName] = useState(null)
    const [businessName, setBusinessName] = useState(null)
    const [isProgress, setIsProgress] = useState(false)
    const [profilePic, setProfilePic] = useState(null)
    const user = auth().currentUser

    useEffect(() => {

        setUserName(user.displayName)
        setPhoneNumber(user.phoneNumber)
        setBusinessName(props.personals.currentBookData['name'])
        //setProfilePic(props.personals.user['photourl'])

    }, [])

    // function to save changed data
    async function handleSave() {
        setIsProgress(true)
        try{
            if(!user.displayName && name === null || name === '') {
                setUserName(user.displayName)
            }

            await user.updateProfile({
                displayName:name
            })

            //check business name and set it accordingly
            if(businessName === null || businessName === '') {
                setBusinessName(props.personals.currentBookData['name'])
            }

            await updateSqlite()

            //TODO: uncomment this
            //await updateFirestore()

            setIsProgress(false)
        }
        catch (e) {
            setIsProgress(false)
            console.log(e)
        }
    }

    // function to update changes in sqlite
    async function updateSqlite() {
        //change full name in dbObject
        await dbObject.setFullName(name)

        // setBusinessName in sqlite
        await dbObject.updateBookName(props.personals.currentBookId, businessName)

        // update current book data in redux
        const currBookData = props.personals.currentBookData
        props.setCurrentBookData({...currBookData, name:businessName})

        // update all active books data in redux
        let allActiveBooks = props.booksData.allActiveBooks
        const currId = props.personals.currentBookId
        allActiveBooks[currId - 1] = {...currBookData, name:businessName}
        props.setAllActiveBooks(allActiveBooks)

        const updatedData = await dbObject.getUserData()
        props.setUser(updatedData)
    }

    // function to update changes in firestore
    async function updateFirestore() {
        const firestoreData = {
            displayName: name,
            updateAuth: false
        }

        //update data in firestore
        const apiRes = await apiRequest('post', 'updateUserData', firestoreData, 'json', true)
    }

    const openImagePicker = async() => {

        try {
            const pickerResult = await openImagePickerAsync(true, false)
            if (pickerResult.cancelled === true) {
                return;
            }
            setProfilePic(pickerResult)
            await dbObject.setPhotoUrl(pickerResult.uri)
            let userData = props.personals.user
            props.setUser({photourl: pickerResult.uri, ...userData})
        }
        catch (e) {
            alert("something went wrong")
            console.log(e)
        }
    }

    return (
        <View style={{alignItems:'center',paddingTop:20,flex:1,backgroundColor:'white', marginHorizontal:10}}>

            <View style={{width:layout.window.width, position:"absolute", top:0}}>
                <ProgressBarAndroid styleAttr={"Horizontal"} animating={isProgress} color={'#4e54c8'}/>
            </View>

            <View>
                <TouchableOpacity onPress={() => openImagePicker}>

                    {/*
                        profilePic ?
                          <View style={{height:200,width:200,borderRadius:200/2,backgroundColor:'#4e54c8',alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontSize:60,color:'white'}}>H</Text>
                          </View>
                          :
                          <Image
                            style={{width:200,height:200,borderRadius:200/2,borderWidth:1,borderColor:'#dedede'}}
                            source={{uri: profilePic.uri}} />
                   */ }

                    <View style={{height:200,width:200,borderRadius:200/2,backgroundColor:'#4e54c8',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:60,color:'white'}}>H</Text>
                    </View>

                    <View style={{
                        width:40,height:40,borderRadius:40/2,alignItems:'center',justifyContent:'center',backgroundColor:'#2b4ff0',
                        position:'absolute',
                        bottom:'5%',
                        right:'5%'
                    }}>
                        <Feather name="edit-2" size={24} color="white" />
                    </View>
                </TouchableOpacity>

            </View>

            <View style={{marginTop:30}}>
                <TextInput
                    style={[styles.nInput, stylesI.input]}
                    placeholder="Your Name"
                    value={name}
                    onChangeText={name => setUserName(name)}
                />
                <TextInput
                    style={[styles.nInput, stylesI.input]}
                    placeholder="Business Name"
                    value={businessName}
                    onChangeText={b_name => setBusinessName(b_name)}
                />
                <TextInput
                    style={[styles.nInput, stylesI.input]}
                    placeholder="Registered Phone Number"
                    value={ph_no}
                    onChangeText={ph_no => setPhoneNumber(ph_no)}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    editable={false}
                />

            </View>

            <View style={{position:'absolute', bottom:'1%',width:'100%', backgroundColor:"#4e54c8",borderRadius:6}}>
                <TouchableOpacity
                    style={{width:'100%',alignItems:'center',justifyContent:'center', padding:10}}
                    onPress={() => handleSave()}
                >
                    <Text style={{color:'white'}}>SAVE</Text>
                </TouchableOpacity>
            </View>


        </View>
    )

}


const stylesI=StyleSheet.create({
    input:{
        maxWidth:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#dedede',
        elevation:0
    },
    button:{
        height:60
    }
});

const mapStateToProps = (state) => {
    const { personals, booksData } = state
    return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      //all actions come here
      setCurrentBookData,
      setAllActiveBooks,
      setUser
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)

