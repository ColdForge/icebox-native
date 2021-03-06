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
	container: {
		flex: 1,
	},
})

class RecipeList extends Component {
	constructor(props){
	  super(props);
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
				style={styles.container}
				dataSource={this.state.dataSource}
				enableEmptySections={true}
				renderRow={recipe => (
					<RecipeListItem
						key={recipe.id}
						recipe={recipe}
						title={recipe.title}
						imageUrl={recipe.image}
						sourceUrl={recipe.sourceUrl}
						servings={recipe.servings}
						readyInMinutes={recipe.readyInMinutes}
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
