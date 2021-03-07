import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, Modal, TouchableHighlight, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {styles} from '../styles/globalStyle';
import {AntDesign} from '@expo/vector-icons';
import dbObject from '../components/database/db'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setCurrentLanguage, setFirstUseData} from "../redux/actions/personalsActions";
import languageMapping from "../components/UI_components/languageMapping";

function MainScreen(props) {

    useEffect(() => {
        (async () => {
            try {
            }
            catch (e) {
                console.log('MainScreen.js: Error: ' + e)
            }
        })();
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{paddingTop: 20, backgroundColor: "white", flex: 1}}>
            <View style={[styles.row, {padding: 0}]}>
                <Image

                    source={require('../assets/images/logo.jpg')}
                    style={{width: 50, height: 50}}

                />

                <TouchableOpacity><Text style={[styles.blueTextSm, styles.boldText]} onPress={() => {
                    setModalVisible(true);
                }}>English <AntDesign name="down" size={12} color="#4e54c8"/></Text></TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
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

                        <TouchableHighlight
                            style={{...stylesI.openButton, backgroundColor: "#2196F3", marginTop: 20}}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={stylesI.textStyle}>Done</Text>
                        </TouchableHighlight>
                    </View>

                </Modal>
            </View>


            <Image

                source={require('../assets/images/logo.jpg')}
                style={{width: "100%", flex: 1}}

            />

            <View style={{alignItems: 'center', padding: 5}}>
                <Text style={[styles.boldText, styles.normalText, {textAlign: 'center', width: "85%"}]}>
                    Manage Your business: Send Reminders and Receive Payments!
                </Text>
            </View>

            <View style={[styles.row, {paddingHorizontal: 50, justifyContent: 'center'}]}>
                <Image

                    source={require('../assets/images/secure.jpg')}
                    style={{width: 50, height: 50}}

                />
                <Text style={styles.greyTextSm}>
                    Trusted by Omar, Ammaar and Shubham
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => {

                    (async() => {
                        await dbObject.firstUseDone();
                        props.setFirstUseData({firstuse:0})

                        /*if(storeObject.getIsLoggedIn()) {
                            if(storeObject.getAllActiveBooks().length > 0) {
                                props.navigation.navigate('Root')
                            }
                            else {
                                props.navigation.navigate('WelcomeScreen')
                            }
                        }
                        else {
                            navigation.navigate('Login')
                        }*/

                    })();
                }}
                style={{
                    borderRadius: 6,
                    alignItems: 'center',
                    height: 50,
                    justifyContent: 'center',
                    backgroundColor: '#4e54c8',
                    margin: 10,
                    marginBottom: 0
                }}

            >

                <Text style={{color: 'white'}}>START USING LEKHA JHOKA</Text>

            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, {justifyContent: 'center'}]}>
                <Text>By logging in you agree our</Text>
                <TouchableOpacity><Text style={styles.blueTextSm}> Privacy Policy</Text></TouchableOpacity>
                <Text> & </Text>
                <TouchableOpacity><Text style={styles.blueTextSm}>T&C</Text></TouchableOpacity>
            </TouchableOpacity>

        </View>
    )
}


const stylesI = StyleSheet.create({

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
    }
});

const mapStateToProps = (state) => {
    const { personals, booksData } = state
    return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      //all actions come here
      setFirstUseData,
      setCurrentLanguage
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
