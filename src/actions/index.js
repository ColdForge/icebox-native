// Actions will go here
import { AsyncStorage, AlertIOS } from 'react-native';
import * as TYPES from '../constants/actions';
import { Actions } from "react-native-router-flux";

const API_URL = 'http://localhost:8080';

const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		return token;
	} catch (error) {
		console.log('AsyncStorage getToken error: ', error.message);
	}
}

const setToken = async (token) => {
	try {
		await AsyncStorage.setItem('token', token);
	} catch (error) {
		console.log('AsyncStorage getToken error: ', error.message);
	}
}

const removeToken = async () => {
	try {
	  await AsyncStorage.removeItem('token');
	  AlertIOS.alert("Logout Success!")
	} catch (error) {
	  console.log('AsyncStorage error: ' + error.message);
	}
}

export const authError = (error) => ({
	type: TYPES.AUTHORIZE_ERROR,
	payload: error,
});

export const signinUser = ({ email, password }) => (
	(dispatch) => {
		console.log('signinUser action called with email: ',email,' password: ',password);
		fetch(`${API_URL}/user/signin`, {
			method: 'POST',
			headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(rawResponse => {
			console.log('rawResponse is : ',rawResponse)
			return rawResponse.json();
		})
		.then(response => {
			console.log('response is : ',response);
			setToken(response.token);
			dispatch({ type: TYPES.AUTHORIZE_USER });
			dispatch({ type: TYPES.GET_USER_INFO, payload: response });
			dispatch({ type: TYPES.POPULATE_ICEBOX, payload: response.contents });
			Actions.dashboard();
		})
		.catch(error => {
			console.log('error on signinUser fetch of : ',error);
			dispatch(authError(error));
		});
	}
);

export const signupUser = ({ email, name, password }) => (
	(dispatch) => {
		axios.post(`${API_URL}/user/signup`, { email, name, password })
			.then(response => {
				dispatch({ type: TYPES.AUTHORIZE_USER });
				dispatch({ type: TYPES.GET_USER_INFO, payload: response.data });
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/icebox');
			})
			.catch(response => {
				// console.log('error in signup user, response of : ',response);
				dispatch(authError(response.data.error));
			});
	}
);

export const signoutUser = () => {
	localStorage.removeItem('token');
	browserHistory.push('/');
	return dispatch => {
		dispatch({ type: TYPES.DEAUTHORIZE_USER });
		dispatch({ type: TYPES.CLEAR_USER_INFO });
	};
};

export const setSortBy = (sort) => ({
	type: TYPES.SET_SORT,
	sort,
});

export const setSortOrder = (order) => ({
	type: TYPES.SET_SORT_ORDER,
	order,
});

export const setIceboxSearch = (searchTerm) => ({
	type: TYPES.SET_ICEBOX_SEARCH,
	searchTerm,
});

export const clearIceboxSearch = () => ({
	type: TYPES.CLEAR_ICEBOX_SEARCH,
});

export const addIceboxItems = ({ foodItems }) => (
	(dispatch) => {
		console.log('foodItems in addIceboxItems is : ', foodItems);
		axios.post(`${API_URL}/api/icebox`, { foodItems }, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				console.log('good response from addIceboxItems is : ', response);
				dispatch({ type: TYPES.ADD_ITEMS, payload: response.data.recognizedItems });
				dispatch({
					type: TYPES.CLARIFY_ITEMS,
					noExpirationItems: response.data.noExpirationItems,
					unrecognizedItems: response.data.unrecognizedItems,
				});
			})
			.catch(response => {
				console.log('bad response from addIceboxItems is : ', response);
				// dispatch({ type: TYPES.ICEBOX_ERROR, payload: response.data });
			});
	}
);

export const getRecipes = () => (
	(dispatch) => {
		axios.get(`${API_URL}/api/icebox/pastRecipes`, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				dispatch({ type: TYPES.GET_RECIPES, payload: response.data });
			})
			.catch(response => (
				response
				// console.log('error in chooseRecipe, response of : ',response);
			));
	}
);

export const getRecipeSuggestions = () => (
	(dispatch) => {
		axios.get(`${API_URL}/api/icebox/recipes`, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				// console.log('response from getRecipeSuggestions is : ', response);
				dispatch({ type: TYPES.GET_RECIPE_SUGGESTIONS, payload: response.data });
			})
			.catch(response => (
				response
				// console.log('error in chooseRecipe, response of : ',response);
			));
	}
);

export const chooseRecipe = ({ recipe }) => (
	(dispatch) => {
		axios.post(`${API_URL}/api/icebox/recipes`, { recipe }, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				dispatch({ type: TYPES.SET_CHOSEN_RECIPE, payload: response.data });
			})
			.catch(response => (
				response
				// console.log('error in chooseRecipe, response of : ',response);
			));
	}
);

export const clearRecipe = () => ({
	type: TYPES.CLEAR_CHOSEN_RECIPE,
});
