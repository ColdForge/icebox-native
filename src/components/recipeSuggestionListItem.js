import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Linking,
  AlertIOS
} from 'react-native';

const styles = StyleSheet.create({
	row: {
		flex: 1,
		backgroundColor: '#55C768',
		flexDirection: 'row'
	},
	imageContainer: {
		marginTop: 1,
		marginBottom: 1,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	},
	image: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
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
	linkButton: {
		backgroundColor: '#EEFABC',
		marginTop: 10,
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		alignSelf: 'center'
	},
	button: {
		backgroundColor: '#F14A2A',
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

const RecipeSuggestionListItem = ({ image, likes, recipe, title, chooseRecipe }) => {
	const recipeUrl = image.replace('recipeImages/','').replace('.jpg','');
	const handleChoice = () => {
		AlertIOS.alert(
			'Choose this recipe?',
			'You won\'t be able to change your choice!',
			[
			  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'OK', onPress: () => chooseRecipe({ recipe }), style: 'default'},
			]
		);
	}
	return (
		<View style={styles.row}>
			<View style={styles.imageContainer}>
				<Image source={{uri : image}} style={styles.image} />
			</View>
		  <View style={styles.body}>
			  <Text style={styles.title}>{title}</Text>
			  <Text style={styles.text}>
			    # Missing Ingredients: {recipe.missedIngredientCount}
			  </Text>
			  <Text style={styles.text}>
			    # Used Ingredients: {recipe.usedIngredientCount}
			  </Text>
			  <TouchableHighlight
			  	style={styles.linkButton}
			  	onPress={() => Linking.openURL(recipeUrl)}
			  >
			  	<Text style={styles.buttonText}>Recipe Information</Text>
			  </TouchableHighlight>
			  <TouchableHighlight
			  	style={styles.button}
			  	onPress={handleChoice}
			  >
			  	<Text style={styles.buttonText}>Choose this recipe!</Text>
			  </TouchableHighlight>
			</View>
		</View>
	);
};

RecipeSuggestionListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	chooseRecipe: React.PropTypes.func,
};

export default RecipeSuggestionListItem;
