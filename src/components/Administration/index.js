import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUsersCog } from 'react-icons/fa';
import adminImg from '../../assets/img/admin.png';

export default class index extends Component {
  render() {
    return (
      <div className="admin_container">
        <h1>
          <FaUsersCog />
          Admin Interface
        </h1>
        <section>
          <div className="buttonsAdmin">
            <Link className="UsersBtn" to="./Admin">
              <button>Manage users</button>
            </Link>{' '}
            <br />
            <Link className="placesBtn"  to="./AdminPlaces">
              <button>Manage Places</button>
            </Link>
          </div>
          <img className="adminImg" src={adminImg} alt="admin illustration"/>
        </section>
      </div>
    );
  }
}
