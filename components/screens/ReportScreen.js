import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Card, List, FlatList, ListItem, Button, Icon } from 'react-native-elements'
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
]

export const ReportScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Card><Text>Yaseen Ammaar</Text></Card>
      <ScrollView style={{ flex: 1 , padding: 16}}>
         {
          list.map((item, i) => (
            <Card>
              <Text>
                {item.title}
              </Text>
            </Card>
          ))
        }
        
      </ScrollView>
      
    <Card style={{flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: 0}}>
     <View style={{ flex: 1, flexDirection: 'row', margin: 1 }}>
        <View style={{width:'50%', alignItems: 'center'}}>
         <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Report')}>
                <Text>Give</Text>
            </TouchableOpacity>
        </View>
        <Text>|</Text>
        <View style={{width:'50%', alignItems: 'center'}}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Report')}>
                <Text>Take</Text>
            </TouchableOpacity>
        </View>
        </View>
    </Card>
      
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

