/**
 * Created by harveyprince on 16/9/5.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import Todo from './todo';

class TodoList extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.props.todos.map((t)=>
                    <Todo key={t.id}
                          todo={t}
                    />
                )}


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 50,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 60
    }
});

const select = (store) => {
    return {
        todos: store.todos
    }
}

export default connect(select)(TodoList);