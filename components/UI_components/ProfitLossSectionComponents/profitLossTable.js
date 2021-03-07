import React from 'react';
import {Text, View, StyleSheet, ScrollView} from "react-native";
import { Divider } from 'react-native-paper';


function ProfitLossTable(props) {

  const { data } = props

  return (

    <View style={{flex: 1, marginHorizontal: 10}}>
      <ScrollView style={{flex: 1}}>
        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Sales</Text>
          <View style={[style1.amountContainer]}>
            <Text style={[style1.amount]}>₹ {data.sales}</Text>
          </View>

        </View>


        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Closing Stock</Text>
          <View style={[style1.amountContainer]}>
            <Text style={[style1.amount]}>₹ {data.closing_stock}</Text>
          </View>

        </View>



        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Total Sales</Text>
          <View style={[style1.amountContainer]}>
            <Divider style={{height: 1, backgroundColor: "#303030", width: "100%"}}/>
            <Text style={[style1.amount]}>₹ {data.total_sales}</Text>
          </View>

        </View>

        <Divider />

        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Opening Stock</Text>
          <View style={[style1.amountContainer]}>
            <Text style={[style1.amount]}>₹ {data.opening_stock}</Text>
          </View>

        </View>



        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Purchases</Text>
          <View style={[style1.amountContainer]}>
            <Text style={[style1.amount]}>₹ {data.purchases}</Text>
          </View>

        </View>

        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Total Purchases</Text>
          <View style={[style1.amountContainer]}>
            <Divider style={{height: 1, backgroundColor: "#303030", width: "100%"}}/>
            <Text style={[style1.amount]}>₹ {data.total_purchases}</Text>
          </View>

        </View>

        <Divider />

        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Gross Profit</Text>
          <View style={[style1.amountContainer]}>
            <Text style={[style1.amount]}>₹ {data.gross_profit}</Text>
          </View>

        </View>



        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Income</Text>
          <View style={[style1.amountContainer]}>
            <Text style={[style1.amount]}>₹ {data.income}</Text>
          </View>

        </View>



        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Total Income</Text>
          <View style={[style1.amountContainer]}>
            <Divider style={{height: 1, backgroundColor: "#303030", width: "100%"}}/>
            <Text style={[style1.amount]}>₹ {data.total_income}</Text>
          </View>

        </View>

        <Divider />

        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Expenses</Text>
          <View style={[style1.amountContainer]}>
            <Text style={[style1.amount]}>₹ {data.expenses}</Text>
          </View>

        </View>



        <View style={[style1.eachRow]}>
          <Text style={[style1.title]}>Net Profit / Loss</Text>
          <View style={[style1.amountContainer]}>
            <Divider style={{height: 1, backgroundColor: "#303030", width: "100%"}}/>
            <Text style={[style1.amount]}>₹ {data.net_profit_loss}</Text>
          </View>
        </View>
      </ScrollView>

    </View>
  );
}

const style1 = StyleSheet.create({
  container: {

  },

  eachRow: {
    flexDirection: "row",
    paddingVertical: 5
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 3
  },
  amount: {
    marginRight: 10
  },

  amountContainer: {
    flex: 1,
    alignItems: "flex-end"
  }
})

export default ProfitLossTable
