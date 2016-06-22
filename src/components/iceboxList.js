import React from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import IceboxListItem from './iceboxListItem';

const IceboxList = ({ contents }) => (
	<View>
		<ListView
			dataSource={contents}
			renderRow={(item) => (
				<IceboxListItem
					key={item.key}
					item={item}
					name={item.name}
					foodGroup={item.foodGroup}
					expiration={item.expiration}
					iconPath={item.iconPath}
				/>
			)}
		/>
	</View>
);

IceboxList.propTypes = {
	contents: React.PropTypes.array.isRequired,
};

export default IceboxList;
