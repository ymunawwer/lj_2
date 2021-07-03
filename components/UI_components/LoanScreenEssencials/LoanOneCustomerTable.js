import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MTable} from "../tableDesign";
import {styles} from "../../../styles/globalStyle";
import storeObject from "../../../store/store";

const LoanOneCustomerTable = (props) => {

  const { navigation, lan = "english", data = []} = props

  const headerItems = [
  "Date",
    "Installment",
    "Due Date",
    "Installment Amount",
    "Principal",
    "Interest",
    "Balance Principal"
  ]

  // give width of items according to this array in style
  //For eg: width: widthArr[0] for first item
  const widthArr = [130,130, 130, 130, 130, 130, 130]

  const customItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => {
        console.log("Item ID new = " , item)
        navigation.navigate('EntryDetails')
        storeObject.setRecordId(item.recordid)
        storeObject.setRecordLoanYes(1)
        
      }}>
        <View style={[mStyle.container,{alignItems:'center',width:'100%'}]}>

          <Text
            style={[styles.greyTextSm, styleI.timeDate,{paddingHorizontal:5}]}
          >
          {new Date(item.lastupdated).toUTCString().slice(5,25)}
           
          </Text>
          {
            item.attachment?
              <View style={[{marginRight:0}]}>
                {/* <Image style={{width: 22, height: 22,borderRadius:8}} source={{ uri: item.attachment}}/> */}
              </View>:console.log('')

          }

          
<View style={[styleI.cardGiveAmt,{backgroundColor:'#fff'}]}>
            <Text style={[styles.takeAmountText]}>
            {item['installment']}
              
            </Text>
          </View>

          <View style={styleI.cardGiveAmt}>
            <Text style={[styles.greyTextSm, styles.giveAmountText]}>
              {item.duedate}
            </Text>
          </View>
          {/* <View style={[styleI.cardTakeAmt, styleI.greenBack]}>
            <Text style={[styles.greyTextSm, styles.takeAmountText]}>
              {
                item.give === 0 ?
                  '₹ ' + item['amountTaken'] 
                  :
                  console.log('')
                
              }
            </Text>

          </View> */}

{/* <View style={[styleI.cardGiveAmt,{backgroundColor:'red'}]}>
            <Text style={[styles.greyTextSm, styles.giveAmountText]}>
            ₹ 100
              
            </Text>
          </View> */}

<View style={[styleI.cardGiveAmt,{backgroundColor:'white'}]}>
            <Text style={[styles.greyTextSm, styles.giveAmountText,{color:'black'}]}>
            {item.installmentAmount}
              
            </Text>
          </View>

          <View style={styleI.cardGiveAmt}>
            <Text style={[styles.greyTextSm, styles.giveAmountText]}>
              {
                item.give === 1 ?
                  '₹ ' + item['amountGiven']
                  :
                  '₹' + item['amountTaken'] 
                
              }
            </Text>
          </View>
          <View style={[styleI.cardTakeAmt, styleI.greenBack]}>
            <Text style={[styles.greyTextSm, styles.takeAmountText]}>
              {
                item.give === 0 ?
                  '₹ ' + item['amountTaken'] 
                  :
                  console.log('')
                
              }
            </Text>

          </View>
          <View style={styleI.cardTakeAmt}>
            {
              item.give === 1 ?
                <Text
                  style={[styles.greyTextSm, styles.giveAmountText]}>{'₹ ' + item['amountGiven']}</Text> :
                <Text
                  style={[styles.greyTextSm, styles.takeAmountText]}>{'₹ ' + item['amountTaken'] }</Text>
            }
            <Text
              style={[styles.greyTextSm, styles.boldText, {color: "#f9c032"}]}>{'+ ₹ ' + props?.getTotalAmount(item['give']===1?item['amountGiven']:(item['give']===0?item['amountTaken'] :0), item.interest, item.installment, item.totalMonths)}</Text>

{
              item.give === 1 ?
              <Text
              style={[styles.greyTextSm, styles.boldText, {color: "black"}]}>{'= ₹ ' + (Math.round(props?.getTotalAmount(item['give']===1?item['amountGiven']:(item['give']===0?item['amountGiven'] : 0), item.interest, item.installment, item.totalMonths) + item['amountGiven']))}</Text> :
              <Text
              style={[styles.greyTextSm, styles.boldText, {color: "black"}]}>{'= ₹ ' + (Math.round(props?.getTotalAmount(item['give']===0?item['amountTaken']:(item['give']===0?item['amountTaken'] : 0), item.interest, item.installment, item.totalMonths) + item['amountTaken']))}</Text>
            }
            
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MTable
        isCustomItem={true}
        customItem={(item, index) => customItem(item, index)}
        headerItems={headerItems}
        isTouchableItem={false}
        style={{width:'100%'}}
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
    // width:'100%',
    flexDirection: 'row',
    // padding: 10,
    // alignItems: 'center',
    borderBottomWidth: .2,
    borderColor: '#dedede',
    // justifyContent:'center'
  },

  text: { textAlign: 'center', fontWeight: 'bold', color:'white' },
  bottomRow:{
    height: 50, backgroundColor: '#4e54c8', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
  }
})

const styleI = StyleSheet.create({

  greenBack: {
    backgroundColor: "rgba(42,187,155,.1)",
    height: "100%",
    justifyContent: 'center'
  },

  timeDate: {
    flex: 2
  },

  cardGiveAmt: {
    width: 130,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: "rgba(900,0,0,.1)",
    alignItems: 'center',
 
  },

  cardTakeAmt: {
    width: 130,
    alignItems: 'center',
  
  },



});

export default LoanOneCustomerTable
