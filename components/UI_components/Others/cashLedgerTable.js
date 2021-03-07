import React, { useEffect,useState } from "react";
import { MTable } from "../tableDesign"
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {styles} from "../../../styles/globalStyle";
import {Row, Table} from "react-native-table-component";

function CashLedgerTable(props) {

  const { navigation, lan = "english", data = []} = props
  // const [cashInTotal,setCashInTotal] =useState(0)
  // const [cashOutTotal, setCashOutTotal] = useState(0)


  // console.log("cash ledger data", data)

  const headerItems = [
    "Date",
    "Cash In",
    "Cash Out",
    "Particulars"
  ]

  
  const widthArr = [110, 110, 110, 110]

  const tableFooter = () => {
    const FooterItem = [
      "NET", "₹ "+(data['total']?.['cashInTotal']), "₹ "+(data['total']?.['cashOutTotal'])
    ]
  
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
          <View style={mStyle.container}>

            <View style={[{width: widthArr[0] - 10, flexDirection: "row"}]}>
              <View style={styles.cNameTimeCont}>
                <Text style={[styles.cTime,{fontWeight: "bold"}]}>{item.name}</Text>
                <Text style={styles.cTime}>{item.date}</Text>
              </View>
            </View>

            <View style={[styles.cAmtTimeCont, {marginLeft: 10, alignItems:"center", width: widthArr[1]}]}>
              <Text style={styles.takeAmountText}>{((item.give === 1 && item.take === 0) || (item.give === 2 && item.take === 0))?item.amount:0}</Text>
            </View>

            <View style={[styles.cAmtTimeCont, { alignItems:"center", width: widthArr[2]}]}>
              <Text style={styles.giveAmountText}>{((item.give === 1 && item.take === 0) || (item.give === 2 && item.take === 0))?0:item.amount}</Text>
            </View>
  

            <View style={[styles.cAmtTimeCont, { width: widthArr[3]}]}>
              <Text>{item.remarks}</Text>
            </View>
          </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MTable
        isCustomItem={true}
        customItem={(item, index) => customItem(item, index)}
        headerItems={headerItems}
        isTouchableItem={false}
        style={{flex:1}}
        itemKey={"date"}
        data={data.data}
        widthArr={widthArr}
        tableFooter={tableFooter}
        isTableFooter={true}
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

export default CashLedgerTable
