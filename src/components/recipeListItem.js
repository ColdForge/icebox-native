import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

const styles = StyleSheet.create({
	gridListItem: {
		backgroundColor: '#CCC',
	  margin: 10,
	  width: 100,
	  height: 100
	}
});

const RecipeListItem = ({ name, imageUrl, sourceUrl, recipeID, prepTime }) => (
	<View style={styles.gridListItem}>
		<View>
			<Image source={{uri: imageUrl}} />
			<View>
				<Text>{name}</Text>
			</View>
			<View>
				<Text>Prep Time: ${prepTime}min, Recipe ID: ${recipeID}</Text>
			</View>
		</View>
	</View>
);

RecipeListItem.propTypes = {
	name: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
	sourceUrl: React.PropTypes.string.isRequired,
	recipeID: React.PropTypes.number.isRequired,
	prepTime: React.PropTypes.number.isRequired,
};

export default RecipeListItem;
