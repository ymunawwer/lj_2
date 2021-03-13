import React,{useState} from 'react';
import {View, Text, TextInput, StyleSheet, Picker, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {styles} from '../styles/globalStyle';
import dbObject from '../components/database/db';


export default function BusinessCardEdit({navigation}) {
    const [BUSINESS_NAME,setBusinessName] = useState('')
    const [USER_NAME,setUserName] = useState(null)
    const [PH_NO,setPhNo] = useState(null)
    const [GST_NO,setGst] = useState(null)
    const [BUSINESS_TYPE,setBusinessType] = useState('Owner')
    const [ADDRESS,setAddress] = useState(null)
    const [EMAIL,setEmail] = useState(null)
    const [DESIGNATION,setDesignation] = useState(null)

    

    async function save(){

        console.log(BUSINESS_NAME , USER_NAME , parseInt(PH_NO) , GST_NO,BUSINESS_TYPE , ADDRESS , EMAIL,DESIGNATION )
        if(!BUSINESS_TYPE || !USER_NAME || !PH_NO || !GST_NO || !BUSINESS_TYPE || !ADDRESS || !EMAIL || !DESIGNATION){
            Alert.alert("All field mandatory")
        }else{
           let data = await dbObject.setVisitingCard(BUSINESS_NAME , USER_NAME , parseInt(PH_NO) , GST_NO,BUSINESS_TYPE , ADDRESS , EMAIL,DESIGNATION );
           navigation.goBack()
       }
    }
    return (
        <View style={{backgroundColor: 'white'}}>
            <ScrollView style={{paddingHorizontal: 10}}>

                <Text style={styles.boldText}><Entypo name="user" size={24} color="black"/> Personal Details</Text>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="Name" value={USER_NAME}
    onChangeText={name => setUserName(name)}/>

                <View style={stylesI.TextInput}>
                    <Picker
                        style={[{height: 30}]}
                        placeholder={BUSINESS_TYPE}
                        selectedValue={BUSINESS_TYPE}
                        onValueChange={(itemValue, itemIndex) => setBusinessType(itemValue)}
                    >
                        <Picker.Item label="Owner" value="owner"/>
                        <Picker.Item label="Partner" value="partner"/>
                        <Picker.Item label="Proprietor" value="proprietor"/>

                    </Picker>
                </View>

                <TextInput style={[stylesI.TextInput]} placeholder="Mobile Number" value={PH_NO} keyboardType={'numeric'}
    onChangeText={number => setPhNo(number)}/>
                <Text style={styles.boldText}><MaterialIcons name="business-center" size={24} color="black"/> Business
                    Card Details</Text>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="Business Name" value={BUSINESS_NAME}
    onChangeText={bName => setBusinessName(bName)}/>

                {/*<View style={stylesI.TextInput}>
                    <Picker
                        placeholder="Designation"
                        style={[{height: 30}]}
                        selectedValue={DESIGNATION}
                        onValueChange={(itemValue, itemIndex) => setDesignation(itemValue)}
                    >
                        <Picker.Item label="Office" value="owner"/>
                        <Picker.Item label="Office2" value="partner"/>
                        <Picker.Item label="Office3" value="proprietor"/>

                    </Picker>
                </View>*/}

                <TextInput style={[stylesI.TextInput]} placeholder="Business Email" value={EMAIL}
    onChangeText={email => setEmail(email)}/>

                <View style={stylesI.TextInput}>
                    <Picker
                        placeholder="Designation"
                        style={[{height: 30}]}
                        selectedValue={BUSINESS_TYPE}
                        onValueChange={(itemValue, itemIndex) => setDesignation(itemValue)}
                    >
                        <Picker.Item label="Business Type" value="owner"/>
                        <Picker.Item label="Office2" value="partner"/>
                        <Picker.Item label="Office3" value="proprietor"/>

                    </Picker>
                </View>

                <TextInput style={[stylesI.TextInput]} placeholder="GST Number" value={GST_NO} selectedValue={GST_NO}
    onChangeText={email => setGst(email)}/>
                <Text style={styles.boldText}><MaterialIcons name="business-center" size={24} color="black"/> Shop
                    Office Address</Text>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="Address Line 1" value={ADDRESS}
    onChangeText={address => setAddress(address)}/>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="Address Line 2"/>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="City/District"/>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="State"/>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="Postal Code"/>
                <TextInput style={[stylesI.TextInput, {marginTop: 20,marginBottom:80}]} placeholder="Country"/>

            </ScrollView>

            <View style={[styles.container, {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: 'white',
                zIndex: 2
            }]}>
                <TouchableOpacity style={{
                    backgroundColor: '#4e54c8',
                    width: '100%',
                    alignItems: 'center',
                    padding: 15,
                    borderRadius: 6
                }}  onPress={save}>
                    <Text style={[styles.normalText, {color: "white"}]}>SAVE</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const stylesI = StyleSheet.create({

    TextInput: {

        marginBottom: 10,
        padding: 15,
        borderWidth: .5,
        borderColor: '#333',
        borderRadius: 6
    },
    Picker: {

        // marginVertical:15,
        // padding:15,
        // borderWidth:.5,
        // borderColor:'#333',
        // borderRadius:6
    }


});
