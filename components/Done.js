import React from 'react';
import {Fragment} from 'react';
import {StyleSheet, FlatList, ScrollView, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TodoContext} from '../App';
import Item from './FlatListItems/Item';

const renderItem = ({item}) => (
  <Fragment>
    {item.isComplete ? (
      <Item
        id={item.id}
        title={item.title}
        startDate={item.startDate}
        endDate={item.endDate}
        isComplete={item.isComplete}
      />
    ) : null}
  </Fragment>
);
function Done() {
  return (
    <TodoContext.Consumer>
      {(value) => {
        const {todos} = value[0];
        console.log(todos);
        return (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={todos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </SafeAreaView>
        );
      }}
    </TodoContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Done;
