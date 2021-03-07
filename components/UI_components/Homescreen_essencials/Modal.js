import  React from 'react';
import {Button, Caption, Searchbar, Subheading} from "react-native-paper";

import {
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
 
} from 'react-native';
import t from 'prop-types';
import {Table, Row} from "react-native-table-component";
import HomeTable from "./HomeTable";
import dbObject from '../../database/db';
import {styles as styleglobal} from '../../../styles/globalStyle'
import {bindActionCreators} from "redux";
import {setExistingCustomers} from "../../../redux/actions/booksDataActions";
import {connect} from "react-redux";
import storeObject from "../../../store/store";
  



class MyModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      mRecord:null,
      mGot:null,
      mGave:null,
      mNet:null,
      mNetNeg:null,
    }
   
    const widthArr = [190, 80, 80, 100]
   
    // const [mRecord, setRecord] = useState(null)
    // const [mGot, setGot] = useState(null)
    // const [mGave, setGave] = useState(null)
    // const [mNet, setNet] = useState(null)
    // const [mNetNeg, setNetNeg] = useState(null)
    
    // this.getData(props);
    
     
  }
  
   getData = async (key) => {
    console.log(key)
       
    let totalGot = 0
    let totalGave = 0
    // console.log("params :: ", props.route.params.all)

    if(true)
    {
        const record = await dbObject.getRecordByQueryString(key+"=1")
        console.log("View Report record outside if ", record)

        this.setState({'mRecord':record})

        for (let entry of record) {
            if (entry.take === 1) {
                totalGot += entry.amount
                console.log("Gave Entry = ", entry.amount)
            } else {
               totalGave += entry.amount
                console.log("Take Entry = ", entry.amount)
            }
        }
        
        this.setState({'mGot':totalGot})
        this.setState({'mGave':totalGave})
        this.setState({'mNet':totalGave - totalGot})
        if (totalGave - totalGot < 0) {
          this.setState({'mNetNeg':1})
        } else {
          this.setState({'mNetNeg':0})
        }
        
    }else{
       const record = await dbObject.getRecord(this.props.personals.currentBookId)
       console.log("View Report record outside if ", record)

        setRecord(record)

        for (let entry of record) {
            if (entry.take === 1) {
                totalGot += entry.amount
                console.log("Gave Entry = ", entry.amount)
            } else {
                totalGave += entry.amount
                console.log("Take Entry = ", entry.amount)
            }
        }
        setGot(totalGot)
        setGave(totalGave)
        setNet(totalGave - totalGot)
        if (totalGave - totalGot < 0) {
            setNetNeg(1)
        } else {
            setNetNeg(0)
        }
    }
    


}

  
  static propTypes = {
    children: t.node.isRequired,
    visible: t.bool.isRequired,
    dismiss: t.func.isRequired,
    transparent: t.bool,
    animationType: t.string,
  };

  static defaultProps = {
    animationType: 'none',
    transparent: true,
  };

  customItem = (item, index) => {
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate('OneCustomerScreenLoan', {
          phoneNumber: item.contactno,
          name: item.contactname,
          loanName: item.name
        })}>
          <View style={[mStyle.container]}>

            <View style={[{width: widthArr[0], flexDirection: "row", paddingLeft: 10}]}>

              <View style={styles.cNameTimeCont}>
                <Text style={styles.cName}>{item.name}</Text>
                <Text style={styles.cTime}>{new Date(item['lastupdated']).toUTCString().slice(0,25)}</Text>
              </View>
            </View>

            <View style={[styles.cAmtTimeCont, {alignItems:"center", width: widthArr[1]}]}>
              <Text style={styles.takeAmountText}>₹{Math.round(0%1000)}</Text>
            </View>

            <View style={[styles.cAmtTimeCont, { alignItems:"center", width: widthArr[2]}]}>
              <Text style={styles.takeAmountText}>₹{Math.round(0%1000)}</Text>
            </View>

            <View style={[styles.cTime, { alignItems:"center", width: widthArr[3]}]}>
              <Text>{item.contactname}</Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  }


 

  render() {
    console.log('key-',this.props.btnClick)
    // const { props } = this;
    // var tableData={}
    // tableData['data']={'11':2}
    const self=this;
    const {navigation, componentName, cardsData, searchBarData, tableData, lan = 'english', fabBtnData,data,key} = this.props
    const mContacts = data
    console.log(mContacts);
  
    return (

      <View>
        <Modal
          visible={this.props.visible}
          transparent={this.props.transparent}
          onRequestClose={this.props.dismiss}
          animationType={this.props.animationType}
         
        >
        <TouchableWithoutFeedback onPress={this.props.dismiss}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
        <Table >
              <Row data={this.props.headerItem}  widthArr={[204,150]} style={styles.header} textStyle={styles.text}/>
            </Table>
    

{/* {

          tableData.data != null && tableData.data.length > 0 ?

            (

              mContacts.length > 0?
                <HomeTable
                  mTakeSum={tableData['sumArray']}
                  lan={lan}
                  navigation={navigation}
                  data={mContacts}
                />
                :
                <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                  <Caption>No contacts found according to your search...</Caption>
                </View>
            )


            :
            
            
            

         (
              <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
               {
          tableData.data != null && tableData.data.length > 0 ?

            (

              mContacts.length > 0?
                <HomeTable
                  mTakeSum={tableData['sumArray']}
                  lan={lan}
                  navigation={navigation}
                  data={mContacts}
                />
                :
                <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                  <Caption>No contacts found according to your search...</Caption>
                </View>
            )


            :
            
            
            

         (
              <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                <Subheading style={{padding: 10, fontWeight: "bold"}}>{componentName === "dashboard" ? "Let's add your First Customer..." : "Let's add your First Transaction..."}</Subheading>
                <Button
                  icon="account-multiple-plus"
                  mode="outlined"
                  onPress={tableData?.onPressEmptyTableAction}
                >
                  {componentName === "dashboard" ? "Add New Customer" : "Add New Transaction"}
                </Button>
              </View>
            )


        }
               
              </View>
            )
            


        } */}


{
                this.props.mRecord ?
                    <FlatList
                        data={this.props.mRecord}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() =>
                                {
                                    navigation.navigate('EntryDetails')
                                    storeObject.setRecordId(item.recordid)
                                    storeObject.setRecordLoanYes(0)
                            }
                        }>
                                <View style={[styleglobal.row, styleI.noPad]}>
                                    <View style={[styleglobal.container, {flex: 2}]}>
                                    <Text style={styleglobal.boldText}>{item.name}</Text>
                                        <Text >{item.partner_contact}</Text>
                                        <Text style={[styleglobal.greyTextSm, {
                                            textAlign: 'left',
                                            paddingHorizontal: 0
                                        }]}>{item.date?.substring(4, 15).toUpperCase() + " - " + item.date?.substring(16, 21)}</Text>
                                    </View>
                                    <View style={styleI.cardGiveAmt}>
                                        {
                                            item.give ?
                                                <Text style={[styleglobal.giveAmountText, {
                                                    padding: 0,
                                                    textAlign: 'right'
                                                }]}>₹{item.amount}</Text> :
                                                <Text style={[styleglobal.takeAmountText, {
                                                  padding: 0,
                                                  textAlign: 'right'
                                              }]}>₹{item.amount}</Text>
                                                
                                        }
                                    </View>

                                 

                                    {/* <View style={[{textAlign: 'right'}]} style={{width: 90}}>
                                        {
                                            item.take ?
                                              (
                                                <Text style={[styles.takeAmountText, {
                                                    paddign: 0,
                                                    textAlign: 'right'
                                                }]}>₹{item.amount}</Text>) : console.log('no data')

                                        }
                                        
                                    </View> */}
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}

                    /> : console.log('')


            }

 
        </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
     flex: 1, 
    backgroundColor: '#fff',
    marginTop: 10, 
    marginBottom:10,
     borderRadius: 4 },

  header: { 
    
    height: 50, 
    backgroundColor: '#4e54c8',
  //  borderTopLeftRadius: 4, 
  //  borderTopRightRadius: 4
   },

  text: { 
    
    textAlign: 'center', 
  fontWeight: 'bold',
  color: 'white'
 },
  dataWrapper: { 
    marginTop: -1 },
  row:
   { height: 40, 
    backgroundColor: '#E7E6E1' },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
    backgroundColor: '#f4f0ec',
    zIndex:0
    
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});


