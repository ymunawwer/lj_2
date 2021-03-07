import calcTypes from "../../../store/reducers/types/calcTypes";

function checkForPercentInNumPress(num, state, dispatch) {
    dispatch({type: calcTypes.setInvalidAmountVisible, payload: true})
    dispatch({type: calcTypes.setMoreDetailsVisible, payload: false})
    dispatch({type: calcTypes.setCalcExpVisible, payload: false})
    dispatch({type: calcTypes.setIsPercentActive, payload: false})

    //set expression array
    let expArr = state.expArray
    expArr.push(num.toString())
    dispatch({type: calcTypes.setExpArray, payload: expArr})

    if(state.isFirstOperatorAlready) {
        dispatch({type: calcTypes.setAmountText, payload: state.amountText + num.toString()})

    }
    else {
        dispatch({type: calcTypes.setAmountText, payload: '0'})

        //set expression array
    }

}

function checkForInvalidityWhenClearPressed (state, dispatch) {

}

function calculateExp(op, firstNum, secNum) {
    switch (op) {
        case '+':
            return Number(firstNum) + Number(secNum)

        case '-':
            return Number(firstNum) - Number(secNum)

        case '*':
            return Number(firstNum) * Number(secNum)

        case '/':
            return Number(firstNum) / Number(secNum)

    }
}

function handleMrcBtn(state, dispatch) {

    dispatch({type: calcTypes.setCalcExpVisible, payload: false})
    dispatch({type: calcTypes.setCalcExpText, payload: null})
    dispatch({type: calcTypes.setIsFirstOperatorAlready, payload: false})
    dispatch({type: calcTypes.setActiveOperator, payload: null})
    dispatch({type: calcTypes.setIsOperatorActive, payload: false})
    dispatch({type: calcTypes.setMoreDetailsVisible, payload: true})

    dispatch({type: calcTypes.setAmountText, payload: state.mrcValue.toString()})
    dispatch({type: calcTypes.setExpArray, payload: [state.mrcValue.toString()]})
    dispatch({type: calcTypes.setTotals, payload: [state.mrcValue.toString()]})
    dispatch({type: calcTypes.setIsMrcActive, payload: false})
}

function handleMplusMminus(id, state, dispatch) {
    if (state.amountText != null) {

        const currTot = state.totals[state.totals.length - 1]
        const numTot = Number(currTot)

        if (id === 'M+') {
            if (state.isFirstOperatorAlready) {
                const equalPos = state.calcExpText.indexOf('=')
                const MrcText = 'M+(' + state.calcExpText.slice(0, equalPos - 1) + ')=' + numTot.toFixed(2)

                const data = {
                    id: state.mrcText.length > 0 ? (state.mrcText.length + 1).toString() : '1',
                    exp: MrcText
                }

                let mrcArr = state.mrcText
                mrcArr.push(data)
                dispatch({type: calcTypes.setMrcText, payload: mrcArr})

            } else {
                const MrcText = 'M+(' + currTot + ')=' + numTot.toFixed(2)

                const data = {
                    id: state.mrcText.length > 0 ? state.mrcText.length + 1 : 1,
                    exp: MrcText
                }

                let mrcArr = state.mrcText
                mrcArr.push(data)
                dispatch({type: calcTypes.setMrcText, payload: mrcArr})

            }

            let mrcVal = state.mrcValue
            let num
            if (Number.isInteger(numTot)) {
                num = parseInt(currTot)
            } else {
                num = parseFloat(currTot)
            }
            dispatch({type: calcTypes.setMrcValue, payload: mrcVal + num})

        } else if (id === 'M-') {
            if (state.isFirstOperatorAlready) {
                const equalPos = state.calcExpText.indexOf('=')
                const MrcText = 'M-(' + state.calcExpText.slice(0, equalPos - 1) + ')=' + numTot.toFixed(2)

                const data = {
                    id: state.mrcText.length > 0 ? state.mrcText.length + 1 : 1,
                    exp: MrcText
                }

                let mrcArr = state.mrcText
                mrcArr.push(data)
                dispatch({type: calcTypes.setMrcText, payload: mrcArr})

            } else {
                const MrcText = 'M-(' + currTot + ')=' + numTot.toFixed(2)

                const data = {
                    id: state.mrcText.length > 0 ? state.mrcText.length + 1 : 1,
                    exp: MrcText
                }

                let mrcArr = state.mrcText
                mrcArr.push(data)
                dispatch({type: calcTypes.setMrcText, payload: mrcArr})

            }

            let mrcVal = state.mrcValue
            let num
            if (Number.isInteger(numTot)) {
                num = parseInt(currTot)
            } else {
                num = parseFloat(currTot)
            }
            dispatch({type: calcTypes.setMrcValue, payload: mrcVal - num})
        }

        dispatch({type: calcTypes.setAmountText, payload: null})
        dispatch({type: calcTypes.setMoreDetailsVisible, payload: false})
        dispatch({type: calcTypes.setCalcExpVisible, payload: false})
        dispatch({type: calcTypes.setCalcExpText, payload: null})
        dispatch({type: calcTypes.setExpArray, payload: []})
        dispatch({type: calcTypes.setTotals, payload: []})
        dispatch({type: calcTypes.setIsFirstOperatorAlready, payload: false})
        dispatch({type: calcTypes.setActiveOperator, payload: null})
        dispatch({type: calcTypes.setIsOperatorActive, payload: false})
        dispatch({type: calcTypes.setIsMrcActive, payload: true})
    }
}

