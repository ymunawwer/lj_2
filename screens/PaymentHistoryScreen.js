import React from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/globalStyle';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {bindActionCreators} from "redux";
import {setCurrentLanguage, setFirstUseData} from "../redux/actions/personalsActions";
import {connect} from "react-redux";

function PaymentHistoryScreen(props) {
    const { navigation } = props

    return (
        <View>


            {/* Dates */}
        <View style={[styles.container,{backgroundColor:'#4e54c8'}]}>
            <View style={[styles.row,{height:70,paddingHorizontal:0,paddingVertical:0}]}>

                <View style={[styles.row,{marginLeft:1}]}>
                <Ionicons style={[{marginRight:5}]} name="ios-arrow-back" size={16} color="#4e54c8" />
                    <TouchableOpacity>
                        <Text style={[styles.blueTextSm,{fontWeight:'bold'}]}> VIEW OLD</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.column}>
                    <Text style={[styles.greyTextSm,styles.textLightBold]}>04 JUL 20</Text>
                    <Text style={[styles.greyTextSm,styles.textLightBold]}>₹ 4</Text>
                </View>


                <View style={styles.column}>
                    <Text style={[styles.greyTextSm,styles.textLightBold]}>04 JUL 20</Text>
                    <Text style={[styles.greyTextSm,styles.textLightBold]}>₹ 4</Text>
                </View>


                <View style={[styles.column,stylesI.today]}>
                    <Text style={[styles.greyTextSm,styles.textLightBold]}>TODAY</Text>
                    <Text style={[styles.greyTextSm,styles.textLightBold]}>₹ 4</Text>
                </View>

            </View>
        </View>
        {/* Dates End */}



       <View style={[styles.row,{backgroundColor:'#dedede',justifyContent:'flex-start',height:50}]}>
         <TouchableOpacity style={[stylesI.headerBtn]}><Text style={[styles.blueTextSm,stylesI.headerBtns,styles.boldText,,{backgroundColor:"#4e54c8",color:'white'}]}>All</Text></TouchableOpacity>
         <TouchableOpacity style={[stylesI.headerBtn]}><Text style={[styles.blueTextSm,stylesI.headerBtns,styles.boldText]}><FontAwesome name="qrcode" size={16} color="#4e54c8" /> QR Code</Text></TouchableOpacity>
         <TouchableOpacity style={stylesI.headerBtn}><Text style={[styles.blueTextSm,stylesI.headerBtns,styles.boldText]}><FontAwesome name="dollar" size={16} color="#4e54c8" /> Request Money</Text></TouchableOpacity>
         <TouchableOpacity style={stylesI.headerBtn}><Text style={[styles.blueTextSm,stylesI.headerBtns,styles.boldText]}><Ionicons name="md-gift" size={16} color="#4e54c8" /> Cash back</Text></TouchableOpacity>
       </View>
       {/* Filter Buttons End */}


       {/* Search */}
       <View style={[styles.row,{borderBottomColor:'#dedede', borderBottomWidth:1,height:50}]}>
                    <AntDesign name="search1" size={22} color="#4e54c8" style={{marginRight:5}} />
                    <TextInput style={{flex:2,marginRight:20}} placeholder="Number of Payments"></TextInput>
       </View>
       {/* Search End */}


  {/* Transactions */}

       {/* Customer List */}
       <View>

                     {/* Received Card */}
                     <TouchableOpacity>
                  <View style={[styles.row,stylesI.oneCustomer]}>
              {/* Initials */}
                  <View style={styles.initialsCont}>
                  <Text style={styles.initialText}>O</Text>
                  </View>
              {/* Initials */}

              <View style={styles.cNameTimeCont}>
                  <Text style={styles.cName}>Omar</Text>
                  <Text style={[styles.greyTextSm,{margin:0,paddingHorizontal:0}]}>28/08/1988</Text>
              </View>

              <View style={{alignItems:'flex-end'}}>
                  <Text style={styles.giveAmountText}>₹ 500</Text>
                  <Text style={styles.sent}><AntDesign name="checkcircle" size={16} style={styles.sent}/> Sent</Text>

                </View>
                 </View>
                 </TouchableOpacity>
                {/* One Contact End */}

                {/* One Contact */}
                <TouchableOpacity>
                  <View style={[styles.row,stylesI.oneCustomer]}>
              {/* Initials */}
                  <View style={styles.initialsCont}>
                  <Text style={styles.initialText}>O</Text>
                  </View>
              {/* Initials */}

              <View style={styles.cNameTimeCont}>
                  <Text style={styles.cName}>Omar</Text>
                  <Text style={[styles.greyTextSm,{margin:0,paddingHorizontal:0}]}>28/08/1988</Text>
              </View>

              <View style={{alignItems:'flex-end'}}>
                  <Text style={styles.takeAmountText}>₹ 200</Text>
                  <Text style={styles.received}><AntDesign name="checkcircle" size={16} style={styles.received}/> Received</Text>

                </View>
                 </View>
                 </TouchableOpacity>
                {/* Received Card End */}

       </View>

        </View>
    )
}



const stylesI=StyleSheet.create({
    today:{
        backgroundColor:'rgba(0,0,302,.1)',
        height:"100%"
    },

headerBtn:{
    flexDirection:"row",
    marginRight:14,
    alignItems:'center',
  },
  headerBtns:{
    paddingHorizontal:8,
    paddingVertical:5,
    borderRadius: 25,
    backgroundColor:'white',
    shadowColor:'#dedede',
    shadowRadius:5
  },
  oneCustomer:{
      height:70,
      borderBottomWidth:.5,
      borderBottomColor:'#dedede'
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistoryScreen)
