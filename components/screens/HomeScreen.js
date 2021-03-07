import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, FlatList} from 'react-native';


export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View>
    <Card title="Total">
      
        <View style={{ flex: 1, flexDirection: 'row', margin: 1 }}>
          <View style={{width:'50%', alignItems: 'center'}}>
            <Text style={{color:'green'}}>₹ 3000</Text>
            <Text>You will give</Text>
          </View>
          <Text>|<br/>|</Text>
          <View style={{width:'50%', alignItems: 'center'}}>
            <Text style={{color:'red'}}>₹ 3000</Text>
            <Text>You will get</Text>
          </View>

          
        </View>
        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
          <View style={{ alignItems: 'center'}}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Report')}>
                <Text>View Report</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Card>
    </View>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SettingsStack', { screen: 'Settings' })}>
            <Text>Go to settng Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Details')}>
            <Text>Open Details Screen</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});


