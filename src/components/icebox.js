import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
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
        <VisibleIceboxList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64
  }
});

export default Icebox;