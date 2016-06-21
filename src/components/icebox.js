import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Dashboard from './dashboard';

class Icebox extends Component {
	componentDidMount() {
		console.log('Icebox component rendered!')
	}

  render() {
    return (
      <View style={styles.container}>
        <Text>Icebox Component</Text>
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

export default Icebox;