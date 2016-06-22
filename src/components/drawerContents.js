import React, { Component } from 'react';
import {
	View,
	TouchableHighlight,
	Text
} from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class SideDrawerContent extends Component {
	render() {
		const { drawer } = this.context
		return (
			<View>
				<TouchableHighlight
					onPress={() => { drawer.close(); Actions.dashboard() }}
				>
					<Text>Dashboard</Text>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() => { drawer.close(); Actions.icebox() }}
				>
					<Text>Icebox</Text>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() => { drawer.close(); Actions.recipes() }}
				>
					<Text>Recipes</Text>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() => { Actions.login() }}
				>
					<Text>Logout</Text>
				</TouchableHighlight>
			</View>
		)
	}
}
