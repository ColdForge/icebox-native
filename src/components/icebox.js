import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicatorIOS,
  View
} from 'react-native';
import IceboxToolbar from '../containers/iceboxToolbar';
import VisibleIceboxList from '../containers/visibleIceboxList';
// import IceboxList from './iceboxList';

class Icebox extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      isLoading: false,
      text: '',
      items: []
    }
    this._setModalVisible = this._setModalVisible.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  _setModalVisible(bool){
    this.setState({
      modalVisible: bool
    })
  }

  submitInput(){
    let itemString = this.state.text;
    this.setState({
      isLoading: true
    })
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        return token;
      } catch (error) {
        console.log('AsyncStorage getToken error: ', error.message);
      }
    }
    getToken().then(token => {
      // console.log('token from getToken is : ',token);
      fetch(`http://192.168.1.53:8080/api/icebox/native`, {
        method: 'POST',
        headers: {
          'authorization': token,
          'Accept'      : 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemString: itemString
        })
      })
      .then(rawResponse => rawResponse.json())
      .then(response => {
        console.log('response from post to icebox/native : ',response);
        this.setState({
          isLoading: false,
          text: ''
        })
      })
      .catch(error => {
        console.log('error on post to icebox/native : ',error);
        this.setState({
          isLoading: false,
          text: ''
        })
      });
    });
  }

  renderActivityIndicator(){
    if(this.props.isLoading){
      return (
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          size="large"
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'none'}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
        >
          <View style={styles.containerModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Adding Items</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={{alignSelf: 'center', fontWeight: '800', color: 'white'}}>To enter items into your Icebox, follow these steps:</Text>
              <Text style={styles.directionText}>1. Click on the input box below </Text>
              <Text style={styles.directionText}>2. Activate your Speech-to-Text by using the Microphone Icon on the Keyboard </Text>
              <Text style={styles.directionText}>3. Once you have input all of your items, click the submit button! </Text>
              <TextInput
                style={styles.itemInput}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <ActivityIndicatorIOS
                animating={this.state.isLoading}
                style={{marginTop: 40}}
                color="#111"
                size="large"></ActivityIndicatorIOS>
            </View>
            <View style={styles.modalFooter}>
              <TouchableHighlight
                style={styles.cancelButton}
                onPress={() => this._setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.submitButton}
                onPress={() => this.submitInput()}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.containerInner}>
          <IceboxToolbar openModal={this._setModalVisible.bind(this)}/>
          <ScrollView>
            <VisibleIceboxList />
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    backgroundColor: '#CFF09E',
    flex: 1
  },
  containerInner: {
    flex: 1
  },
  containerModal: {
    marginTop: 20,
    backgroundColor: '#83E291',
    flex: 1,
    flexDirection: 'column',
  },
  activity: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    height: 44
  },
  contents: {
    flex: 1
  },
  modalHeader: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
  },
  directionText: {
    fontWeight: '600',
    color: 'grey',
    marginLeft: 10,
    marginRight: 10,
  },
  itemInput: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    fontSize: 16
  },
  modalFooter: {
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  submitButton: {
    marginTop: 10,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 10,
    height: 60,
    width: 100,
    backgroundColor: 'green',
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700'
  },
  cancelButton: {
    marginTop: 10,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 10,
    height: 60,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700'
  },
});

export default Icebox;