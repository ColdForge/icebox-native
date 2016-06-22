import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sortByReducer from './sortByReducer';
import sortOrderReducer from './sortOrderReducer';
import iceboxReducer from './iceboxReducer';
import iceboxSearchReducer from './iceboxSearchReducer';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	sortBy: sortByReducer,
	sortOrder: sortOrderReducer,
	icebox: iceboxReducer,
	iceboxSearch: iceboxSearchReducer,
	user: userReducer,
	recipes: recipesReducer,
});

export default rootReducer;
