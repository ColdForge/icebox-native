import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {
  MKButton,
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';

const theme = getTheme();

class RecipeSuggestionListItem extends Component {
	render(){
		return (
			<View style={theme.cardStyle}>
			  <Image source={{uri : 'https://static.pexels.com/photos/41123/pexels-photo-41123.jpeg'}} style={theme.cardImageStyle} />
			  <Text style={theme.cardTitleStyle}>{recipe}</Text>
			  <Text style={theme.cardContentStyle}>
			    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			    Mauris sagittis pellentesque lacus eleifend lacinia...
			  </Text>
			  <View style={theme.cardMenuStyle}>{recipe}</View>
			  <Text style={theme.cardActionStyle}>My Action</Text>
			</View>
		);
	}
}

// const RecipeSuggestionListItem = ({ recipe, chooseRecipe }) => (
// 	<Card>
// 		<CardHeader
// 			title={recipe.title}
// 			subtitle="Subtitle"
// 			actAsExpander
// 			showExpandableButton
// 		/>
// 		<CardText expandable>
// 			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 			Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
// 			Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
// 			Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
// 		</CardText>
// 		<CardActions expandable>
// 			<FlatButton label="Choose this recipe!" onTouchTap={chooseRecipe} />
// 		</CardActions>
// 	</Card>
// );

RecipeSuggestionListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	chooseRecipe: React.PropTypes.func,
};

export default RecipeSuggestionListItem;
