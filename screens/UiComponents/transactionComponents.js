import React, {useEffect, useState} from "react";
import Colors from "../../constants/Colors";
import {View} from 'react-native'
import {Chip} from "react-native-paper";
import {transactionTypes} from "../../constants/Constansts";
import SwitchSelector from "react-native-switch-selector";

export const SelectionChip = (props) => {

    const { selectedValue, selectedColor = Colors.primary, unselectedColor = "lightgrey", value } = props

    return (
        <Chip
            onPress={props?.onPress}
            style={[props?.style, {

                backgroundColor: selectedValue === value ? selectedColor : unselectedColor,
            }]}
            selected={selectedValue === value}
            selectedColor={selectedValue === value ? "#fff" : "#303030"}
            textStyle={{
                color: selectedValue === value ? "#fff" : "#303030"
            }}
        >
            {value}
        </Chip>
    );
}

export const SwitchSelectorComponent = (props) => {

    const { values, selectedBgColor = Colors.primary, defaultSelected = 0, height = 55, width = 250} = props

    const [selectorOptions, setSelectorOptions] = useState([])

    useEffect(() => {

        setSelectorOptions([])

        values.map((val, index) => {
            let currOptions = selectorOptions;
            currOptions.push({
                label: val,
                value: val,
            });

            setSelectorOptions(currOptions);
        })


    }, [])

    return (
        <View>
            <SwitchSelector
                onPress={(newVal) => {
                    props?.onPress(newVal);
                }}
                options={selectorOptions}
                initial={defaultSelected}
                backgroundColor={"#E8E8E8"}
                borderColor={"#E8E8E8"}
                textColor={"#303030"}
                selectedColor={"#fff"}
                buttonColor={selectedBgColor}
                hasPadding={true}
                valuePadding={5}
                height={height}
                style={{width: width}}
                textStyle={{fontWeight: "bold"}}
                selectedTextStyle={{fontWeight: "bold"}}
            />
        </View>
    );
}

export const getTypeOrModeSelection = (type) => {

    if(type === transactionTypes.RECEIVABLE) {
        return ["Sales", "Income"]
    }
    else if (type === transactionTypes.PAYABLE) {
        return ["Purchases", "Expenses"]
    }
    else {
        return ["Cash", "Other"]
    }

}

export const getTitleOfScreens = (type) => {
    if(type === transactionTypes.RECEIVABLE) {
        return "Receivable Transaction"
    }
    else if(type === transactionTypes.PAYABLE) {
        return "Payable Transaction"
    }
    else if(type === transactionTypes.GAVE) {
        return "You Gave"
    }
    else if(type === transactionTypes.GOT) {
        return "You Got"
    }
    else {
        return ""
    }
}