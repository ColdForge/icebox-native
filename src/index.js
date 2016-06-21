import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';
import Login from './containers/login';


class iceboxNative extends Component {
	componentDidMount() {
		console.log('iceboxNative rendered in src/index!')
	}

  renderScene(route, navigator) {
    return <route.component navigator={navigator} {...route.passProps} />
  }
  
  render() {
    return (
      <Navigator
        style={ styles.container }
        renderScene={ this.renderScene }
        initialRoute={{ component: Login }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  }
});

export default iceboxNative;