import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {styles} from '../styles/globalStyle';
import Modal, {ModalContent} from 'react-native-modals';
// import { QRCode } from 'react-native-custom-qr-codes-expo';
import RBSheet from "react-native-raw-bottom-sheet";
import {useRef} from "react";

import {AntDesign} from '@expo/vector-icons';

export default function QrCodeGen({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const refRBSheet = useRef();
    return (

        <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center',}]}>


            <Text style={[styles.normalText, {marginBottom: 20}]}>GmatriX</Text>

            <View>
                <QRCode
                    value="Bhagwan Ko Mante ho?"
                    logoBackgroundColor='transparent'
                    size={200}
                />
            </View>

            <Button
                title="Show Modal"
                onPress={() => refRBSheet.current.open()}
            />


            {/* Modal */}

            <RBSheet
                ref={refRBSheet}
                height={150}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                        height:20
                    },
                    draggableIcon: {
                        backgroundColor: "#4e54c8",
                    }
                }}
            >


                <View>
                    <View style={[styles.container, {alignItems: 'center'}]}>
                        <Text style={styles.normalText}>
                            Complete KYC
                        </Text>

                        <Text style={[styles.greyTextSm, {margin: 0, padding: 0}]}>
                            You need to complete KYC to receive payments on Lekha Jhoka
                        </Text>
                    </View>

                </View>


                <View style={{borderBottomWidth: .2, borderBottomColor: '#dedede'}}/>

                <TouchableOpacity
                    style={{
                        borderRadius: 6,
                        alignItems: 'center',
                        height: 50,
                        justifyContent: 'center',
                        backgroundColor: '#4e54c8',
                        margin: 10
                    }}

                >
                    <Text style={{color: 'white'}}>Complete KYC</Text>
                </TouchableOpacity>


            </RBSheet>

            {/* Modal End */}

        </View>
    )
}