function numPadPressed(num, state, dispatch) {
    if(state.isPercentActive === true) {
        checkForPercentInNumPress(num, state, dispatch)
        return
    }

    if(state.invalidAmountVisible) {

        return
    }

    if (state.amountText != null) {

        //is first operator there already
        if (state.isFirstOperatorAlready) {

            // is any operator active
            if (state.isOperatorActive) {

                // evaluate the expression now
                let totalsArr = state.totals
                const totLen = totalsArr.length
                const currTotal = totalsArr[totLen - 1]
                const res = calculateExp(state.activeOperator, currTotal, num.toString())

                totalsArr.push(res.toString())
                dispatch({type: calcTypes.setTotals, payload: totalsArr})  // save current total

                //set expression array
                let expArr = state.expArray
                expArr.push(num.toString())
                dispatch({type: calcTypes.setExpArray, payload: expArr})

                // set the amount text
                dispatch({type: calcTypes.setAmountText, payload: num.toString()})

                // set calc expression text box
                const equalPos = state.calcExpText.indexOf('=')
                const mCalT = state.calcExpText.slice(0, equalPos - 1) + num.toString() + ' = ' + state.totals[state.totals.length - 1]
                dispatch({type: calcTypes.setCalcExpText, payload: mCalT})

                dispatch({type: calcTypes.setIsOperatorActive, payload: false})
                dispatch({type: calcTypes.setActiveOperator, payload: null})

            } else {
                // set the amount text


                // evaluate the expression now
                let totalsArr = state.totals
                const totLen = totalsArr.length
                const secondLastTot = totalsArr[totLen - 2]

                let expArr = state.expArray
                const op = expArr[expArr.length - 2]

                const res = calculateExp(op, secondLastTot, state.amountText.concat(num.toString()))
                console.log(res + '  ' + secondLastTot + '  ' + totalsArr + '  ' + op + '  ' + state.amountText)

                //set expression array
                expArr = state.expArray
                expArr[expArr.length - 1] = state.amountText.concat(num.toString())
                dispatch({type: calcTypes.setExpArray, payload: expArr})

                dispatch({type: calcTypes.setAmountText, payload: state.amountText.concat(num.toString())})

                totalsArr[totLen - 1] = res.toString()
                dispatch({type: calcTypes.setTotals, payload: totalsArr})  // save current total

                // set calc expression text box
                const equalPos = state.calcExpText.indexOf('=')
                console.log('totals last element ' + state.totals[state.totals.length - 1])
                let mCalT = state.calcExpText.slice(0, equalPos - 1) + num.toString() + ' = ' + state.totals[state.totals.length - 1]
                dispatch({type: calcTypes.setCalcExpText, payload: mCalT})

            }

        } else {
            dispatch({type: calcTypes.setAmountText, payload: state.amountText.concat(num.toString())})

            let totalsArr = state.totals
            totalsArr[0] = state.amountText
            dispatch({type: calcTypes.setTotals, payload: totalsArr})

            let ExpArr = state.expArray
            ExpArr[0] = state.amountText
            dispatch({type: calcTypes.setExpArray, payload: ExpArr})
        }

    } else {
        dispatch({type: calcTypes.setAmountText, payload: num.toString()})
        dispatch({type: calcTypes.setMoreDetailsVisible, payload: true})

        let ExpArr = state.expArray
        ExpArr.push(num.toString())
        dispatch({type: calcTypes.setExpArray, payload: ExpArr})

        let totalsArr = state.totals
        totalsArr.push(num.toString())
        dispatch({type: calcTypes.setTotals, payload: totalsArr})
    }

}

