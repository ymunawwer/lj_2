import calcTypes from "./types/calcTypes";

const calcReducer = (state, action) => {
    switch (action.type) {
        case calcTypes.setCalcExpVisible:
            return {...state, calcExpVisible:action.payload}

        case calcTypes.setMoreDetailsVisible:
            return {...state, moreDetailsVisible:action.payload}

        case calcTypes.setInvalidAmountVisible:
            return {...state, invalidAmountVisible:action.payload}

        case calcTypes.setAmountText:
            return {...state, amountText:action.payload}

        case calcTypes.setCalcExpText:
            return {...state, calcExpText:action.payload}

        case calcTypes.setIsOperatorActive:
            return {...state, isOperatorActive:action.payload}

        case calcTypes.setActiveOperator:
            return {...state, activeOperator:action.payload}

        case calcTypes.setIsFirstOperatorAlready:
            return {...state, isFirstOperatorAlready:action.payload}

        case calcTypes.setTotals:
            return {...state, totals:action.payload}

        case calcTypes.setExpArray:
            return {...state, expArray:action.payload}

        case calcTypes.setIsMrcActive:
            return {...state, isMrcActive:action.payload}

        case calcTypes.setMrcText:
            return {...state, mrcText:action.payload}

        case calcTypes.setMrcValue:
            return {...state, mrcValue:action.payload}

        case calcTypes.setIsPercentActive:
            return {...state, isPercentActive:action.payload}

    }
}

export default calcReducer
