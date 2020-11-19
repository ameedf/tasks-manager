import {ADD_TASK, TASKS_READY} from "./tasksActions";

const initialState = {
	list: []
}

const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case TASKS_READY:
			return {...state, list: action.tasks};
		case ADD_TASK:
			return {...state, list: [...state.list, action.task]};
		default:
			return state;
	}
}

export default tasksReducer;
