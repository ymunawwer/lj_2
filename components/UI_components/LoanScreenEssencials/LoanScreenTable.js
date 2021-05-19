import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MTable} from "../tableDesign";
import {Row, Table} from "react-native-table-component";
import {styles} from "../../../styles/globalStyle";
import {Entypo} from "@expo/vector-icons";
import {RoundedBtn} from "../Buttons";
import storeObject from "../../../store/store";

const LoanScreenTable = (props) => {

  const { navigation, mTakeSum = 0, lan = "english", data = []} = props
  console.log('loan data',data)

  const addCustomerBtn = () => {
    return(
      <View style={{height: "100%", alignItems: "center", justifyContent: "center"}}>
        <RoundedBtn
          style={{flex: 1, marginHorizontal: 10, marginVertical: 5}}
          containerStyle={{paddingVertical: 9}}
          isCustom={true}
          onPress={() => {
            navigation.navigate('addLoanInputs')
            //storeObject.setOpenLoan(1)
            //navigation.navigate('ContactScreen')
          }}
        >
          <View style={{flexDirection: "row", alignItems:'center'}}>
            <Entypo name={"add-user"} size={20} color={"#ffffff"} style={{marginHorizontal: 10}}/>
            <Text style={[styles.normalText, {color: 'white', fontSize:12}]}>Add New</Text>
          </View>
        </RoundedBtn>
      </View>
    );
  }

  const headerItems = [
    "Recent Loan",
    "Taken",
    "Given",
    "Customer",
    "View"
  ]

  const FooterItem = [
    addCustomerBtn(), "₹ 10", "₹ 10", ""
  ]

  const widthArr = [120, 80, 80, 100, 70]

  const tableFooter = () => {
    return (
      <View>
        <Table >
          <Row data={FooterItem} widthArr={widthArr} style={mStyle.bottomRow} textStyle={mStyle.text}/>
        </Table>
      </View>
    );
  }

  const customItem = (item, index) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('OneCustomerScreenLoan', {
          phoneNumber: item.contactno,
          name: item.contactname,
          loanName: item.name
        })}>
          <View style={[mStyle.container]}>

            <View style={[{width: widthArr[0], flexDirection: "row", paddingLeft: 10}]}>

              <View style={styles.cNameTimeCont}>
                <Text style={styles.cName}>{item.name}</Text>
                <Text style={styles.cTime}>{new Date(item['lastupdated']).toUTCString().slice(0,25)}</Text>
              </View>
            </View>

            <View style={[styles.cAmtTimeCont, {alignItems:"center", width: widthArr[1]}]}>
              <Text style={styles.takeAmountText}>₹{Math.round(item['totalTaken'])}</Text>
            </View>

            <View style={[styles.cAmtTimeCont, { alignItems:"center", width: widthArr[2]}]}>
              <Text style={styles.takeAmountText}>₹{Math.round(item['totalGiven'])}</Text>
            </View>

            <View style={[styles.cTime, { alignItems:"center", width: widthArr[3]}]}>
              <Text>{item.contactname}</Text>
            </View>

            <View style={[styles.cTime, { alignItems:"center", width: widthArr[4]}]}>
              <Text style={styles.viewText}>View</Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  }

  return (
    <View style={{flex: 1, justifyContent:'center',alignItems:'center', width: "100%", marginHorizontal: 5}}>
      <MTable
        isCustomItem={true}
        customItem={(item, index) => customItem(item, index)}
        headerItems={headerItems}
        isTouchableItem={false}
        style={{flex:1,width:'100%'}}
        tableContentStyle={{backgroundColor: "#f4f0ec"}}
        itemKey={"id"}
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
    width:'100%',
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: .2,
    borderColor: '#dedede',
  },

  text: { textAlign: 'center', fontWeight: 'bold', color:'white' },
  bottomRow:{
    height: 50, backgroundColor: '#4e54c8', borderBottomLeftRadius: 4, borderBottomRightRadius: 4
  }
})

export default LoanScreenTable
