import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Dashboard from './dashboard';

class Recipes extends Component {
	componentDidMount() {
		console.log('Recipes component rendered!')
	}

  render() {
    return (
      <View style={styles.container}>
        <Text>Recipes Component</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  }
});

export default Recipes;