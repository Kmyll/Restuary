import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { GoPlus } from 'react-icons/go';
import { withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const notify = () => {
	toast.success('New profile saved!', {
		position : toast.POSITION_TOP_RIGHT
	});
};

class Edit extends Component {
	constructor (props) {
		super(props);
		this.state = {
			username : '',
			bio      : '',
			image    : '',
			imageURL : ''
		};
	}

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleUploadSuccess = (filename) => {
		this.setState(
			{
				image : filename
			},
			() => {
				firebase.storage().ref('avatar').child(filename).getDownloadURL().then((url) =>
					this.setState({
						imageURL : url
					})
				);
			}
		);
	};

	onSubmit = (event, authUser) => {
		event.preventDefault();
		event.target.reset();
		this.props.firebase.users().push({
			image    : this.state.imageURL,
			username : this.state.username,
			bio      : this.state.bio
		});

		this.setState({
			image       : '',
			username    : '',
			bio         : '',
			description : '',
			rating      : ''
		});
	};

	render () {
		const { error } = this.state;
		const { username, bio } = this.props;

		return (
			<div className='addPlaceForm'>
				<h1>
					<GoPlus /> Modify your profile
				</h1>
				<form onSubmit={this.onSubmit}>
					<div className='block'>
						<label>Add a profile picture</label>
						<FileUploader
							className='DropImg'
							accept='image/*'
							name='image'
							storageRef={firebase.storage().ref('avatar')}
							onUploadSuccess={this.handleUploadSuccess}
						/>
					</div>
					<div className='block'>
						<label>Username</label>
						<input type='text' name='username' placeholder='Username' onChange={this.onChange} />
					</div>
					<div className='block'>
						<label className='vertical_align'>Description</label>
						<textarea
							type='text'
							name='bio'
							placeholder='Tell us a bit more about yourself'
							onChange={this.onChange}
						/>
					</div>

					<button type='submit'>Save</button>
					{error && <p>{error.message}</p>}
				</form>
			</div>
		);
	}
}

const condition = (authUser) => !!authUser;

export default compose(withEmailVerification, withAuthorization(condition))(Edit);
