import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import { Actions } from "react-native-router-flux";
import SearchBar from 'react-native-search-bar';

const styles = StyleSheet.create({
	toolbar: {
		height: 74,
	},
	button: {
		height: 30,
		backgroundColor: 'green',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		color: 'white',
		fontWeight: '700'
	}
});

class IceboxToolbar extends Component {
	constructor(props){
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		// this.props.submitFoods = this.props.submitFoods.bind(this);
	}

	handleSearch(e){
		console.log('handleSearch called in IceboxToolbar with e of : ',e);
		this.props.setIceboxSearch(e);
	}

	handleCancel(){
		this.props.clearIceboxSearch();
	}

	changeSortDirection(){
		this.props.sortOrder === ASCENDING ? this.props.setSortOrder(DESCENDING) : this.props.setSortOrder(ASCENDING);
	}

	handleFilterChange(event, value) {
		this.props.setSortBy(value)
	}

  // trying to call this method, which comes from props
	submitFoods(foodItems) {
		this.props.addIceboxItems({ foodItems });
		console.log('Submit foods is firing', foodItems);
	}

	render() {
		return (
			<View style={styles.toolbar}>
				<SearchBar
					ref='searchBar'
					placeholder='Search for items'
					onChangeText={this.handleSearch}
					onCancelButtonPress={this.handleCancel}
				/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.props.routeToInput}
				>
					<Text style={styles.buttonText}>Add Items</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return { sortBy: state.sortBy, sortOrder: state.sortOrder, iceboxSearch: state.iceboxSearch };
}

export default connect(mapStateToProps, actions)(IceboxToolbar);
