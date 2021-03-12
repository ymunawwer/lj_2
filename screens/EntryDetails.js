import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import {styles} from '../styles/globalStyle';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import dbObject from '../components/database/db';
import storeObject from "../store/store";



export default function EntryDetails(props) {

    const [mRecords, setRecords] = useState([])
    const [mIsLoan, setIsLoan] = useState(null)
    
 

    useEffect(() => {
       
        (async () => {
            console.log("store loan", storeObject.getRecordLoanYes()===1)
            console.log("store", storeObject.getRecordId())
            try {
               
                if(storeObject.getRecordLoanYes()===0){
                    const records = await dbObject.getRecordById(storeObject.getRecordId())
                    setRecords(records)
                    console.log("records attachment", records)
                     setIsLoan(0)
                }else{
                    const records = await dbObject.getLoanRecordById(storeObject.getRecordId())
                    console.log('loanrecord',records)
                    setRecords(records)
                    setIsLoan(1)
                }
            }
            catch (e) {
                console.log('error',JSON.stringify(e))
            }

        })();

    }, []);


    return (
        <View style={{flex:1}}>
            
            <View style={[styles.container,{backgroundColor:'#4e54c8'}]}>

            

            {/* One Contact */}
                        <View style={[styles.row, stylesI.oneCustomer,{borderRadius:0,borderTopEndRadius:5,borderTopLeftRadius:5}]}>

                            {/* Initials */}
                            <View style={styles.initialsCont}>
                                <Text style={styles.initialText}>{mRecords?mRecords[0].partner_contact[0]:console.log('')}</Text>

                            </View>
                            {/* Initials */}

                            <View style={styles.cNameTimeCont}>
                                <Text style={styles.cName}>{
                                    mRecords?mRecords[0].partner_contact:console.log('')
                                }</Text>
                                <Text style={[styles.greyTextSm, {margin: 0, paddingHorizontal: 0}]}>{

                                   mRecords?mRecords[0].date.slice(0,25):console.log('')
                                }</Text>
                            </View>

                            {
                                mRecords?mRecords[0].take===1?
                                <View style={{alignItems:'flex-end'}}>
                                    <Text style={[styles.greyTextSm, {margin: 0, paddingHorizontal: 0}]}>You Got</Text>
                                </View>:<View style={{alignItems:'flex-end'}}>
                                    <Text style={[styles.greyTextSm, {margin: 0, paddingHorizontal: 0}]}>You Gave</Text>
                                </View>:console.log('')
                            }
                            </View>
                    {/* One Contact End */}

                    <View style={{borderBottomWidth: .2, borderBottomColor: '#dedede'}}/>

                    
                        
                    {
                        mIsLoan===0?
                        mRecords?mRecords[0].take===0?
                        <View style={[styles.row,{borderRadius:0}]}><Text>Running Balance</Text><Text style={styles.giveAmountText}>₹{mRecords[0].amount}</Text></View>
                        :<View style={[styles.row,{borderRadius:0}]}><Text>Running Balance</Text><Text style={styles.takeAmountText}>₹{mRecords[0].amount}</Text></View>:
                        console.log(''):
                        mRecords?mRecords[0].take===0?
                        <View style={[styles.row,{borderRadius:0}]}><Text>Running Balance</Text><Text style={styles.giveAmountText}>₹{(getTotalAmount(mRecords[0].amountGiven, mRecords[0].interest, mRecords[0].installment, mRecords[0].totalMonths) + mRecords[0].amountGiven)}</Text></View>
                        :<View style={[styles.row,{borderRadius:0}]}><Text>Running Balance</Text><Text style={styles.takeAmountText}>₹{(getTotalAmount(mRecords[0].amountTaken, mRecords[0].interest, mRecords[0].installment, mRecords[0].totalMonths) + mRecords[0].amountTaken)}</Text></View>:
                        console.log('')
                    }
                        
                   

                    <View style={{borderBottomWidth: .2, borderBottomColor: '#dedede'}}/>

                    <View style={{alignItems:'center',backgroundColor:'white', height:40,justifyContent:'center',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
                        <TouchableOpacity>
                         {/* <Text style={[styles.blueTextSm]}> <Entypo name="edit" size={18} color="#4e54c8" />   EDIT ENTRY</Text> */}
                        </TouchableOpacity>
                    </View>
            </View>

            <View style={[styles.container]}>
                    <View style={[styles.container,{backgroundColor:'white',borderRadius:5}]}>
                    <View style={{marginBottom:10}}>
                        <Text><MaterialIcons name="sms" size={18} color="black" /> SMS disable</Text>
                        </View>

                        <View style={{borderBottomWidth: .2, borderBottomColor: '#dedede'}}/>

                        <View>
                            <Text style={[stylesI.greyTextSm]}>{mRecords?"You gave ₹"+mRecords[0].amountGiven+" to "+mRecords[0].partner_contact:console.log('')}</Text>
                            {mRecords?mRecords[0].remarks!=""?<Text style={[stylesI.greyTextSm]}>{mRecords[0].remarks}</Text>:console.log(''):console.log('')}
                            {mRecords?mRecords[0].type?<Text style={[stylesI.greyTextSm]}>{mRecords[0].type}</Text>:console.log(''):console.log('')}
                            {mRecords?mRecords[0].attachment!='null'?<View style={[{marginRight:2}]}><Image style={{width: 100, height: 100,borderRadius:8}} source={{ uri: mRecords[0].attachment}}/></View>:console.log(''):console.log('')}
                            {
                                mIsLoan===1?
                                    mRecords?
                                    <View >
                                        {
                                            mRecords[0].give === 1 ?
                                                <Text
                                                    style={[styles.greyTextSm, styles.giveAmountText]}>{'Principal ₹ ' + mRecords[0].amountGiven}</Text> :
                                                <Text
                                                    style={[styles.greyTextSm, styles.takeAmountText]}>{'Pricipal ₹ ' + mRecords[0].amountTaken}</Text>
                                        }
                                        
{ 
   
                    mRecords[0].give === 1 ?
                    <View >
                                        <Text
                                            style={[styles.greyTextSm, styles.boldText, {color: "#f9c032"}]}>{' Interest         + ₹ ' + getTotalAmount(mRecords[0].amountGiven, mRecords[0].interest, mRecords[0].installment, mRecords[0].totalMonths)}</Text>
                                        <Text
                                            style={[styles.greyTextSm, styles.boldText, {color: "black"}]}>{' Final              = ₹ ' + (getTotalAmount(mRecords[0].amountGiven, mRecords[0].interest, mRecords[0].installment, mRecords[0].totalMonths) + mRecords[0].amountGiven)}</Text>
                                       </View>
: <View >
<Text
    style={[styles.greyTextSm, styles.boldText, {color: "#f9c032"}]}>{' Interest         + ₹ ' + getTotalAmount(mRecords[0].amountTaken, mRecords[0].interest, mRecords[0].installment, mRecords[0].totalMonths)}</Text>
<Text
    style={[styles.greyTextSm, styles.boldText, {color: "black"}]}>{' Final              = ₹ ' + (getTotalAmount(mRecords[0].amountTaken, mRecords[0].interest, mRecords[0].installment, mRecords[0].totalMonths) + mRecords[0].amountTaken)}</Text>
</View>
                                    
                            }
                                    </View>:console.log(''):console.log('')
                            }

                            {/*<Text style={[stylesI.greyTextSm]}>You'll give ₹ 9000 in total</Text>
                            <Text style={[stylesI.greyTextSm]}>See txn history</Text>*/}
                        </View>


                    </View>
            </View>

            <View style={[styles.row,{alignItems:'center',margin:10,marginVertical:5,height:50,borderRadius:5}]}>
            {mRecords?mRecords[0].uploaded===1?<Text> <MaterialIcons name="backup" size={16} color="black" /> Entry is backed up</Text>:<Text> <MaterialIcons name="backup" size={16} color="black" /> Entry is not backed up</Text>:console.log('')}
        </View>

        <View style={[styles.row,{position:'absolute',bottom:0,width:'100%'}]}>

        <TouchableOpacity style={[{width:'49%',borderWidth:1,borderColor:'red',padding:12,borderRadius:6,justifyContent:"center",alignItems:'center',flexDirection:'row',margin:3}]}>
        <AntDesign name="delete" size={20} color="red" /><Text style={[styles.boldText,{color:'red'}]}> DELETE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[{width:'49%',padding:12,borderRadius:6,justifyContent:"center",alignItems:'center',flexDirection:'row',margin:3,backgroundColor:'#4e54c8'}]}>
        <AntDesign name="sharealt" size={20} color="white" /><Text style={[styles.boldText,{color:'white'}]}> SHARE</Text>
        </TouchableOpacity>


</View>



        </View>
    )
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




const stylesI = StyleSheet.create({

    headerBtn: {
        marginRight: 14
    },

    oneCustomer: {
        // backgroundColor: 'transparent',
        borderBottomColor: "#dedede",
        borderBottomWidth: .4
    },

    headerBtns: {
        borderWidth: 1,
        borderColor: '#4287f5',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 25
    },
    greyTextSm:{
        marginVertical:5,
        color:'gray',
        fontSize:14
    }
});
