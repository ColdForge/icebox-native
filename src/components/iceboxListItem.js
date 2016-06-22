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
	},
	redItem: {
		color: '#EA0B0B',
		fontWeight: '700'
	},
	orangeItem: {
		color: '#FF5A37',
		fontWeight: '700'
	},
	normalItem: {
		color: '#1FCA08',
		fontWeight: '700'
	},
	fgIcon: {
		width: 48,
		height: 48
	}
});

const iconsMap = { 
	'fruit': require('../../assets/fruit.png'),
	'vegetables': require('../../assets/vegetables.png'),
	'dairy': require('../../assets/dairy.png'),
	'meats': require('../../assets/meats.png'),
	'poultry': require('../../assets/poultry.png'),
	'pork': require('../../assets/pork.png'),
	'beef': require('../../assets/beef.png'),
	'seafood': require('../../assets/seafood.png'),
	'grains': require('../../assets/grains.png'),
	'sauces': require('../../assets/sauces.png'),
	'legumes': require('../../assets/legumes.png'),
	'sweets': require('../../assets/sweets.png'),
	'snacks': require('../../assets/snacks.png'),
	'oils': require('../../assets/oils.png'),
	'beverages': require('../../assets/beverages.png'),
	'lamb': require('../../assets/lamb.png'),
	'nuts': require('../../assets/nuts.png'),
	'sides': require('../../assets/sides.png'),
	'default': require('../../assets/snacks.png')
}

const IceboxListItem = ({ styling, name, foodGroup, iconPath, expiration }) => {
	foodGroup = foodGroup.toLowerCase();

	const applyStyling = (expiration) => {
		if (expiration <= 3) {
			return styles.redItem;
		}
		if (expiration > 3 && expiration <= 6) {
			return styles.orangeItem;
		}
		if (expiration >= 7) {
			return styles.normalItem;
		}
	}

	return (
		<View style={styles.gridListItem}>
			<View>
				<Image style={styles.fgIcon} source={iconsMap[foodGroup]} />
				<View>
					<Text>{name}</Text>
				</View>
				<View>
					<Text style={applyStyling(expiration)}>{expiration} days</Text>
				</View>
			</View>
		</View>
	);
};

IceboxListItem.propTypes = {
	name: React.PropTypes.string.isRequired,
	foodGroup: React.PropTypes.string.isRequired,
	iconPath: React.PropTypes.string.isRequired,
	expiration: React.PropTypes.number.isRequired,
};

export default IceboxListItem;
