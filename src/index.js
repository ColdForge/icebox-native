import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';
import {
	Scene,
	Reducer,
	Router,
	Switch,
	TabBar,
	Modal,
	Schema,
	Actions
} from 'react-native-router-flux'
import { Provider } from 'react-redux';
import configureStore from './state/configureStore';
const store = configureStore();

import Login from './containers/login';
import Signup from './containers/signup';
import Dashboard from './components/dashboard';
import Icebox from './components/icebox';
import Recipes from './components/recipes';

class iceboxNative extends Component {

  
  render(){
    return (
    	<Provider store={store}>
    		<Router>
    			<Scene key="root" hideNavBar hideTabBar>
    				<Scene key="login" component={Login} title="Login" />
    				<Scene key="signup" component={Signup} title="Sign Up" />
    				<Scene key="dashboard" component={Dashboard} title="Dashboard" />
    				<Scene key="icebox" component={Icebox} />
    				<Scene key="recipes" component={Recipes} />
    			</Scene>
    		</Router>
    	</Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigator: {
    flex: 8
  },
  appbar: {
  	flex: 0.3,
  	backgroundColor: '#9ED59E',
  	paddingTop: 30,
  	paddingBottom: 10
  }
});

export default iceboxNative;