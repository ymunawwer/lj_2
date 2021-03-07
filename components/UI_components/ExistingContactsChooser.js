import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {transactionTypes} from "../../constants/Constansts";
import {styles} from "../../styles/globalStyle";
import {Title} from "react-native-paper";

const ExistingContactsChooser = (props) => {
    console.log('data',props.data)
    return (
        <View style={{flex: 1}}>

            <Title
                style={{
                    marginLeft: 10,
                    color: "#303030",
                    fontWeight: "bold"
                }}
            >
                Select Customer
            </Title>

                <FlatList
                    style={{flex: 1}}
                    data={typeof(props.data)!=='undefined'?props.data:[{id: 1, name: "Fake Name", phone: "+912222222222"}, {id: 2, name: "Fake Name 2", phone: "+912222222222"}]}
                    ItemSeparatorComponent={() => (
                        <View style={{height: 1, backgroundColor: "#E8E8E8", marginHorizontal: 30}}>

                        </View>
                    )}
                    renderItem={({item}) => (

                        <TouchableOpacity
                            onPress={() => props?.onPressContact(item)}

                            style={{
                                margin: 1,
                            }}
                        >
                            <View style={[styles.row]}>
                                <View style={styles.initialsCont}>
                                    <Text style={styles.initialText}>{item.name[0].toUpperCase()}</Text>
                                </View>
                                <View style={styles.cNameTimeCont}>
                                    <Text style={styles.cName}>{item.name}</Text>

                                    <Text style={[styles.greyTextSm, {
                                        margin: 0,
                                        paddingHorizontal: 0
                                    }]}>{item.phone}</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    // keyExtractor={item => item.id.toString()}

                />

        </View>
    );
}

export default ExistingContactsChooser