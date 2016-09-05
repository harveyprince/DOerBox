import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import {addTodo} from '../action/todo';

let idx = 0;

class SearchBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.icon}
                       source={require('../image/search_black.png')}
                />
                <TextInput style={styles.searchbox}
                           onChangeText={(text) => {
                               console.log(text);
                               this.props.dispatch(addTodo({
                                   id: idx ++,
                                   content: text,
                                   tag_finish: false
                               }))
                           }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#F5FCFF',
        height: 50
    },
    icon: {

        width: 30
    },
    searchbox: {
        flex: 1,
        alignSelf: 'stretch',
        height: 50,

    }
});

const select = (store) => {
    return {

    }
}

export default connect(select)(SearchBar);