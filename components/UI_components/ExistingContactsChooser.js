import React, {useCallback,useState,useEffect} from "react";
import {FlatList, Text, TouchableOpacity, View, TextInput} from "react-native";
import {transactionTypes} from "../../constants/Constansts";
import {styles} from "../../styles/globalStyle";
import {Title} from "react-native-paper";
import { RoundedInput } from './Inputs';



const ExistingContactsChooser = (props) => {

    const [search, setSearch] = useState('')
    const [data, setData] = useState(props.data)
    const [filteredData, setFilteredData] = useState(props.data)
    var fD = []
    

    const handleTextChange = useCallback((e) => {
        props?.onChangeText(e)
        
      }, [props?.onChangeText])

    

    function filterData(t){
        
        console.log("Props data", props.data +" t = " + t)
        setFilteredData([])
        // if(t === ''){
        //     setFilteredData(props.data)
        // }else{
            try{
            fD = [];
            // console.log("Searching", t)
            setFilteredData([])
            // console.log("-----\nFound list before for", fD)
            props.data.forEach(element => {

                if(element['name'].toLowerCase().includes(t.toLowerCase())){
                    // console.log("Found", element['name'])
                    fD.push(element)
                    // console.log("-----\nFound list", fD)
                    // setFilteredData([...filteredData, element])
                    // console.log("-----\nFound list", filteredData)
                }
                
               
            });
            setFilteredData(fD)
            // filteredData.forEach(e=>{
            //     // console.log("Searchh", e['name'])
            // })
        }catch(e){
            // console.log(e)
        }
           
        // }
    }
    

    // console.log('data',props.data)
    return (
       
        
        
        <View style={{flex: 1}}>

        <RoundedInput
          label={"Search"}
          placeholder={"Search"}
          value={search}
          onChangeText={
              text => {
              setSearch(text)
              filterData(text)
          }}
          
          handleTextChange={handleTextChange}
        />
          

            <Title
                style={{
                    marginLeft: 10,
                    color: "#303030",
                    fontWeight: "bold"
                }}
            >
                Select Customer
            </Title>

                <FlatList
                    style={{flex: 1}}
                    data={typeof(filteredData)!=='undefined'?filteredData:null}
                    ItemSeparatorComponent={() => (
                        <View style={{height: 1, backgroundColor: "#E8E8E8", marginHorizontal: 30}}>

                        </View>
                    )}
                    renderItem={({item}) => (

                        <TouchableOpacity
                            onPress={() => props?.onPressContact(item)}

                            style={{
                                margin: 1,
                            }}
                        >
                            <View style={[styles.row]}>
                                <View style={styles.initialsCont}>
                                    <Text style={styles.initialText}>{item.name[0].toUpperCase()}</Text>
                                </View>
                                <View style={styles.cNameTimeCont}>
                                    <Text style={styles.cName}>{item.name}</Text>

                                    <Text style={[styles.greyTextSm, {
                                        margin: 0,
                                        paddingHorizontal: 0
                                    }]}>{item.phone}</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    // keyExtractor={item => item.id.toString()}

                />

        </View>
    );
    
}

export default ExistingContactsChooser