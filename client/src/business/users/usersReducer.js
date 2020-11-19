import * as ACTIONS from './userActions';

const initialState = {
	currentUser: null,
	developers: null,
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.USER_LOGGED_IN:
			return {...state, currentUser: action.user}
		case ACTIONS.USER_LOGGED_OUT:
			return initialState;
		case ACTIONS.DEVELOPERS_FETCHED:
			return {...state, developers: action.developers};
		default:
			return state;
	}
}

export default usersReducer;
