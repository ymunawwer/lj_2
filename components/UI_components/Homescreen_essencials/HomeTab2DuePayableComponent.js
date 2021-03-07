import React, {useEffect, useRef, useState} from 'react';
import dbObject from "../../database/db";
import { SafeAreaView} from "react-native";
import HomeTabsCommonComponents from "./HomeTabsCommonComponent";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {FloatingAction} from "react-native-floating-action";
import {useIsFocused} from "@react-navigation/native";
import {transactionTypes} from "../../../constants/Constansts";

function HomeTab2DuePayableComponent(props) {

  const isFocused = useIsFocused()

  const { navigation } = props;
  let lan = props.personals.currentLan


  const [mContacts, setContacts] = useState([])
  const [mGiveSum, setGiveSum] = useState(null)
  const [mTakeSum, setTakeSum] = useState(null)
  const [sumArr, setSumArr] = useState([])

  
  const [isModalVisible, setModalVisibility] = useState(false)

  useEffect(() => {

    
   

    (async () => {
      const contactRes = await dbObject.getExistingContactsWithRecble(props.personals.currentBookId)
      console.log('contactRes',contactRes)
      setContacts(contactRes)

      // console.log('test-', await dbObject.getDuePayableRecord(props.personals.currentBookId))
      

      const gaveSumRes = await dbObject.getSumOfDue(props.personals.currentBookId)
      setGiveSum(gaveSumRes)

      const takeSumRes = await dbObject.getSumOfPay(props.personals.currentBookId)
      setTakeSum(takeSumRes)

      if (props.booksData.existingCustomers) {
        const contactList = props.booksData.existingCustomers
        let tempSum = []
        for (let i = 0; i < contactList.length; i++) {
          if (contactList[i].loanYes === 0) {
            const s = await getUserSum(contactList[i].contact)
            tempSum.push(s)

          }
        }

        setSumArr(tempSum)

      }
    })();

    return () => {
      setContacts(null)
    }


  }, [props.booksData.existingCustomers, isFocused]);


  const fabRef = useRef(null)

  const fabActions = [
    {
      text: "Receivable",
      icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
      name: "bt_receivable",
      position: 1,
      color: "#303030"
    },
    {
      text: "Payable",
      icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
      name: "bt_payable",
      position: 2,
      color: "#303030"
    }
  ];

   async function getUserSum(id) {
    let sumT
    let sumG
    sumT = await dbObject.getSumOfTakesContact(props.personals.currentBookId, id)
    sumG = await dbObject.getSumOfGavesContact(props.personals.currentBookId, id)
    return sumT - sumG

  }

  function duePayableFab() {
    return(
      <FloatingAction
        ref={fabRef}
        actions={fabActions}
        color={Colors.secondary}
        onPressItem={name => {
          switch (name) {
            case "bt_payable":
              navigation.navigate("AddNewRecordsHomeTab2_3", {
                transactionType: transactionTypes.PAYABLE
              })
              break;
            case "bt_receivable":
              navigation.navigate("AddNewRecordsHomeTab2_3", {
                transactionType: transactionTypes.RECEIVABLE
              })
              break;
          }
        }}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeTabsCommonComponents
        tableData={{
          sumArray: sumArr,
          data: mContacts,
          onPressEmptyTableAction: () => {
            fabRef.current.animateButton()
          }
        }}
        componentName={"duePayable"}
        cardsData={[
          {
            title: "Payable",
            amount: mTakeSum
          },
          {
            title: "Receivable",
            amount: mGiveSum
          }
        ]}
        navigation={navigation}
        lan={lan}
        fabBtnData={{
          customFab: duePayableFab()
        }}
      />

    </SafeAreaView>
  );

}

const mapStateToProps = (state) => {
  const {personals, booksData} = state
  return {personals, booksData}
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab2DuePayableComponent)
