import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {styles} from "../../styles/globalStyle";
import * as calcFunctions from "../../components/Logic_Repository/calcLogic/calcLogics";
import {FontAwesome5} from "@expo/vector-icons";
import React from "react";

export default function calculatorButtons(state, dispatch) {
    return (
        <View>
            <View style={[styles.row, styleI.oncCalcRow]}>

                <TouchableOpacity style={[styleI.calcBtn]}
                                  onPress={() => calcFunctions.handleClearButtons('ALL', state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont, styleI.blueBack]}><Text
                        style={styles.boldText}>C</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.handleMplusMminus('M+', state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont, styleI.blueBack]}><Text
                        style={styles.boldText}>M+</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.handleMplusMminus('M-', state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont, styleI.blueBack]}><Text
                        style={styles.boldText}>M-</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.handleClearButtons('ONE', state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont, styleI.blueBack]}><Text
                        style={styles.boldText}>X</Text></View>
                </TouchableOpacity>

            </View>

            <View style={[styles.row, styleI.oncCalcRow]}>

                <TouchableOpacity style={[styleI.calcBtn]}
                                  onPress={() => calcFunctions.numPadPressed(7, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}>
                        <Text style={styles.boldText}>7</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.numPadPressed(8, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont,]}><Text
                        style={styles.boldText}>8</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.numPadPressed(9, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}><Text
                        style={styles.boldText}>9</Text></View>
                </TouchableOpacity>

                <View style={[{flexDirection: 'row', justifyContent: 'space-between', width: 90}]}>

                    <TouchableOpacity style={[styleI.calcBtn, {width: 40}]}
                                      onPress={() => calcFunctions.handleOperators('/', state, dispatch)}>
                        <View
                            style={[styles.container, styleI.oneCalcCont, styleI.blueBack, {justifyContent: 'center'}]}><FontAwesome5
                            name="divide" size={10} color="black"/></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styleI.calcBtn, {width: 40, margin: 0}]}
                                      onPress={() => calcFunctions.handlePercentButton(state, dispatch)}>
                        <View style={[styles.container, styleI.oneCalcCont, styleI.blueBack]}><Text
                            style={styles.boldText}>%</Text></View>
                    </TouchableOpacity>

                </View>

            </View>


            <View style={[styles.row, styleI.oncCalcRow]}>

                <TouchableOpacity style={[styleI.calcBtn]}
                                  onPress={() => calcFunctions.numPadPressed(4, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}><Text
                        style={styles.boldText}>4</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.numPadPressed(5, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}><Text
                        style={styles.boldText}>5</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.numPadPressed(6, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont,]}><Text
                        style={styles.boldText}>6</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.handleOperators('*', state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont, styleI.blueBack,]}><Text
                        style={styles.boldText}>*</Text></View>
                </TouchableOpacity>

            </View>

            <View style={[styles.row, styleI.oncCalcRow]}>

                <TouchableOpacity style={[styleI.calcBtn]}
                                  onPress={() => calcFunctions.numPadPressed(1, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}><Text
                        style={styles.boldText}>1</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.numPadPressed(2, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}><Text
                        style={styles.boldText}>2</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.numPadPressed(3, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont,]}><Text
                        style={styles.boldText}>3</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.handleOperators('-', state, dispatch)}>
                    <View
                        style={[styles.container, styleI.oneCalcCont, styleI.blueBack, {backgroundColor: '#4e54c8'}]}><Text
                        style={[styles.boldText, {color: 'white'}]}>-</Text></View>
                </TouchableOpacity>

            </View>

            <View style={[styles.row, styleI.oncCalcRow]}>

                <TouchableOpacity style={[styleI.calcBtn]}
                                  onPress={() => calcFunctions.numPadPressed(0, state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}><Text
                        style={styles.boldText}>0</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.handleDecimalButton(state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}><Text
                        style={styles.boldText}>.</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.handleEqualButton(state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont]}><Text
                        style={styles.boldText}>=</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={styleI.calcBtn}
                                  onPress={() => calcFunctions.handleOperators('+', state, dispatch)}>
                    <View style={[styles.container, styleI.oneCalcCont, {backgroundColor: '#4e54c8'}]}><Text
                        style={[styles.boldText, {color: 'white'}]}>+</Text></View>
                </TouchableOpacity>

            </View>
        </View>

    );
}

const styleI = StyleSheet.create({

    calcBtn: {
        backgroundColor: 'white',
        width: 90,
        justifyContent: 'center',
        elevation: 2,
        borderRadius: 5,
        height: 40

    },
    blueBack: {
        backgroundColor: 'rgba(0,0,220,.1)'
    },
    oneCalcCont: {
        alignItems: 'center',
        borderRadius: 5,
        height: '100%'
    },
    oncCalcRow: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        marginVertical: 4,
        justifyContent: 'space-between'
    },
});
