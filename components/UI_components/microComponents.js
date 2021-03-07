import React from "react";
import {Text, View} from "react-native";

export const OrDivider = (props) => {
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 10, marginVertical: 5}}>
      <View style={{backgroundColor: '#C0C0C0', height: 1, flex: 1, alignSelf: 'center'}}/>
      <Text style={{alignSelf: 'center', paddingHorizontal: 5, fontSize: 15, color: "#C0C0C0"}}>OR</Text>
      <View style={{backgroundColor: '#C0C0C0', height: 1, flex: 1, alignSelf: 'center'}}/>
    </View>
  );
}

export const HorizontalDivider = (props) => {
  return (
    <View style={{marginHorizontal: 10}}>
      <View style={[{backgroundColor: '#C0C0C0', height: 2, width: "100%", alignSelf: 'center'}, props?.style]}/>
    </View>
  );
}
