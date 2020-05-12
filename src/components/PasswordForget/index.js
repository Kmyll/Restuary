import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import forgotPassword from '../../assets/img/forgotPassword.png';
import { FaLock } from 'react-icons/fa';

const PasswordForgetPage = () => (
  <div className="DisplayForgotPassword">
    <img className="forgotPasswordImg" src={forgotPassword} />
    <div>
      <h1>
        {' '}
        <FaLock />
         Reset your password
      </h1>
      <PasswordForgetForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <React.Fragment>
        <h2 className="settingsh2">
          {' '}
          <FaLock /> Reset your password
        </h2>
        <p className="passwordExplain">
          (Please choose this option if you don't remember your
          password)
        </p>
        <form onSubmit={this.onSubmit}>
          <input
            className="settingsInput"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />{' '}
          <br />
          <button
            disabled={isInvalid}
            type="submit"
            className="settingsButton"
          >
            Reset My Password
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </React.Fragment>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="forgotPasswordPara">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
