import { createStackNavigator } from '@react-navigation/stack';

import * as React from 'react';


import { HomeScreen } from '../screens/HomeScreen'
import { DetailsScreen } from '../screens/DetailsScreen'
import { ReportScreen } from '../screens/ReportScreen'



const Stack = createStackNavigator();


export function HomeStack() {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        
        screenOptions={{
          headerStyle: { backgroundColor: '#123111' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home Page' }}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details Page' }} />
        <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Report Page' }} />

      </Stack.Navigator>
  );
}



