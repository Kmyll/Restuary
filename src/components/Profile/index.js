import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {Link} from 'react-router-dom'
import { FaKey } from 'react-icons/fa';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const SettingsPage = ({authUser}) => (
  <div className="container settingsContainer">
    <h1>Account: {authUser.email}</h1>
    <h1>Account: {authUser.username}</h1>

  </div>
);

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {

        activeSignInMethods: [],
        error: null,

    }
    }


  render() {
    console.log(this.props)
    return (
      <div>
<h1>Hello</h1>
      </div>
    )
  }
}


const LoginManagement = withFirebase(Profile);


const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition),
)(SettingsPage);

