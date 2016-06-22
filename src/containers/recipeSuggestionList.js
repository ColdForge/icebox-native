import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RecipeSuggestionListItem from '../components/recipeSuggestionListItem';

const styles = StyleSheet.create({
  list: {
    marginTop: 64,
    flex: 1
  }
})

class RecipeSuggestionList extends Component {
  constructor(props){
    super(props);
    console.log('suggestions passed into RecipeSuggestionList are : ',props.suggestions);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.suggestions)
    };
    this.handleRecipeChoice = this.handleRecipeChoice.bind(this);
  }

  componentWillMount() {
    if (this.props.suggestions.length === 0) {
      console.log('suggestions is empty in RecipeSuggestionList')
      this.props.getRecipeSuggestions();
    } 
  }

  handleRecipeChoice(recipe) {
    // if user has not currently set a chosen recipe
    if(!this.props.chosenRecipe){
      this.props.chooseRecipe({ recipe });
    } else {
      alert('You have already selected a recipe!');
    }
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={suggestion => (
          <RecipeSuggestionListItem
            key={suggestion.key}
            recipe={suggestion}
            image={suggestion.image}
            likes={suggestion.likes}
            title={suggestion.title}
            chooseRecipe={this.handleRecipeChoice.bind(this,suggestion)}
          />
        )}
      />
    );
  }
}

RecipeSuggestionList.propTypes = {
  suggestions: React.PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  suggestions: state.recipes.suggestions,
  chosenRecipe: state.recipes.chosenRecipe,
});

export default connect(mapStateToProps, actions)(RecipeSuggestionList);

