import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import IceboxListItem from './iceboxListItem';

const styles = StyleSheet.create({
	gridList: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridListItem: {
  	backgroundColor: '#CCC',
    margin: 10,
    width: 100,
    height: 100
  }
})

class IceboxList extends Component {
	constructor(props){
		super(props);
		console.log('contents passed into IceboxList are : ',props.contents);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(props.contents)
		};
	}

	render(){
		return (
			<ListView
				contentContainerStyle={styles.gridList}
				dataSource={this.state.dataSource}
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
		);
	}
}


IceboxList.propTypes = {
	contents: React.PropTypes.array.isRequired,
};

export default IceboxList;
