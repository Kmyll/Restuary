import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dino from '../../assets/img/dino.gif';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { FcCheckmark } from 'react-icons/fc';
import { GoSearch } from 'react-icons/go';

function searchingFor(term) {
  return function (name) {
    return (
      name.uid.toLowerCase().includes(term.toLowerCase()) ||
      name.email.toLowerCase().includes(term.toLowerCase()) ||
      name.username.toLowerCase().includes(term.toLowerCase()) ||
      !term
    );
  };
}

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      term: ''
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot((snapshot) => {
        let users = [];

        snapshot.forEach((doc) =>
          users.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          users,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  //Searchbar
  searchHandler = (event) => {
    this.setState({ term: event.target.value });
  };

  render() {
    const { users, loading, term } = this.state;

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
            {users.filter(searchingFor(term)).map((user) => (
              <tbody key={user.uid}>
                <tr>
                  <td>{user.uid}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td className="detailsBtn">
                    {' '}
                    <Link
                      to={{
                        pathname: `${ROUTES.ADMIN}/${user.uid}`,
                        state: { user },
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

export default withFirebase(UserList);
