import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';
import IceboxListItem from './iceboxListItem';

const styles = StyleSheet.create({
	list: {

	}
})

class IceboxList extends Component {
	_renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
		return (
			<View
				key={`${sectionID}-${rowID}`}
				style={{
					height: adjacentRowHighlighted ? 4 : 1,
					backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
				}}
			/>
		);
	}

	render(){
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});

		return (
			<ListView
				contentContainerStyle={styles.list}
				dataSource={ds.cloneWithRows(this.props.contents)}
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
				renderSeparator={this._renderSeperator}
				initialListSize={15}
			/>
		);
	}
}


IceboxList.propTypes = {
	contents: React.PropTypes.array.isRequired,
};

export default IceboxList;

