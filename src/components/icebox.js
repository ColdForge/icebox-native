import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import IceboxToolbar from '../containers/iceboxToolbar';
import VisibleIceboxList from '../containers/visibleIceboxList';

const Icebox = ({ routeToInput }) => (
  <View style={styles.container}>
    <IceboxToolbar routeToInput={routeToInput} />
    <VisibleIceboxList />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default Icebox;