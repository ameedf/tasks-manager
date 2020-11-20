import React, {Component} from 'react';
import Menu from "./components/IFS/Menu";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import Home from "./Home";
import Tasks from "./components/Tasks/Tasks";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import {connect} from "react-redux";
import Logout from "./components/Users/Logout";

class MainPage extends Component {
	render() {
		const {user} = this.props;
		const path = window.location.pathname;
		return (
			<div>
				<Router>
					{!user && !path.endsWith('/login') && !path.endsWith('/logout') && !path.endsWith('/register') &&
					<Redirect to="/login"/>
					}
					<div className="App">
						<Menu/>
					</div>
					<Switch>
						<Route path="/tasks" component={Tasks}/>
						<Route path="/login" component={Login}/>
						<Route path="/register" component={Register}/>
						<Route path="/logout" component={Logout}/>
						<Route path="/" component={Home}/>
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.users.currentUser
	}
}

export default connect(mapStateToProps, null)(MainPage);
