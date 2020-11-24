import React, { Component } from 'react';
import dino from '../../assets/img/dino.gif';
import { withFirebase } from '../Firebase';
import firebase from '../Firestore';
import { FaPlus } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
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

function searchingFor (term) {
	return function (name) {
		return (
			name.name.toLowerCase().includes(term.toLowerCase()) ||
			name.country.toLowerCase().includes(term.toLowerCase()) ||
			name.continent.toLowerCase().includes(term.toLowerCase()) ||
			!term
		);
	};
}

class PlaceList extends Component {
	constructor (props) {
		super(props);

		this.state = {
			loading : false,
			places  : [],
			term    : ''
		};
	}

	componentDidMount () {
		const db = firebase.firestore();
		db.collection('places').get().then(async (snapshot) => {
			const places = [];
			snapshot.forEach((doc) => places.push(doc.data()));

			this.setState({
				places,
				loading : false
			});
		});
	}

	// Remove the 'capital' field from the document
	removePlace = () => {
		const db = firebase.firestore();
		db.collection('places').remove();
	};

	removePlace = () => {
		const db = firebase.firestore();
		db
			.collection('places')
			.doc(this.state.place.uid)
			.delete()
			.then(function () {
				toast.success('✔️ The post was successfully sent. Thank you.');
			})
			.catch(function (error) {
				toast.danger('Something went wrong. Please try again.');
			});
	};

	componentWillUnmount () {
		this.unsubscribe && this.unsubscribe();
	}

	//Searchbar
	searchHandler = (event) => {
		this.setState({ term: event.target.value });
	};

	render () {
		const { places, loading, term } = this.state;
		return (
			<div>
				{
					loading ? <div className='loader'>
						<img src={dino} />
						<p>Loading...</p>
					</div> :
					<form className='Explore_searchBar'>
						<input type='text' onChange={this.searchHandler} value={term} />
						<GoSearch />
					</form>}
				<ul className='userAdminList'>
					<table className='adminListTable'>
						<thead>
							<tr>
								<td>Name</td>
								<td>Country</td>
								<td>Continent</td>
								<td className='detailsBtn'>Delete</td>
							</tr>
						</thead>
						{places.filter(searchingFor(term)).map((place) => (
							<tbody key={place.uid}>
								<tr>
									<td>{place.name}</td>
									<td>{place.country}</td>
									<td>{place.continent}</td>
									<td className='detailsBtn'>
										<button onClick={this.removePlace}>
											<FaPlus />
										</button>
									</td>
								</tr>
							</tbody>
						))}
					</table>
				</ul>
			</div>
		);
	}
}

export default withFirebase(PlaceList);
