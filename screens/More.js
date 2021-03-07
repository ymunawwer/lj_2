import React, {useState, useRef} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    SafeAreaView,
    Modal,
    Image
} from 'react-native';

import RBSheet from "react-native-raw-bottom-sheet";
import {styles} from '../styles/globalStyle';
import auth from '@react-native-firebase/auth';
import Header from '../navigation/shared/header';
import dbObject from '../components/database/db';
import storeObject from "../store/store";
import {EvilIcons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import * as lang from "../translations/lang.json";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    setCurrentBookData,
    setCurrentBookId, setCurrentCurrency,
    setCurrentLanguage,
    setIsLoggedIn
} from "../redux/actions/personalsActions";
import {setAllActiveBooks, setExistingCustomers} from "../redux/actions/booksDataActions";
import languageMapping from "../components/UI_components/languageMapping";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {HorizontalDivider} from "../components/UI_components/microComponents";
import ListItem from "../components/UI_components/MoreScreenEssencials/ListItemComponent";
import {PartiallyRoundedBtn} from "../components/UI_components/Buttons";

function More(props) {
    const { navigation } = props
    let lan = props.personals.currentLan
    const refRBSheet = useRef();

    function signOut() {
        auth().signOut()
            .then(function () {
                //Sign out successful
                props.setIsLoggedIn(false)
            })
            .catch(function (err) {
                console.log("sign out failed " + err)
                alert("signOut failed")
            })
    }


    async function deleteBook() {
        //  dbObject.getAllActiveBooks()
        //   .then(function(books){


        //   // dbObject.setCurrentBook(books['_array'].item(0).id).then(function(s){navigation.navigate('Root')})

        //  console.log(books['_array'][0].name)
        // })
        // dbObject.setCurrentBook(6)
        // .then(function(res){console.log('Entered Book ', res)})


        // dbObject.getCurrentBook().then(function(bookid){dbObject.getBook(bookid).then(function(book){console.log(book)})})


        const bookId = props.personals.currentBookId
        const book = await dbObject.getBook(bookId)

        Alert.alert(
            lang[lan]['trash book'] +" "+ book.name,
            lang[lan]['are you sure'],
            [
                {
                    text: lang[lan]['cancel'], onPress: () => {

                    }
                },
                {
                    text: lang[lan]['delete'], onPress: () => {

                        (async () => {
                            await dbObject.addBooktoTrash(book.id)

                            const books = await dbObject.getAllActiveBooks()

                            if (books.length === 0) {
                                navigation.navigate('WelcomeScreen')
                            } else {
                                props.setAllActiveBooks(books)
                                props.setCurrentBookId(books['_array'][0].id)
                                props.setCurrentBookData(books['_array'][0])

                                const existingCust = await dbObject.getExistingContacts(books['_array'][books.length - 1].id)
                                props.setExistingCustomers(existingCust)

                                await dbObject.setCurrentBook(books['_array'][0].id)
                                navigation.navigate('Root')
                            }
                        })();

                    }
                },
            ]
        );

    }

    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    return (
        <SafeAreaView style={[{flex: 1, backgroundColor: "#ffffff"}, {paddingTop: 0}]}>


            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >


                <View style={[stylesI.modalView, {backgroundColor: "#f1f2f3"}]}>

                    <View style={{backgroundColor: 'white', width: "100%", height: 50, justifyContent: 'center'}}>
                        <Text style={[styles.normalText, {textAlign: "center"}]}>SELECT YOUR LANGUAGE</Text>
                    </View>

                    {
                        languageMapping.map(lanSet => (
                          <View style={[styles.row, {
                              justifyContent: 'space-around',
                              width: "100%",
                              backgroundColor: 'transparent'
                          }]}>

                              <TouchableOpacity onPress={()=>{
                                  (async() => {

                                      await dbObject.setLanguage(lanSet.column1.lanKey)
                                      setModalVisible(!modalVisible);
                                      props.setCurrentLanguage(lanSet.column1.lanKey)
                                  })();

                              }}><View style={[styles.row, stylesI.oneLangCont]}>
                                  <View style={[styles.initialsCont]}>
                                      <Text style={[styles.initialText]}>
                                          {lanSet.column1.lanInitial}
                                      </Text>
                                  </View>
                                  <Text>{lanSet.column1.lanName}</Text>
                              </View>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={()=>{

                                  (async() => {

                                      await dbObject.setLanguage(lanSet.column2.lanKey)
                                      setModalVisible(!modalVisible);
                                      props.setCurrentLanguage(lanSet.column2.lanKey)
                                  })();

                              }}><View style={[styles.row, stylesI.oneLangCont]}>
                                  <View style={[styles.initialsCont]}>
                                      <Text style={[styles.initialText]}>
                                          {lanSet.column2.lanInitial}
                                      </Text>
                                  </View>
                                  <Text>{lanSet.column2.lanName}</Text>
                              </View>
                              </TouchableOpacity>


                          </View>
                        ))
                    }

                </View>

            </Modal>



            <Modal
                animationType="slide"
                transparent={true}
                visible={modal2Visible}
                onRequestClose={() => {
                    setModal2Visible(!modal2Visible);
                }}
            >


                <View style={[stylesI.modalView, {backgroundColor: "#f1f2f3"}]}>

                    <View style={{backgroundColor: 'white', width: "100%", height: 50, justifyContent: 'center'}}>
                        <Text style={[styles.normalText, {textAlign: "center"}]}>SELECT YOUR CURRENCY</Text>
                    </View>

                    <View style={[styles.row, {
                        justifyContent: 'space-around',
                        width: "100%",
                        backgroundColor: 'transparent'
                    }]}>

                        <TouchableOpacity
                        onPress={()=>{
                            props.setCurrentCurrency('INR')
                            dbObject.setCurrency('INR')
                            setModal2Visible(!modal2Visible);

                        }}
                        ><View style={[styles.row, stylesI.oneLangCont]}>
                            <View style={[styles.initialsCont]}>
                                <Text style={[styles.initialText]}>
                                ₹
                                </Text>
                            </View>
                            <Text>Indian Rupee</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                props.setCurrentCurrency('INR')
                                dbObject.setCurrency('USD')
                                setModal2Visible(!modal2Visible);

                            }}
                            >
                            <View style={[styles.row, stylesI.oneLangCont]}>
                            <View style={[styles.initialsCont]}>
                                <Text style={[styles.initialText]}>
                                    $
                                </Text>
                            </View>
                            <Text>US Dollar</Text>
                        </View>
                        </TouchableOpacity>


                    </View>

                </View>

            </Modal>



            {/* Modal End */}


            <View>
                <Header navigation={navigation}/>
                {/* Contact Names */}

                {/* One Contact */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ProfileEditScreen')
                    }}
                >
                    <View style={[styles.cContainer, styleI.topRow]}>
                        {/* Initials */}
                        <View style={styles.initialsCont}>
                            <FontAwesome5 name={"book"} size={20} color={"#ffffff"}/>
                        </View>
                        {/* Initials */}

                        <View style={styles.cNameTimeCont}>
                            <Text style={styles.cName}>{props.personals.currentBookData.name}</Text>
                            <Text style={styles.cTime}>Your name</Text>
                        </View>

                        <View>

                            <MaterialCommunityIcons name={"account-edit"} size={30}/>
                        </View>
                    </View>
                </TouchableOpacity>


            </View>


            <ScrollView style={{borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#f4f0ec", padding: 10, marginTop: 5, flex: 1, paddingBottom: 20 }}>

                {/*<ListItem
                  text={lang[lan]['request money']}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/paymentblue.png')}/>
                </ListItem>*/}

                {/*<ListItem
                  text={lang[lan]['payment history']}
                  onPress={() => navigation.navigate('PaymentHistoryScreen')}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/repayment.png')}/>
                </ListItem>*/}

                <ListItem
                  text={lang[lan]['business card']}
                  onPress={() => navigation.navigate('BusinessCard')}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/businesscard.png')}/>
                </ListItem>

                <ListItem
                  text={"Cash Ledger"}
                  onPress={() => navigation.navigate('CashLedgerScreen')}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/businesscard.png')}/>
                </ListItem>

                <ListItem
                  text={"Profit/Loss"}
                  onPress={() => navigation.navigate('profitLoss',props.personals)}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/businesscard.png')}/>
                </ListItem>

                <ListItem
                  text={"All Record"}
                  onPress={() => navigation.navigate('ViewReportScreen', {all:1})}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/businesscard.png')}/>
                </ListItem>

                <ListItem
                  text={lang[lan]['settings']}
                  onPress={() => refRBSheet.current.open()}
                >
                    <EvilIcons name="gear" size={35} color="#4e54c8"/>
                </ListItem>

                {/*<ListItem
                  text={lang[lan]['help and support']}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/help.png')}/>
                </ListItem>*/}

                <ListItem
                  text={lang[lan]['trash book']}
                  onPress={() => deleteBook()}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/trash.png')}/>
                </ListItem>

                <ListItem
                  text={"Bin"}
                  onPress={() => navigation.navigate('Bin')}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/trash.png')}/>
                </ListItem>

                <ListItem
                  text={lang[lan]['lekha jhoka web']}
                  onPress={() => navigation.navigate('webQrScanScreen')}
                >
                    <Image style={{width: 30, height: 30}} source={require('../assets/icons/web.png')}/>
                </ListItem>

                <View style={{marginBottom: 20}}>
                    <ListItem
                      text={lang[lan]['logout']}
                      onPress={() => signOut()}
                    >
                        <Image style={{width: 30, height: 30}} source={require('../assets/icons/logout.png')}/>
                    </ListItem>
                </View>

            </ScrollView>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,.5)",

                    },
                    draggableIcon: {
                        backgroundColor: "#4e54c8"
                    }
                }}
            >

                <TouchableOpacity onPress={() => {
                    refRBSheet.current.close()
                    setModalVisible(true);
                }}>
                    <View style={{marginTop: 10}}>
                        <View style={[styles.row, styles.cardGroup]}>
                            <View style={{width: 40}}>
                            <Image style={{width: 28, height: 28}} source={require('../assets/icons/lang.png')}/>
                            </View>
                            <View style={styleI.textIconCont}>
                                <View>
                                    <Text
                                        style={[styles.blueTextSm, styles.midText]}>Language</Text>
                                </View>
                                <View>
                                    <Text style={[styles.blueTextSm, {fontSize: 20}]}>></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{marginTop: 10}} onTouchEnd={() =>
                    {
                        refRBSheet.current.close()
                        setModal2Visible(true)
                    }
                }>
                    <View style={[styles.row, styles.cardGroup]}>
                        <View style={{width: 40}}>
                        <Image style={{width: 28, height: 28}} source={require('../assets/icons/rupay.png')}/>
                        </View>
                        <View style={styleI.textIconCont}>
                            <View>
                                <Text style={[styles.blueTextSm, styles.midText]}>Currency</Text>
                            </View>
                            <View>
                                <Text style={[styles.blueTextSm, {fontSize: 20}]}>></Text>
                            </View>
                        </View>
                    </View>
                </View>
            </RBSheet>

        </SafeAreaView>


    );
}


const styleI = StyleSheet.create({
    topRow: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 8,
        borderRadius: 10,
        margin: 10
    },

    textIconCont: {
        marginLeft: 10,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: "row",
        height: "100%",
        alignItems: 'center',
    }

});


const stylesI = StyleSheet.create({

    modalView: {
        margin: 20,
        // flex: 1,
        padding:10,

        backgroundColor: "white",
        borderRadius: 2,
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
    }
});

const mapStateToProps = (state) => {
    const { personals, booksData } = state
    return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      //all actions come here
      setIsLoggedIn,
      setAllActiveBooks,
      setCurrentBookId,
      setCurrentBookData,
      setCurrentLanguage,
      setCurrentCurrency,
      setExistingCustomers
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(More)
