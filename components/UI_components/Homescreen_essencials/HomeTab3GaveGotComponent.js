import React, {useEffect, useRef, useState} from 'react';
import dbObject from "../../database/db";
import {SafeAreaView} from "react-native";
import HomeTabsCommonComponents from "./HomeTabsCommonComponent";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {FontAwesome5} from "@expo/vector-icons";
import {FloatingAction} from "react-native-floating-action";
import Colors from "../../../constants/Colors";
import {useIsFocused} from "@react-navigation/native";
import {transactionTypes} from "../../../constants/Constansts";

function HomeTab3GaveGotComponent(props) {

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

      const contactRes = await dbObject.getExistingContactsWithGave(props.personals.currentBookId)
      setContacts(contactRes)
      console.log('contactres',contactRes)

      const gaveSumRes = await dbObject.getSumOfGaves(props.personals.currentBookId)
      setGiveSum(gaveSumRes)

      const takeSumRes = await dbObject.getSumOfTakes(props.personals.currentBookId)
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
      text: "Gave",
      icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
      name: "bt_gave",
      position: 1,
      color: "#303030"
    },
    {
      text: "Got",
      icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
      name: "bt_got",
      position: 2,
      color: "#303030"
    }
  ];

  function gaveGotFab() {
    return(
      <FloatingAction
        ref={fabRef}
        actions={fabActions}
        color={Colors.secondary}
        onPressItem={name => {
          switch (name) {
            case "bt_gave":
              navigation.navigate("AddNewRecordsHomeTab2_3", {
                transactionType: transactionTypes.GAVE
              })
              break;
            case "bt_got":
              navigation.navigate("AddNewRecordsHomeTab2_3", {
                transactionType: transactionTypes.GOT
              })
              break;
          }
        }}
      />
    );
  }

  async function getUserSum(id) {
    let sumT
    let sumG
    sumT = await dbObject.getSumOfTakesContact(props.personals.currentBookId, id)
    sumG = await dbObject.getSumOfGavesContact(props.personals.currentBookId, id)
    return sumT - sumG

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
        componentName={"gaveGot"}
        cardsData={[
          {
            title: "Gave",
            amount: mGiveSum
          },
          {
            title: "Got",
            amount: mTakeSum
          }
        ]}
        navigation={navigation}
        lan={lan}
        fabBtnData={{
          customFab: gaveGotFab()
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab3GaveGotComponent)
