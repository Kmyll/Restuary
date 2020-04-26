import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dino from '../../assets/img/dino.gif';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { FcCheckmark } from 'react-icons/fc';
import firebase from '../Firestore';
import { FcDeleteDatabase } from 'react-icons/fc';

class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      places: [],
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
        snapshot.forEach((doc) => places.push(doc.data()));

        this.setState({
          places,
          loading: false,
        });
      });
  }

  /*  componentWillUnmount() {
    this.unsubscribe();
  } */

  render() {
    const { places, loading } = this.state;

    return (
      <div>
        {loading && (
          <div className="loader">
            <img src={dino} />
            <p>Loading...</p>
          </div>
        )}
        <ul className="userAdminList">
          <table className="adminListTable">
            <thead>
              <tr>
                <td>Name</td>
                <td>Country</td>
                <td>Continent</td>
                <td className="detailsBtn">Delete</td>
              </tr>
            </thead>
            {places.map((place) => (
              <tbody key={place.uid}>
                <tr>
                  <td>{place.name}</td>
                  <td>{place.country}</td>
                  <td>{place.continent}</td>
                  <td className="detailsBtn">
                    <button>
                      <FcDeleteDatabase />
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
