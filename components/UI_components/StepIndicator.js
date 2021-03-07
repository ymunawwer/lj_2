import React, {useCallback} from 'react';
import Colors from "../../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import StepIndicator from "react-native-step-indicator";

/**
 *
 * const labels = ["Loan Details", "Add Customer"];
 *
 * */
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: Colors.primary,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: Colors.primary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.primary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 10,
  currentStepIndicatorLabelFontSize: 10,
  stepIndicatorLabelCurrentColor: Colors.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 10,
  currentStepLabelColor: Colors.primary
}

/**
 * EXAMPLE TO USE renderStepIndicator
 *
 * function renderStepIndicator({position, stepStatus}){
  switch(position) {
    case 0:
      return <AntDesign name={"profile"} color={stepStatus === 'finished' ? '#ffffff' : Colors.primary} size={15} />
    case 1:
      return <AntDesign name={"contacts"} color={stepStatus === 'finished' ? '#ffffff' : Colors.primary} size={15}/>
  }
}**/

function MStepIndicator(props) {

  const onPressCallback = useCallback((pos) => {
    props.onPress(pos)
  }, [props?.onPress])

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={props.currentPosition}
      labels={props?.labels}
      stepCount={props?.stepCount}
      renderStepIndicator={"renderStepIndicator" in props ?props?.renderStepIndicator : null}
      onPress={(pos) => {
        if("onPress" in props) {
          onPressCallback(pos)
        }
      }}
    />
  );
}

export default MStepIndicator
