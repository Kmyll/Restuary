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

function searchingFor(term) {
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
  constructor(props) {
    super(props);
    this.state = {
      places: null,
      loading: false,
      term: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log('mounted');
    const db = firebase.firestore();
    db.collection('places')
      .get()
      .then(async (snapshot) => {
        const places = [];
        snapshot.forEach((doc) => places.push(doc.data()));

        //console.log('places', places);

        //places[0].commentaires // tableau de DocumentReference
        for await (let place of places) {
          if (place.commentaires) {
            // S'il y a des commentaires pour cette place là
            place.commentaires = await Promise.all(
              place.commentaires.map((commRef) =>
                commRef.get().then((comm) => comm.data()),
              ),
            );
          }
        }

        console.log('places', places);
        this.setState({ places: places, loading: false });
      })
      .catch((error) => console.log(error));
  }

  //Searchbar
  searchHandler = (event) => {
    this.setState({ term: event.target.value });
  };

  render() {
    console.log(this.state);
    const { places, loading, term } = this.state;

    return (
      <div>
        {loading ? (
          <div className="loader">
            <img src={dino} />
            <p>Loading...</p>
          </div>
        ) : (
          <form className="Explore_searchBar">
            <input
              type="text"
              onChange={this.searchHandler}
              value={term}
            />
            <GoSearch />
          </form>
        )}

        <button onClick={() => this.addCommentToPlace1()}>
          Ajouter un commentaire à la place 1
        </button>
        <ul className="adminListTable">
          {this.state.places &&
            this.state.places
              .filter(searchingFor(term))
              .map((place) => {
                return (
                  <li key={place.uid}>
                    <img src={place.image} />

                    <p>
                      {' '}
                      <span className="bold">Name: </span>
                      {place.name}
                    </p>
                    <p>
                      {' '}
                      <span className="bold">Country: </span>
                      {place.country}
                    </p>

                    <p>
                      {' '}
                      <span className="bold">Continent: </span>
                      {place.continent}
                    </p>
                    <div className="homePageHr"></div>
                    <Link
                      className="homeLink"
                      to={{
                        pathname: `${ROUTES.HOME}/${place.uid}`,
                        state: { place },
                      }}
                    >
                      <p>Details...</p>
                    </Link>
                    {/*  <li>
                        {place.commentaires &&
                          place.commentaires.map((commentaire, j) => {
                            return (
                              <ul key={j}>
                                <li>{commentaire.message}</li>
                              </ul>
                            );
                          })}
                      </li> */}
                  </li>
                );
              })}
        </ul>

        {/*<Messages />*/}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(PlaceList);
