import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Icebox from './icebox';
import Recipes from './recipes';
import * as actions from '../actions';
import { Actions } from "react-native-router-flux";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      suggestionsReceived: false,
      recipesReceived: false,
    };
  }
	componentDidMount() {
		if(this.props.suggestions.length === 0){
      console.log('suggestions in dashboard empty')
      this.props.getRecipeSuggestions();
    }
    if(this.props.recipes.length === 0){
      console.log('recipes in dashboard empty')
      this.props.getRecipes();
    }
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

const mapStateToProps = state => ({
  user: state.user,
  suggestions: state.recipes.suggestions,
  recipes: state.recipes.pastSuggestions,
  chosenRecipe: state.recipes.chosenRecipe,
});

export default connect(mapStateToProps, actions)(Dashboard);
