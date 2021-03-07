import React, {useState} from 'react'
import {View, Text, TextInput, Alert, TouchableOpacity} from 'react-native'
import dbObject from '../components/database/db'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setCurrentBookData, setCurrentBookId} from "../redux/actions/personalsActions";
import {setAllActiveBooks, setExistingCustomers} from "../redux/actions/booksDataActions";
import apiRequest from "../components/Logic_Repository/apiRequest";
import companyApis from "../constants/companyApis";
import {RoundedInput} from "../components/UI_components/Inputs";
import {Subheading, Paragraph} from "react-native-paper";
import Layout from "../constants/Layout";


function WelcomeScreen(props) {

  const [bookName, setBookName] = useState(null)
  const [inputBoxVisibility, setInputBoxVisibility] = useState(false)


  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>

      <View style={{margin: 10}}>
        <Subheading style={{ fontWeight: "bold", fontSize: 22}}>Add a new Book</Subheading>
        <Paragraph>We hope your new book will help you manage your daily transactions.</Paragraph>
      </View>

        <RoundedInput
          onChangeText={text => setBookName(text)}
          style={{padding: 10}}
          label="New Book Name"
        />


      <View style={{margin: 10, position: "absolute", bottom: 0, width: Layout.window.width - 20}}>
        <TouchableOpacity
          onPress={() => {

              try {
                if (bookName != null && bookName !== '') {
                  createBook(bookName, "1", props)
                  // setInputBoxVisibility(true)


                  //MUST ADD CODE TO HANDLE REPETITION


                } else {
                  Alert.alert('Enter book name')
                }
              } catch (e) {
                Alert.alert('something went wrong')
              }



          }
        }
          style={{
            backgroundColor: '#4e54c8',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6
          }}><Text style={{color: 'white', fontWeight: 'bold'}}>GET STARTED</Text></TouchableOpacity>
      </View>
    </View>
  )
}

function createBook(bookName, password, props){
  (async () => {
              try {
                const res = await dbObject.addBook(bookName, password)

              const books = await dbObject.getAllActiveBooks()

              props.setCurrentBookId(books['_array'][books.length - 1].id)
               props.setCurrentBookData(books['_array'][books.length - 1])
                props.setAllActiveBooks(books['_array'])
                console.log(books['_array'])

                const existingCust = await dbObject.getExistingContacts(books['_array'][books.length - 1].id)
                props.setExistingCustomers(existingCust)

                await dbObject.setCurrentBook(books['_array'][books.length - 1].id)

                //TODO: uncomment this before building the app
                //await MakeNewBookInFirestore(bookName, books['_array'][books.length - 1].id)

                props.navigation.navigate('Root')
              } catch (e) {
                Alert.alert(e.toString())
              }

            })();

}

async function MakeNewBookInFirestore(bookName, localId) {
  const data = {
    bookName,
    localId
  }
  const apiRes = await apiRequest('post', companyApis.MAKE_NEW_BOOK, data, 'json', true);
  /**
   * API RESPONSE
   * {
        bookRemoteId: string,
        isError:boolean,
        error: string
        statusCode:number
   *  }
   */
}

const mapStateToProps = (state) => {
  const {personals, booksData} = state
  return {personals, booksData}
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
    setCurrentBookId,
    setCurrentBookData,
    setAllActiveBooks,
    setExistingCustomers

  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
