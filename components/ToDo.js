/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView, TextInput, FlatList, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TodoContext } from '../App';


function Todo() {
    let today = new Date().toISOString().slice(0, 10);
    const [textInputText, settextInputText] = React.useState('');
    const [id, setId] = React.useState(0);
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState(today);
    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} startDate={item.startDate} endDate={item.endDate} />
    );
    const Item = ({ title, id, startDate, endDate }) => (
        <TodoContext.Consumer>
            {
                value => {
                    const dispatch = value[1];
                    return (
                        <View style={styles.todoContainer}>
                            <ScrollView >
                                <Text style={styles.todoInfo}>
                                    id:{id}  {title} : Başlangıç T.{startDate} Bitiş T.{endDate}
                                </Text>
                                <View >
                                    <TouchableOpacity style={styles.btnDelete} onPress={() => {
                                        dispatch({
                                            type: 'DeleteTodo',
                                            payload: id
                                        })
                                    }}>
                                        <View style={styles.btnView}>
                                            <Text style={styles.iconAlign}>Sil</Text>
                                            <Icon size={25} name="delete-forever" style={{ color: 'white', marginLeft: 12 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnDoneColor} onPress={() => {
                                        dispatch({
                                            type: 'UpdateTodo',
                                            payload: id,
                                        })
                                    }} >
                                        <View style={styles.btnDone}>
                                            <Text style={styles.iconAlign}>Tamamlandı</Text>
                                            <Icon size={25} name="done" style={{ color: 'white', marginLeft: 12 }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View >
                    )
                }
            }
        </TodoContext.Consumer>
    );
    const alertModal = (title, content) => {
        Alert.alert(
            title,
            content,
            [{ text: 'OK' }],
            {
                cancelable: false,
            },
        );
    };
    const dateChecks = (endDate, startDate) => {
        let diffTime = Math.abs(new Date(endDate) - new Date(startDate));
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 30) {
            return true;
        }
    };
    /* const addOnPress = () => {
         if (dateChecks(endDate, startDate)) {
             alertModal('Gün Sayısı', 'Gün sayısı 30\'dan büyük olamaz');
         }
         else if (textInputText.length > 0) {
             setId(id + 1);
             setTodo([...todo, {
                 title: textInputText.toString(),
                 id: id.toString(),
                 startDate: startDate.toString(),
                 endDate: endDate.toString(),
             }]);
         }
         else {
             alertModal('Hata', 'Todo Kısmı Boş Olamaz');
         }
     };*/

    return (
        <TodoContext.Consumer>
            {
                value => {
                    const { todos } = value[0];
                    const dispatch = value[1];
                    return (
                        <SafeAreaView style={styles.container}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.title}>
                                    React Native To-Do App
                            </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text => settextInputText(text)}
                                    value={textInputText}
                                />
                                <View style={styles.date}>
                                    <Text>Başlangıç Tarihini Seçiniz:</Text>
                                    <DatePicker
                                        date={startDate}
                                        format='YYYY-MM-DD'
                                        customStyles={{
                                            dateText: {
                                                color: 'black',
                                            },
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                            },
                                            dateInput: {
                                                marginLeft: 40,
                                                borderColor: '#021E73',
                                            },
                                            datePicker: {
                                                borderColor: 'red',
                                            }
                                        }}
                                        onDateChange={(date) => setStartDate(date)}
                                    />
                                </View>
                                <View style={styles.date}>
                                    <Text>Başlangıç Tarihini Seçiniz:</Text>
                                    <DatePicker
                                        date={endDate}
                                        format='YYYY-MM-DD'
                                        customStyles={{
                                            dateText: {
                                                color: 'black',
                                            },
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                            },
                                            dateInput: {
                                                marginLeft: 40,
                                                borderColor: '#021E73',
                                            },
                                            datePicker: {
                                                borderColor: 'red',
                                            }
                                        }}
                                        onDateChange={(date) => setEndDate(date)}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => {
                                    if (dateChecks(endDate, startDate)) {
                                        alertModal('Gün Sayısı', 'Gün sayısı 30\'dan büyük olamaz');
                                    }
                                    else if (textInputText.length > 0) {
                                        setId(id + 1)
                                        dispatch(
                                            {
                                                type: 'AddTodo',
                                                payload: {
                                                    id,
                                                    title: textInputText,
                                                    startDate: startDate,
                                                    endDate: endDate,
                                                    isComplete: false,
                                                }
                                            })
                                    }
                                    else {
                                        alertModal('Hata', 'Todo Kısmı Boş Olamaz');
                                    }

                                }} style={styles.btnAdd} >
                                    <View style={styles.btnView}>
                                        <Text style={{ textAlign: 'center', color: 'white', justifyContent: 'flex-start' }}>{textInputText.length > 0 ? 'Ekle' : 'To-Do Boş Olamaz'}</Text>
                                        <Icon size={25} name={textInputText.length > 0 ? 'add-box' : 'warning'} style={[styles.iconStyle]} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={todos}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                            />
                        </SafeAreaView>)
                }
            }
        </TodoContext.Consumer>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    todoContainer: {
        marginTop: 5,
        borderWidth: 2,
        borderColor: '#91AA9D',
        borderRadius: 5,
    },
    btnTextDelete: {
        textAlign: 'center',
        color: 'black',
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: 'gray',
    },
    btnTextUpdate: {
        textAlign: 'center',
        color: 'black',
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: '#DEDBC3',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        color: 'black',
    },
    date: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'black',
    },
    view: {
        marginTop: 10,
        backgroundColor: '#D4DBF5',
        borderRadius: 4,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'black',
    },
    btnAdd: {
        backgroundColor: '#193441',
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 8,
    },
    iconStyle: {
        color: 'white',
        marginLeft: 5,
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnDone: {
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
        backgroundColor: '#958976'
    },
    iconAlign: {
        textAlign: 'center',
        color: 'white',
        justifyContent: 'flex-start'
    }
});
export default Todo;
