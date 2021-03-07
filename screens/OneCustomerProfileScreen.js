import React, {useState,useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View,Button} from "react-native"
import {bindActionCreators} from "redux";
import {setCurrentBookData, setUser} from "../redux/actions/personalsActions";
import {setAllActiveBooks} from "../redux/actions/booksDataActions";
import {connect} from "react-redux";
import {AntDesign, Entypo, Feather, Ionicons} from "@expo/vector-icons";
import {Caption, Divider, Subheading, Title, Switch} from "react-native-paper";
import {RoundedBtn} from "../components/UI_components/Buttons";
import {RoundedInput} from "../components/UI_components/Inputs";
import dbObject from '../components/database/db';

import Colors from "../constants/Colors";

function OneCustomerProfileScreen(props) {

    const {navigation, route} = props
    
    const [activeSwitch, setActiveSwitch] = useState(true)
    const [smsSwitch, setSmsSwitch] = useState(true)

    const [isEdit,setIsEdit] = useState('false')

    // const [isEdit,setIsEdit] = useState('null')
    const [name,setName] = useState('null')
    const [address,setAddress] = useState(null)
    const [limitGave,setLimitGave] = useState(0)
    
    const [limitGot,setLimitGot] = useState(0)
    const [recordId,setRecordId] = useState(0)

    const onToggleActiveSwitch = async() => {
        // setActiveSwitch(!activeSwitch)
        let records;
        if(activeSwitch){
            records = await dbObject.setUserData(recordId,props.personals.currentBookId,route.params.phoneNumber,'isActive',0)
        }else{
            records = await dbObject.setUserData(recordId,props.personals.currentBookId,route.params.phoneNumber,'isActive',1)


        }
        if(records['_array'][0]['isActive']===1){
            setActiveSwitch(true)
        }else{
            setActiveSwitch(false)
        }
        
    
        
    };
    const onToggleSmsSwitch = async() => {
        // setSmsSwitch(!smsSwitch);
        let records;
        if(smsSwitch){
            records = await dbObject.setUserData(recordId,props.personals.currentBookId,route.params.phoneNumber,'isSms',0)
           
        }else{
            records = await dbObject.setUserData(recordId,props.personals.currentBookId,route.params.phoneNumber,'isSms',1)


        }
        console.log('records',smsSwitch)
        if(records['_array'][0]['isSms']===1){
            setSmsSwitch(true)
        }else{
            setSmsSwitch(false)
        }
        // setSmsSwitch(records['_array'][0]['isSms'])
        
      

    }

    async function onSave(key,value){

        // const records = await dbObject.getRecordsOfUser(route.params.phoneNumber, props.personals.currentBookId)
        // console.log(props.personals)
        const records = await dbObject.setUserData(recordId,props.personals.currentBookId,route.params.phoneNumber,key,value)
        // alert(JSON.stringify(records))
        setIsEdit('false')
        setName(records['_array'][0]['name'])
                    setLimitGave(records['_array'][0]['limitGave']?records['_array'][0]['limitGave']:0)
                    setLimitGot(records['_array'][0]['limitGot']?records['_array'][0]['limitGot']:0)
                    setRecordId(records['_array'][0]['recordid'])
                    setAddress(records['_array'][0]['address']!==null?records['_array'][0]['address']:'Address not available.')
                   
        alert('Successfully Update.')

    }
    
    async function updateLimit(){
        setIsEdit('false')
        let records
        records = await dbObject.setUserData(recordId,props.personals.currentBookId,route.params.phoneNumber,'limitGave',limitGave)
        records = await dbObject.setUserData(recordId,props.personals.currentBookId,route.params.phoneNumber,'limitGot',limitGot)
        setLimitGave(records['_array'][0]['limitGave']?records['_array'][0]['limitGave']:0)
        setLimitGot(records['_array'][0]['limitGot']?records['_array'][0]['limitGot']:0)
        alert('Successfully Updated.')


    }

    async function onDelete(){

        // route.params.phoneNumber
        // const records = await dbObject.getDetailsOfUser(route.params.phoneNumber, props.personals.currentBookId)
        // console.log('data',records)
        const records = await dbObject.setUserData(recordId,props.personals.currentBookId,route.params.phoneNumber,'isDeleted',1)
        // alert(JSON.stringify(records))
        alert('Successfully Deleted.')
        

    }

    useEffect(() => {

        (async () => {

            try {
                const records = await dbObject.getDetailsOfUser(route.params.phoneNumber, props.personals.currentBookId)
                console.log('useEffect-',records['_array'].length)
                if(records['_array'].length>0){

                    setName(records['_array'][0]['name'])
                    setLimitGave(records['_array'][0]['limitGave']?records['_array'][0]['limitGave']:0)
                    setLimitGot(records['_array'][0]['limitGot']?records['_array'][0]['limitGot']:0)
                    setRecordId(records['_array'][0]['recordid'])
                    setAddress(records['_array'][0]['address']!==null?records['_array'][0]['address']:'Address not available.')
                    // setActiveSwitch(records['_array'][0]['isActive'])
                    if(records['_array'][0]['isActive']===1){
                        setActiveSwitch(true)
                    }else{
                        setActiveSwitch(false)
                    }
                    
                    // setSmsSwitch(records['_array'][0]['isSms'])
                    if(records['_array'][0]['isSms']===1){
                        setSmsSwitch(true)
                    }else{
                        setSmsSwitch(false)
                    }
                    
                }
                

            }catch{
                console.log('useEffect-catch',)

            }
        })();

    })
    
    return(
       
        <View style={{flex: 1, backgroundColor: "#ffffff", padding: 10}}>

            <ScrollView>

                <View style={{alignItems:'center',paddingVertical:10,flex:1,backgroundColor:'white', marginHorizontal:10}}>
                    <View style={{height:100,width:100,borderRadius:100/2,backgroundColor:'#4e54c8',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:60,color:'white'}}>F</Text>
                    </View>
                    <Title>{route.params.name}</Title>
                    <Subheading>{route.params.phoneNumber}</Subheading>
                </View>

                <Divider />
                {/* customer name */}


                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'user'} size={24} color={"#3298fa"} />
                    </View>
{
                    (isEdit!=='user') ?  
                   ( <View style={{flex: 1}}>
               
                        <Title style={{fontSize: 16}}>Customer Name:</Title>
                        
                     <Caption>{name}</Caption>
                  </View>)
                     
                     
                     :
                        (<View style={[{flexDirection: "row",flex: 1}]}>
                            
        <RoundedInput
          containerStyle={[{flex: 3}]}
          label={"Customer Name:"}
          placeholder={"Customer Name:"}
          value={name}
          onChangeText = {value=>setName(value)}

          
        />

        {/* <RoundedBtn
          style={{marginTop: 25, marginRight: 5,flex: 1}}
          containerStyle={{paddingHorizontal: 15}}
          text={"Add"}
          // onPress={props?.onPress}
          onPress= {() => navigation.navigate('addLoanInputs')}
        /> */}
      
                  
                  
   </View>)
}

                    <View style={{alignItems: "center"}}>
                    {
                    (isEdit!=='user') ?  
                    (<Entypo name={'pencil'} size={18} color={"black"} onPress={()=>setIsEdit('user')}/>):
                    (<TouchableOpacity 
                    onPress={()=>{onSave('name',name)}}>
                    <Entypo name={'check'} size={18} color={"green"} />
                    </TouchableOpacity>)

                }
                        {/* <Ionicons name="arrow-dropright" size={24} color="black"/> */}
                    </View>

                </View>

                <Divider />

                {/* customer name end */}


                 {/* customer mobile# */}

                 <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'phone'} size={24} color={"#3298fa"} />
                    </View>

                    {
                        (isEdit!=='mobile') ?  
                    (<View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Mobile Number:</Title>
                        <Caption>{route.params.phoneNumber}</Caption>
                    </View>)
        
                     :
                        (<View style={[{flexDirection: "row",flex: 1}]}>
                            
        <RoundedInput
          containerStyle={[{flex: 3}]}
          label={"Mobile Number:"}
          placeholder={"Mobile Number:"}
          value={route.params.phoneNumber}

          
        />

       
      
                  
                  
   </View>)
}

                    <View style={{alignItems: "center"}}>
                    {/* <Entypo name={'pencil'} size={18} color={"black"} onPress={()=>setIsEdit('mobile')}/> */}
                    {/* {
                    (isEdit!=='mobile') ?  
                    (<Entypo name={'pencil'} size={18} color={"black"} onPress={()=>setIsEdit('mobile')}/>):
                    (<Entypo name={'check'} size={18} color={"green"} onPress={()=>setIsEdit('save')}/>)

                } */}
                        {/* <Ionicons name="ios-arrow-dropright" size={24} color="black" /> */}
                    </View>

                </View>

                <Divider />

                {/* customer mobile# end */}


                 {/* customer max limit */}

                 <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'flash'} size={24} color={"#3298fa"} />
                    </View>
                    {
                        (isEdit!=='limit') ?  
                   ( <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Max limit(Gave/Got):</Title>
                        <Caption>{limitGave+'/'+limitGot}</Caption>
                    </View>)

                    :
                        (<View style={[{flexDirection: "row",flex: 1}]}>
                            
        <RoundedInput
          containerStyle={[{flex: 3}]}
          label={"Gave:"}
          placeholder={"Gave"}
          value={limitGave}
          onChangeText = {value=>setLimitGave(value)}

          
        />
           <RoundedInput
          containerStyle={[{flex: 3}]}
          label={"Got:"}
          placeholder={"Got"}
          value={limitGot}
          onChangeText = {value=>setLimitGot(value)}

          
        />

       
      
                  
                  
   </View>)
}
                    

                    <View style={{alignItems: "center"}}>
                    {/* <Entypo name={'pencil'} size={18} color={"black"} onPress={()=>setIsEdit('limit')}/> */}
                    {
                    (isEdit!=='limit') ?  
                    (<Entypo name={'pencil'} size={18} color={"black"} onPress={()=>setIsEdit('limit')}/>):
                    (<TouchableOpacity 
                        onPress={()=>{updateLimit()}}>
                        <Entypo name={'check'} size={18} color={"green"} />
                        </TouchableOpacity>)

                }
                        {/* <Ionicons name="ios-arrow-dropright" size={24} color="black" /> */}
                    </View>

                </View>

                <Divider />

                {/* customer mobile# end */}

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'address'} size={24} color={"#3298fa"} />
                    </View>
                    {
                        (isEdit!=='address') ?  
                   ( <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Address:</Title>
                        <Caption>{address}</Caption>
                    </View>)
                    :
                        (<View style={[{flexDirection: "row",flex: 1}]}>
                            
        <RoundedInput
          containerStyle={[{flex: 3}]}
          label={"Address:"}
          placeholder={"Address:"}
          value={address}
          onChangeText = {value=>setName(value)}

          
        />

       
      
                  
                  
   </View>)
}
              

                    

                    <View style={{alignItems: "center"}}>
                    {/* <Entypo name={'pencil'} size={18} color={"black"} onPress={()=>setIsEdit('address')}/> */}
                    {
                    (isEdit!=='address') ?  
                    (<Entypo name={'pencil'} size={18} color={"black"} onPress={()=>setIsEdit('address')}/>):
                    (<TouchableOpacity 
                        onPress={()=>{onSave('address',address)}}>
                        <Entypo name={'check'} size={18} color={"green"} />
                        </TouchableOpacity>)

                }
                        {/* <Ionicons name="ios-arrow-dropright" size={24} color="black" /> */}
                    </View>

                </View>

                <Divider />

                {/* <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c2ffd4", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <AntDesign name={'flag'} size={24} color={"#33bd5c"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Transaction limit:</Title>
                        <Caption>No limit set</Caption>
                    </View>

                    <View style={{alignItems: "center"}}>
                        <Ionicons name="ios-arrow-dropright" size={24} color="black" />
                    </View>


        
                </View> */}
                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <AntDesign name={'mail'} size={24} color={"#3298fa"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Send Free SMS</Title>
                        {/* <Caption>This customer account is active.</Caption> */}
                    </View>

                    <Switch value={smsSwitch} onValueChange={onToggleSmsSwitch} />
                </View>

                <Divider />

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'list'} size={24} color={"#3298fa"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>SMS Settings:</Title>
                        <Caption>Language,Notes,Format etc</Caption>
                    </View>

                    <View style={{alignItems: "center"}}>
                        {/* <Ionicons name="ios-arrow-dropright" size={24} color="black" /> */}
                        <Entypo name={'pencil'} size={18} color={"black"} />
                    </View>

                </View>

                

                <Divider />

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#ffccd1", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <AntDesign name={'flag'} size={24} color={"#fc4e5f"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Active?</Title>
                        <Caption>This customer account is active.</Caption>
                    </View>

                    <Switch value={activeSwitch} onValueChange={onToggleActiveSwitch} />
                </View>
                <Divider />

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                   

                    <View style={{flex: 1}}>
                        
                        
                        <Button
  onPress={onDelete}
  title="Delete"
  color="#f7001d" //#ffccd1
  accessibilityLabel="Delete this user from the list."
/>
                    </View>

                   
                </View>
            </ScrollView>

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
        setCurrentBookData,
        setAllActiveBooks,
        setUser
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OneCustomerProfileScreen)