import React, {Fragment} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TodoContext} from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actionTypes from '../../store/actionTypes';
const FlatItem = ({title, id, startDate, endDate, isComplete}) => (
  <TodoContext.Consumer>
    {(value) => {
      const dispatch = value[1];
      return (
        <View>
          <View style={styles.todoContainer}>
            {!isComplete ? (
              <Fragment>
                <Text style={styles.todoInfo}>
                  {title} : Start Date.{startDate} End Date.{endDate}
                </Text>
                <View>
                  <TouchableOpacity
                    style={styles.btnDelete}
                    onPress={() => {
                      dispatch({
                        type: actionTypes.DELETE_TODO,
                        payload: id,
                      });
                    }}>
                    <View style={styles.btnView}>
                      <Text style={styles.iconAlign}>Delete</Text>
                      <Icon
                        size={25}
                        name="delete-forever"
                        style={{color: 'white', marginLeft: 12}}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnDoneColor}
                    onPress={() => {
                      dispatch({
                        type: actionTypes.UPDATE_TODO,
                        payload: id,
                      });
                    }}>
                    <View style={styles.btnView}>
                      <Text style={styles.iconAlign}>Add To Done List</Text>
                      <Icon
                        size={25}
                        name="done"
                        style={{color: 'white', marginLeft: 12}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </Fragment>
            ) : (
              <View>
                <Text>Done</Text>
              </View>
            )}
          </View>
        </View>
      );
    }}
  </TodoContext.Consumer>
);
const styles = StyleSheet.create({
  todoContainer: {
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#91AA9D',
    borderRadius: 5,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnDelete: {
    backgroundColor: '#6F767A',
  },
  todoInfo: {
    backgroundColor: '#FCFFF5',
    textAlign: 'center',
  },
  btnDoneColor: {
    backgroundColor: '#958976',
  },
  iconAlign: {
    textAlign: 'center',
    color: 'white',
    justifyContent: 'flex-start',
  },
});

export default FlatItem;
