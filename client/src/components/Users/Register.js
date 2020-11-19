import React, {Component} from 'react';
import Messages from '../IFS/Messages';
import {register} from '../../business/users/userActions';
import {connect} from "react-redux";

class Register extends Component {
	constructor(props) {
		super(props);
		this.userNameInput = React.createRef();
		this.passwordInput = React.createRef();
		this.roleInput = React.createRef();
	}

	componentDidMount() {
		this.userNameInput.current.focus();
	}

	render() {
		return (
			<div className="jumbotron card" style={{width: "20rem", margin: "auto"}}>
				<div className="card-body">
					<Messages/>
					<form action="/users/register" method='POST' onSubmit={(event) => this.performRegistration(event)}>
						<div className="form-group">
							<input className="form-control" type="text" required={true} ref={this.userNameInput} placeholder="Enter user name"/>
						</div>
						<div className="form-group">
							<input className="form-control" type="password" required={true} ref={this.passwordInput} placeholder="Enter password"/>
						</div>
						<div className="form-group">
							<select className="form-control" required={true} ref={this.roleInput}>
								<option value="DEVELOPER">Developer</option>
								<option value="TEAM_LEADER">Team Leader</option>
							</select>
						</div>
						<input className="btn btn-primary btn-lg btn-block" type="submit" value="Register"/>
						<br/>
						<a className="btn btn-outline-primary" href="/login" role="button">Already have an account ? Login here !</a>
					</form>
				</div>
			</div>
		);
	}

	async performRegistration(event) {
		event.preventDefault();
		const userName = this.userNameInput.current.value;
		const password = this.passwordInput.current.value;
		const role = this.roleInput.current.value;
		this.props.onRegister(userName, password, role);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onRegister: (userName, password, role) => dispatch(register(userName, password, role)),
	}
}

export default connect(null, mapDispatchToProps)(Register);
