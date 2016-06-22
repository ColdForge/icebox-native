import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from "react-native-router-flux";

const windowSize = Dimensions.get('window');

class Signup extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	handleSubmit(){
		Actions.dashboard();
	}

	handleUsernameInput(e){
		console.log('handleUsernameInput e.nativeEvent.text is : ',e.nativeEvent.text)
		this.setState({
			username: e.nativeEvent.text
		})
	}

	handlePasswordInput(e){
		console.log('handlePasswordInput e.nativeEvent.text is : ',e.nativeEvent.text)
		this.setState({
			password: e.nativeEvent.text
		})
	}

	render(){
		return (
			<View style={styles.container}>
			    <Image style={styles.bg} source={require('../../assets/bg.jpeg')} />
			    <View style={styles.header}>
			        <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
			    </View>
			    <View style={styles.inputs}>
			        <View style={styles.inputContainer}>
			            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
			            <TextInput 
			                style={[styles.input, styles.pinkFont]}
			                placeholder="Email"
			                placeholderTextColor="#FFF"
			                value={this.state.username}
			                onChange={this.handleUsernameInput.bind(this)}
			            />
			        </View>
			        <View style={styles.inputContainer}>
			            <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
			            <TextInput
			                password={true}
			                style={[styles.input, styles.pinkFont]}
			                placeholder="Password"
			                placeholderTextColor="#FFF"
			                value={this.state.password}
			                onChange={this.handlePasswordInput.bind(this)}
			            />
			        </View>
			        <View style={styles.forgotContainer}>
			            <Text style={styles.greyFont}>Forgot Password</Text>
			        </View>
			    </View>
			    <TouchableHighlight
			    	style={styles.signin}
			    	onPress={this.handleSubmit.bind(this)}
			    	underlayColor="white"
			    >
			    	<Text style={styles.blackFont}>Sign Up</Text>
			    </TouchableHighlight>
			    <TouchableHighlight
			    	style={styles.signup}
			    	onPress={Actions.login}
			    >
			        <Text style={styles.greyFont}>Have an account?<Text style={styles.whiteFont}>  Login</Text></Text>
			    </TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'transparent'
	},
	bg: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: windowSize.width,
		height: windowSize.height
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: .5,
		backgroundColor: 'transparent'
	},
	mark: {
		width: 150,
		height: 150
	},
	signin: {
		backgroundColor: '#FFFFFF',
		padding: 20,
		alignItems: 'center'
	},
	signup: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: .15
	},
	inputs: {
		marginTop: 10,
		marginBottom: 10,
		flex: .25
	},
	inputPassword: {
		marginLeft: 15,
		width: 20,
		height: 21
	},
	inputUsername: {
		marginLeft: 15,
		width: 20,
		height: 20
	},
	inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
	},
	input: {
	    position: 'absolute',
	    left: 61,
	    top: 12,
	    right: 0,
	    height: 20,
	    fontSize: 14
	},
	forgotContainer: {
	  alignItems: 'flex-end',
	  padding: 15,
	},
	greyFont: {
	  color: '#D8D8D8'
	},
	blackFont: {
	  color: '#000'
	},
	pinkFont: {
		color: '#FF3366',
		fontWeight: 'bold'
	}
})

export default Signup;