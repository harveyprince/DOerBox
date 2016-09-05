/**
 * Created by harveyprince on 16/9/5.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import {connect} from 'react-redux';
import SearchBar from './searchbar';
import TodoList from './todolist';

class Box extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SearchBar />
                <TodoList />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});


const select = (store) => {
    return {

    }
}

export default connect(select)(Box);