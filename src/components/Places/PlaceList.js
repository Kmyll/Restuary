import React, { Component } from 'react';
import { compose } from 'recompose';
import firebase from '../Firestore';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import { GoSearch } from 'react-icons/go';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import dino from '../../assets/img/dino.gif';
import { Link } from 'react-router-dom';

function searchingFor (term) {
	return function (name) {
		return (
			name.country.toLowerCase().includes(term.toLowerCase()) ||
			name.continent.toLowerCase().includes(term.toLowerCase()) ||
			name.name.toLowerCase().includes(term.toLowerCase()) ||
			!term
		);
	};
}

class PlaceList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			places  : null,
			loading : false,
			term    : ''
		};
	}

	componentDidMount () {
		const db = firebase.firestore();
		db
			.collection('places')
			.orderBy('created', 'desc')
			.get()
			.then((snapshot) => {
				const places = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					places.push(data);
				});
				this.setState({ places: places });
			})
			.catch((error) => console.log(error));
	}

	//Searchbar
	searchHandler = (event) => {
		this.setState({ term: event.target.value });
	};

	render () {
		const { places, loading, term } = this.state;

		return (
			<div>
				<h1>List of worldwide Places</h1>
				{
					loading ? <div className='loader'>
						<img src={dino} />
						<p>Loading...</p>
					</div> :
					<form className='Explore_searchBar'>
						<input
							type='text'
							onChange={this.searchHandler}
							value={term}
							placeholder='Search (ex: Spain)'
						/>
						<GoSearch />
					</form>}

				<ul className='adminListTable centerHomeContent'>
					{this.state.places &&
						this.state.places.filter(searchingFor(term)).map((place) => {
							return (
								<li key={place.uid}>
									<img src={place.imageURL} />
									<p>
										{' '}
										<span className='bold'>Name: </span>
										{place.name}
									</p>
									<p>
										{' '}
										<span className='bold'>Country: </span>
										{place.country}
									</p>
									<p>
										{' '}
										<span className='bold'>Continent: </span>
										{place.continent}
									</p>

									<div className='homePageHr' />
									<div className='homepageFooter'>
										<p>{place.username}</p>
										<Link
											className='homeLink'
											to={{
												pathname : `${ROUTES.HOME}/${place.created.seconds}`,
												state    : { place }
											}}
										>
											<p>Details...</p>
										</Link>
									</div>
								</li>
							);
						})}
				</ul>
			</div>
		);
	}
}

const condition = (authUser) => !!authUser;

export default compose(withEmailVerification, withAuthorization(condition))(PlaceList);
