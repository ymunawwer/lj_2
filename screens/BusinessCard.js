import React, {useRef, useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {styles} from '../styles/globalStyle';
import HTMLView from 'react-native-htmlview';
import * as FileSystem from 'expo-file-system';
import { FontAwesome5 } from '@expo/vector-icons';
import dbObject from '../components/database/db';
import saveCardInMediaLibrary from "../components/Logic_Repository/saveInMediaLibrary";
import writeFileAsBase64 from "../components/Logic_Repository/writeFileAsBase64";
import {captureRef} from "react-native-view-shot"
import shareMedia from "../components/Logic_Repository/shareMedia";
import fetchTemplate from "../components/Logic_Repository/fetchTemplate";
import templateObjects from "../components/Logic_Repository/getTemplateNames";

export default function BusinessCard() {

    const [flatListData, setFlData] = useState([])
    const viewShotRef = useRef(null)
    const [PersonalData,setPersonalData ]= useState([])
    
    // [{
    //     BUSINESS_NAME: "Lekha Jokha",
    //     USER_NAME:"charlie",
    //     PH_NO:9999999999,
    //     BUSINESS_TYPE:"Aluminium casting",
    //     ADDRESS:"Earth",
    //     EMAIL:"lekhajhokadb@gmail.com"
    // },
    // {
    //     BUSINESS_NAME: "Lekha Jokha",
    //     USER_NAME:"charlie",
    //     PH_NO:9999999999,
    //     BUSINESS_TYPE:"Aluminium casting",
    //     ADDRESS:"Earth",
    //     EMAIL:"lekhajhokadb@gmail.com"
    // }]

    useEffect(
        ()=>{
        (async () => {
        let data =await dbObject.getVisitingCard();
        console.log('log',data['_array'])
        setPersonalData(data['_array']);
        // code to run on component mount
        getTemplates(data)
    })()
}, [])


    async function getTemplates(PersonalData) {

        console.log("Data", PersonalData['_array'])
       
      
            PersonalData['_array'].forEach(function(item) {
                fetchTemplate(templateObjects[0].templateRequire)
                    .then(function(str) {
                        const str1 = str.replace("${BUSINESS_NAME}", item.BUSINESS_NAME)
                        const str2 = str1.replace("${BUSINESS_TYPE}", item.BUSINESS_TYPE)
                        const str3 = str2.replace("${PH_NO}", item.PH_NO.toString())
                        const str4 = str3.replace("${EMAIL}", item.EMAIL)
                        const str5 = str4.replace("${ADDRESS}", item.ADDRESS)
                        const str6 = str5.replace("${USER_NAME}", item.USER_NAME)
                        const data = {
                            id:templateObjects[0].templateName.slice(0, -5),
                            template_ID:templateObjects[0].templateName.slice(0, -5),
                            htmlContent:str6
                        }
                        console.log(str6)
    
                        setFlData(flatListData => [...flatListData, data])
                        console.log(flatListData)
                    })
                    .catch(function (e) {
                        console.log(e)
                    })
            })
            
     
      
    }


    const handleDownload = async (templateId, shouldReturn) => {
        try {
            const fileName = templateId + Date.now() + '.png'
            const data = await captureRef(viewShotRef.current, {result:"base64"})
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "BusinessCards/", {intermediates:true})
            const privateUri = await writeFileAsBase64(data, FileSystem.documentDirectory + "BusinessCards/" + fileName)
            const mediaLibraryUri = await saveCardInMediaLibrary(privateUri, true)
            //TODO: save these two uris in database
            console.log(mediaLibraryUri)
            if(shouldReturn === true) {
                return privateUri
            }
        }
        catch(e) {
            alert('something went wrong')
            console.log(e)

        }

    }

    const handleShare = async (templateId) => {
        try {
            const mediaUri = await handleDownload(templateId, true)
            console.log(mediaUri)
            await shareMedia(mediaUri, 'image/png', 'Share this Business Card...', 'image/png')
        }
        catch(e) {
            console.log(e)
        }
    }


    const renderItem = ({item}) => {
        return (
            <View style={[styles.wrapper, {flexDirection:"row"}]}>
                <View ref={viewShotRef} style={[styles.wrapper, mStyle.card]}>
                    <HTMLView
                        value={item.htmlContent}
                    />
                </View>

                <View style={[mStyle.iconsContainer]}>
                    <TouchableOpacity
                        style={mStyle.icons}
                        onPress={() => handleDownload(item.template_ID, false)}
                    >
                        <FontAwesome5 name="download" size={20} color="#FF6347"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mStyle.icons}
                        onPress={() => handleShare(item.template_ID)}
                    >
                        <FontAwesome5 name="share-alt" size={20} color="#228B22"/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const FlatListItemSeparator = () => {
        return (
            <View>
                <View
                    style={{
                        height: 10,
                        width: "100%",
                        backgroundColor: "white",
                    }}
                />

            </View>

        );
    }

    return (
        <View style={[styles.wrapper, styles.container, {backgroundColor:"white"}]}>
            <FlatList
                data={flatListData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={FlatListItemSeparator}
                style={[styles.wrapper]}
            />

        </View>
    );

}

const mStyle = StyleSheet.create({
    card:{
        justifyContent:'center',
        alignItems:'center',
        height:200,
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        elevation:2,
    },

    iconsContainer: {
        justifyContent:'center',
        alignItems:'center',
    },

    icons: {
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius: 200,
        marginLeft:10,
        marginVertical:10,
        backgroundColor: '#F5F5DC'
    }
})
