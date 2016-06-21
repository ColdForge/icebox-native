import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Icebox from './icebox';
import Recipes from './recipes';
import { Actions } from "react-native-router-flux";

class Dashboard extends Component {
	componentDidMount() {
		console.log('Dashboard rendered!')
	}

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
            style={styles.iceboxButton}
            onPress={Actions.icebox}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>My Icebox</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={styles.recipesButton}
            onPress={Actions.recipes}
            underlayColor="#E39EBF">
              <Text style={styles.buttonText}>My Recipes</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iceboxButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#CFF09E',
    flex: 1
  },
  recipesButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#A8DBA8',
    flex: 1
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  }
});

export default Dashboard;