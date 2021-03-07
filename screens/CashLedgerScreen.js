import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native";
import CashLedgerTable from "../components/UI_components/Others/cashLedgerTable";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import dbObject from '../components/database/db'


function CashLedgerScreen(props) {

  const { navigation } = props
  let lan = props.personals.currentLan
  const [cashRecord, setCashRecord] = useState("");
  


  useEffect(() => {
        (async () => {
            try {
              
              const res_in = await dbObject.getCashInTransactions(props.personals.currentBookData.id)
              const res_out = await dbObject.getCashOutTransactions(props.personals.currentBookData.id)
              let listC = res_in.concat(res_out)
              listC.sort((a, b) => {
                return (a.lastupdated || a.lastupdated).localeCompare((b.lastupdated || b.lastupdated))
            })
              console.log('Cash in',res_in)
              console.log('Cash out',res_out)
              // console.log('ledger',res)
                  // console.log("cash", res)
                  let cashIn = res_in.reduce((sum,item)=>{
                    // console.log('sum',JSON.stringify(sum))
                    return (sum+item.amount)

                  },0)

                  let cashOut = res_out.reduce((sum,item)=>{
                    // console.log('sum',JSON.stringify(sum))
                    return (sum+item.amount)

                  },0)
                  let res = {
                    'data':listC,
               

                  }
                  // console.log('ledger',res.rows);
                  res['total']={
                    'cashInTotal':cashIn,
                    'cashOutTotal':cashOut
                  }
                  // console.log('total',res.rows)
                  setCashRecord(res)

            }
            catch (e) {
              console.log('Error',JSON.stringify(e))

            }
        })();
    }, []);


  return (

    <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
    <CashLedgerTable
      lan={lan}
      navigation={navigation}
      data={cashRecord}
    />
</SafeAreaView>
  );

}
// data={[{date: "23 sept 2020", cashIn: "10", cashOut: "10", particulars: "I took and gave 10 rupees same day"}]}


const mapStateToProps = (state) => {
  const { personals, booksData } = state
  return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CashLedgerScreen)
