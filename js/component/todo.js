/**
 * Created by harveyprince on 16/9/5.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native';

export default class Todo extends Component {
    render() {
        const {todo} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {todo.content}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 50
    }
});