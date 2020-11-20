import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTask} from "../../business/tasks/tasksActions";
import {fetchDevelopers} from "../../business/users/userActions";

class AddTask extends Component {
	constructor(props) {
		super(props);
		this.descriptionInput = React.createRef();
		this.developersSelect = React.createRef();
	}

	componentDidMount() {
		this.props.onFetchDevelopers();
	}

	render() {
		const {developers} = this.props;
		if (!developers) {
			return <div className="h3 alert alert-warning">No Developers found.. Please add some !</div>
		}
		return (
			<div className="card" style={{width: "100%"}}>
				<form className="row" onSubmit={(event => this.handleAddTask(event))}>
					<input type="text" className="col-6" ref={this.descriptionInput} id="description" placeholder="Enter task description"/>
					<select className="col-4" id="usersCombo" ref={this.developersSelect}>
						{developers.map(developer => (
							<option key={developer.id} value={developer.id}>{developer.name}</option>))
						}
					</select>
					<input type="submit" className="col-2 btn btn-primary" value="Add task"/>
				</form>
			</div>
		);
	}

	handleAddTask(e) {
		e.preventDefault();
		const description = this.descriptionInput.current.value;
		const userId = parseInt(this.developersSelect.current.value);
		this.props.onAddTask(description, userId);
	}
}

const mapStateToProps = state => {
	return {
		developers: state.users.developers
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onAddTask: (description, userId) => dispatch(addTask({description, userId})),
		onFetchDevelopers: () => dispatch(fetchDevelopers())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
