import React, {useEffect, useState} from "react";
import { MTable } from "../tableDesign"
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {styles} from "../../../styles/globalStyle";
import {Row, Table} from "react-native-table-component";
import {Entypo} from '@expo/vector-icons';
import {sum} from "react-native-table-component/utils";

function HomeTable(props) {

  const { navigation,componentName, lan = "english", data = []} = props

  const [sumArr, setSumArr] = useState([])
  console.log('navigation ',componentName)
  useEffect(() => {
    setSumArr(props?.mTakeSum)
    // console.log(sumArr)
  }, [props?.mTakeSum])

  const customItem = (item, index) => {
    let marker;
    if(item.give===2&&item.take===0){
      marker = 'Payable'
    }
    if(item.give===0&&item.take===2)
    {
     marker = 'Receivable'
    }
    if(item.give===1&&item.take===0){
      marker = 'Gave'
    }
    if(item.give===0&&item.take===1)
    {
     marker = 'Got'
    }
    

    return (

      item.loanYes === 0 ?



        <TouchableOpacity onPress={() => navigation.navigate('OneCustomerScreen', {
          phoneNumber: item.contact,
          name: item.name
        })}>
          <View style={mStyle.container}>

            <View style={[{ flexDirection: "row", }]}>
              <View style={[styles.initialsCont]}>
                <Entypo size={23} name="user" color={"#ffffff"}/>
              </View>


              <View>
                <Text style={styles.cName}>{item.name}</Text>
                <Text style={styles.cTime}>{new Date(item['lastupdated']).toUTCString().slice(0,25)}</Text>
              </View>
            </View>


            {

              (item.give===0 && item.take===1) || (item.give===0 && item.take===2)?
              (
                 <View style={[styles.cAmtTimeCont, {marginLeft: 10, alignItems:"center"}]}>
                <Text style={styles.takeAmountText}>₹{componentName==='dashboard'?sumArr[index]:item.amount}</Text>
                   {//console.log("index is ", index)
                 }
                <Text style={styles.cTime}>{marker}</Text>
                </View>
              )
              :
              (
                 <View style={[styles.cAmtTimeCont, {marginLeft: 10, alignItems:"center"}]}>
                <Text style={styles.giveAmountText}>₹{componentName==='dashboard'?sumArr[index]<0?-sumArr[index]:sumArr[index]:(item.amount)}</Text>
                <Text style={styles.cTime}>{marker}</Text>
                </View>
              )
              
            }

          </View>
        </TouchableOpacity> : console.log('')
    );
  }

  return (
    <View style={{flex: 1,width:'100%'}}>
        <MTable
          style={{backgroundColor: "#f4f0ec"}}
          tableContentStyle={{marginBottom: 50}}
          isCustomItem={true}
          customItem={(item, index) => customItem(item, index)}
          //headerItems={headerItems}
          isHeader={false}
          isHorizontalScroll={false}
          isTouchableItem={false}
          itemKey={"recordid"}
          data={data}
          // widthArr={widthArr}
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
    width: "100%",
    padding: 10,
    alignItems: 'center',
    justifyContent: "space-between",
    borderBottomWidth: .2,
    borderColor: '#dedede'
  },

  text: { textAlign: 'center', fontWeight: 'bold',color:'white' },
  bottomRow:{
    height: 50, backgroundColor: '#4e54c8', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
  }
})

export default HomeTable