function handleOperators(operator, state, dispatch) {
    if (state.amountText != null) {

        if(state.isPercentActive) {
            dispatch({type: calcTypes.setIsPercentActive, payload: false})
        }

        if (state.isOperatorActive === false) {
            if (state.isFirstOperatorAlready === false) {

                // update totals array
                let totalArr = state.totals
                totalArr[0] = state.amountText
                dispatch({type: calcTypes.setTotals, payload: totalArr})

                // update expression array
                let ExpArr = state.expArray
                ExpArr[0] = state.amountText
                ExpArr[1] = operator
                dispatch({type: calcTypes.setExpArray, payload: ExpArr})

                console.log('in handle operator ' + state.total + ' ' + state.amountText)

                // set calc expression text
                dispatch({
                    type: calcTypes.setCalcExpText,
                    payload: state.amountText + operator + ' = ' + state.totals[0]
                })
                dispatch({type: calcTypes.setCalcExpVisible, payload: true}) //make calc expression text visible

                dispatch({type: calcTypes.setIsFirstOperatorAlready, payload: true})
                dispatch({type: calcTypes.setAmountText, payload: state.amountText.concat(operator)})

            } else {

                const equalPos = state.calcExpText.indexOf('=')
                const mCalT = state.calcExpText.slice(0, equalPos - 1) + operator + state.calcExpText.slice(equalPos - 1)
                dispatch({type: calcTypes.setCalcExpText, payload: mCalT})
                dispatch({type: calcTypes.setAmountText, payload: state.amountText.concat(operator)})

                // update expression array
                let ExpArr = state.expArray
                ExpArr.push(operator)
                dispatch({type: calcTypes.setExpArray, payload: ExpArr})

            }
        } else {

            const equalPos = state.calcExpText.indexOf('=')
            const mCalT = state.calcExpText.slice(0, equalPos - 2) + operator + state.calcExpText.slice(equalPos - 1)

            dispatch({type: calcTypes.setCalcExpText, payload: mCalT})

            const amount_text = state.amountText.slice(0, -1) + operator
            dispatch({type: calcTypes.setAmountText, payload: amount_text})

            // update expression array
            let ExpArr = state.expArray
            ExpArr[ExpArr.length - 1] = operator
            dispatch({type: calcTypes.setExpArray, payload: ExpArr})

        }

        dispatch({type: calcTypes.setIsOperatorActive, payload: true})
        dispatch({type: calcTypes.setActiveOperator, payload: operator})
    }
}

