import * as api from '../../utils';
import * as MESSAGES from '../messages/messagesActions';

export const TASKS_READY = 'tasks/ready';
export const ADD_TASK = 'tasks/add';

export const fetchTasks = () => async dispatch => {
	dispatch({type: MESSAGES.DISMISS_MESSAGES});
	try {
		const response = await api.get('/tasks');
		if (response.errors) {
			dispatch(MESSAGES.setMessages(response.errors));
		} else {
			dispatch({type: TASKS_READY, tasks: response.data});
		}
	} catch (err) {
		dispatch(MESSAGES.setMessages(["A general error occurred.. Please contact manager"]));
	}
}

export const addTask = newTask => async dispatch => {
	dispatch({type: MESSAGES.DISMISS_MESSAGES});
	try {
		const response = await api.post('/tasks', {newTask});
		if (response.errors) {
			dispatch(MESSAGES.setMessages(response.errors));
		} else {
			dispatch({type: ADD_TASK, task: response.data});
		}
	} catch (err) {
		dispatch(MESSAGES.setMessages(["A general error occurred.. Please contact manager"]));
	}
}
