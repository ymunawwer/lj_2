import React, {useCallback} from "react";
import {View, Text, StyleSheet} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {styles} from "../../styles/globalStyle";
import {TextInput} from 'react-native-paper';

export const RoundedInput = (props) => {
  const handleTextChange = useCallback((e) => {
    props?.onChangeText(e)
  }, [props?.onChangeText])

  return (
    <View style={[{
      marginHorizontal: 10
    }, props?.containerStyle]}>
      <TextInput
        style={[ props?.inputStyle, {backgroundColor: "#fff"}]}
        value={props?.value}
        mode={"outlined"}
        label={props?.label}
        onChangeText={handleTextChange}
        keyboardType={props?.keyboardType}
        textContentType={props?.textContentType}
        editable={props?.editable}
      />
    </View>
  );
}

export const PartiallyRoundedInput = (props) => {

  const handleTextChange = useCallback((e) => {
    props?.onChangeText(e)
  }, [props?.onChangeText])

  return (
    <View
      style={{
        borderWidth: 1,
        width: "100%",
        borderColor: '#4e54c8',
        borderRadius: 6,
        backgroundColor: 'white',
      }}
    >
      <Text style={[props?.textStyle, {fontSize: 12, marginLeft: 5, color: "#808080"}]}>{props?.label}</Text>
      <TextInput
        style={{
          padding: 10,
        }}
        placeholder={props?.placeholder}
        value={props?.value}
        onChangeText={handleTextChange}
        keyboardType={props?.keyboardType}
        textContentType={props?.textContentType}
      />
    </View>
  );
}

export const SearchBar = (props) => {

  const {lan = "english"} = props

  const handleTextChange = useCallback((e) => {
    props?.onChangeText(e)
  }, [props?.onChangeText])

  return (
    <View style={[{ flexDirection: "row"}, styleX.searchBar, props?.style]}>
      <AntDesign style={[styles.iSearchicon, props?.searchBtnStyle]} name="search1" size={20} color="#4e54c8"/>

      <TextInput
        style={[{flex: 1, fontSize: 13}, props?.inputStyle]}
        placeholder={lan}
        onChange={handleTextChange}
      />
    </View>
  );
}

const styleX = StyleSheet.create({

  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",

    borderColor:'#4e54c8',
    borderWidth: 1
  }
});
