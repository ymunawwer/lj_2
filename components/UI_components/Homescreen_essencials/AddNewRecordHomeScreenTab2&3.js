import React, {useEffect, useState} from 'react';
import { Text, TouchableOpacity, View, FlatList} from 'react-native';
import {styles} from '../../../styles/globalStyle';
import Spinner from 'react-native-loading-spinner-overlay';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Caption, Headline, Title} from "react-native-paper";
import storeObject from "../../../store/store";
import dbObject from '../../database/db';
import {transactionTypes} from "../../../constants/Constansts";
import ExistingContactsChooser from "../ExistingContactsChooser";

function AddNewRecordsHomeTab2_3(props) {

  const {navigation, route} = props
    const { transactionType } = route.params

  const [loaderVisibility, setLoaderVisibility] = useState(false)
  const [selectedValue,setSelectedValue] = useState("Sales")
  const [remark, setRemark] = useState("")
  const [amount, setAmount] = useState(0)
  const [savedContacts,setSavedContacts] = useState([])
    useEffect(() => {
     

      (async ()=>{
        const Contacts = await dbObject.getExistingContacts(props.personals.currentBookData.id);
        setSavedContacts(Contacts)
        
        return Contacts
    
      })();

    }, [])


  async function save(phoneNumber, name, Gg, Rd){
    // if(route.params.recordType==="Payable"){
    const bookId = storeObject.getCurrentBookData().id
    var give = 0
    var take = 0
    const partner_contact = phoneNumber
    const remarkdb = remark
    const typedb = selectedValue
    const amountdb = amount
    const duedate = ""
    const attachment = ""
    const phoneid = 0

    await dbObject.checkAndInsertContact(partner_contact, bookId, name, 0, Gg, Rd)
   
    if(route.params.recordType==="Receivable"){
      give = 2
      take = 0
      await dbObject.insertPayableDueYes(phoneNumber, bookId, 0)
    }else if(route.params.recordType==="Payable"){
      give = 0
      take = 2
      await dbObject.insertPayableDueYes(phoneNumber, bookId, 0)
    }else if(route.params.recordType==="Got"){
      give = 1
      take = 0
      await dbObject.insertGaveGotYes(phoneNumber, bookId, 0)
    }else if(route.params.recordType==="Gave"){
      give = 0
      take = 1
      await dbObject.insertGaveGotYes(phoneNumber, bookId, 0)
    }


    console.log("Final Data", bookId, amountdb, duedate, give, take, attachment, remarkdb, partner_contact, phoneid, typedb)

    await dbObject.setrecord(bookId, amountdb, duedate, give, take, attachment, remarkdb, partner_contact, phoneid, typedb)
    navigation.goBack()
  
  }

  return (

    <View style={{backgroundColor: 'white', flex: 1, paddingTop: 10}}>

      <Spinner
        visible={loaderVisibility}
        textContent={'Creating Loan...'}
        textStyle={styles.spinnerTextStyle}
      />

        <View style={{flex: 1}}>

            <ExistingContactsChooser onPressContact={(item) => {
              // {alert(JSON.stringify(item))}
                if(transactionType === transactionTypes.GOT || transactionType === transactionTypes.PAYABLE) {
                    navigation.navigate('YouGotScreen', {'transactionType':transactionType, customerPhone: parseInt(item.contact),customerData :item,customerName :item.name})
                }
                else {
                    navigation.navigate('YouGaveScreen', {'transactionType':transactionType, customerPhone: parseInt(item.contact),customerData :item,customerName :item.name})
                }
            }} data={savedContacts}/>

        </View>

    </View>
  )

}
const mapStateToProps = (state) => {
  const {personals, booksData} = state
  return {personals, booksData}
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewRecordsHomeTab2_3)
