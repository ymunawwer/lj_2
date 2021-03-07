import React, { useState,useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FabBtn, RoundedBtn} from '../components/UI_components/Buttons';
import ProfitLossTable from "../components/UI_components/ProfitLossSectionComponents/profitLossTable";
import {RoundedInput} from "../components/UI_components/Inputs";
import DatePicker from 'react-native-datepicker';
import {Subheading, Title} from "react-native-paper";
import {AntDesign} from "@expo/vector-icons";
import dbObject from '../components/database/db';

function profitLoss(props) {
console.log(props.route.params.currentBookId)
  let todayDateObj = new Date()
  let todayDate = todayDateObj.getFullYear() + "-" + todayDateObj.getMonth() + "-" + todayDateObj.getDate();
  let weekBeforeDateChange = todayDateObj.getDate() - 7
  let weekBeforeDateObj = new Date()
  weekBeforeDateObj.setDate(weekBeforeDateChange)
  let weekBeforeDate = weekBeforeDateObj.getFullYear() + "-" + weekBeforeDateObj.getMonth() + "-" + weekBeforeDateObj.getDate();

  const [fromDate, setFromDate] = useState(weekBeforeDate);
  const [toDate, setToDate] = useState(todayDate)
  const [closingStock, setClosingStock] = useState("")
  const [openingStock, setOpeningStock] = useState("")
  const [mRecords, setRecords] = useState("")
  const [showMainView, setShowMainView] = useState(false)

  const [sales,setSales] = useState([])
  const [totalSales,setTotalSales] = useState(0)
  const [purchases,setPurchases] = useState([])
  const [totalPurchases,setTotalPurchases] = useState(0)
  const [grossProfit,setGrossProfit] = useState(0)
  const [income,setIncome] = useState([])
  const [totalIncome,setTotalIncome] = useState(0)
  const [netProfitLoss,setNetProfitLoss] = useState(0)
  
  const [expenses,setExpenses] = useState([])
  const [totalExpenses,setTotalExpenses] = useState(0)

  // sales: 1000,
  //             closing_stock: 10,
  //             total_sales: 1010,
  //             opening_stock: 15,
  //             purchases: 500,
  //             total_purchases: 515,
  //             gross_profit: 495,
  //             income: 4000,
  //             total_income: 4495,
  //             expenses: 495,
  //             net_profit_loss: 4000

  useEffect( () => {
    (async () => {
    let dbO = await dbObject.getRecordByQueryString(props.route.params.currentBookId,'1=1')
    
    setSales(dbO.filter(function(obj,index){
      if(obj['type'] === 'Sales'){
         return obj
}
    }))
    
    setTotalSales(dbO.reduce(function(total,obj){
      
      if(obj['type'] === 'Sales'){
        
        return total+parseInt(obj['amount'])
      }
    },0))
    
    setPurchases(dbO.filter(function(obj,index){
      if( obj['type'] === 'Purchases') return obj
    }))
    setTotalPurchases(dbO.reduce(function(total,obj){
      if(obj['type'] === 'Purchases'){
        return total+obj['amount']
      }
    },0))

    setGrossProfit((totalSales-totalPurchases))
    setIncome(dbO.filter(function(total,obj){
      if(obj['type'] === 'Income'){
        return obj
      }
    }))

    setTotalIncome(dbO.reduce(function(total,obj){
      if(obj['type'] === 'Income'){
        return total+obj['amount']
      }
    },0))

    setExpenses(dbO.filter(function(total,obj){
      if(obj['type'] === 'Expenses'){
        return obj
      }
    }))

    setTotalExpenses(dbO.reduce(function(total,obj){
      if(obj['type'] === 'Expenses'){
        return total+obj['amount']
      }
    },0))
    


    setNetProfitLoss(totalIncome+grossProfit)

    console.log('jj',dbO,totalIncome,grossProfit,income,netProfitLoss,totalPurchases,purchases,totalSales,sales)
    })()

  },[])

  function _renderInputs() {
    return(
      <View>
        <View>
          <View style={[{justifyContent:'center', width:'100%', flexDirection: "row"}]}>

            <RoundedInput
              value={openingStock}
              label={"Opening Stock"}
              containerStyle={{flex: 1}}
              onChangeText={(text) => setOpeningStock(text)}
              keyboardType="phone-pad"
            />

            <RoundedInput
              value={closingStock}
              label={"Closing Stock"}
              containerStyle={{flex: 1}}
              onChangeText={(text) => setClosingStock(text)}
              keyboardType="phone-pad"
            />

          </View>
          <RoundedBtn
            text="SHOW"
            style={{marginHorizontal:10,marginVertical:10,}}
            onPress={() => {
              if(closingStock !== "" && openingStock !== "") {
                setShowMainView(true)
              }
              else {
                alert("Inputs cannot be empty")
              }
            }}
          />
        </View>
      </View>
    );
  }

  function _renderMainView() {
    return (
      <View style={{flex: 1}}>
        <View style={{
          flexDirection: "row",
          margin: 10,
          borderRadius: 10,
          elevation: 5,
          backgroundColor: "#fff",
          padding: 10
        }}>
          <View style={[styleI.topCardEachElement]}>
            <Text>Closing Stock:</Text>
            <Text>₹ {closingStock}</Text>
          </View>

          <View style={[styleI.topCardEachElement]}>
            <Text>Opening Stock:</Text>
            <Text>₹ {openingStock}</Text>
          </View>

          <View>
            <FabBtn
              containerStyle={{
                backgroundColor: "#FFE033",
                width: 40,
                height: 40,
                elevation: 0
              }}
              onPress={() => {
                setShowMainView(false)
              }}
            >
              <AntDesign name={"edit"} size={20}/>
            </FabBtn>
          </View>

        </View>

        <View style={{flexDirection: "row", marginHorizontal: 10}}>

          <View style={{flex: 1, marginRight: 10, alignItems: "center"}}>
            <Subheading>From: </Subheading>
            <DatePicker
              style={{width: "100%"}}
              date={fromDate}
              mode="date"
              placeholder="Date"
              format="YYYY-MM-DD"
              minDate="2000-06-01"
              maxDate={todayDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{


                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                setFromDate(date)
              }}
            />
          </View>

          <View style={{flex: 1, marginLeft: 10, alignItems: "center"}}>
            <Subheading>To: </Subheading>
            <DatePicker
              style={{width: "100%"}}
              date={toDate}
              mode="date"
              placeholder="Date"
              format="YYYY-MM-DD"
              minDate="2000-06-01"
              maxDate={todayDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                //...
              }}
              onDateChange={(date) => {
                setToDate(date)
              }}
            />
          </View>
        </View>

        <View style={{marginVertical: 20, flex: 1}}>
          <ProfitLossTable
            data={{
              sales: totalSales,
              closing_stock: closingStock,
              total_sales: totalSales,
              opening_stock: openingStock,
              purchases: totalPurchases,
              total_purchases: totalPurchases,
              gross_profit: grossProfit,
              income: totalIncome,
              total_income: totalIncome,
              expenses: expenses,
              net_profit_loss: netProfitLoss
            }}
          />
        </View>
      </View>
    );
  }

    return (
      <View style={{backgroundColor:'white',flex:1,paddingTop:10}}>
        {
          showMainView?
            _renderMainView()
            :
            _renderInputs()
        }
      </View>
    );

}

const styleI = StyleSheet.create({
  topCardEachElement: {
    flex: 1,
    alignItems: "center"
  }
})

export default profitLoss
