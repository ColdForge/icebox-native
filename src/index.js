import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';
import Login from './containers/login';
// import AppBar from 'material-ui-native/lib/app-bar';

class iceboxNative extends Component {
	componentDidMount(){
		console.log('iceboxNative rendered in src/index!')
	}

	configureScene(route, routeStack){
	   return Navigator.SceneConfigs.PushFromRight 
	}

  renderScene(route, navigator){
    return <route.component navigator={navigator} {...route.passProps} />
  }

  handleBackAction(){

  }
  
  render(){
    return (
    	<View style={styles.container}>
    		<View style={styles.appbar}>
    			
    		</View>
    		<View style={styles.navigator}>
    			<Navigator
    				configureScene={this.configureScene}
    			  style={styles.container}
    			  renderScene={this.renderScene}
    			  initialRoute={{ component: Login }}
    			/>
    		</View>
    	</View>
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