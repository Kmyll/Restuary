import React from 'react';
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (

  <Link to="/signin">
  <button
    type="button"
    className="logOutBtn"
    onClick={firebase.doSignOut}
  >
    Sign Out
  </button>
  </Link>
);

export default withFirebase(SignOutButton);
