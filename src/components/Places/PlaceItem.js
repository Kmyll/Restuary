import React, { Component } from 'react'
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import dino from '../../assets/img/dino.gif';
import firebase from '../Firestore';

export default class placeItem extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     place: null,
                     loading: false,
                     ...props.location.state,
                   };
                 }

                 componentDidMount() {
                   {
                     /*   if (!this.places.length) {
          this.setState({ loading: true });
        } */
                   }
                   console.log('mounted');
                   const db = firebase.firestore();
                   db.collection('places')
                     .get()
                     .then(async (snapshot) => {
                       const places = [];
                       snapshot.forEach((doc) =>
                         places.push(doc.data()),
                       );

                       //console.log('places', places);

                       //places[0].commentaires // tableau de DocumentReference
                       for await (let place of places) {
                         if (place.commentaires) {
                           // S'il y a des commentaires pour cette place là
                           place.commentaires = await Promise.all(
                             place.commentaires.map((commRef) =>
                               commRef
                                 .get()
                                 .then((comm) => comm.data()),
                             ),
                           );
                         }
                       }

                       console.log('places', places);
                       this.setState({
                         places: places,
                         loading: false,
                       });
                     })
                     .catch((error) => console.log(error));
                 }

                 //Comments
                 addCommentToPlace1 = async () => {
                   const newCommentRef = await firebase
                     .firestore()
                     .collection('commentaires')
                     .add({
                       id: Date.now(),
                       message: 'Hello sweetie !',
                     });

                   const placeID = 'thKu6QtG6lbLOHIuDqnQ'; // en admettant que tu l'ai déjà sous la main
                   const place = await firebase
                     .firestore()
                     .collection('places')
                     .doc(placeID)
                     .get()
                     .then((p) => p.data());

                   if (place.commentaires instanceof Array) {
                     place.commentaires.push(newCommentRef);
                   } else {
                     place.commentaires = [newCommentRef];
                   }

                   await firebase
                     .firestore()
                     .collection('places')
                     .doc(placeID)
                     .set(place);
                   console.log('commentaire ajouté !');
                 };

                 render() {
                   const { place, loading } = this.state;
                   return (
                     <React.Fragment>
                       {/*<h2>Place ({this.props.match.params.id})</h2>*/}
                       {loading && <div>Loading ...</div>}

                       {place && (
                         <div className="placeItemContainer">
                           <h2> {place.name}</h2>
                           <hr />
                           <div>
                             <section>
                               <img src={place.imageURL} />
                             </section>
                             <section className="TextDisplay">
                               <p>
                                 <span>Country:</span> {place.country}
                               </p>
                               <p>
                                 <span>continent:</span>{' '}
                                 {place.continent}
                               </p>
                               <p>
                                 <span>Description:</span>{' '}
                                 {place.description}
                               </p>
                           { /*   <button
                                 onClick={() =>
                                   this.addCommentToPlace1()
                                 }
                               >
                                 Ajouter un commentaire à la place 1
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
                               </li> */}
                             </section>
                           </div>
                         </div>
                       )}
                     </React.Fragment>
                   );
                 }
               }
