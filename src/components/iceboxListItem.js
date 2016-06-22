import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

const styles = {
	ListItem: {
		color: '#000000'
	},
};

const IceboxListItem = ({ name, foodGroup, iconPath, expiration }) => {
	// if (!name) {
	// 	return <ListItem primaryText="Loading..." />;
	// }

	let textColor = 'expiration-black';

	if (expiration <= 3) {
		textColor = 'expiration-red';
	}
	if (expiration > 3 && expiration <= 6) {
		textColor = 'expiration-orange';
	}
	if (expiration > 7) {
		textColor = 'expiration-black';
	}

	return (
		<View
			className="iceboxListItem"
			style={styles.ListItem}
		>
			<View>
				<Image height="24" width="24" alt="Food Group" src={iconPath} />
				<View>
					<Text>{name}</Text>
				</View>
				<View className={textColor}>
					<Text>{expiration}</Text>
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
