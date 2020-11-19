import React, {Component} from 'react';
import {connect} from "react-redux";
import {ADD_TASK, fetchTasks} from "../../business/tasks/tasksActions";
import Messages from "../IFS/Messages";
import {WebSocketContext} from "../IFS/WebSocketsProvider";

class DeveloperTasks extends Component {
	componentDidMount() {
		this.props.onFetchTasks();
		const {socket} = this.context;
		socket.on("tasks/add", task => {
			this.props.onAddTask(JSON.parse(task));
		});
		const userCookie = this.extractUserIdFromCookies();
		socket.emit("user/connect", userCookie);
	}

	render() {
		const {tasks} = this.props;
		if (tasks.length === 0) {
			return (
				<div className="alert alert-success" role="alert">
					No tasks for you.. Go make some coffee !!
				</div>
			);
		}
		return (
			<div style={{width: "90%", margin: "auto"}}>
				<Messages/>
				<table className="table table-striped">
					<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Description</th>
					</tr>
					</thead>
					<tbody>
					{tasks.map(task =>
						<tr key={task.id}>
							<th scope="row">{task.id}</th>
							<td>{task.description}</td>
						</tr>)
					}
					</tbody>
				</table>
			</div>
		);
	}

	extractUserIdFromCookies() {
		const cookiesString = document.cookie;
		if (cookiesString.length === 0) {
			return null;
		}
		const cookies = cookiesString.split(";");
		if (cookies.length === 0) {
			return null;
		}
		for (const cookie of cookies) {
			const parts = cookie.split("=");
			if (parts.length === 2) {
				if (parts[0] === "userId") {
					return parts[1];
				}
			}
		}
		return null;
	}
}

const mapStateToProps = state => {
	return {
		tasks: state.tasks.list,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchTasks: () => dispatch(fetchTasks()),
		onAddTask: task => dispatch({type: ADD_TASK, task})
	};
}

DeveloperTasks.contextType = WebSocketContext;

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperTasks);
