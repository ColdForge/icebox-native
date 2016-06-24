import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
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

	signupWithFacebook(){
		console.log('Facebook login used!')
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
				</View>
				<View style={styles.inputs}>
					<GiftedForm
		        formName='signupForm' // GiftedForm instances that use the same name will also share the same states

		        openModal={(route) => {
		          console.log('route in openModal is : ',route);
		          // navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
		        }}

		        clearOnClose={false} // delete the values of the form when unmounted

		        defaults={{
		          /*
		          username: 'Farid',
		          'gender{M}': true,
		          password: 'abcdefg',
		          country: 'FR',
		          birthday: new Date(((new Date()).getFullYear() - 18)+''),
		          */
		        }}

		        validators={{
		          fullName: {
		            title: 'Full name',
		            validate: [{
		              validator: 'isLength',
		              arguments: [1, 23],
		              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
		            }]
		          },
		          username: {
		            title: 'Username',
		            validate: [{
		              validator: 'isLength',
		              arguments: [3, 16],
		              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
		            },{
		              validator: 'matches',
		              arguments: /^[a-zA-Z0-9]*$/,
		              message: '{TITLE} can contains only alphanumeric characters'
		            }]
		          },
		          password: {
		            title: 'Password',
		            validate: [{
		              validator: 'isLength',
		              arguments: [6, 16],
		              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
		            }]
		          },
		          emailAddress: {
		            title: 'Email address',
		            validate: [{
		              validator: 'isLength',
		              arguments: [6, 255],
		            },{
		              validator: 'isEmail',
		            }]
		          },
		          country: {
		            title: 'Country',
		            validate: [{
		              validator: 'isLength',
		              arguments: [2],
		              message: '{TITLE} is required'
		            }]
		          },
		        }}
		      >

		        <GiftedForm.SeparatorWidget />
		        <GiftedForm.TextInputWidget
		          name='emailAddress' // mandatory
		          title='Email address'
		          placeholder='example@nomads.ly'

		          keyboardType='email-address'

		          clearButtonMode='while-editing'

		        />

		        <GiftedForm.TextInputWidget
		          name='fullName' // mandatory
		          title='Full name'


		          placeholder='Marco Polo'
		          clearButtonMode='while-editing'
		        />

		        <GiftedForm.TextInputWidget
		          name='password' // mandatory
		          title='Password'

		          placeholder='******'


		          clearButtonMode='while-editing'
		          secureTextEntry={true}
		        />
		        <GiftedForm.SeparatorWidget />

		        <GiftedForm.SubmitWidget
		          title='Sign up'
		          widgetStyles={{
		            submitButton: {
		              backgroundColor: '#F24F26',
		            }
		          }}
		          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
		            if (isValid === true) {
		              // prepare object
		              values.gender = values.gender[0];
		              values.birthday = moment(values.birthday).format('YYYY-MM-DD');

		              /* Implement the request to your server using values variable
		              ** then you can do:
		              ** postSubmit(); // disable the loader
		              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
		              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
		              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
		              */
		            }
		          }}

		        />
		        <View style={{marginLeft: 10, marginRight: 10}}>
      		    <Icon.Button
      		    	name="facebook"
      		    	backgroundColor="#3b5998"
      		    	style={styles.facebookButton}
      		    	borderRadius={0}
      		    	onPress={this.signupWithFacebook}
      		    >
      		        <Text style={styles.whiteFont}>Signup with Facebook</Text>
      	      </Icon.Button>
		        </View>
		      </GiftedForm>
	        <TouchableHighlight
	        	style={styles.signup}
	        	onPress={Actions.pop}
	        >
	            <Text style={styles.greyFont}>Already have an account?<Text style={styles.orangeFont}>  Login!</Text></Text>
	        </TouchableHighlight>
		    </View>
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
		backgroundColor: '#F24F26',
		padding: 20,
		alignItems: 'center'
	},
	facebookButton: {
		marginLeft: 10,
		marginRight: 10,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	signup: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: .15
	},
	inputs: {
		marginTop: 10,
		marginBottom: 10,
		flex: .5
	},
	inputPassword: {
		marginLeft: 15,
		width: 20,
		height: 21
	},
	inputEmail: {
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
    fontSize: 16,
    fontWeight: '500',
	},
	forgotContainer: {
	  alignItems: 'flex-end',
	  padding: 15,
	},
	greyFont: {
	  color: '#D8D8D8',
	  fontSize: 14,
	  fontWeight: '700',
	},
	blackFont: {
	  color: '#000'
	},
	whiteFont: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: '700',
	},
	orangeFont: {
		color: '#F24F26',
		fontWeight: '800',
		fontSize: 16,
	},
	pinkFont: {
		color: '#FF3366',
		fontWeight: 'bold'
	}
})

export default Signup;