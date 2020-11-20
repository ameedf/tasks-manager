import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {logout} from '../../business/users/userActions';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sendRedirect: null
		}
	}

	render() {
		const {user} = this.props;
		if (this.state.sendRedirect) {
			const redirect = <Redirect to={this.state.sendRedirect}/>
			this.setState({sendRedirect: null});
			return redirect;
		}
		return (
			<div>
				<ul className="nav">
					{user &&
					<li className="nav-item">
						<Link className="nav-link" to="/tasks">Tasks</Link>
					</li>
					}
					{user &&
					<li className="nav-item">
						<button className="btn btn-outline-primary" onClick={() => this.handleLogout()}>Logout</button>
					</li>
					}
					{!user &&
					<li className="nav-item">
						<Link className="nav-link" to="/login">Login</Link>
					</li>
					}
					{!user &&
					<li className="nav-item">
						<Link className="nav-link" to="/register">Register</Link>
					</li>
					}
				</ul>
			</div>
		);
	}

	handleLogout() {
		this.props.onLogout();
		this.setState({sendRedirect: '/logout'});
	}
}

const mapStateToProps = state => {
	return {
		user: state.users.currentUser
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(logout())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
