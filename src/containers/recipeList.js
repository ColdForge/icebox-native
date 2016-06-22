import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import RecipeListItem from '../components/recipeListItem';

const styles = StyleSheet.create({
	gridList: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridListItem: {
  	backgroundColor: '#CCC',
    margin: 10,
    width: 100,
    height: 100
  }
})

class RecipeList extends Component {
	constructor(props){
	  super(props);
	  console.log('recipes passed into IceboxList are : ',props.recipes);
	  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	    dataSource: ds.cloneWithRows(props.recipes)
	  };
	}

	render(){
		return (
			<ListView
				contentContainerStyle={styles.gridList}
				dataSource={this.state.dataSource}
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
			/>
		);
	}
}

// const RecipeList = ({ recipes }) => (
// 	<div style={styles.root}>
// 		<GridList
// 			className="icebox-list"
// 			cellHeight={400}
// 			style={styles.gridlist}
// 			cols={3}
// 		>
// 			{recipes.map()}
// 		</GridList>
// 	</div>
// );

RecipeList.propTypes = {
	recipes: React.PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	recipes: state.recipes.pastSuggestions,
});

export default connect(mapStateToProps)(RecipeList);
