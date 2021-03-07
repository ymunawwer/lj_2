import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../../styles/globalStyle";


const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={[styleI.listContainer]}>
            <View style={{width: 40}}>
              {props?.children}
            </View>
            <View style={styleI.textIconCont}>
              <View>
                <Text style={[styleI.text, styles.midText]}>{props?.text}</Text>
              </View>
            </View>
    </TouchableOpacity>
  );
}

const styleI = StyleSheet.create({
  textIconCont: {
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    height: "100%",
    alignItems: 'center',
  },

  listContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 30,
    elevation: 5
  },

  text: {
    color: "#4e54c8",
    fontWeight: "bold",
    fontFamily: "monospace"
  }

});

export default ListItem
