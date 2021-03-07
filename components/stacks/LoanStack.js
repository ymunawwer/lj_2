import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


const Stack = createStackNavigator();
import { SettingsScreen } from '../screens/SettingsScreen'
import { DetailsScreen } from '../screens/DetailsScreen'
import { ProfileScreen } from '../screens/ProfileScreen'


export function LoanStack() {
  return (
    <Stack.Navigator
      initialRouteName="Loan"
      screenOptions={{
        headerStyle: { backgroundColor: '#123111' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Loan Page' }}/>
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details Page' }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile Page' }}/>
    </Stack.Navigator>
  );
}

