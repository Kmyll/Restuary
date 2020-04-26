import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import firebase from '../Firestore';
import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    console.log('mounted');
    const db = firebase.firestore();
    db.collection('users')
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          users.push(data);
        });
        this.setState({ users: users });
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Hello</h1>
        {this.state.users &&
          this.state.users.map((user, i) => {
            return (
              <ul key={i}>
                <li>
                  <img className="homePicture" src={user.image} />
                </li>
                <li>{user.username}</li>
                <li>{user.bio}</li>
              </ul>
            );
          })}
        <Link to="../Settings">Settings</Link>
        <Link to="../Profile">Modify your profile</Link>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
