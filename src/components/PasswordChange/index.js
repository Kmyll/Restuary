import React, { Component } from 'react';
import { FaUnlockAlt } from 'react-icons/fa';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <React.Fragment>
        <h2 className="settingsh2">
          <FaUnlockAlt /> Change your password
        </h2>
        <p className="passwordExplain">
          (Please choose this option if you remember your password)
        </p>
        <form onSubmit={this.onSubmit}>
          <input
            className="settingsInput"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
          />
          <input
            className="settingsInput"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
          />
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

export default withFirebase(PasswordChangeForm);
