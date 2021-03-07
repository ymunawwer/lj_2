import React, {useState, useEffect, useRef} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,

} from 'react-native';
import {styles} from '../../styles/globalStyle';
import RBSheet from "react-native-raw-bottom-sheet";
import dbObject from '../../components/database/db'
import * as lang from "../../translations/lang.json"
import storeObject from "../../store/store";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setCurrentBookData, setCurrentBookId} from "../../redux/actions/personalsActions";
import {setExistingCustomers} from "../../redux/actions/booksDataActions";


function Header(props) {
    const { navigation } = props
    let lan = props.personals.currentLan

    const [mSheetHeight, setSheetHeight] = useState(0)

    useEffect(() => {

        setSheetHeight(400)

    }, []);


    const refRBSheet = useRef();
    return (
        <View style={stylesI.wrapper}>
            {/* Header */}
            <View style={stylesI.header}>

                <View style={{flex: 4}}>
                    <TouchableOpacity style={[{flexDirection: 'row'}]} onPress={() => refRBSheet.current.open()}>
                        <Image style={{width: 20, height: 20}} source={require('../../assets/images/logowhite.png')}/>
                        <Text style={stylesI.username}>{props.personals.currentBookData.name} <AntDesign name="down" size={10}
                                                                                    color="white"/></Text>
                    </TouchableOpacity>
                </View>

                {/**
                 *  Below sections have been detached from app
                 */}
                {/*<View style={{flexDirection: 'row'}}>

                    <TouchableOpacity onPress={() => navigation.navigate('CollectionScreen')} style={{marginRight:10}}>
                    <Image style={{width: 22, height: 22}} source={require('../../assets/icons/payment.png')}/>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate('CollectionScreen')}>
                    <Image style={{width: 22, height: 22}} source={require('../../assets/icons/contact.png')}/>
                    </TouchableOpacity>
                </View>*/}

            </View>

            <RBSheet
                ref={refRBSheet}
                height={mSheetHeight}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#4e54c8",

                    }
                }}
            >


                {

                    props.booksData.allActiveBooks ?
                        <FlatList
                            data={props.booksData.allActiveBooks}
                            renderItem={({item}) => (

                                <TouchableOpacity
                                    onPress={() => {

                                        (async () => {
                                            storeObject.setCurrentBook(item.id)
                                            storeObject.setCurrentBookData(item)

                                            props.setCurrentBookId(item.id)
                                            props.setCurrentBookData(item)

                                            const existingCust = await dbObject.getExistingContacts(item.id)
                                            props.setExistingCustomers(existingCust)

                                            await dbObject.setCurrentBook(item.id)

                                            refRBSheet.current.close()
                                        })();

                                    }}
                                >
                                    <View style={styles.row}>
                                        <Image style={{width: 60, height: 60}}
                                               source={require('../../assets/images/logo.jpg')}/>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            flex: 3,
                                            marginLeft: 20
                                        }}>
                                            <View>
                                                <Text
                                                    style={[styles.normalText, styles.blueText]}>{item.name}</Text>
                                                <Text style={[styles.greyTextSm, {paddingHorizontal: 0}]}>
                                                    {props.booksData.existingCustomers.length +" "+ lang[lan]['customers']}
                                                </Text>
                                            </View>

                                            <View style={styles.container}>
                                            {
                                                props.personals.currentBookData.id === item.id?
                                                    <AntDesign name="checkcircle" size={16} color="#4e54c8"/>
                                                    :<Text>></Text>
                                            }
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}

                        /> : console.log('')
                }



                <View style={{borderBottomWidth: .2, borderBottomColor: '#dedede'}}/>

                <TouchableOpacity
                    onPress={() => {
                        refRBSheet.current.close()
                        navigation.navigate('WelcomeScreen')
                    }}

                    style={{
                        borderRadius: 6,
                        alignItems: 'center',
                        height: 50,
                        justifyContent: 'center',
                        backgroundColor: '#4e54c8',
                        margin: 10
                    }}
                >
                    <Text style={{color: 'white'}}><AntDesign name="plus" size={16} color="white"/> {lang[lan]['create new books']}</Text>
                </TouchableOpacity>


            </RBSheet>


        </View>


    );


}


const stylesI = StyleSheet.create({
    wrapper: {
        padding: 0,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#4e54c8",
        elevation: 5,
        width: '100%'
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: "#4e54c8",
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: "#202020",
        width: '100%'
    },
    username: {
        color: "white",
        fontSize: 18,
        marginLeft: 10,
        // flex:4,
        fontWeight: 'bold'
    },

});

const mapStateToProps = (state) => {
    const { personals, booksData } = state
    return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      //all actions come here
      setCurrentBookId,
      setCurrentBookData,
      setExistingCustomers
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header)
