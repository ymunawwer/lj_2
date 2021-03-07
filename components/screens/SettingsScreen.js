import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView} from 'react-native';


  const list = [
  {
    name: 'Request Money',
  },
  {
    name: 'Payment History',
  },
  {
    name: 'QR Code',
  },
  {
    name: 'Business Card',
  },
  {
    name: 'Settings',
  },
  {
    name: 'Help & Support',
  }
]

export const SettingsScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1}}>
      
        <ListItem
                title='Home'
                titleStyle={{ fontWeight: 'bold',paddingRight: '10' }}
                subtitle='Your Name'
                leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
                bottomDivider
                
              /><br/>
        
      
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                title={l.name}
                bottomDivider
                chevron
              />
            ))
          }
      
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
