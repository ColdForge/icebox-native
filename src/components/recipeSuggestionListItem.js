import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
	row: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#55C768',
		flexDirection: 'row'
	},
	image: {
		flex: 1,
		height: 125,
		width: 125,
		borderRadius: 10,
		alignSelf: 'center'
	},
	body: {
		flex: 2,
		flexDirection: 'column',
		alignSelf: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 18,
		color: 'black'
	},
	text: {
		textAlign: 'center',
		fontSize: 16,
		color: 'white'
	},
	button: {
		backgroundColor: '#FFFFFF',
		marginTop: 10,
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		alignSelf: 'center'
	},
	buttonText: {
		textAlign: 'center'
	}
})

const RecipeSuggestionListItem = ({ image, likes, recipe, title, chooseRecipe }) => (
	<View style={styles.row}>
	  <Image source={{uri : image}} style={styles.image} />
	  <View style={styles.body}>
		  <Text style={styles.title}>{title}</Text>
		  <Text style={styles.text}>
		    # Missing Ingredients: {recipe.missedIngredientCount}
		  </Text>
		  <Text style={styles.text}>
		    # Used Ingredients: {recipe.usedIngredientCount}
		  </Text>
		  <TouchableHighlight
		  	style={styles.button}
		  	onPress={chooseRecipe}
		  >
		  	<Text style={styles.buttonText}>Choose this recipe!</Text>
		  </TouchableHighlight>
		</View>
	</View>
);

RecipeSuggestionListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	chooseRecipe: React.PropTypes.func,
};

export default RecipeSuggestionListItem;
