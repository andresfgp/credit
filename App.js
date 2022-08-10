import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CreditStack from 'credit/src/components/credit/CreditStack';
import FavoritesStack from 'credit/src/components/favorites/FavoritesStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from 'credit/src/res/colors';
import {LogBox} from 'react-native';

const Tabs = createBottomTabNavigator();

const App = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'Invalid prop textStyle of type array supplied to Cell',
    ]);
  }, []);

  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: Colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          name="Credito"
          component={CreditStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('credit/src/assets/bank.png')}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('credit/src/assets/star.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
