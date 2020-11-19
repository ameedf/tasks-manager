import React, {Component} from 'react';
import {login} from "../../business/users/userActions";
import Messages from '../IFS/Messages';
import {connect} from "react-redux";
import {Redirect} from "react-router";

class Login extends Component {
	constructor(props) {
		super(props);
		this.userNameInput = React.createRef();
		this.passwordInput = React.createRef();
	}

	componentDidMount() {
		this.userNameInput.current.focus();
	}

	render() {
		if (this.props.user) {
			return <Redirect to="/"/>
		}
		return (
			<div className="jumbotron card" style={{width: "20rem", margin: "auto"}}>
				<div className="card-body">
					<Messages/>
					<form action="/users/login" method='POST' onSubmit={(event) => this.performLogin(event)}>
						<div className="form-group">
							<input className="form-control" type="text" required={true} ref={this.userNameInput} placeholder="Enter user name"/>
						</div>
						<div className="form-group">
							<input className="form-control" type="password" required={true} ref={this.passwordInput} placeholder="Enter password"/>
						</div>
						<input className="btn btn-primary btn-lg btn-block" type="submit" value="Login"/>
						<br/>
						<a className="btn btn-outline-primary" href="/register" role="button">A new user ? Register here</a>
					</form>
				</div>
			</div>
		);
	}

	async performLogin(event) {
		event.preventDefault();
		const userName = this.userNameInput.current.value;
		const password = this.passwordInput.current.value;
		this.props.onLogin(userName, password);
	}
}

const mapStateToProps = state => {
	return {
		user: state.users.currentUser
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLogin: (userName, password) => dispatch(login(userName, password)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
