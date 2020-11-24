import React, { Component } from 'react';
import firebase from '../Firestore';
import { withFirebase } from '../Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const notify = () => {
	if (this.state.isVerified) {
		toast.success('The user was successfully deleted. Thank you.');
	} else {
		toast.error('Something went wrong.Plase try again.');
	}
};

class UserItem extends Component {
	constructor (props) {
		super(props);

		this.state = {
			loading : false,
			user    : null,
			...props.location.state
		};
	}
	componentDidMount () {
		if (this.state.user) {
			return;
		}

		this.setState({ loading: true });

		this.unsubscribe = this.props.firebase.user(this.props.match.params.id).onSnapshot((snapshot) => {
			this.setState({
				user    : snapshot.data(),
				loading : false
			});
		});
	}

	componentWillUnmount () {
		this.unsubscribe && this.unsubscribe();
	}

	onSendPasswordResetEmail = () => {
		this.props.firebase.doPasswordReset(this.state.user.email);
	};

	deleteAccount = () => {
		const db = firebase.firestore();
		db
			.collection('users')
			.doc(this.state.user.uid)
			.delete()
			.then(function () {
				toast.success('✔️ The user was succesfully deleted.');
				window.location.href = '/admin';
			})
			.catch(function (error) {
				toast.danger('Something went wrong. Please try again.');
			});
	};

	render () {
		const { user, loading } = this.state;

		return (
			<div className='AdminUserSingle'>
				<h2>User ({this.props.match.params.id})</h2>
				{loading && <div>Loading ...</div>}

				{user && (
					<div>
						<span>
							<strong>ID:</strong> {user.uid}
						</span>
						<span>
							<strong>E-Mail:</strong> {user.email}
						</span>
						<span>
							<strong>Username:</strong> {user.username}
						</span>
						<span>
							<button
								className='BtnSendPasswordReset'
								type='button'
								onClick={this.onSendPasswordResetEmail}
							>
								Send Password Reset
							</button>
						</span>
						<span>
							<button type='button' className='BtnDeleteAccount' onClick={this.deleteAccount}>
								Delete the account
							</button>
						</span>
					</div>
				)}
			</div>
		);
	}
}

export default withFirebase(UserItem);
