import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

const styles = StyleSheet.create({
	row: {
		height: 40,
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
	body1: {
		flex: 2,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'column',
		alignSelf: 'center'
	},
	body2: {
		flex: 1,
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
  redRow: {
    backgroundColor: '#ffa5a5',
    height: 40,
    flexDirection: 'row'
  },
  orangeRow: {
    backgroundColor: '#ffb477',
    height: 40,
    flexDirection: 'row'
  },
  greenRow: {
    backgroundColor: '#88D795',
    height: 40,
    flexDirection: 'row'
  },
	redItem: {
		color: '#EA0B0B',
		fontWeight: '700',
		textAlign: 'center',
		fontSize: 14
	},
	orangeItem: {
		color: '#FF5A37',
		fontWeight: '700',
		textAlign: 'center',
		fontSize: 14
	},
	normalItem: {
		color: '#000000',
		fontWeight: '400',
		textAlign: 'center',
		fontSize: 14
	},
	fgIcon: {
		width: 24,
		height: 24
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

  const applyRowStyling = (expiration) => {
    if (expiration <= 3) {
      return styles.redRow;
    }
    if (expiration > 3 && expiration <= 6) {
      return styles.orangeRow;
    }
    if (expiration >= 7) {
      return styles.greenRow;
    }
  }

  const rowStyle = applyRowStyling(expiration);

	return (
		<View style={applyRowStyling(expiration)}>
			<View style={styles.imageContainer}>
				<Image style={styles.fgIcon} source={iconsMap[foodGroup]} />
			</View>
			<View style={styles.body1}>
				<Text style={styles.title}>{name}</Text>
			</View>
			<View style={styles.body2}>
				<Text style={applyStyling(expiration)}>{expiration} day(s)</Text>
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
