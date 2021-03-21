import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {AntDesign, Entypo, FontAwesome5} from '@expo/vector-icons';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles/globalStyle';
import Header from '../navigation/shared/header';
import dbObject from '../components/database/db'
import * as lang from "../translations/lang.json"
import RBSheet from "react-native-raw-bottom-sheet";
import RadioButtonRN from "radio-buttons-react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LoanScreenTable from "../components/UI_components/LoanScreenEssencials/LoanScreenTable";
import {ActivityIndicator, Button, Caption, Chip, Searchbar, Subheading} from "react-native-paper";
import Colors from "../constants/Colors";
import {FabBtn} from "../components/UI_components/Buttons";
import {useIsFocused} from "@react-navigation/native";
import homeScreenSearch from "../components/Logic_Repository/searchLibrary/homeScreenSearch";
import loanScreenSearch from "../components/Logic_Repository/searchLibrary/loanScreenSearch";
import {FloatingAction} from "react-native-floating-action";
import {transactionTypes} from "../constants/Constansts";
import * as Print from 'expo-print';
import * as Permissions from 'expo-permissions';
import Modal from '../components/UI_components/Homescreen_essencials/Modal';

import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'


function Loan(props) {

    const isFocused = useIsFocused()

    const {navigation} = props
    let lan = props.personals.currentLan

    const [mGiveSum, setGiveSum] = useState([])
    const [mTakeSum, setTakeSum] = useState([])
    const [loans, setLoans] = useState([])
    const [originalLoans, setOriginalLoans] = useState([])
    const [searchText, setSearchText] = useState("")
    const [isModalVisible, setModalVisibility] = useState(false)
    const [filterSelection, setFilterSelection] = useState('A')
    const [sortingSelection, setSortingSelection] = useState('Most Recent')
    const [loansLoadStatus, setLoansLoadStatus] = useState(false)
    const refRBSheet = useRef();
    const [mCustomerCount, setmCustomerCount] = useState(null)
    const [sumOfTakesLoan, setSumOfTakesLoan] = useState('')
    const [sumOfGavesLoan, setSumOfGavesLoan] = useState('')
    const [modalData, setModalData] = useState([])
    const [isGiven, setIsGiven] = useState('')


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


    const navigationOptions = {
        //To hide the NavigationBar from current Screen
        header: null
    };

    async function getModalData(key) {
        let data
        switch (key) {
            case 'GIVEN':
                data = await dbObject.getGavesLoanContact(props.personals.currentBookData.id)
                // console.log('test data',data['_array'])
                setModalData(data['_array'])
                setModalVisibility(true);
                break;
            case 'TAKEN':
                data = await dbObject.getTakesLoanContact(props.personals.currentBookData.id)
                //  console.log('test data',data['_array'])
                setModalData(data['_array'])
                setModalVisibility(true);
                break;

        }


    }

    const hideModal = () => {
        setModalVisibility(false);
    }
    const showModal = async (index) => {

        console.log(index)
        if (index === 0) {
            setIsGiven('Loan Given')
            await getModalData('GIVEN')
        }
        if (index === 1) {
            setIsGiven('Loan Taken')
            await getModalData('TAKEN');
        }

    }


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

    // download share
    // download share


    const Prints =
        `<style>
    
    </style>

    <div id="demo">
  <h1>Lekha Jokha Report</h1>
  <h2>` + new Date() + `</h2>
  
  <table>
  <thead>
    <tr>
      <th>Book Id</th>
      <th> Name </th>
      <th> Contact </th>
      <th> Record Id </th>
      <th> AmountGiven </th>
      <th> AmountTaken </th>
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

            loans.forEach(element => {
                html = html + `<tr>
              <td data-column="Book Id">` + element.bookid + `</td>
              <td data-column="Name">` + element.name + `</td>
              <td data-column="Contact">` + element.contactno + `</td>
              
              
              <td data-column="Record Id">  ` + element.recordid + `  </td>
              <td data-column="AmountGiven">  ` + element.amountGiven + `  </td>
              <td data-column="AmountTaken">  ` + element.amountTaken + `  </td>
              <td data-column="Type">    ` + element.type + `  </td>
              <td data-column="Date">    ` + element.date.substring(4, 15).toUpperCase() + " - " + element.date.substring(16, 21) + `  </td>
              
            </tr>`

            });
            const {uri} = await Print.printToFileAsync({'html': html});

            if (Platform.OS === "ios") {
                await Sharing.shareAsync(uri);
                return uri;
            } else {
                const permission = await MediaLibrary.requestPermissionsAsync();
                if (permission.granted) {
                    //     const asset =await MediaLibrary.createAssetAsync(uri);
                    //   alert(console.log(asset))
                    //   return uri;
                    var currentdate = new Date();
                    var datetime = currentdate.getDate() + "_"
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


            }
        } catch (error) {
            console.error(error);
        }
    };

    // end
    const fabRef = useRef(null)

    // customer count
    const getCustomerCount = async (book_id) => {


        const record = await dbObject.getCustomerCount(book_id)
        console.log("View Report record outside if ", record[0]["COUNT(*)"])

        setmCustomerCount(record[0]["COUNT(*)"] ? record[0]["COUNT(*)"] : 0);


    }

// customer count end

    const fabActions = [
        {
            text: "Loan Given",
            icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
            name: "bt_loan_given",
            position: 1,
            color: "#303030"
        },
        {
            text: "Loan Taken",
            icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
            name: "bt_loan_taken",
            position: 2,
            color: "#303030"
        }
    ];

    useEffect(() => {


        (async () => {


            await getCustomerCount(props.personals.currentBookData.id);

            try {
                setLoansLoadStatus(false)
                const loanTakenSum = (await dbObject.getSumOfTakesLoanContact(props.personals.currentBookData.id)) ? await dbObject.getSumOfTakesLoanContact(props.personals.currentBookData.id) : 0
                const loanGivenSum = await dbObject.getSumOfGavesLoanContact(props.personals.currentBookData.id) ? await dbObject.getSumOfGavesLoanContact(props.personals.currentBookData.id) : 0
                console.log("loanTakenSum ", loanTakenSum)
                console.log("loanGivenSum ", loanGivenSum)
                setSumOfTakesLoan(loanTakenSum)
                setSumOfGavesLoan(loanGivenSum)
                const res = await dbObject.getLoanNames(props.personals.currentBookData.id)
                console.log("loan data ", res)

                setLoans(res)
                setOriginalLoans(res)
                setLoansLoadStatus(true)
            } catch (e) {
                console.log(e)
            }
        })();

        return () => {
            setLoans([])
            setOriginalLoans([])
        }


    }, [isFocused]);

    const cardsData = [
        {
            title: "Loan Given",
            amount: sumOfGavesLoan
        },
        {
            title: "Loan Taken",
            amount: sumOfTakesLoan
        }
    ]

    async function refresh(){
        const res = await dbObject.getLoanNames(props.personals.currentBookData.id)
                setLoans(res)
    }




    return (

          
                  

        <SafeAreaView style={[styles.wrapper, {paddingTop: 0, backgroundColor: "#ffffff"}]}>
        <TouchableOpacity onPress={
                refresh()
          }>
                   
                    </TouchableOpacity>
            <Header navigation={navigation}/>

            <View style={{padding: 10, backgroundColor: "#fff"}}>
                <View style={{flexDirection: "row"}}>
                    {
                        cardsData.map((data, index) => (
                            <View style={{
                                flex: 1,
                                margin: 5,
                                elevation: 8,
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                backgroundColor: "#fff",
                                borderRadius: 5
                            }} key={index}>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        fontWeight: "bold",
                                        color: "#303030",
                                        fontFamily: "monospace"
                                    }}>{data.title}</Text>
                                    <Text
                                        style={index === 0 ? styles.giveAmountText : styles.takeAmountText}>₹{data.amount}</Text>
                                </View>
                                <Entypo name={"info-with-circle"} size={20}
                                        style={{position: "absolute", top: 0, right: 0, margin: 10}} color={"#303030"}
                                        onPress={() => showModal(index)}/>
                            </View>
                        ))
                    }

                </View>


                <Modal
                    visible={isModalVisible}
                    dismiss={hideModal}
                    mRecord={modalData}
                    headerItem={[
                        "Customer Details",
                        isGiven === 'Loan Given' ? isGiven : isGiven,


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
                    margin: 2,
                    marginBottom: 0,
                    alignItems: "center",
                    justifyContent: "center",
                }}

                                  onPress={() => {
                                      navigation.navigate('ViewReportScreenLoan')
                                  }}
                >
                    <AntDesign name={"folderopen"} size={20} style={{paddingHorizontal: 10}} color={Colors.primary}/>
                    <Subheading>View Report</Subheading>
                </TouchableOpacity>

            </View>

            <View style={{flex: 1, backgroundColor: "#f4f0ec", borderTopLeftRadius: 30, borderTopRightRadius: 30,}}>
                {/* <View style={[{
                    marginTop: 10,
                    marginHorizontal: 10,
                    elevation: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    borderRadius: 30,
                    paddingRight: 5,
                }]}> */}
                <View style={[styles.searchFilter, {borderRadius: 30, elevation: 8, backgroundColor: "#fff"}]}>


                    {/* <Searchbar
                        style={{flex: 3, elevation: 0, borderRadius: 30}}
                        placeholder={lang[lan]['search']}
                        value={searchText}
                        onChangeText={text => SearchFilterFunction(text)}
                    /> */}
                    <View style={{flex: 3, flexDirection: "column"}}>
                        <Searchbar

                            style={{elevation: 0, borderRadius: 30}}
                            placeholder={lang[lan]['search']}
                            onChangeText={text => SearchFilterFunction(text)}
                        />
                        <Text style={[styles.countInfo, {
                            fontSize: 8,
                            fontWeight: "bold",
                            color: "#78909c",
                            fontFamily: "monospace"
                        }]}>no. of customers: {mCustomerCount}</Text>
                    </View>

                    <TouchableOpacity style={styles.shopOpen} onPress={() => refRBSheet.current.open()}>
                        <AntDesign style={styles.iSearchicon} name="filter" size={24} color="#4e54c8"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shopOpen} onPress={() => {
                        print(Prints)
                    }}>
                        <AntDesign style={styles.iSearchicon} name="pdffile1" size={24} color="#4e54c8"/>
                    </TouchableOpacity>

                </View>

                <View style={{flex: 1, marginRight: 10}}>
                    {
                        loansLoadStatus ?
                            (
                                originalLoans.length > 0 ?
                                    (
                                        loans.length > 0 ?
                                            <LoanScreenTable
                                                mTakeSum={mTakeSum}
                                                lan={lan}
                                                navigation={navigation}
                                                data={loans}
                                            />
                                            :
                                            <View style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: 10
                                            }}>
                                                <Caption>No contacts found according to your search...</Caption>
                                            </View>
                                    )

                                    :

                                    <View
                                        style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                                        <Subheading style={{padding: 10, fontWeight: "bold"}}>Let's add your First Loan
                                            Detail...</Subheading>
                                        <Button
                                            icon="account-multiple-plus"
                                            mode="outlined"
                                            onPress={() => {
                                                fabRef.current.animateButton()
                                            }}
                                        >
                                            Add New
                                        </Button>
                                    </View>
                            )
                            :
                            (

                                <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                                    <ActivityIndicator animating={true} color={Colors.warningText}/>
                                    <Caption>Loading your Customers. Please Wait...</Caption>
                                </View>
                            )

                    }
                </View>

            </View>

            <FloatingAction
                ref={fabRef}
                actions={fabActions}
                color={Colors.secondary}
                floatingIcon={<FontAwesome5 name={"money-check-alt"} size={22} color="#fff"/>}
                onPressItem={name => {
                    switch (name) {
                        case "bt_loan_given":
                            navigation.navigate('addLoanInputs', {transactionType: transactionTypes.LOAN_GIVEN})
                            break;
                        case "bt_loan_taken":
                            navigation.navigate('addLoanInputs', {transactionType: transactionTypes.LOAN_TAKEN})
                            break;
                    }
                }}
            />
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
                    <TouchableOpacity
                        style={[styleI.filterBtn, {backgroundColor: filterSelection === 'A' ? "#4e54c8" : 'white'}]}
                        onPress={() => setFilterSelection('A')}>
                        <Text style={[{color: filterSelection === 'A' ? 'white' : 'grey'}]}>ALL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styleI.filterBtn, {backgroundColor: filterSelection === 'R' ? "#4e54c8" : 'white'}]}
                        onPress={() => setFilterSelection('R')}>
                        <Text style={[{color: filterSelection === 'R' ? 'white' : 'grey'}]}>Receivables</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styleI.filterBtn, {backgroundColor: filterSelection === 'P' ? "#4e54c8" : 'white'}]}
                        onPress={() => setFilterSelection('P')}>
                        <Text style={[{color: filterSelection === 'P' ? 'white' : 'grey'}]}>Payables</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styleI.filterBtn, {backgroundColor: filterSelection === 'S' ? "#4e54c8" : 'white'}]}
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

    async function SearchFilterFunction(text) {
        //passing the inserted text in textInput
        try {
            setSearchText(text)
            if (text != null && text !== '') {
                const filteredContacts = await loanScreenSearch(originalLoans, text)
                setLoans(filteredContacts)
            } else {
                setLoans(originalLoans)
            }
        } catch (e) {

            Alert.alert(e)

        }

    }

    function gotoOneCustomerScreen(navigation, phone) {

        const bookid = '1'//make bookid dynamic
        dbObject.checkAndInsertContact(phone, bookid, record =>
            navigation.navigate('OneCustomerScreenLoan', {
                phoneNumber: phone
            })
        )

    }


}

const mapStateToProps = (state) => {
    const {personals, booksData} = state
    return {personals, booksData}
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        //all actions come here
    }, dispatch)
);
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

export default connect(mapStateToProps, mapDispatchToProps)(Loan)
