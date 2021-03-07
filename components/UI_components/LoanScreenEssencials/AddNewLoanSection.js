import React, {useCallback} from "react";
import {StyleSheet, Text, View} from "react-native";
import {RoundedInput} from "../Inputs";
import {RoundedBtn} from "../Buttons";

const AddNewLoanSection = (props) => {
  const { navigation, value = "" } = props

  const handleTextChange = useCallback((e) => {
    props?.onChangeText(e)
  }, [props?.onChangeText])

  return (
    <View style={{marginBottom: 0}}>

      {/* <Text style={[stylesI.headings]}>
        Add New Loan Data :
      </Text> */}

      <View style={[{flexDirection: "row"}]}>
        <RoundedInput
          containerStyle={[{flex: 3}]}
          // label={"Enter Loan Name :"}
          placeholder={"Enter New Loan Name"}
          value={value}
          onChangeText={handleTextChange}
        />
        <RoundedBtn
          style={{marginTop: 25, marginRight: 5,flex: 1}}
          containerStyle={{paddingHorizontal: 15}}
          text={"Add"}
          // onPress={props?.onPress}
          onPress= {() => navigation.navigate('addLoanInputs')}
        />
      </View>
    </View>
  );
}

const stylesI = StyleSheet.create({

  headings: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 15
  }

});

export default AddNewLoanSection
