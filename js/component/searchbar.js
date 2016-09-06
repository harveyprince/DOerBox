import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {addTodo} from '../action/todo';

let idx = 0;

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        };
    }
    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.searchbox}
                           ref='todo_input'
                           onChangeText={(text) => this.setState({text})}
                           value={this.state.text}
                />
                <TouchableOpacity
                    onPress={()=>{
                        let text = this.state.text;
                        if (text) {
                            this.props.dispatch(addTodo({
                                id: idx ++,
                                content: text,
                                tag_finish: false
                            }));
                        }
                        this.setState({text:''});

                    }}
                >
                    <Image style={styles.icon}
                           source={require('../image/send_black.png')}
                    />
                </TouchableOpacity>

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

        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 10
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