import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreditScreen from './CreditScreen';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';
import Colors from 'credit/src/res/colors';

const Stack = createStackNavigator();

const CreditStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Finance Simulator" component={CreditScreen} />

      <Stack.Screen name="Amortization Table" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default CreditStack;
