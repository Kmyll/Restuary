import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dino from '../../assets/img/dino.gif';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { FcCheckmark } from 'react-icons/fc';

class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      places: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .places()
      .onSnapshot((snapshot) => {
        let places = [];

        snapshot.forEach((doc) =>
          places.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          places,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { places, loading } = this.state;

    return (
      <div>
        <h2>Places</h2>
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
                <td>Id</td>
                <td>Email</td>
                <td>Username</td>
                <td className="detailsBtn">Details</td>
              </tr>
            </thead>
            {places.map((place) => (
              <tbody key={place.uid}>
                <tr>
                  <td>{place.uid}</td>
                  <td>{place.name}</td>
                  <td>{place.country}</td>
                  <td className="detailsBtn">
                    {' '}
                    <Link
                      to={{
                        pathname: `${ROUTES.ADMINPLACES_DETAILS}/${place.uid}`,
                        state: { place },
                      }}
                    >
                      <FcCheckmark />
                    </Link>
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
