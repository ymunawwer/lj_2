import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/globalStyle';
import {AntDesign} from '@expo/vector-icons';

class Loan extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>

                {/* Header Banner*/}
                <View style={[styles.container, {backgroundColor: '#4287f5'}]}>
                    <View style={[styles.row, {backgroundColor: 'transparent', paddingHorizontal: 20}]}>
                        <View>
                            <Text style={[styles.normalText, {color: 'white'}]}>$2000</Text>
                            <Text style={[styles.greyTextSm, {color: 'white', paddingHorizontal: 0}]}>Collect cash from
                                customer</Text>
                        </View>

                        <AntDesign name="gift" size={50} color="white"/>
                    </View>
                </View>
                {/* Header Banner End */}

                {/* Filter Buttons  */}
                <View style={[styles.row, {backgroundColor: 'transparent', justifyContent: 'flex-start', height: 60}]}>
                    <TouchableOpacity style={stylesI.headerBtn}><Text
                        style={[styles.blueTextSm, stylesI.headerBtns, styles.boldText]}>Highest
                        Amount</Text></TouchableOpacity>
                    <TouchableOpacity style={stylesI.headerBtn}><Text
                        style={[styles.blueTextSm, stylesI.headerBtns, styles.boldText]}>Oldest
                        Due</Text></TouchableOpacity>
                    <TouchableOpacity style={stylesI.headerBtn}><Text
                        style={[styles.blueTextSm, stylesI.headerBtns, styles.boldText]}>Pick
                        Date</Text></TouchableOpacity>
                </View>
                {/* Filter Buttons End */}

                {/* Search */}
                <View style={[styles.row, {
                    height: 40,
                    backgroundColor: 'transparent',
                    borderWidth: .2,
                    marginHorizontal: 14
                }]}>
                    <AntDesign name="search1" size={22} color="#dedede"/>
                    <TextInput style={{flex: 2, marginRight: 20}}
                               placeholder="Search from no. of customers"></TextInput>
                </View>
                {/* Search End */}


                {/* Customer List */}
                <View style={{marginTop: 15}}>

                    {/* One Contact */}
                    <TouchableOpacity>
                        <View style={[styles.row, stylesI.oneCustomer]}>

                            {/* Initials */}
                            <View style={styles.initialsCont}>
                                <Text style={styles.initialText}>O</Text>

                            </View>
                            {/* Initials */}

                            <View style={styles.cNameTimeCont}>
                                <Text style={styles.cName}>Omar</Text>
                                <Text style={[styles.greyTextSm, {margin: 0, paddingHorizontal: 0}]}>28/08/1988</Text>
                            </View>


                            <View>
                                <Text style={styles.giveAmountText}>$500</Text>
                                <TouchableOpacity><Text style={[styles.blueTextSm, styles.boldText]}>Set Date
                                    ></Text></TouchableOpacity>

                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* One Contact End */}


                    {/* One Contact Without Date*/}
                    <TouchableOpacity>
                        <View style={[styles.row, stylesI.oneCustomer]}>

                            {/* Initials */}
                            <View style={styles.initialsCont}>
                                <Text style={styles.initialText}>O</Text>

                            </View>
                            {/* Initials */}

                            <View style={styles.cNameTimeCont}>
                                <Text style={styles.cName}>Omar</Text>
                            </View>


                            <View>
                                <Text style={styles.giveAmountText}>$500</Text>
                                <TouchableOpacity><Text style={[styles.blueTextSm, styles.boldText]}>Set Date
                                    ></Text></TouchableOpacity>

                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* One Contact End */}

                </View>


            </View>
        );
    }
}

export default Loan;


const stylesI = StyleSheet.create({

    headerBtn: {
        marginRight: 14
    },

    oneCustomer: {
        backgroundColor: 'transparent',
        borderBottomColor: "#dedede",
        borderBottomWidth: .4
    },

    headerBtns: {
        borderWidth: 1,
        borderColor: '#4287f5',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 25
    }
});
