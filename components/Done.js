import React from 'react';
import {Fragment} from 'react';
import {StyleSheet, FlatList, ScrollView, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TodoContext} from '../App';

function Done() {
  return (
    <TodoContext.Consumer>
      {(value) => {
        const {todos} = value[0];
        const dispatch = value[1];
        console.log(todos);
        return (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={todos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) =>
                item.isComplete ? (
                  <Fragment>
                    <Text>{item.title}</Text>
                    <Text>{item.startDate}</Text>
                    <Text>{item.endDate}</Text>
                  </Fragment>
                ) : null
              }
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
