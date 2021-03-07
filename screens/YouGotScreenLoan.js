import React from 'react'
import { View } from 'react-native'

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import YouGaveScreenLoan from "./YouGaveScreenLoan";

function YouGotScreenLoan(props) {
    const { navigation } = props

    return (

      <View style={{flex: 1, width: "100%"}}>

        <YouGaveScreenLoan
            themeColor={"green"}
            isGotScreen={true}
            {...props}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(YouGotScreenLoan)
