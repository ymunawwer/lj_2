import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView} from 'react-native';


export const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>
            You are on Profile Screen
          </Text>
        </View>
        
      </View>
    </SafeAreaView>
  );
}
