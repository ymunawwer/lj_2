import React, {useRef, useState, useEffect} from "react";
import {Picker, View, TextInput} from "react-native";
import DuePayableTable from "../components/UI_components/Others/DuePayableTable";
import {RoundedInput} from "../components/UI_components/Inputs";
import {FabBtn, RoundedBtn} from "../components/UI_components/Buttons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {styles} from "../styles/globalStyle";
import RBSheet from "react-native-raw-bottom-sheet";
import storeObject from "../store/store";
import {FontAwesome5} from "@expo/vector-icons";
import * as lang from "../translations/lang.json";
import {Searchbar} from "react-native-paper";
import dbObject from '../components/database/db';


function DuePayableScreen(props) {

  const { navigation } = props
  let lan = props.personals.currentLan

  const [duePayableRecord, setDuePayable] = useState(null)
   console.log("Props ::: ", props.personals.currentBookData.id)

     useEffect(() => {

    (async () => {

      try {
        const res = await dbObject.getDuePayableRecord(props.personals.currentBookData.id)
        // setDuePayable(res)
        console.log("Final list : ", res)
      }
      catch (e) {

      }
    })();

    return () => {

    }

  }, []);


  const refRBSheet = useRef();

  const [manualCustomerName, setManualCustomerName] = useState("")

  return (
    <View style={[styles.wrapper, {paddingTop: 0, backgroundColor: "#FFFFFF"}]}>
      <Searchbar
        style={{ elevation: 5,borderRadius: 30, marginHorizontal: 10, marginTop: 10}}
        placeholder={lang[lan]['search']}
        onChangeText={text => SearchFilterFunction(text)}
      />
      <DuePayableTable
        lan={lan}
        navigation={navigation}
        data={[{recordid: "1", name: "charlie", contact: "+916363636363", type: "sales", amount: "100", remarks: "Fake Remark"}]}
      />

      <View style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 10
      }}>
        <FabBtn
          onPress={() => {
            refRBSheet.current.open()
            //navigation.navigate('AddNewCustomerScreen', { customerName: manualCustomerName })
          }}
        >
          <FontAwesome5 name="plus" size={22} color="#303030"/>
        </FabBtn>
      </View>

      <RBSheet
        height={230}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#4e54c8"
          }
        }}
      >
        <View>

          <View style={[styles.row]}>
            <View style={{borderWidth: 1, borderColor:'#303030', borderRadius: 5, marginTop: 6}}>
              <Picker

                style={{ height: 55, width: 150, borderWidth: 1, borderColor:'#dedede' }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Sales" value="Sales" />
                <Picker.Item label="Purchase" value="Purchase" />
                <Picker.Item label="Other" value="Other" />
              </Picker>

            </View>

            <RoundedInput
              containerStyle={{flex: 2}}
              label={"Amount"}
              placeholder={"Amount"}
            />

          </View>

          {/*<View style={{height:60, paddingHorizontal:10 ,}}>
            <TextInput
              placeholder="Remarks"
              style={{
                borderColor: '#dedede', padding: 10, borderWidth: 1, backgroundColor: 'white',
                margin: 5, borderRadius: 8, flex: 2
              }}
            />
          </View>*/}

          <RoundedInput
            label={"Remarks"}
            placeholder={"Remarks"}
          />

          <RoundedBtn
            containerStyle={{paddingHorizontal: 15}}
            text={"Done"}
            style={{paddingHorizontal:10, marginTop: 10}}
          />
        </View>
      </RBSheet>
    </View>
  );
}

const mapStateToProps = (state) => {
  const { personals, booksData } = state
  return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DuePayableScreen)
