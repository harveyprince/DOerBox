import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

export class SearchBar extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Image style={styles.icon}
            source={require('../image/search_black.png')}
          />
          <TextInput style={styles.searchbox} />
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