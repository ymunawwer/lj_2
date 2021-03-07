import React, {useEffect, useRef, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../../styles/globalStyle";
import {AntDesign, Entypo, FontAwesome5} from "@expo/vector-icons";
import {Button, Caption, Searchbar, Subheading} from "react-native-paper";
import * as lang from "../../../translations/lang.json";
import HomeTable from "./HomeTable";
import storeObject from "../../../store/store";
import {FabBtn} from "../Buttons";
import RBSheet from "react-native-raw-bottom-sheet";
import RadioButtonRN from "radio-buttons-react-native";
import filterAlgo from "../../Logic_Repository/filterAlgo";
import sortAlgo from "../../Logic_Repository/sortAlgo";
import homeScreenSearch from "../../Logic_Repository/searchLibrary/homeScreenSearch";
import Colors from "../../../constants/Colors";
import Modal from './Modal.js';
import dbObject from '../../database/db';
import * as Print from 'expo-print';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'

// rcvble-take=2 AND give=0

// payable-give=2 AND take=0


function HomeTabsCommonComponents(props) {

  /**
   * cardsData:    // cards data will contain data to be dispalyed in two cards on the top
   * [
   *    {
   *      title,
   *      amount
   *    },
   *    {
   *      title,
   *      amount
   *    }
   * ],
   *
   * searchBarData:  // datas for search bar component
   * {
   *   onPressPdf
   * },
   *
   * componentName: "dashboard" | "duePayable" | "gaveGot",
   *
   * tableData:
   * {
   *    sumArray: [],
   *    data: [],
   *    onPressEmptyTableAction
   * },
   *
   *  fabBtnData:
   *  {
   *    onPress,
   *    customFab,
   *
   *  }
   */
  const {navigation, componentName, cardsData, searchBarData, tableData, lan = 'english', fabBtnData} = props
  
  

  const [filterSelection, setFilterSelection] = useState('A')
  const [sortingSelection, setSortingSelection] = useState('Most Recent')

  const [isModalVisible, setModalVisibility] = useState(false)
  const [isGive, setIsGive] = useState(null)

  // const [sortingSelection, setSortingSelection] = useState('Most Recent')

  // 'give' ? 'Got / Payable' : 'Gave / Receivable'

  // if

  const showModal = async (index) => {
    console.log('modal-',componentName)
    switch(componentName){
    case 'dashboard':
    index === 0 ? await getData('((give = 1 AND take = 0) OR (give = 2 AND take = 0))','Gave / Payable') : await getData('((give = 0 AND take = 1) OR (give = 0 AND take = 2))','Got / Receivable');
    // setModalVisibility(true );
    break;
    case 'duePayable':
    index === 0 ? await getData('give=2 AND take=0','Payable') : await getData('take=2 AND give=0','Receivable');
    // setModalVisibility(true );
    break;
    case 'gaveGot':
    index === 0 ? await getData('give=1 AND take=0','Gave') : await getData('take=1 AND give=0','Got');
    // setModalVisibility(true );
    break;
    

    }
    
    // console.log(isGive)
    
  };


  const hideModal = () =>{ setModalVisibility(false);
    setRecord(null)}



    // modal data

    const [mRecord, setRecord] = useState(null)
    const [mGot, setGot] = useState(null)
    const [mGave, setGave] = useState(null)
    const [mNet, setNet] = useState(null)
    const [mNetNeg, setNetNeg] = useState(null)
    const [mCustomerCount, setmCustomerCount] = useState(null)
  
  
    
    const getData = async (key,value) => {
            let totalGot = 0
            let totalGave = 0
            
            console.log(key)

            const record = await dbObject.getRecordByQueryString(storeObject.getCurrentBook(),key)
           
              console.log('data data',record)
                  setRecord(record);
                  setModalVisibility(true );
                  setIsGive(value);
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


  
  
  // modal data end

  // Pdf share

  const sharePdf = (url) => {
    Sharing.shareAsync(url)
}

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
      <th> Contact </th>
      <th> Name </th>
      <th> Amount </th>
      <th> recordid </th>
      <th> lastupdated </th>
    </tr>
  </thead>
  <tbody>`

    
//     <tr>
//       <td data-column="First Name">Andor</td>
//       <td data-column="Last Name">Nagy</td>
//       <td data-column="Job Title">Designer</td>
//       <td data-column="Twitter">@andornagy</td>
//     </tr>
//     <tr>
//       <td data-column="First Name">Tamas</td>
//       <td data-column="Last Name">Biro</td>
//       <td data-column="Job Title">Game Tester</td>
//       <td data-column="Twitter">@tamas</td>
//     </tr>
//     <tr>
//       <td data-column="First Name">Zoli</td>
//       <td data-column="Last Name">Mastah</td>
//       <td data-column="Job Title">Developer</td>
//       <td data-column="Twitter">@zoli</td>
//     </tr>
//     <tr>
//       <td data-column="First Name">Szabi</td>
//       <td data-column="Last Name">Nagy</td>
//       <td data-column="Job Title">Chief Sandwich Eater</td>
//       <td data-column="Twitter">@szabi</td>
//     </tr>
//   </tbody>
// </table>`

    
  const print = async (html) => {
    try {
      mContacts.forEach(element => {
        html = html+`<tr>
          <td data-column="Book Id">`+element.bookid+`</td>
          <td data-column="Contact">`+element.contact+`</td>
          <td data-column="Name">  `+element.name+`   </td>
          <td data-column="Amount">  `+element.netAmount+`  </td>
          <td data-column="recordid">  `+element.recordid+`  </td>
          <td data-column="lastupdated">    `+element.lastupdated.substring(4, 15).toUpperCase() + " - " + element.lastupdated.substring(16, 21)+`  </td>
        </tr>`
        
      });
      html=html+`</tbody></table>`
      console.log('contacts',mContacts)
      const { uri } = await Print.printToFileAsync({ 'html':html });
      
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
        return uri;
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
        //     const asset =await MediaLibrary.createAssetAsync(uri);
        //   alert(console.log(asset))
        //   return uri;
          const currentdate = new Date();
          const datetime = currentdate.getDate() + "_"
              + (currentdate.getMonth() + 1) + "_"
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

  // pdf share end


  // customer count
  const getCustomerCount = async (book_id) => {
   

      const record = await dbObject.getCustomerCount(book_id)
    console.log("View Report record outside if ", record[0]["COUNT(*)"])

    setmCustomerCount(record[0]["COUNT(*)"]?record[0]["COUNT(*)"]:0);
    

}

  // customer count end


  const refRBSheet = useRef();
  const sortingData = [
    {
      label: 'Most Recent'
    },
    {
      label: 'Highest Amount'
    },
    {
      label: 'By Name(A-Z)'
    },
    {
      label: 'Oldest'
    },
    {
      label: 'Least Amount'
    }
  ];


  const [mContacts, setContacts] = useState([])
  const totalCustomer = mContacts.length;
  const [filterSortedContacts, setFilterSortedContacts] = useState(null)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {


    (async () => {

      await getCustomerCount(storeObject.getCurrentBook());
      if(tableData.data !== null) {
        setContacts(tableData.data)
        setFilterSortedContacts(tableData.data)
      }

    })();

    return () => {

      setContacts([])
      setFilterSortedContacts([])

    }


  }, [tableData.data]);


  return (


    <SafeAreaView style={[styles.wrapper, {paddingTop: 0, backgroundColor: "#fff"}]}>

      <View style={{padding: 10, backgroundColor: "#fff"}}>
        <View style={{flexDirection: "row"}}>
          {
            cardsData.map((data, index) => (
              <View key = {index} style={{flex: 1, margin: 5, elevation: 8, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 5}}>
                <View>
                  <Text style={{fontSize: 13, fontWeight: "bold", color: "#303030", fontFamily: "monospace"}}>{data.title}</Text>
                  <Text style={index === 0? styles.giveAmountText: styles.takeAmountText}>₹{data.amount}</Text>
                </View>
                <TouchableOpacity  onPress={() => showModal(index)} style={{position: "absolute", top: 0, right: 0, margin: 10}}>
                  <Entypo name={"info-with-circle"} size={20}
                           color={"#303030"}/>
                </TouchableOpacity>

              </View>
            ))
          }

        </View>

        <Modal
    visible={isModalVisible}
    dismiss={hideModal}
    mRecord ={mRecord}
    headerItem={[
      "Customer Details",
      isGive ,


    ]}
    // tableData = {tableData}
    // mTakeSum={tableData['sumArray']}
    //         lan={lan}
    //         navigation={navigation}
    //         data={mContacts}
    />

        <TouchableOpacity style={{
          flexDirection: "row",
          elevation: 8,
          borderRadius: 5,
          padding: 8,
          backgroundColor: "#fff",
          margin:2,
          marginBottom:0,
          alignItems: "center",
          justifyContent: "center",
        }}

        onPress={() => {
          navigation.navigate('ViewReportScreen', {all:1})
        }}
        >
          <AntDesign name={"folderopen"} size={20} style={{paddingHorizontal: 10}} color={Colors.primary}/>
          <Subheading>View Report</Subheading>
        </TouchableOpacity>

      </View>

        {/*backgroundColor: '#f4f0ec'*/}

      <View style={{flex: 1,marginTop: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#f4f0ec"}}>

        {/* Search */}
        <View style={[styles.searchFilter, {borderRadius: 30, elevation: 8, backgroundColor: "#fff"}]}>
        <View style={{flex: 3,flexDirection: "column"}}>
          <Searchbar
          
            style={{flex: 3, elevation: 0,borderRadius: 30}}
            placeholder={ lang[lan]['search']}
            onChangeText={text => SearchFilterFunction(text)}
          />
            <Text style={[styles.countInfo,{fontSize: 8, fontWeight: "bold", color: "#78909c", fontFamily: "monospace", alignItems: "flex-start"}]}>no. of customers:{mCustomerCount}</Text>
</View>
          <TouchableOpacity style={styles.shopOpen} onPress={() => refRBSheet.current.open()}>
            <AntDesign style={styles.iSearchicon} name="filter" size={24} color="#4e54c8"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shopOpen}  disabled={mContacts.length<=0}  onPress={()=>{print(Prints)}}>
            <AntDesign style={styles.iSearchicon} name="pdffile1" size={24} color="#4e54c8"/>
          </TouchableOpacity>
          
        
        </View>
        

        {
          tableData.data != null && tableData.data.length > 0 ?

            (

              mContacts.length > 0?
                <HomeTable
                  mTakeSum={tableData['sumArray']}
                  componentName = {componentName}
                  lan={lan}
                  navigation={navigation}
                  data={mContacts}
                />
                :
                <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                  <Caption>No contacts found according to your search...</Caption>
                </View>
            )


            :
            
            
            

         (
              <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                <Subheading style={{padding: 10, fontWeight: "bold"}}>{componentName === "dashboard" ? "Let's add your First Customer..." : "Let's add your First Transaction..."}</Subheading>
                <Button
                  icon="account-multiple-plus"
                  mode="outlined"
                  onPress={tableData?.onPressEmptyTableAction}
                >
                  {componentName === "dashboard" ? "Add New Customer" : "Add New Transaction"}
                </Button>
              </View>
            )


        }
      </View>

      {
        "customFab" in fabBtnData?
          fabBtnData.customFab
          :
          (
            <View style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: 10
            }}>
              <FabBtn
                onPress={fabBtnData?.onPress}
              >
                <FontAwesome5 name="user-plus" size={22} color="#fff"/>
              </FabBtn>
            </View>
          )
      }

      <RBSheet
        ref={refRBSheet}

        closeOnDragDown={true}
        closeOnPressMask={true}
        height={510}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.5)",

          },
          draggableIcon: {
            backgroundColor: "#4e54c8"
          },
          container: {
            backgroundColor: "#f1f2f3",
            paddingHorizontal: 10
          }
        }}
      >

        <Text style={[styles.normalText]}>Filter by</Text>

        <View style={[styles.row, {
          justifyContent: 'flex-start',
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
          marginBottom: 12
        }]}>
          <TouchableOpacity style={[styleI.filterBtn, {backgroundColor: filterSelection === 'A' ? "#4e54c8" : 'white'}]}
                            onPress={() => setFilterSelection('A')}>
            <Text style={[{color: filterSelection === 'A' ? 'white' : 'grey'}]}>ALL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styleI.filterBtn, {backgroundColor: filterSelection === 'R' ? "#4e54c8" : 'white'}]}
                            onPress={() => setFilterSelection('R')}>
            <Text style={[{color: filterSelection === 'R' ? 'white' : 'grey'}]}>Receivables</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styleI.filterBtn, {backgroundColor: filterSelection === 'P' ? "#4e54c8" : 'white'}]}
                            onPress={() => setFilterSelection('P')}>
            <Text style={[{color: filterSelection === 'P' ? 'white' : 'grey'}]}>Payables</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styleI.filterBtn, {backgroundColor: filterSelection === 'S' ? "#4e54c8" : 'white'}]}
                            onPress={() => setFilterSelection('S')}>
            <Text style={[{color: filterSelection === 'S' ? 'white' : 'grey'}]}>Settled</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.normalText, {marginBottom: 5}]}>Sort by</Text>


        <View style={[styles.container, {padding: 5, backgroundColor: 'white', borderRadius: 5}]}>
          <RadioButtonRN
            data={sortingData}
            selectedBtn={(e) => setSortingSelection(e.label)}
            activeColor={'#4e54c8'}
            circleSize={10}
            initial={getPickerInitial()}
          />
        </View>

        <View style={{
          position: 'absolute',
          left: '3%',
          bottom: '1%',
          width: '100%',
          height: 50,
          backgroundColor: "#4e54c8",
          borderRadius: 6,
          paddingHorizontal: 0
        }}>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'center', height: 50, justifyContent: 'center'}}
            onPress={() => handleSortingAndFilter()}
          >
            <Text style={{color: 'white'}}>VIEW RESULT</Text>
          </TouchableOpacity>
        </View>

      </RBSheet>

    </SafeAreaView>

  );

  function getPickerInitial() {
    if (sortingSelection === 'Most Recent') {
      return 1
    } else if (sortingSelection === 'Highest Amount') {
      return 2
    } else if (sortingSelection === 'By Name(A-Z)') {
      return 3
    } else if (sortingSelection === 'Oldest') {
      return 4
    } else if (sortingSelection === 'Least Amount') {
      return 5
    }
  }

  async function handleSortingAndFilter() {

    console.log(filterSelection)
    console.log(sortingSelection)

    if (filterSelection === 'A' && sortingSelection === 'Most Recent') {
      setContacts(tableData.data)
      setFilterSortedContacts(tableData.data)
      //now close the bottom sheet
      refRBSheet.current.close()
      return
    }

    //first filter it
    const filter = await filterAlgo(tableData.data, filterSelection)

    //secondly sort it
    const sorted = await sortAlgo(filter, sortingSelection)

    setContacts(sorted)
    setFilterSortedContacts(sorted)

    if (searchText != null && searchText !== '') {
      await SearchFilterFunction(searchText)
    }

    //now close the bottom sheet
    refRBSheet.current.close()

  }

  async function SearchFilterFunction(text) {
    //passing the inserted text in textInput
    try {
      setSearchText(text)
      if (text != null && text !== '') {
        const filteredContacts = await homeScreenSearch(filterSortedContacts, text)
        setContacts(filteredContacts)
      } else {
        setContacts(filterSortedContacts)
      }
    } catch (e) {

      Alert.alert(e)

    }

  }
}

const styleI = StyleSheet.create({

  modalView: {
    margin: 20,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 2,
    //   padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
  },
  oneLangCont: {
    elevation: 5,
    width: 160,
    justifyContent: 'flex-start',
    borderRadius: 6
  },

  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: 'white',
    elevation: 2
  },
  active: {
    backgroundColor: "#4e54c8"
  },

  searchBar: {
    backgroundColor: "#FFFFF0",
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5
  }
});

export default HomeTabsCommonComponents
