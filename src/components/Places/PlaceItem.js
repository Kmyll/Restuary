import React, { Component } from 'react';
import firebase from '../Firestore';

export default class placeItem extends Component {
	constructor (props) {
		super(props);

		this.state = {
			place   : null,
			loading : false,
			...props.location.state
		};
	}

	componentDidMount () {
		/*   if (!this.places.length) {
          this.setState({ loading: true });
        } */
		const db = firebase.firestore();
		db
			.collection('places')
			.get()
			.then(async (snapshot) => {
				const places = [];
				snapshot.forEach((doc) => places.push(doc.data()));

				//places[0].commentaires // tableau de DocumentReference
				for await (let place of places) {
					if (place.commentaires) {
						// S'il y a des commentaires pour cette place là
						place.commentaires = await Promise.all(
							place.commentaires.map((commRef) => commRef.get().then((comm) => comm.data()))
						);
					}
				}

				this.setState({
					places  : places,
					loading : false
				});
			})
			.catch((error) => console.log(error));
	}

	//Comments
	addCommentToPlace1 = async () => {
		const newCommentRef = await firebase.firestore().collection('commentaires').add({
			id      : Date.now(),
			message : 'Hello sweetie !'
		});

		const placeID = 'thKu6QtG6lbLOHIuDqnQ'; // en admettant que tu l'ai déjà sous la main
		const place = await firebase.firestore().collection('places').doc(placeID).get().then((p) => p.data());

		if (place.commentaires instanceof Array) {
			place.commentaires.push(newCommentRef);
		} else {
			place.commentaires = [
				newCommentRef
			];
		}

		await firebase.firestore().collection('places').doc(placeID).set(place);
	};

	render () {
		const { place, loading } = this.state;
		return (
			<React.Fragment>
				{loading && <div>Loading ...</div>}

				{place && (
					<div className='placeItemContainer'>
						<h1> {place.name}</h1>
						{/* <hr /> */}
						<div>
							<section>
								<img src={place.imageURL} alt='place illustration' />
							</section>
							<section className='TextDisplay'>
								<p>
									<span>Country:</span> {place.country}
								</p>
								<p>
									<span>Region:</span> {place.region}
								</p>
								<p>
									<span>Continent:</span> {place.continent}
								</p>
								<p>
									<span>Description:</span> {place.description}
								</p>
								<p>
									<span>Added by:</span> {place.username}
								</p>
								{/* <button
                                 onClick={() =>
                                   this.addCommentToPlace1()
                                 }
                               >
                                 Ajouter un commentaire {place.name}
                               </button>
                               <li>
                                 {place.commentaires &&
                                   place.commentaires.map(
                                     (commentaire, j) => {
                                       return (
                                         <ul key={j}>
                                           <li>
                                             {commentaire.message}
                                           </li>
                                         </ul>
                                       );
                                     },
                                   )}
                               </li>*/}
							</section>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}
