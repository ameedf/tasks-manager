import React, {Component} from 'react';
import {connect} from "react-redux";
import {dismissMessages} from "../../business/messages/messagesActions";

class Messages extends Component {

	componentWillUnmount() {
		this.props.onDismissMessages();
	}

	render() {
		const {messages} = this.props;
		return (
			<div>
				{messages && messages.map((msg, index) =>
					<div key={index} className="alert alert-danger alert-dismissible fade show" role="alert">
						<strong>{msg}</strong>
						<button type="button" className="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>)
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		messages: state.messages.list,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onDismissMessages: () => dispatch(dismissMessages())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
