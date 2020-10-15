import React from 'react';
import {View} from 'react-native';
import {TodoContext} from '../../App';
import FlatDoneItem from './FlatDoneItem';
import FlatItem from './FlatItem';
const Item = ({title, id, startDate, endDate, isComplete}) => (
  <TodoContext.Consumer>
    {(value) => {
      console.log('value', value);
      return (
        <View>
          {!isComplete ? (
            <FlatItem
              id={id}
              title={title}
              endDate={endDate}
              startDate={startDate}
              isComplete={isComplete}
            />
          ) : (
            <FlatDoneItem
              id={id}
              title={title}
              endDate={endDate}
              startDate={startDate}
              isComplete={isComplete}
            />
          )}
        </View>
      );
    }}
  </TodoContext.Consumer>
);

export default Item;
