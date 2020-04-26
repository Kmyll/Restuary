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
          <div>
            <button className="UsersBtn">
              <Link to="./Admin">Manage users</Link>
            </button>{' '}
            <br />
            <button className="placesBtn"><Link to="./AdminPlaces">Manage Places</Link></button>
          </div>
          <img className="adminImg" src={adminImg} />
        </section>
      </div>
    );
  }
}
