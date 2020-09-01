import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: {
            justifyContent: 'center',
          },
          labelStyle: {
            fontSize: 15,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{tabBarIcon: () => <AntDesign size={20} name="home" />}}
        />

        <Tab.Screen
          name="Yapılanlar"
          component={SettingsScreen}
          options={{tabBarIcon: () => <AntDesign size={20} name="carryout" />}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
