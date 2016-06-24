'use strict';
import React, { Component } from 'react';
import {
	AppRegistry,
	Dimensions,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';

const SEARCHUPC = "6955E58E-D33A-4531-94FA-A6BABD3AA407";

class Scanner extends Component {
	constructor(props){
		super(props);

		this.handleBarcode = this.handleBarcode.bind(this);
		this.takePicture = this.takePicture.bind(this);
	}

	render(){
		return (
			<View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.handleBarcode}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
        </Camera>
      </View>
		);
	}

	handleBarcode(data){
		console.log('handleBarcode fired in scanner!');
		console.log('data in handleBarcode is : ',data);
		const code = data.data;
		fetch(`http://www.searchupc.com/handlers/upcsearch.ashx?request_type=3&access_token=${SEARCHUPC}&upc=${code}`)
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('response from handleBarcode is : ',response);
			})
			.catch(error => {
				console.log('error from handleBarcode is : ',error);
			})
	}

	takePicture() {
	  this.camera.capture()
	    .then((data) => console.log(data))
	    .catch(err => console.error(err));
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default Scanner;

/*
			<Camera
        ref="cam"
        style={styles.container}
        onBarCodeRead={this._onBarCodeRead}
        type={this.state.cameraType}
      >
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js{'\n'}
          Press Cmd+R to reload
        </Text>
        <TouchableHighlight onPress={this._switchCamera}>
          <Text>The old switcheroo</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._takePicture}>
          <Text>Take Picture</Text>
        </TouchableHighlight>
      </Camera>
*/

// const mapStateToProps = state => ({
// 	recipes: state.recipes.pastSuggestions,
// });

// export default connect(mapStateToProps)(Scanner);
