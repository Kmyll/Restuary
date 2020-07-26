import React, { Component } from 'react';
import firebase from '../Firestore';
import FileUploader from 'react-firebase-file-uploader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { CountryDropdown } from 'react-country-region-selector';
import { FiUserCheck } from 'react-icons/fi';

toast.configure();

const notify = () => {
	toast.success('Profile updated!', {
		position: toast.POSITION_TOP_RIGHT
	});
};

export class ChangeProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: this.props.authUser.username,
            email: this.props.authUser.email,
            uid: this.props.authUser.uid,
			country: '',
			bio: '',
			image: '',
			imageURL: ''
		};
	}

	//select countries (react-country-region-selector)
	selectCountry(val) {
		this.setState({ country: val });
	}

	//Change for texte
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	//Send image
	handleUploadStart = () => {
		this.setState({
			progress: 0
		});
	};

	handleUploadSuccess = (filename) => {
		this.setState({
			image: filename,
			progress: 100
		});
		firebase.storage().ref('avatar').child(filename).getDownloadURL().then((url) =>
			this.setState({
				imageURL: url
			})
		);
	};

	//Send texte

	onSubmit = (event, authUser, place) => {
		event.preventDefault();
		event.target.reset();
		const db = firebase.firestore();
		db.settings({
			timestampsInSnapshots: true
		});
		const placeRef = db.collection('profile').add({
			created: firebase.firestore.Timestamp.now(),
            username: this.state.username,
            uid: this.state.uid,
			email: this.state.email,
			country: this.state.country,
			bio: this.state.bio,
			image: this.state.image,
			imageURL: this.state.imageURL
		});

		this.setState({
            uid: '',
			username: '',
			email: '',
			country: '',
			bio: '',
			image: ''
		});
	};

	render() {
		console.log('props', this.props);
		console.log('I am the ID', this.id);
		console.log(this.state);
		const { username, email, country, bio, image, error } = this.state;

		const isInvalid = username === '' || email === '';
		return (
			<div className='addPlaceForm'>
				<h1>
					<FiUserCheck />
					Update your profile
				</h1>
				<p>Here is your space to modify your profile, polish it and make it shine!</p>
				<form onSubmit={this.onSubmit}>
					<div className='block'>
						<label>Add a profile picture</label>

						<FileUploader
							accept='image/*'
							name='image'
							storageRef={firebase.storage().ref('avatar')}
							onUploadStart={this.onUploadStart}
							onUploadSuccess={this.handleUploadSuccess}
						/>
					</div>

                    <div className='block hide'>
						<label>UID</label>
						<input
							type='text'
							name='uid'
							readOnly={true}
							value={this.state.uid}
							onChange={this.onChange}
						/>
					</div>

					<div className='block'>
						<label>Email</label>
						<input
							type='text'
							name='email'
							readOnly={true}
							value={this.state.email}
							onChange={this.onChange}
						/>
					</div>

					<div className='block'>
						<label>Username</label>
						<input type='text' name='username' value={this.state.username} onChange={this.onChange} />
					</div>
					<div className='block'>
						<label>Country</label>
						<CountryDropdown value={country} onChange={(val) => this.selectCountry(val)} />
					</div>

					<div className='block'>
						<label className='vertical_align'>Bio</label>
						<textarea
							type='text'
							name='description'
							placeholder='Write a bit about you'
							onChange={this.onChange}
						/>
					</div>

					<div className='block image'>{this.state.image && <img src={this.state.imageURL} />}</div>
					<button disabled={isInvalid} type='submit' onClick={notify}>
						Submit
					</button>
					{error && <p>{error.message}</p>}
				</form>
			</div>
		);
	}
}

const condition = (authUser) => !!authUser;

export default compose(withEmailVerification, withAuthorization(condition))(ChangeProfile);
