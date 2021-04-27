import  React,{useState, useEffect} from 'react';
import {View, Text, TextInput, Picker, StyleSheet, FlatList, ScrollView, TouchableOpacity,Alert} from 'react-native';
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
import Moment from 'moment';
// import homeScreenSearch from "../../Logic_Repository/searchLibrary/homeScreenSearch";




function ViewReportScreen(props) {

    const { navigation } = props

    const [mRecord, setRecord] = useState([])
    const [mGot, setGot] = useState(null)
    const [mGave, setGave] = useState(null)
    const [mNet, setNet] = useState(null)
    const [selectedValue,setSelectedValue] = useState("All")
    const [mNetNeg, setNetNeg] = useState(null)
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [nameValue,setNameValue] = useState(null);
    var today = new Date();
    var date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();
    var calendarShow = false
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

      async function nameFilter(value){
        alert(JSON.stringify(value))
        const record = await dbObject.getRecord(props.personals.currentBookId)
        let regexp = new RegExp('^' + value, 'i');
        setRecord([])
        
     
      
      }
    

    useEffect(() => {
        (async () => {
            let totalGot = 0
            let totalGave = 0
            
            console.log("params :: ", props.route.params.all)

            if(props.route.params.all)
            {
                const record = await dbObject.getRecord(props.personals.currentBookId)
                // .getAllRecord()
                console.log("View Report record outside if ", record)

                setRecord(record)

                for (let entry of record) {
                    if (entry.take === 1) {
                        totalGot += entry.amount
                        console.log("Gave Entry = ", entry.amount)
                    } else {
                        totalGave += entry.amount
                        console.log("Take Entry = ", entry.amount)
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
            }else{
               const record = await dbObject.getRecord(props.personals.currentBookId)
               console.log("View Report record outside if ", record)

                setRecord(record)

                for (let entry of record) {
                    if (entry.take === 1) {
                        totalGot += entry.amount
                        console.log("Gave Entry = ", entry.amount)
                    } else {
                        totalGave += entry.amount
                        console.log("Take Entry = ", entry.amount)
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
            }
            


        })();
    }, []);


 

    
    const Prints = 
    `<style>
    body {
      font-family: "lato", sans-serif;
    }
    
  
  .datagrid {
    border-collapse: collapse;
  }
  
  .datagrid thead tr th {
    color: #949494;
    font-size: 11px;
    font-weight: normal;
    text-align: left;
    padding: 6px 8px;
    border: 1px solid #c9c9c9;
    background-image: linear-gradient(bottom, #EEEFF1 50%, #F9F9F9 54%);
    background-image: -moz-linear-gradient(bottom, #EEEFF1 50%, #F9F9F9 54%);
    background-image: -webkit-linear-gradient(bottom, #EEEFF1 50%, #F9F9F9 54%);
    background-image: -ms-linear-gradient(bottom, #EEEFF1 50%, #F9F9F9 54%);
    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, #EEEFF1), color-stop(0.54, #F9F9F9)); 
  }
  .datagrid tbody tr {
    background: #fff;
  }
  
  .datagrid tbody tr td {
    padding: 6px 8px;
    border: 1px solid #c9c9c9;
  }
  
  
  .datagrid tbody tr td.cash {
    text-align: right;
  }
    
    .container {
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 10px;
      padding-right: 10px;
    }
    
    h2 {
      font-size: 26px;
      margin: 20px 0;
      text-align: center;
    }
    h2 small {
      font-size: 0.5em;
    }
    
    .responsive-table li {
      border-radius: 3px;
      padding: 25px 30px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
    }
    .responsive-table .table-header {
      background-color: #95a5a6;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .responsive-table .table-row {
      background-color: #ffffff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    }
    .responsive-table .col-1 {
      flex-basis: 10%;
    }
    .responsive-table .col-2 {
      flex-basis: 40%;
    }
    .responsive-table .col-3 {
      flex-basis: 25%;
    }
    .responsive-table .col-4 {
      flex-basis: 25%;
    }
    @media all and (max-width: 767px) {
      .responsive-table .table-header {
        display: none;
      }
      .responsive-table li {
        display: block;
      }
      .responsive-table .col {
        flex-basis: 100%;
      }
      .responsive-table .col {
        display: flex;
        padding: 10px 0;
      }
  
      .responsive-table .col:before {
        color: #6c7a89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
      
      </style>
  
      <div id="demo">
          <img src="data:image/jpeg;base64,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
                                            KwhmRYAGA+CBB5pbgiCNm8Ko/C64V1T8gRJ5TBh+W7RYzwuuMWoBKtRVuAGbeF6+P7YnyOb0XHw/wBX7yl+no68Brk/zfoMXw3UCtTDILCpfYK4IyzMivRK6GC+U4Wopwsvg4Lk8kr8VrniWRApn/CSWaVnGi/qVVF6I2HjdO0zyOrZihxGwfUuLkxpW7ebvCKPwuuKhGPNFBs+Ar2JnwuuJGxRg4QoLNWDWZVDhHAcLaWzgsR1Ygpl2ENuHxfy7+bAmlY4iaDqJeoO/A/Il7wLyN+jwebYKPjYHUhQ6u9Ghs/2gWEYMj+mciA1BArUwADNgAr3gAF0CHiPjwCxNhQFsUvmYYOOz98drBJcPI6ondcwKMo/YcInGehGrRYuYWjC3M/R3ZECdhwdA2RuExqKcAixh6FtJdgaKxCfC65zrP2ESMeHwADzgaN7pzE0I2rAWJsL8Dm23HKrPzohdAlVOMIF2dErOAoC6iYwOyxleiiqFtBmzSrOs0YpeS1dvjsQXnkksrH7yu/OkgMAFa4pNhuoa6Xz35wyIBOJZ4zVzKtlPHyiix+V4uex43TtM8jqmeP/AIqYhZq6ctgxDE31VDiIhComEOmDubCwZe2UXYNONRPjiP5/aMtSB5QBg2levUojF6hwR+d2F7FaXWdc/dz679vEOnBcl5uvqtn/ANRjJVkaTbqNKqzhqo3fj5iacPToXsYU5GuyrKS4+/WMDygQLXxu8XgNQ/4dpv4xIe8qzBAAgRm7z08WY+y1LuqvZtv+WvrHIaqVn2Ij5CoWcLS4HTJXjTrAUjMXTvtTWBn7w6bLt32NYzc+zrCPWCC8nXivTAsEaUGmmr8dgQK1c994scP/AO75h87hVKaMrf8AKR//2Q=="
                                              border="0" alt="" width="58" height="auto" style="display: block;"/><br>
    <h1>Lekha Jokha Report</h1>
    <h5>`+Moment( new Date()).format('LLLL')   +`</h5>
    
    <table class="datagrid">
      <thead>
          <tr>
              <th>BOOK ID </th>
              <th>CONTACT</th>
              <th>NAME </th>
              <th>AMOUNT </th>
              <th>DATE</th>
              </tr>
              </thead>
              <tbody>

    `
  

    


const sharePdf = (url) => {
    Sharing.shareAsync(url)
}
    
      
      
      const print = async (html) => {
        try {
          console.log(mRecord)
          mRecord.forEach(element => {
            html = html+`
        <tr>
        <td>${element.bookid}</td>
        <td>${element.contact}</td>
        <td>${element.name}</td>
        <td>${element.netAmount}</td>
        <td>${element.lastupdated.substring(4, 15).toUpperCase() + " - " + element.lastupdated.substring(16, 21)}</td></tr>
     `
        

        
      });
      html=html+`</tbody></table></div>`
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

    return (

        <View style={{flex: 1}}>
            <View style={[styles.container, {justifyContent: 'space-around', padding: 20, backgroundColor: '#4e54c8'}]}>


                <View style={[styles.row, {width: '100%', justifyContent: 'space-around', height: 50}]} onTouchStart={() => calendarShow =true}>

                    {/* <Text style={[styles.boldText, styles.normalText, styles.blueText, {
                        width: '50%',
                        textAlign: 'center',
                        borderRightColor: '#dedede',
                        borderRightWidth: 1
                    }]}> */}

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
                                  filterData()  }}
                            />

                            {/* <AntDesign name="caretdown" size={10} color="red" /> */}
                        </View>
                    </TouchableOpacity>

{/* <View style={{ backgroundColor: 'transparent', margin: 5 }}>

            <DatePicker date={selectedStartDate} showIcon={true} maxDate={date} placeholder="Start Date" mode="date" format="DD-MM-YYYY"
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  height: 50,
                  width: 170,
                  right: 30,
                },
                dateIcon: {
                    position:'absolute',
                     left: 0,
                     top: 4,
                     marginLeft: 0
                   },
                dateText: {
                  marginTop: 5,
                  color: '#4e54c8',
                  fontSize: 18,
                },
                placeholderText: {
                  marginTop: 5,
                  right: 10,
                  color: '#4e54c8',
                  fontSize: 18,
                }
              }
              }
              onDateChange={(date) => { setSelectedStartDate(date)  }} placeholderTextColor="white" underlineColorAndroid={'rgba(0,0,0,0)'} style={{ height: 50, width: 170, paddingLeft: 15, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.4)' }}></DatePicker>
          </View> */}


                 
   
                        {/* <AntDesign style={[styles.blueText]} name="calendar" size={18} color="black"/> START DATE
                        
                        </Text> */}

{/* END DATE */}

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
                                onDateChange={(date)=>{
                                  filterData();
                                  setSelectedEndDate(date)
                                }
                              }
                            />

                            {/* <AntDesign name="caretdown" size={10} color="red" /> */}
                        </View>
                    </TouchableOpacity>
                   



                    {/* <Text style={[styles.boldText, styles.normalText, styles.blueText, {
                        width: '50%',
                        textAlign: 'center'
                    }]}>
                        <View style={{ backgroundColor: 'transparent', margin: 5 }}>

<DatePicker date={selectedEndDate} showIcon={true} placeholder="End Date" maxDate={date} mode="date" format="DD-MM-YYYY"
  customStyles={{
    dateInput: {
      borderWidth: 0,
      height: 50,
      width: 170,
      right: 30,
      backgroundColor: 'transparent'
    },
    dateIcon: {
       position:'absolute',
        left: 0,
        
        top: 4,
        marginLeft: 0
      },
    dateText: {
      marginTop: 5,
      color: '#4e54c8',
      fontSize: 18,
     
    },
    placeholderText: {
      marginTop: 5,
      right: 10,
      color: '#4e54c8',
      fontSize: 18,
     
    }
  }
  }
  onDateChange={(date) => { setSelectedEndDate(date)  }} placeholderTextColor="white" underlineColorAndroid={'rgba(0,0,0,0)'} style={{ height: 50, width: 170, paddingLeft: 15, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.4)' }}></DatePicker>
</View>
                        
                        <AntDesign style={[styles.blueText]} name="calendar" size={18} color="black"/> END DATE</Text> */}

                </View>
               

                 <TouchableOpacity onPress={filterData()}>
                   
                    </TouchableOpacity>
                  

                <View style={[styles.row, {
                    marginTop: 10,
                    justifyContent: 'space-between',
                    paddingHorizontal: 0,
                    paddingLeft: 10,
                    paddingVertical: 0
                }]}>
                    <AntDesign name="search1" size={22} color="#4e54c8"/>
                    <TextInput style={{flex: 2, marginRight: 20, width: '60%', marginVertical: 5}} placeholder="Enter the Customer Name" onChangeText={(itemValue) => {
                      setNameValue(itemValue);
                
                      nameFilter(itemValue);
                      }}/>

                    <Picker
                        style={[styles.blueText, {height: 50, width: '30%', backgroundColor: 'rgba(0,0,250,.1)'}]}
                        onValueChange={(itemValue, itemIndex) => {
                          
                          setSelectedValue(itemValue);
                          nameFilter(nameValue)
                          
                        }
              } selectedValue={selectedValue}

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
                                    storeObject.setRecordId(item.date)
                                    storeObject.setRecordLoanYes(0)
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
                                            item.give ?
                                                <Text style={[styles.giveAmountText, {
                                                    padding: 0,
                                                    textAlign: 'right'
                                                }]}>₹{item.amount}</Text> :
                                                console.log('')
                                        }
                                    </View>

                                    <View style={[{textAlign: 'right'}]} style={{width: 90}}>
                                        {
                                            item.give ?
                                                console.log('') :
                                                <Text style={[styles.takeAmountText, {
                                                    padding: 0,
                                                    textAlign: 'right'
                                                }]}>₹{item.amount}</Text>

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
                <TouchableOpacity  onPress={()=>{print(Prints)}} style={{
                    backgroundColor: '#4e54c8',
                    width: '100%',
                    alignItems: 'center',
                    padding: 15,
                    borderRadius: 6
                }}
                disabled={mRecord.length<=0}
               >
                    <Text style={[styles.normalText, {color: "white"}]} ><AntDesign name="pdffile1" size={20}
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
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
       
      
        marginTop: 400,
        zIndex: 1,
      
      },
      hidden:{
          display:'none'
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewReportScreen)
