import React from "react";
import { MTable } from "../tableDesign"
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {styles} from "../../../styles/globalStyle";
import {Row, Table} from "react-native-table-component";
import {Entypo} from '@expo/vector-icons';

function DuePayableTable(props) {

  const { navigation, lan = "english", data = []} = props

  const headerItems = [
    "Customer",
    "Type",
    "Amount",
    "Remarks"
  ]

  const widthArr = [220, 110, 110, 210]

  const customItem = (item, index) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('OneCustomerScreen', {
          phoneNumber: item.contact,
          name: item.name
        })}>
          <View style={mStyle.container}>

            <View style={[{width: widthArr[0] - 20, flexDirection: "row"}]}>
              <View style={[styles.initialsCont]}>
                <Entypo size={23} name="user" color={"#ffffff"}/>
              </View>


              <View style={[styles.cNameTimeCont]}>
                <Text style={styles.cName}>{item.name}</Text>
              </View>
            </View>

            <View style={[styles.cAmtTimeCont, {marginLeft: 10, alignItems:"center", width: widthArr[1]}]}>
              <Text style={styles.takeAmountText}>{item.type}</Text>
            </View>

            <View style={[styles.cAmtTimeCont, { alignItems:"center", width: widthArr[2]}]}>
              <Text style={styles.takeAmountText}>{item.amount}</Text>
            </View>

            <View style={[styles.cAmtTimeCont, { alignItems:"center", width: widthArr[3]}]}>
              <Text style={styles.takeAmountText}>{item.remarks}</Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 5}}>
      <MTable
        isCustomItem={true}
        customItem={(item, index) => customItem(item, index)}
        headerItems={headerItems}
        isTouchableItem={false}
        style={{flex:1}}
        itemKey={"recordid"}
        data={data}
        widthArr={widthArr}
      />
    </View>
  );

}

const mStyle = StyleSheet.create({
  listItem: {
    flexDirection:"row",
    borderRadius: 10,
    backgroundColor: "#ffffff"
  },

  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: .2,
    borderColor: '#dedede',
  },

  text: { textAlign: 'center', fontWeight: 'bold',color:'white' },
  bottomRow:{
    height: 50, backgroundColor: '#4e54c8', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
  }
})

export default DuePayableTable
