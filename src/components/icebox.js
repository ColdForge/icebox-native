import React, { Component } from 'react';
import {
  AsyncStorage,
  Modal,
  StyleSheet,
  Text,
  ListView,
  TabBarIOS,
  TouchableHighlight,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicatorIOS,
  View
} from 'react-native';
import IceboxToolbar from '../containers/iceboxToolbar';
import VisibleIceboxList from '../containers/visibleIceboxList';

class Icebox extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      isLoading: false,
      text: '',
      selectedTab: 'goodItems',
      goodItems: [],
      badItems: []
    }
    this._setModalVisible = this._setModalVisible.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.renderLists = this.renderLists.bind(this);
    this.renderGoodListHeader = this.renderGoodListHeader.bind(this);
    this.renderBadListHeader = this.renderBadListHeader.bind(this);
    this.renderListSeperator = this.renderListSeperator.bind(this);
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
          text: '',
          goodItems: response.recognizedItems,
          badItems: [...response.noExpirationItems, ...response.unrecognizedItems]
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

  renderListSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  renderGoodListHeader(){
    return (
      <View style={styles.goodListHeader}>
        <Text style={styles.goodListHeaderText}>
          Items added to your icebox:
        </Text>
      </View>
    );
  }

  renderBadListHeader(){
    return (
      <View style={styles.badListHeader}>
        <Text style={styles.badListHeaderText}>
          Items not added to your icebox:
        </Text>
      </View>
    );
  }

  renderLists(){
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return (
      <TabBarIOS
        tintColor="green"
        barTintColor="#83E291">
        <TabBarIOS.Item
          title="Recognized Items"
          selected={this.state.selectedTab === 'goodItems'}
          onPress={() => {this.setState({ selectedTab: 'goodItems' })}}
          renderAsOriginal
        >
          <View style={{flex: 1}}>
            <ListView
              style={styles.goodItemList}
              dataSource={ds.cloneWithRows(this.state.goodItems)}
              renderRow={(item) => (
                <Text style={styles.listItem}>{item.name}</Text>
              )}
              renderSeparator={this.renderListSeperator}
            />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Unrecognized Items"
          selected={this.state.selectedTab === 'badItems'}
          onPress={() => {this.setState({ selectedTab: 'badItems' })}}
        >
          <View style={{flex: 1}}>
            <ListView
              style={styles.badItemList}
              dataSource={ds.cloneWithRows(this.state.badItems)}
              renderRow={(item) => (
                <Text style={styles.listItem}>{item.name}</Text>
              )}
              renderSeparator={this.renderListSeperator}
            />
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );

    // if(this.state.goodItems.length > 0 && this.state.badItems.length > 0){
    //   return (
    //     <View style={{flex: 1}}>
    //       <ListView
    //         style={styles.goodItemList}
    //         dataSource={ds.cloneWithRows(this.state.goodItems)}
    //         renderRow={(item) => (
    //           <Text>Name: {item.name}, Food Group: {item.foodGroup}</Text>
    //         )}
    //         renderHeader={this.renderGoodListHeader}
    //         renderSeparator={this.renderListSeperator}
    //       />
    //       <ListView
    //         style={styles.badItemList}
    //         dataSource={ds.cloneWithRows(this.state.badItems)}
    //         renderRow={(item) => (
    //           <Text>Name: {item.name}</Text>
    //         )}
    //         renderHeader={this.renderBadListHeader}
    //         renderSeparator={this.renderListSeperator}
    //       />
    //     </View>
    //   );
    // } else if (this.state.goodItems.length > 0) {
    //   return (
    //     <View style={{flex: 1}}>
    //       <ListView
    //         style={styles.goodItemList}
    //         dataSource={ds.cloneWithRows(this.state.goodItems)}
    //         renderRow={(item) => (
    //           <Text>Name: {item.name}, Food Group: {item.foodGroup}</Text>
    //         )}
    //         renderHeader={this.renderGoodListHeader}
    //         renderSeparator={this.renderListSeperator}
    //       />
    //     </View>
    //   );
    // } else if (this.state.badItems.length > 0) {
    //   return (
    //     <View style={{flex: 1}}>
    //       <ListView
    //         style={styles.badItemList}
    //         dataSource={ds.cloneWithRows(this.state.badItems)}
    //         renderRow={(item) => (
    //           <Text>Name: {item.name}</Text>
    //         )}
    //         renderHeader={this.renderBadListHeader}
    //         renderSeparator={this.renderListSeperator}
    //       />
    //     </View>
    //   );
    // } 
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
              <Text style={{alignSelf: 'center', fontWeight: '800', color: '#83E291'}}>To enter items into your Icebox, follow these steps:</Text>
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
              {this.renderLists()}
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
    backgroundColor: 'white',
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
    color: '#83E291',
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
    backgroundColor: '#83E291',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    fontSize: 16
  },
  goodItemList: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  goodListHeader: {
    backgroundColor: 'grey',
  },
  goodListHeaderText: {
    fontWeight: '700',
  },
  badItemList: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalFooter: {
    backgroundColor: '#83E291',
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