const styleI = StyleSheet.create({
  wrapper: {
      // flex: 1,
      // position: 'relative'
  },

  entriesText: {
      flex: 2
  },

  timeDate: {
      // flex: 2
  },


  cardGiveAmt: {
      // width: 90,
      justifyContent: 'center',
      height: '100%',
      backgroundColor: "rgba(255,0,0,.1)",
      alignItems: 'flex-end',
      paddingHorizontal: 12
  },

  cardTakeAmt: {
      width: 90,
      alignItems: 'flex-end'
  },

  bottomBtns: {
      position: 'absolute',
      bottom: "0%",
      width: "100%"

  },

  bottomBtn: {
      flex: 1,
      margin: 5,
      elevation: 2,
  },

  bottomGaveBtn: {
      backgroundColor: 'red',
      flex: 1,
      height: '100%',
      width: '100%'
  },

  topRow: {
      paddingVertical: 15,
  },

  noPad: {
      padding: 0,
      margin: 0,
      height: 50,
      borderBottomWidth: .5,
      borderBottomColor: '#dedede'
  },
  container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
     
    
      marginTop: 400,
      zIndex: 1,
    
    },
    hidden:{
        display:'none'
    }

});

const mapStateToProps = (state) => {
    const {personals, booksData, contactSearch} = state
    return {personals, booksData, contactSearch}
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        //all actions come here
        setExistingCustomers
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)