function handlePercentButton(state, dispatch) {
    if (state.amountText != null) {

        if (state.isFirstOperatorAlready) {
            if (state.isOperatorActive) {

                const currTot = state.totals[state.totals.length - 1]
                const numTot = Number(currTot)
                const calculatedTot = (numTot / 100).toFixed(2)

                const equalPos = state.calcExpText.indexOf('=')
                const mCalT = state.calcExpText.slice(0, equalPos - 2) + '% = ' + calculatedTot.toString()

                dispatch({type: calcTypes.setCalcExpText, payload: mCalT})

                let totalArr = state.totals
                totalArr.push(calculatedTot.toString())
                dispatch({type: calcTypes.setTotals, payload: totalArr})

                // update expression array
                let ExpArr = state.expArray
                const secondLastNum = ExpArr[ExpArr.length - 2]
                ExpArr[ExpArr.length - 1] = '%'
                dispatch({type: calcTypes.setExpArray, payload: ExpArr})

                dispatch({type: calcTypes.setAmountText, payload: secondLastNum + "%"})
            } else {
                const currTot = state.totals[state.totals.length - 1]
                const numTot = Number(currTot)
                const calculatedTot = (numTot / 100).toFixed(2)

                const equalPos = state.calcExpText.indexOf('=')
                const mCalT = state.calcExpText.slice(0, equalPos - 1) + '% = ' + calculatedTot.toString()

                dispatch({type: calcTypes.setCalcExpText, payload: mCalT})

                let totalArr = state.totals
                totalArr.push(calculatedTot.toString())
                dispatch({type: calcTypes.setTotals, payload: totalArr})

                // update expression array
                let ExpArr = state.expArray
                ExpArr.push('%')
                dispatch({type: calcTypes.setExpArray, payload: ExpArr})

                dispatch({type: calcTypes.setAmountText, payload: state.amountText + '%'})

            }

        } else {
            dispatch({type: calcTypes.setIsFirstOperatorAlready, payload: true})
            //set amount text
            const prevTot = state.amountText
            const newTot = (Number(prevTot) / 100).toFixed(2)
            dispatch({type: calcTypes.setAmountText, payload: newTot.toString()})

            //set totals
            let totalArr = state.totals
            totalArr.push(newTot.toString())
            dispatch({type: calcTypes.setTotals, payload: totalArr})

            //set calcExpText and cacExpVisible to true
            const mCalT = prevTot + '% = ' + newTot.toString()
            dispatch({type: calcTypes.setCalcExpText, payload: mCalT})
            dispatch({type: calcTypes.setCalcExpVisible, payload: true})

            //set expArray
            let expArr = state.expArray
            expArr.push('%')
            dispatch({type: calcTypes.setExpArray, payload: expArr})

            //TODO:change in operator
            //TODO:change in clear buttons
        }

        dispatch({type: calcTypes.setIsPercentActive, payload: true})
    }
}

function handleDecimalButton(state, dispatch) {

}

function handleEqualButton(state, dispatch) {
    if(state.amountText != null && state.amountText !== '') {
        const totalArr = state.totals
        const currTot = totalArr[totalArr.length - 1]

        dispatch({type: calcTypes.setAmountText, payload: currTot})
    }
    else {
        dispatch({type: calcTypes.setAmountText, payload: '0'})
        dispatch({type: calcTypes.setInvalidAmountVisible, payload: true})

    }
}

