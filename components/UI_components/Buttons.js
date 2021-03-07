import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {styles} from "../../styles/globalStyle";

export const RoundedBtn = (props) => {
  const { isCustom = false, disabled = false } = props
  return (
    <View style={[props?.style]}>
      <TouchableOpacity
        style={[{
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical:15,
          backgroundColor: '#4e54c8',
          alignItems: 'center',
          elevation: 1
        }, props?.containerStyle]}

        onPress={props?.onPress}
        disabled={disabled}
      >
        {
          isCustom ?
            props?.children
            :
            <Text style={[styles.normalText, {color: 'white', fontSize:12}, props?.textStyle]}>{props?.text}</Text>
        }
      </TouchableOpacity>

    </View>
  );
}

export const PartiallyRoundedBtn = (props) => {
  const { isCustom = false, disabled = false } = props
  return (
    <View style={[props?.style]}>
      <TouchableOpacity
        style={[{
          padding: 10,
          backgroundColor: 'red',
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 6
        }, props?.containerStyle]}

        onPress={props?.onPress}
        disabled={disabled}
      >
        {
          isCustom ?
            props?.children
            :
            <Text style={[styles.boldText, {color: 'white'}, props?.textStyle]}>{props?.text}</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

export const FabBtn = (props) => {
  return (
    <View style={[props?.style]}>
      <TouchableOpacity
        onPress={props?.onPress}
        style={[{
          width: 55,
          height: 55,
          backgroundColor: '#ff4268',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 3
        }, props?.containerStyle]}
      >
        {props?.children}
      </TouchableOpacity>
    </View>
  );
}

