// import { AsyncStorage } from 'react-native';
import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

import throttle from 'lodash/throttle';
import reducers from '../reducers';
// import { loadState, saveState } from './localStorage';
import { AUTHORIZE_USER } from '../constants/actions';

import DUMMY_ICEBOX from '../data/dummyFoodList';
import DUMMY_PAST_SUGGESTIONS from '../data/dummyRecipeList';

const configureStore = (testMode,state) => {
	// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  let persistedState = {
    icebox: { contents: DUMMY_ICEBOX, noExpirationItems: [], noFoodGroupItems: [] },
    recipes: { pastSuggestions: DUMMY_PAST_SUGGESTIONS, suggestions: [], chosenRecipe: null }
  };
  // return createStoreWithMiddleware(reducers,persistedState,devTools());
  const enhancer = compose(applyMiddleware(reduxThunk),devTools());
  const store = createStore(
    reducers,
    persistedState,
    enhancer
  );

  return store;
};

export default configureStore;