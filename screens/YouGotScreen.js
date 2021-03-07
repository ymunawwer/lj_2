import {
    View,
} from 'react-native';
import React from 'react'
import {bindActionCreators} from "redux";

import {connect} from "react-redux";
import YouGaveScreen from "./YouGaveScreen";


function YouGotScreen(props) {
    const { navigation } = props
  
    
    // customerPhone: phone,
    // customerName: route.params.name

    return (
      <View style={{flex: 1, width: "100%"}}>

          <YouGaveScreen themeColor={"green"} isGotScreen={true} {...props}/>

      </View>


    );


}

const mapStateToProps = (state) => {
    const { personals, booksData } = state
    return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(YouGotScreen)
