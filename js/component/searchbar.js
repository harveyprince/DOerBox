import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export class SearchBar extends Component {
    render() {
      return (
        <View style={styles.container}>
          <TextInput style={styles.searchbox} />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  searchbox: {
    height: 50,
    alignSelf: 'stretch'
  }
});