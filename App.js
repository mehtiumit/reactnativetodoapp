import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Todo from './components/ToDo';
import Done from './components/Done';



export const TodoContext = React.createContext();
const initialState = {
  todos: [{

  }]
};
const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'AddTodo':
      console.log("Action" + action);
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case 'DeleteTodo':
      return {
        ...state,
        todos: state.todos.filter(f => f.id !== action.payload)
      }
    case 'UpdateTodo':
      return {
        ...state,
        todos: state.todos.map(f => f.id == action.payload ? f.isComplete = !f.isComplete : f.isComplete)
      }
    default:
      return state;
  }
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
    <TodoContext.Provider value={React.useReducer(reducer, initialState)}>
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
            options={{ tabBarIcon: () => <AntDesign size={20} name="home" /> }}
          />
          <Tab.Screen
            name="Yapılanlar"
            component={Done}
            options={{ tabBarIcon: () => <AntDesign size={20} name="carryout" /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TodoContext.Provider>
  );
}
