import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchTasks} from "../../business/tasks/tasksActions";
import AddTask from "./AddTask";
import Messages from "../IFS/Messages";

class TeamLeaderTasks extends Component {
	componentDidMount() {
		this.props.onFetchTasks();
	}

	render() {
		const {tasks} = this.props;
		if (tasks.length === 0) {
			return (
				<div>
					<div className="alert alert-success" role="alert">
						No tasks for the team... Time for 'HAPPY HOUR' !!
					</div>
					<AddTask/>
				</div>
			);
		}
		return (
			<div style={{width: "90%", margin: "auto"}}>
				<Messages/>
				<AddTask/>
				<table className="table table-striped">
					<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Description</th>
						<th scope="col">User</th>
					</tr>
					</thead>
					<tbody>
					{tasks.map(task =>
						<tr key={task.id}>
							<th scope="row">{task.id}</th>
							<td>{task.description}</td>
							<td>{task.userName}</td>
						</tr>)
					}
					</tbody>
				</table>
			</div>
		);
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
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamLeaderTasks);
