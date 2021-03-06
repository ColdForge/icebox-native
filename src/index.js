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
import {
	MKButton,
	MKColor
} from 'react-native-material-kit';
import { Provider } from 'react-redux';
import configureStore from './state/configureStore';
const store = configureStore();

import Login from './containers/login';
import Signup from './containers/signup';
import Dashboard from './components/dashboard';
// import Scanner from './containers/scanner';
// import Icebox from './components/icebox';
// import Recipes from './components/recipes';
// import RecipeSuggestionList from './containers/recipeSuggestionList';
// import RecipeList from './containers/recipeList';
// import Drawer from './containers/drawer';
// import FoodInput from './containers/foodInput';

class iceboxNative extends Component {
  render(){
    return (
    	<Provider store={store}>
    		<Router>
    			<Scene key="root" hideNavBar hideTabBar>
    				<Scene key="login" component={Login} title="Login" />
    				<Scene key="signup" component={Signup} title="Sign Up" />
    				<Scene key="dashboard" component={Dashboard} title="Icebox" />
		      </Scene>
    		</Router>
    	</Provider>
    );
  }
}

// <Scene key="scanner" hideNavBar={false} component={Scanner}  />
// <Scene key="icebox" hideNavBar={false} component={Icebox}  />
// <Scene key="recipes" tabs={true} hideNavBar={false} component={Recipes}  />
// <Scene key="recipeSuggestions" hideNavBar={false} component={RecipeSuggestionList}  />
// <Scene key="foodInput" hideNavBar={false} component={FoodInput}  />
// <Scene key="pastSuggestions" hideNavBar={false} component={RecipeList}  />

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
  	// paddingTop: 30,
  	paddingBottom: 10
  },
  back: {
  	width: 80,
  	height: 37,
  	position: "absolute",
  	bottom: 4,
  	right: 2,
  	padding: 8
  }
});

export default iceboxNative;