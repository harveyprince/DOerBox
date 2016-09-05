import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {SearchBar} from './component/searchbar';

export class DOerBox extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchBar />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchbox: {
    height: 50,
    alignSelf: 'stretch'
  }
});
