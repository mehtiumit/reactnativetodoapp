/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView, TextInput, FlatList, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { color } from 'react-native-reanimated';


function Todo() {
    let today = new Date().toISOString().slice(0, 10);
    const [textInputText, settextInputText] = React.useState('');
    const [todo, setTodo] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState(today);

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} startDate={item.startDate} endDate={item.endDate} />
    );
    const Item = ({ title, id, startDate, endDate }) => (

        <View style={{ flex: 3 }}>
            <ScrollView style={{ flex: 1 }} >
                <Text style={{ textAlign: 'center' }}>
                    {title} : Başlangıç T.{startDate} Bitiş T.{endDate}
                </Text>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity style={styles.btnText} onPress={() => {
                        setTodo(todo.filter(f => f.id !== id))
                    }}>
                        <Text style={styles.btnTextDelete} >Sil</Text>
                    </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.btnTextUpdate}>Güncelle</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View >

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

    const addOnPress = () => {
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
    };


    return (
        <SafeAreaView style={styles.container}>
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
            <TouchableOpacity onPress={addOnPress} style={styles.btnAdd} >
                <Text style={{ textAlign: 'center', color: 'white' }}>{textInputText.length > 0 ? 'Ekle' : 'To-Do Boş Olamaz'}</Text>
            </TouchableOpacity>
            <SafeAreaView>
                <FlatList
                    data={todo}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>

        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 6,
        justifyContent: 'center',
        marginHorizontal: 16,
        position: 'relative',
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
});
export default Todo;
