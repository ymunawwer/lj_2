import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Picker, StyleSheet, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../styles/globalStyle';
import {AntDesign} from '@expo/vector-icons';
import storeObject from "../store/store";
import DatePicker from 'react-native-datepicker';

import dbObject from '../components/database/db'
import EntryDetails from './EntryDetails';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Print from 'expo-print';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'

function ViewReportScreenLoan(props) {

    const { navigation } = props

    const [mRecord, setRecord] = useState([])
    const [mGot, setGot] = useState(null)
    const [mGave, setGave] = useState(null)
    const [mNet, setNet] = useState(null)
    const [mNetNeg, setNetNeg] = useState(null)
    const [selectedValue,setSelectedValue] = useState("")
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    
    var today = new Date();
    var date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();
    
    function onStartDateChange(date){
        setSelectedStartDate(date)
      }
      function onEndDateChange(date){
        setSelectedEndDate(date)
      }


      async function filterData(){
        let endDate=new Date(selectedEndDate),
          startDate=new Date(selectedStartDate)
          endDate.setDate(endDate.getDate() + 1)
          startDate.setDate(startDate.getDate() - 1)
      
        const record = await dbObject.getRecord(props.personals.currentBookId)
        console.log(record)
        if(selectedStartDate!==null && selectedEndDate!==null ){
          
          setRecord(record.filter((val,index)=>{
           
            return new Date(val.date).getTime()>startDate.getTime() && new Date(val.date).getTime()<endDate.getTime()
          }))
        }
        if(selectedStartDate===null && selectedEndDate!==null){
          
          setRecord(record.filter((val,index)=>{
           
            return new Date(val.date).getTime()<endDate.getTime()
          }))
        }
        if(selectedStartDate!==null && selectedEndDate===null){
         
          setRecord(record.filter((val,index)=>{
           
            return new Date(val.date).getTime()>startDate.getTime() 
          }))
        }
        if(selectedStartDate===null && selectedEndDate===null){
          setRecord(record)
          
        }

        
       
      }
       // download share
  
  
  
      const Prints = 
      `<style>
      
      </style>
  
      <div id="demo">
    <h1>Lekha Jokha Report</h1>
    <h2>`+new Date()+`</h2>
    
    <table>
    <thead>
      <tr>
        <th>Book Id</th>
        <th> Name </th>
        <th> Contact </th>
        <th> Record Id </th>
        <th> Amount Given </th>
        <th> Amount Taken </th>
        <th>Type</th>
        <th> Date </th>
        
      </tr>
    </thead>
    <tbody>`
   
   const sharePdf = (url) => {
       Sharing.shareAsync(url)
   }
       
         
         
         const print = async (html) => {
           try {
             console.log(mRecord)
            mRecord.forEach(element => {
              html = html+`<tr>
                <td data-column="Book Id">`+element.bookId+`</td>
                <td data-column="Name">`+element.name+`</td>
                <td data-column="Contact">`+element.partner_contact+`</td>
                
                
                <td data-column="Record Id">  `+element.recordid+`  </td>
                <td data-column="Amount Given">  `+element.amountGiven+`  </td>
                <td data-column="Amount Taken">  `+element.amountTaken+`  </td>
                <td data-column="Type">    `+element.type+`  </td>
                <td data-column="Date">    `+element.date.substring(4, 15).toUpperCase() + " - " + element.date.substring(16, 21)+`  </td>
                
              </tr>`
              
            });
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
   
       // end
    

    useEffect(() => {
        (async () => {
            let totalGot = 0
            let totalGave = 0
            const record = await dbObject.getLoanRecord(props.personals.currentBookId)
            console.log("View Report record outside if ", record)

            setRecord(record)

            for (let entry of record) {
                if (entry.take === 1) {
                    totalGot += entry.amountTaken
                    console.log("Gave Entry = ", entry.amountTaken)
                } else {
                    totalGave += entry.amountGiven
                    console.log("Take Entry = ", entry.amountGiven)
                }
            }
            setGot(totalGot)
            setGave(totalGave)
            setNet(totalGave - totalGot)
            if (totalGave - totalGot < 0) {
                setNetNeg(1)
            } else {
                setNetNeg(0)
            }


        })();
    }, []);


    return (

        <View style={{flex: 1}}>
            <View style={[styles.container, {justifyContent: 'space-around', padding: 20, backgroundColor: '#4e54c8'}]}>


                <View style={[styles.row, {width: '100%', justifyContent: 'space-around', height: 50}]}>

                    {/* <Text style={[styles.boldText, styles.normalText, styles.blueText, {
                        width: '50%',
                        textAlign: 'center',
                        borderRightColor: '#dedede',
                        borderRightWidth: 1
                    }]}><AntDesign style={[styles.blueText]} name="calendar" size={18} color="black"/> START DATE</Text> */}
                    <TouchableOpacity style={{borderWidth: .4, borderColor: '#dedede'}}>
                        <View style={[styles.row, {justifyContent: 'center', width: 180, padding: 0, height: 40}]}>
                            <AntDesign name="calendar" size={24} />
                            <DatePicker
                                date={selectedStartDate}
                                mode="date"
                                placeholder="START DATE"
                                format="YYYY-MM-DD"
                                minDate="2000-06-01"
                                maxDate={selectedEndDate?selectedEndDate:today}
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
                                // onDateChange={(date) => {
                                //     duedate = date
                                //     // Alert.alert(duedate)
                                //     setDate(duedate)
                                // }}
                                onDateChange={(date) => { setSelectedStartDate(date);
                                  filterData()
                                  }}
                            />

                            {/* <AntDesign name="caretdown" size={10} color="red" /> */}
                        </View>
                    </TouchableOpacity>

                    {/* <Text style={[styles.boldText, styles.normalText, styles.blueText, {
                        width: '50%',
                        textAlign: 'center'
                    }]}><AntDesign style={[styles.blueText]} name="calendar" size={18} color="black"/> END DATE</Text> */}

<TouchableOpacity style={{borderWidth: .4, borderColor: '#dedede'}}>
                        <View style={[styles.row, {justifyContent: 'center', width: 180, padding: 0, height: 40}]}>
                            <AntDesign name="calendar" size={24} color={styles.blueText }/>
                            <DatePicker
                                date={selectedEndDate}
                                mode="date"
                                placeholder="END DATE"
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
                                // onDateChange={(date) => {
                                //     duedate = date
                                //     // Alert.alert(duedate)
                                //     setDate(duedate)
                                // }}
                                onDateChange={(date) => {
                                   setSelectedEndDate(date);
                                   filterData()
                                   }}
                            />

                            {/* <AntDesign name="caretdown" size={10} color="red" /> */}
                        </View>
                    </TouchableOpacity>


                </View>

                <View style={[styles.row, {
                    marginTop: 10,
                    height: 50,
                    justifyContent: 'space-between',
                    paddingHorizontal: 0,
                    paddingLeft: 10
                }]}>
                    <AntDesign name="search1" size={22} color="#4e54c8"/>
                    <TextInput style={{flex: 2, marginRight: 20, width: '60%'}} placeholder="Enter the name"/>

                    <Picker
                        style={[styles.blueText, {height: 50, width: '30%', backgroundColor: 'rgba(0,0,250,.1)'}]}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="All" value="All"/>
                        <Picker.Item label="Cash" value="Cash"/>
                        <Picker.Item label="Other" value="Other"/>
                    </Picker>

                </View>
            </View>

            <View style={[styles.row, {paddingVertical: 10, borderBottomColor: '#dedede', borderBottomWidth: 1}]}>
                <Text style={[styles.normalText]}>NET BALANCE</Text>
                {mNetNeg === 1 ? <Text style={[styles.takeAmountText]}>₹{-mNet}</Text> :
                    <Text style={[styles.giveAmountText]}>₹{mNet}</Text>}

            </View>

            <View>
                <View style={[styles.row, {elevation: 5}]}>
                    <View style={[{flex: 2, paddingVertical:5}]}>
                        <Text style={[styles.greyTextSm, {textAlign: 'left', paddingHorizontal: 0}]}>TOTAL</Text>
                        <Text style={styles.boldText}>Entries</Text>
                    </View>
                    <View style={{width: 90}}>
                        <Text style={[styles.greyTextSm, {textAlign: 'right', paddingHorizontal: 0}]}>YOU GAVE</Text>
                        <Text style={[styles.giveAmountText, {padding: 0, textAlign: 'right'}]}>₹{mGave}</Text>
                    </View>

                    <View style={[{textAlign: 'right'}]} style={{width: 90}}>
                        <Text style={[styles.greyTextSm, {textAlign: 'right', paddingHorizontal: 0}]}>YOU GOT</Text>
                        <Text style={[styles.takeAmountText, {padding: 0, textAlign: 'right'}]}>₹{mGot}</Text>

                    </View>
                </View>

                {/* Cards */}

            </View>

            {
                mRecord ?
                    <FlatList
                        data={mRecord}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() =>
                                {
                                    navigation.navigate('EntryDetails')
                                    storeObject.setRecordId(item.recordid)
                                    storeObject.setRecordLoanYes(1)
                            }
                        }>
                                <View style={[styles.row, styleI.noPad]}>
                                    <View style={[styles.container, {flex: 2}]}>
                                    <Text style={[styles.boldText,{marginBottom:0}]}>{item.name}</Text>
                                        <Text  style={[styles.greyTextSm, {
                                            textAlign: 'left',
                                            paddingHorizontal: 0
                                        }]}>{item.partner_contact}</Text>
                                        <Text style={[styles.greyTextSm, {
                                            textAlign: 'left',
                                            paddingHorizontal: 0
                                        }]}>{item.date.substring(4, 15).toUpperCase() + " - " + item.date.substring(16, 21)}</Text>
                                    </View>
                                    <View style={styleI.cardGiveAmt}>
                                        {
                                            item.give===1 ?
                                                <Text style={[styles.giveAmountText, {
                                                    padding: 0,
                                                    textAlign: 'right'
                                                }]}>₹{item.amountGiven}</Text> :
                                                console.log('')
                                        }
                                    </View>

                                    <View style={[{textAlign: 'right'}]} style={{width: 90}}>
                                        {
                                            item.give===0?
                                                
                                                <Text style={[styles.takeAmountText, {
                                                    padding: 0,
                                                    textAlign: 'right'
                                                }]}>₹{item.amountTaken}</Text>
                                                :
                                                console.log('') 

                                        }
                                        {/* <Text style={[styles.takeAmountText,{paddign:0,textAlign:'right'}]}>$300</Text> */}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}

                    /> : console.log('')
            }

            <View style={[styles.container, {position: 'absolute', bottom: 0, width: '100%'}]}>
                <TouchableOpacity style={{
                    backgroundColor: '#4e54c8',
                    width: '100%',
                    alignItems: 'center',
                    padding: 15,
                    borderRadius: 6
                }}
                onPress={()=>{print(Prints)}}
                disabled={mRecord.length<=0}
                >
                    <Text style={[styles.normalText, {color: "white"}]}><AntDesign name="pdffile1" size={20}
                                                                                   color="white"/> DOWNLOAD PDF</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}


const styleI = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative'
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
        alignItems: 'flex-end',
        paddingHorizontal: 5
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

    noPad: {
        padding: 0,
        margin: 0,
        height: 50,
        borderBottomWidth: .5,
        borderBottomColor: '#dedede'
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewReportScreenLoan)
