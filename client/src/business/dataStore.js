import messagesReducer from "./messages/messagesReducer";
import usersReducer from './users/usersReducer';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import tasksReducer from "./tasks/tasksReducer";
import {composeWithDevTools} from 'redux-devtools-extension';

const applicationStore = createStore(
	combineReducers(
		{
			messages: messagesReducer,
			users: usersReducer,
			tasks: tasksReducer
		}),
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);
export default applicationStore;