function handleClearButtons(id, state, dispatch) {
    if (id === 'ALL') {
        dispatch({type: calcTypes.setIsMrcActive, payload: false})
        dispatch({type: calcTypes.setMrcValue, payload: 0})
        dispatch({type: calcTypes.setMrcText, payload: []})

        dispatch({type: calcTypes.setAmountText, payload: null})
        dispatch({type: calcTypes.setMoreDetailsVisible, payload: false})
        dispatch({type: calcTypes.setCalcExpVisible, payload: false})
        dispatch({type: calcTypes.setCalcExpText, payload: null})
        dispatch({type: calcTypes.setExpArray, payload: []})
        dispatch({type: calcTypes.setTotals, payload: []})
        dispatch({type: calcTypes.setIsFirstOperatorAlready, payload: false})
        dispatch({type: calcTypes.setActiveOperator, payload: null})
        dispatch({type: calcTypes.setIsOperatorActive, payload: false})
        dispatch({type: calcTypes.setIsPercentActive, payload: false})
        dispatch({type: calcTypes.setInvalidAmountVisible, payload: false})


    } else if (id === 'ONE') {

        if(state.invalidAmountVisible) {
            checkForInvalidityWhenClearPressed(state, dispatch)
            return
        }

        if (state.amountText != null) {

            if (state.calcExpText == null) {
                if (state.amountText.length === 1) {
                    dispatch({type: calcTypes.setAmountText, payload: null})
                    dispatch({type: calcTypes.setMoreDetailsVisible, payload: false})
                    dispatch({type: calcTypes.setExpArray, payload: []})
                    dispatch({type: calcTypes.setTotals, payload: []})

                } else {
                    const substr = state.amountText.slice(0, -1)
                    dispatch({type: calcTypes.setAmountText, payload: substr})
                    dispatch({type: calcTypes.setExpArray, payload: [substr]})
                    dispatch({type: calcTypes.setTotals, payload: [substr]})
                }
            } else {

                if (state.isOperatorActive) {

                    let expArr = state.expArray
                    const previousNum = expArr[expArr.length - 2]
                    dispatch({type: calcTypes.setAmountText, payload: previousNum})

                    if (state.expArray.length === 2) {
                        dispatch({type: calcTypes.setIsFirstOperatorAlready, payload: false})
                        dispatch({type: calcTypes.setCalcExpVisible, payload: false})
                        dispatch({type: calcTypes.setCalcExpText, payload: null})
                        dispatch({type: calcTypes.setIsOperatorActive, payload: false})
                        dispatch({type: calcTypes.setActiveOperator, payload: null})
                        dispatch({type: calcTypes.setIsPercentActive, payload: false})
                    } else {
                        const equalPos = state.calcExpText.indexOf('=')
                        const mCalT = state.calcExpText.slice(0, equalPos - 2) + state.calcExpText.slice(equalPos - 1)
                        dispatch({type: calcTypes.setCalcExpText, payload: mCalT})
                    }

                    expArr.pop()
                    dispatch({type: calcTypes.setExpArray, payload: expArr})

                } else {

                    const lastNum = state.expArray[state.expArray.length - 1]
                    if (lastNum.length === 1) {
                        let expArr = state.expArray
                        const op = expArr[expArr.length - 2]
                        let totalsArr = state.totals
                        console.log(expArr)
                        console.log(totalsArr)
                        const secLastTot = totalsArr[totalsArr.length - 2]

                        dispatch({type: calcTypes.setAmountText, payload: secLastTot + op})

                        const equalPos = state.calcExpText.indexOf('=')
                        const mCalT = state.calcExpText.slice(0, equalPos - 2) + ' = ' + secLastTot
                        dispatch({type: calcTypes.setCalcExpText, payload: mCalT})

                        dispatch({type: calcTypes.setIsOperatorActive, payload: true})
                        dispatch({type: calcTypes.setActiveOperator, payload: op})

                        expArr.pop()
                        totalsArr.pop()
                        dispatch({type: calcTypes.setTotals, payload: totalsArr})
                        dispatch({type: calcTypes.setExpArray, payload: expArr})

                    } else {

                        const newNum = lastNum.slice(0, -1)
                        dispatch({type: calcTypes.setAmountText, payload: newNum})

                        let expArr = state.expArray
                        const op = expArr[expArr.length - 2]
                        expArr[expArr.length - 1] = newNum
                        dispatch({type: calcTypes.setExpArray, payload: expArr})

                        let totalsArr = state.totals
                        const secLastTot = totalsArr[totalsArr.length - 2]

                        const newTot = calculateExp(op, secLastTot, newNum)
                        totalsArr[totalsArr.length - 1] = newTot
                        dispatch({type: calcTypes.setTotals, payload: totalsArr})

                        const equalPos = state.calcExpText.indexOf('=')
                        const mCalT = state.calcExpText.slice(0, equalPos - 2) + ' = ' + newTot
                        dispatch({type: calcTypes.setCalcExpText, payload: mCalT})


                    }

                }
            }
        }

    }


}

export {
    numPadPressed,
    handleMplusMminus,
    calculateExp,
    handleMrcBtn,
    handleOperators,
    handleClearButtons,
    handlePercentButton,
    handleDecimalButton,
    handleEqualButton
}
