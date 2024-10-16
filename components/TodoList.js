import { StyleSheet, View, Text, Input, TextInput, Button, Pressable, FlatList } from 'react-native'
import React, { useReducer } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'changed_draft': {
            return {
                draft: action.nextDraft,
                todos: state.todos,
            };
        };
        case 'added_todo': {
            return {
                draft: '',
                todos: [{
                    id: state.todos.length,
                    text: state.draft
                }, ...state.todos]
            };
        };
        case 'remove_todo': {
            return {
                draft: '',
                todos: state.todos.filter(item => item.id !== action.id)
            };
        }
    }
    throw Error('Unknown action: ' + action.type);
}

export default function TodoList() {
    const [state, dispatch] = useReducer(reducer, { draft: '', todos: [] });

    const renderItem = ({ item }) => {

        return (
            <Pressable
                onPress={() => {
                    dispatch({ 
                        type: 'remove_todo',
                        id: item.id
                     });
                  }}
                hitSlop={10}
            >
                <Text style={styles.listItem}>{item.text}</Text>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            
            <TextInput
                placeholder='Add Item to the List'
                style={styles.textInput}
                value={state.draft}
                onChangeText={e => {
                    dispatch({
                      type: 'changed_draft',
                      nextDraft: e
                    })
                  }}
            />
            <Pressable
                style={styles.saveButton}
                onPress={() => {
                    dispatch({ type: 'added_todo' });
                  }}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
            <FlatList
                data={state.todos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            >
            </FlatList>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        padding: 5,
        borderWidth: 1,
        width: '100%'
    },
    saveButton: {
        position: 'absolute',
        alignSelf: 'center',
        right: 0,
        paddingRight: 20,
        paddingTop: 2
    },
    saveButtonText: {
        color: 'blue',
        fontSize: 24
    },
    listItem: {
        padding: 5
    },
    lista: {
        marginTop: 10
    },
    clearButton: {
        position: 'absolute',
        bottom:0,
        left:0,
    }
}); 