import React, {useRef} from "react";
import {TouchableOpacity, View, ScrollView, Text, FlatList, StyleSheet} from "react-native";
import {Table, Row} from "react-native-table-component";

export const MTable = (props) => {

  const {
    isTouchableItem = false,
    isCustomItem = false,
    headerItems = [],
    widthArr = [],
    isTableFooter = false,
    isHeader = true,
    isHorizontalScroll = true
  } = props

  const FlatListItemSeparator = () => {
    return (
      <View>
        <View
          style={{
            height: 2,
            width: "100%",
          }}
        />

      </View>

    );
  }

  const oneItem = (item, index) => {

    let entries = Object.entries(item)

    if(isCustomItem) {
      return props?.customItem(item, index)

    }
    else {
      return (
        <View style={[styles.card, styles.row]}>

          {
            entries.map((ObjItem, index) => {
              return (
                <Text style={[styles.greyTextSm, {width: widthArr[index]}]}>
                  {ObjItem[1]}
                </Text>
              );

            })
          }

        </View>

      );
    }
  }

  const renderItem = ({item, index}) => {
    return (

      isTouchableItem ?
        <TouchableOpacity onPress={props?.onPressItem}>
          {oneItem(item, index)}
        </TouchableOpacity>
        :
        oneItem(item, index)
    );
  }

  const tableRef = useRef()

  const tableDesignWithoutHorizontalScroll = () => {
    return (
      <View >
        {
          isHeader?
            <Table >
              <Row data={headerItems} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            :
            null
        }

        <Table style={{flex:1}}>

          <FlatList
            ref={tableRef}
            data={props?.data}
            renderItem={renderItem}
            style={[props?.tableContentStyle, {borderBottomRightRadius: 4, borderBottomLeftRadius: 4}]}
            // keyExtractor={
            //   (item,index) => item[props?.itemKey].toString()
            // }
            ItemSeparatorComponent={FlatListItemSeparator}
          />

        </Table>

        {
          isTableFooter ?
            props?.tableFooter()
            :
            null
        }
      </View>
    );
  }

  return (

    <View style={[styles.container,{justifyContent:'center', alignItems:'center'}, props?.style]}>
      {
        isHorizontalScroll?
          <ScrollView horizontal={true} >
            {
              tableDesignWithoutHorizontalScroll()
            }
          </ScrollView>
          :
          tableDesignWithoutHorizontalScroll()
      }

    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',marginTop: 10, marginBottom:10, borderRadius: 4 },
  header: { height: 50, backgroundColor: '#4e54c8', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  text: { textAlign: 'center', fontWeight: 'bold',color: 'white' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});
