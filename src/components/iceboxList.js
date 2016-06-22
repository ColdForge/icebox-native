import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import IceboxListItem from './iceboxListItem';

const IceboxList = ({ contents }) => (
	<View>
		<List className="icebox-list">
			{contents.map(item => (
				<IceboxListItem
					key={item.key}
					item={item}
					name={item.name}
					foodGroup={item.foodGroup}
					expiration={item.expiration}
					iconPath={item.iconPath}
				/>
			))}
		</List>
	</View>
);

IceboxList.propTypes = {
	contents: React.PropTypes.array.isRequired,
};

export default IceboxList;
