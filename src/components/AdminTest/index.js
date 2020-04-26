import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class index extends Component {
  render() {
    return (
      <div>
        <Link to="./Admin">Manage users</Link>
        <Link to="./AdminPlaces">Manage Places</Link>
      </div>
    );
  }
}
