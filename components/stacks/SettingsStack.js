import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


const Stack = createStackNavigator();
import { SettingsScreen } from '../screens/SettingsScreen'



export function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: '#123111' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Setting Page' }}/>
    </Stack.Navigator>
  );
}

