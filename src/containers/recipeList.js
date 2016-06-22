import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import RecipeListItem from '../components/recipeListItem';

const styles = StyleSheet.create({
	list: {
	  marginTop: 64,
	  marginBottom: 50
	}
})

class RecipeList extends Component {
	constructor(props){
	  super(props);
	  console.log('recipes passed into RecipeList are : ',props.recipes);
	  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	    dataSource: ds.cloneWithRows(props.recipes)
	  };
	}

	_renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
		return (
			<View
				key={`${sectionID}-${rowID}`}
				style={{
					height: adjacentRowHighlighted ? 4 : 1,
					backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
				}}
			/>
		);
	}

	render(){
		return (
			<ListView
				contentContainerStyle={styles.list}
				dataSource={this.state.dataSource}
				enableEmptySections={true}
				renderRow={recipe => (
					<RecipeListItem
						key={recipe.key}
						name={recipe.name}
						imageUrl={recipe.image}
						sourceUrl={recipe.sourceUrl}
						recipeID={recipe.recipeID}
						prepTime={recipe.readyInMinutes}
					/>
				)}
				renderSeparator={this._renderSeperator}
			/>
		);
	}
}

RecipeList.propTypes = {
	recipes: React.PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	recipes: state.recipes.pastSuggestions,
});

export default connect(mapStateToProps)(RecipeList);
