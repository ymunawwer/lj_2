import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import {styles} from '../styles/globalStyle';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import dbObject from '../components/database/db'
import * as lang from "../translations/lang.json"
import {setAllActiveBooks} from "../redux/actions/booksDataActions";
import DialogInput from 'react-native-dialog-input';


function bin(props) {
    const { navigation } = props
    const [tBooks, setTBooks] = useState(null)
    const [inputBoxVisibility, setInputBoxVisibility] = useState(false)
    const [passwordinputboxvisibilityfirstuse, setpasswordinputboxvisibilityfirstuse] = useState(false)
    const [passwordinputboxvisibility, setpasswordinputboxvisibility] = useState(false)
    const [isFirstUse, setFirstUse] = useState(null)

    let lan = props.personals.currentLan


    useEffect(() => {

        dbObject.checkifbinisfirsttime().then(function(obj){
            console.log(obj['rows']['_array'][0])
            console.log(obj['rows']['_array'][0].binpass==="poop")
            if(obj['rows']['_array'][0].firstuse==1){
                console.log("First use")
                setpasswordinputboxvisibilityfirstuse(true)
            }else{
                 setpasswordinputboxvisibility(true)
            }
        })

         dbObject.getAllTrashedBooks().then(function(books){
            setTBooks(books)
        })

        return () => {

        }
    }, []);



    return (
        <View>
        <DialogInput isDialogVisible={passwordinputboxvisibilityfirstuse}
                title={"Set Bin Password"}
                message={""}
                hintInput ={"Password"}
                submitInput={ (password) => {
                    dbObject.setBinPassword(password).then(function(str){
                        Alert.alert("Password Added Successfully")
                        setpasswordinputboxvisibilityfirstuse(false)
                    })
                       } }
                     closeDialog={ () => {navigation.goBack()}}>
                 </DialogInput>

                 

               <DialogInput isDialogVisible={passwordinputboxvisibility}
                title={"Enter Bin Password"}
                message={""}
                hintInput ={"Password"}
                submitInput={ (password) => {

                    dbObject.checkBinPassword(password).then(function(str){
                        if(str===1){
                            Alert.alert("Correct")
                            setpasswordinputboxvisibility(false)
                        }else{
                            Alert.alert("Incorrect")
                            navigation.goBack()

                        }


                    })
                       } }
                     closeDialog={ () => {navigation.goBack()}}>
                 </DialogInput>
        {



                tBooks ?
                    <FlatList
                        data={tBooks}
                        renderItem={({item}) => (

                            <TouchableOpacity
                                onPress={() => {
                                    // Alert.alert(
                                    //     "Do you really want to recover "+ item.name+"?",
                                    //     lang[lan]['are you sure'],
                                    //     [
                                    //         {
                                    //             text: lang[lan]['cancel'], onPress: () => {

                                    //             }
                                    //         },
                                    //         {
                                    //             text: "Recover", onPress: () => {
                                    //                 (async () => {
                                    //                     // make trashed book active in sqlite
                                    //                     await dbObject.removeBookFromTrash(item.id)

                                    //                     // Set updated books data in redux after fetching it from sqlite
                                    //                     const activeBooks = await dbObject.getAllActiveBooks()
                                    //                     props.setAllActiveBooks(activeBooks['_array'])

                                    //                 })();

                                    //             }
                                    //         },
                                    //     ]
                                    // );
                                }}>
                                <View style={[styles.cContainer, styleI.topRow,{marginBottom:10}]}>
                                    {/* Initials */}
                                    <View style={styles.initialsCont}>
                                        <Text style={styles.initialText}>{item.name[0]}</Text>
                                    </View>
                                    {/* Initials */}

                                    <View style={styles.cNameTimeCont}>
                                        <Text style={styles.cName}>{item.name}</Text>
                                    </View>

                                    <View>
                                        <TouchableOpacity onPress={() => {


                                                Alert.alert(
                                                        "Do you really want to Recover "+ item.name+"?",
                                                        lang[lan]['are you sure'],
                                                        [
                                                            {
                                                                text: lang[lan]['cancel'], onPress: () => {

                                                                }
                                                            },
                                                            {
                                                                text: "Recover", onPress: () => {
                                                                    (async () => {
                                                                        await dbObject.removeBookFromTrash(item.id)
                                                                        const activeBooks = await dbObject.getAllActiveBooks()
                                                                        props.setAllActiveBooks(activeBooks['_array'])
                                                                        Alert.alert("Book Recovered Successfully")
                                                                        navigation.goBack()
                                                                    })();
                                                                }
                                                            },
                                                        ]
                                                    );


                                        }} style={{
                                            borderWidth: .2,
                                            paddingVertical: 2,
                                            paddingHorizontal: 4,
                                            borderRadius: 4
                                        }}><Text>Recover</Text></TouchableOpacity>
                                    </View>
                                    <View>
                                    <DialogInput isDialogVisible={inputBoxVisibility}
                                                title={"Enter Book Password"}
                                                message={""}
                                                hintInput ={"Password"}
                                                submitInput={ (password) => {

                                                        dbObject.checkBookPassword(item.id,password)
                                                        .then(function(res){
                                                            if(res===1){
                                                                (async () => {
                                                                    await dbObject.deleteBookFromTrash(item.id)
                                                                    const activeBooks = await dbObject.getAllActiveBooks()
                                                                    props.setAllActiveBooks(activeBooks['_array'])
                                                                    Alert.alert("Book Removed Successfully")
                                                                    navigation.goBack()
                                                                })();
                                                            }else{
                                                                Alert.alert("Wrong Book Password")
                                                            }
                                                        })
                                                } }
                                                closeDialog={ () => {setInputBoxVisibility(false)}}>
                                    </DialogInput>


                                        <TouchableOpacity onPress={() => {
                                            (async () => {

                                                Alert.alert(
                                                    "Do you really want to Delete "+ item.name+"?",
                                                    lang[lan]['are you sure'],
                                                    [
                                                        {
                                                            text: lang[lan]['cancel'], onPress: () => {

                                                            }
                                                        },
                                                        {
                                                            text: "Delete", onPress: () => {
                                                                    setInputBoxVisibility(true)
                                                            }
                                                        },
                                                    ]
                                                );
                                            })();
                                        }} style={{
                                            borderWidth: .2,
                                            paddingVertical: 2,
                                            paddingHorizontal: 4,
                                            borderRadius: 4
                                        }}><Text>Delete</Text></TouchableOpacity>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}

                        onEndReachedThreshold={0.5}

                    /> : console.log('')

            }




            </View>
    )
}



const styleI = StyleSheet.create({
    topRow: {
        backgroundColor: 'white',
        borderBottomWidth: 0
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
      setAllActiveBooks
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(bin)
