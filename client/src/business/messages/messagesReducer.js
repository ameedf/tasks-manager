import * as ACTIONS from './messagesActions';

const initialState = {
	list: [] // errors list
}

const messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.SET_MESSAGES:
			return {...state, list: action.messages};
		case ACTIONS.DISMISS_MESSAGES:
			return initialState;
		default:
			return state;
	}
}

export default messagesReducer;
