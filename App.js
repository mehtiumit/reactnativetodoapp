import React, {useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Todo from './components/ToDo';
import Done from './components/Done';
import {reducer, initialState} from './store/todoreducer';

export const TodoContext = React.createContext();
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
    <TodoContext.Provider value={useReducer(reducer, initialState)}>
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
            name="Add Todo"
            component={TodoStack}
            options={{tabBarIcon: () => <Icon size={20} name="add-box" />}}
          />
          <Tab.Screen
            name="Finished"
            component={Done}
            options={{
              tabBarIcon: () => <AntDesign size={20} name="carryout" />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TodoContext.Provider>
  );
}
