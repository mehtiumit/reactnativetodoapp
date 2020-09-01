import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Todo from './components/ToDo';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}
const TodoTab = createStackNavigator();
function TodoStack() {
  return (
    <TodoTab.Navigator>
      <TodoTab.Screen name="Todo" component={Todo} />
    </TodoTab.Navigator>
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
          component={TodoStack}
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
