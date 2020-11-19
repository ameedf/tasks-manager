import * as api from "../../utils";
import * as MESSAGES from '../messages/messagesActions';

export const USER_LOGGED_IN = "users/login";
export const USER_LOGGED_OUT = "users/logout";
export const DEVELOPERS_FETCHED = "users/developers-fetched";

export const login = (userName, password) => async dispatch => {
	const result = await api.post("/users/login", {userName, password});
	if (result.errors) {
		console.log(result.errors);
		dispatch(MESSAGES.setMessages(result.errors));
	} else {
		dispatch({type: USER_LOGGED_IN, user: result.data});
	}
}

export const logout = () => async dispatch => {
	const result = await api.post("/users/logout", {});
	if (result.errors) {
		console.log(result.errors);
		dispatch(MESSAGES.setMessages(result.errors));
	} else {
		dispatch({type: USER_LOGGED_OUT});
	}
}

export const register = (userName, password, role) => async dispatch => {
	const result = await api.post("/users/register", {userName, password, role});
	if (result.errors) {
		console.log(result.errors);
		dispatch(MESSAGES.setMessages(result.errors));
	} else {
		dispatch(MESSAGES.setMessages(['User successfully registered']));
	}
}

export const fetchDevelopers = () => async dispatch => {
	const result = await api.get("/users/developers");
	if (result.errors) {
		console.log(result.errors);
		dispatch(MESSAGES.setMessages(result.errors));
	} else {
		const developers = result.data;
		if (developers && developers.length > 0) {
			dispatch({type: DEVELOPERS_FETCHED, developers: developers});
		} else {
			dispatch(MESSAGES.setMessages(["You must add developers in order to be able to add tasks"]));
		}
	}
}
