import React, {Component} from 'react';
import {connect} from "react-redux";
import DeveloperTasks from './DeveloperTasks';
import TeamLeaderTasks from './TeamLeaderTasks';
import {Redirect} from "react-router";
import WebSocketsProvider, {WebSocketContext} from "../IFS/WebSocketsProvider";

class Tasks extends Component {
	render() {
		const {user} = this.props;
		if (!user) {
			return <Redirect to="/login"/>
		}
		return user.role === "DEVELOPER"
			? <WebSocketContext.Provider value={new WebSocketsProvider()}>
				<DeveloperTasks/>
			</WebSocketContext.Provider>
			: <TeamLeaderTasks/>;
	}
}

const mapStateToProps = state => {
	return {
		user: state.users.currentUser
	}
}

export default connect(mapStateToProps, null)(Tasks);
