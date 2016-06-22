import { AsyncStorage } from 'react-native';
import SimpleStore from 'react-native-simple-store';

export const loadState = () => {
  AsyncStorage.getItem('state', (err,result) => {
    if (result === null) {
      return undefined;
    }
    if(err){
      return undefined;
    }
    return JSON.parse(result);
  });
};

export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  AsyncStorage.setItem('state', serializedState, (err) => {
    console.log('saveState error of : ',err);
  });
};