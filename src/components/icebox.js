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
    <View style={styles.containerInner}>
      <IceboxToolbar routeToInput={routeToInput} />
      <ScrollView contentContainerStyle={styles.list}>
        <VisibleIceboxList />
      </ScrollView>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerInner: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    flex: 1
  }
});

export default Icebox;