import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SavedCreditScreen from './SavedCreditScreen';
import Colors from 'credit/src/res/colors';

const Stack = createStackNavigator();

const SavedCreditStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Credits List" component={SavedCreditScreen} />
    </Stack.Navigator>
  );
};

export default SavedCreditStack;
