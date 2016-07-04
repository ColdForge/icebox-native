import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Linking
} from 'react-native';

const styles = StyleSheet.create({
	row: {
		height: 200,
		backgroundColor: '#55C768',
		flexDirection: 'row'
	},
	imageContainer: {
		marginTop: 1,
		marginBottom: 1,
		flex: 1.5,
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
		paddingLeft: 10,
		paddingRight: 10,
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
		fontSize: 14,
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
		marginBottom: 10,
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
});

const RecipeListItem = ({ recipe, title, imageUrl, sourceUrl, readyInMinutes, servings }) => {
	
	return (
		<View style={styles.row}>
			<View style={styles.body}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.text}>
				  Prep Time: {readyInMinutes} min
				</Text>
				<TouchableHighlight
					style={styles.linkButton}
					onPress={() => Linking.openURL(sourceUrl)}
				>
					<Text style={styles.buttonText}>Recipe Information</Text>
				</TouchableHighlight>
			</View>
			<View style={styles.imageContainer}>
				<Image source={{uri : imageUrl}} style={styles.image} />
			</View>
		</View>
	);
};

RecipeListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	title: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
	sourceUrl: React.PropTypes.string.isRequired,
	servings: React.PropTypes.number.isRequired,
	readyInMinutes: React.PropTypes.number.isRequired,
};

export default RecipeListItem;
