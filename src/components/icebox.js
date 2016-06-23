import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  View
} from 'react-native';
import IceboxToolbar from '../containers/iceboxToolbar';
import VisibleIceboxList from '../containers/visibleIceboxList';
// import IceboxList from './iceboxList';

class Icebox extends Component {
  render() {
    return (
      <View style={styles.container}>
        <IceboxToolbar />
        <ScrollView>
          <VisibleIceboxList />
        </ScrollView>
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
  toolbar: {
    height: 44
  },
  contents: {
    flex: 1
  }
});

export default Icebox;