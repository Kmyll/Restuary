import React, { Component } from 'react';
import firebase from '../Firestore';
import FileUploader from 'react-firebase-file-uploader';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

toast.configure();

const notify = () => {
	toast.success('Place added!', {
		position : toast.POSITION_TOP_RIGHT
	});
};

export class AddPlace extends Component {
	constructor (props) {
		super(props);

		this.state = {
			username    : this.props.authUser.username,
			name        : '',
			country     : '',
			region      : '',
			description : '',
			image       : '',
			imageURL    : '',
			progress    : 0,
			continent   : '',
			tags        : []
		};
	}

	//select countries (react-country-region-selector)
	selectCountry (val) {
		this.setState({ country: val });
	}
	selectRegion (val) {
		this.setState({ region: val });
	}
	//continents

	handleChange = (e) => {
		this.setState({ continent: e.target.value });
	};

	inputKeyDown = (e) => {
		const val = e.target.value;
		if (e.key === 'Enter' && val) {
			if (this.state.tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
				return;
			}
			this.setState({
				tags: [
					...this.state.tags,
					val
				]
			});
			this.tagInput.value = null;
		} else if (e.key === 'Backspace' && !val) {
			this.removeTag(this.state.tags.length - 1);
		}
	};

	//Change for texte
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	// checkboxes toggle

	toggleChange = () => {
		this.setState(
			{
				isChecked : !this.state.isChecked // flip boolean value
			},
			function () {}.bind(this)
		);
	};

	//Send image
	handleUploadStart = () => {
		this.setState({
			progress : 0
		});
	};

	handleUploadSuccess = (filename) => {
		this.setState({
			image    : filename,
			progress : 100
		});
		firebase.storage().ref('test').child(filename).getDownloadURL().then((url) =>
			this.setState({
				imageURL : url
			})
		);
	};

	//Send texte

	onSubmit = (event, authUser, place) => {
		event.preventDefault();
		event.target.reset();
		const db = firebase.firestore();
		db.settings({
			timestampsInSnapshots : true
		});
		const placeRef = db.collection('places').add({
			created     : firebase.firestore.Timestamp.now(),
			username    : this.state.username,
			image       : this.state.image,
			imageURL    : this.state.imageURL,
			name        : this.state.name,
			country     : this.state.country,
			region      : this.state.region,
			continent   : this.state.continent,
			description : this.state.description
		});

		this.setState({
			username    : '',
			image       : '',
			name        : '',
			country     : '',
			region      : '',
			continent   : '',
			description : ''
		});
	};

	render () {
		const { name, country, region, continent, description, error, tags } = this.state;

		const isInvalid =
			name === '' ||
			continent === '' ||
			description === '' ||
			name === country ||
			country === continent ||
			name === continent ||
			name === description ||
			country === continent;
		return (
			<div className='addPlaceForm'>
				<h1>
					<GoPlus />
					Add a place
				</h1>
				<p>
					This is your turn to contribute to this community and add your best spot ! <br />
					Please ensure you fill all the fields to make easier to others to find your post.
				</p>
				<form onSubmit={this.onSubmit}>
					<div className='block'>
						<label>Add a picture</label>

						<FileUploader
							accept='image/*'
							name='image'
							storageRef={firebase.storage().ref('test')}
							onUploadStart={this.onUploadStart}
							onUploadSuccess={this.handleUploadSuccess}
						/>
					</div>

					<div className='block hide'>
						<label>Username</label>
						<input
							type='text'
							name='username'
							readOnly={true}
							value={this.state.username}
							onChange={this.onChange}
						/>
					</div>
					<div className='block'>
						<label>Name of the place</label>
						<input type='text' name='name' placeholder='Name of the place' onChange={this.onChange} />
					</div>

					<div className='block'>
						<label>Country</label>
						<CountryDropdown value={country} onChange={(val) => this.selectCountry(val)} />
					</div>

					<div className='block'>
						<label>Region</label>
						<RegionDropdown country={country} value={region} onChange={(val) => this.selectRegion(val)} />
					</div>

					<div className='block'>
						<label>Continent</label>
						<select value={this.state.continent} onChange={this.handleChange}>
							<option value='Africa'>Africa</option>
							<option value='Antartica'>Antartica</option>
							<option value='Asia'>Asia</option>
							<option value='Europe'>Europe</option>
							<option value='NorthAmerica'>North America</option>
							<option value='SouthAmerica'>South America</option>
							<option value='Oceania'>Oceania</option>
						</select>
					</div>

					<div className='block'>
						<label className='vertical_align'>Description</label>
						<textarea
							type='text'
							name='description'
							placeholder='Description: Add a short description of the place as well as the activities allowed there.'
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

export default compose(withEmailVerification, withAuthorization(condition))(AddPlace);
