import messagesReducer from "./messages/messagesReducer";
import usersReducer from './users/usersReducer';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import tasksReducer from "./tasks/tasksReducer";

const applicationStore = createStore(
	combineReducers(
		{
			messages: messagesReducer,
			users: usersReducer,
			tasks: tasksReducer
		}),
	applyMiddleware(thunk)
);
export default applicationStore;
