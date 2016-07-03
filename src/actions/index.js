// Actions will go here
import { AsyncStorage, AlertIOS } from 'react-native';
import * as TYPES from '../constants/actions';
import { Actions } from "react-native-router-flux";

const API_URL = 'http://localhost:8080';
// const API_URL = 'http://192.168.1.120:8080';

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
		dispatch({ type: TYPES.START_LOADING });
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
			dispatch({ type: TYPES.STOP_LOADING});
			Actions.dashboard();
		})
		.catch(error => {
			console.log('error on signinUser fetch of : ',error);
			dispatch({ type: TYPES.STOP_LOADING });
			dispatch(authError(error));
		});
	}
);

export const signupUser = ({ email, name, password }) => (
	(dispatch) => {
		dispatch({ type: TYPES.START_LOADING });
		axios.post(`${API_URL}/user/signup`, { email, name, password })
			.then(response => {
				dispatch({ type: TYPES.AUTHORIZE_USER });
				dispatch({ type: TYPES.GET_USER_INFO, payload: response.data });
				localStorage.setItem('token', response.data.token);
				dispatch({ type: TYPES.STOP_LOADING });
				browserHistory.push('/icebox');
			})
			.catch(response => {
				// console.log('error in signup user, response of : ',response);
				dispatch({ type: TYPES.STOP_LOADING });
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
		console.log('getRecipes action called!');
		getToken().then(token => {
			// console.log('token from getToken is : ',token);
			fetch(`${API_URL}/api/icebox/pastRecipes`, {
				method: 'GET',
				headers: {
					'authorization': token,
					'Accept'      : 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('response from getRecipes : ',response);
				dispatch({ type: TYPES.GET_RECIPES, payload: response.pastRecipes });
			})
			.catch(error => {
				console.log('error on getRecipes fetch of : ',error);
			});
		});
	}
);

export const getRecipeSuggestions = () => (
	(dispatch) => {
		console.log('getRecipeSuggestions action called!');
		getToken().then(token => {
			// console.log('token from getToken is : ',token);
			fetch(`${API_URL}/api/icebox/recipes`, {
				method: 'GET',
				headers: {
					'authorization': token,
					'Accept'      : 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('response from getRecipeSuggestions : ',response);
				dispatch({ type: TYPES.GET_RECIPE_SUGGESTIONS, payload: response.suggestions });
			})
			.catch(error => {
				console.log('error on getRecipeSuggestions fetch of : ',error);
			});
		});
	}
);

export const chooseRecipe = ({ recipe }) => (
	(dispatch) => {
		console.log('chooseRecipe action called with recipe of : ',recipe);
		getToken().then(token => {
			fetch(`${API_URL}/api/icebox/recipes`, {
				method: 'POST',
				headers: {
					'authorization': token,
					'Accept'      : 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					recipe: recipe
				})
			})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('response from chooseRecipe : ',response);
				// dispatch({ type: TYPES.SET_CHOSEN_RECIPE, payload: response });
			})
			.catch(error => {
				console.log('error on chooseRecipe fetch of : ',error);
			});
		});
	}
);

export const clearRecipe = () => ({
	type: TYPES.CLEAR_CHOSEN_RECIPE,
});
