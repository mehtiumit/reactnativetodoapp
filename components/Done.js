import React from 'react';
import { StyleSheet, FlatList, ScrollView, View, Text } from 'react-native';
import { TodoContext } from '../App';

function Done() {
    return (

        <TodoContext.Consumer>
            {
                value => {
                    const { todos } = value[0];
                    const dispatch = value[1];
                    console.log(todos);
                  
                    return (
                        <View style={styles.container}>
                            <Text>{filteredTodos}</Text>
                        </View>
                    )
                }
            }
        </TodoContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default Done