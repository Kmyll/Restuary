import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class help extends Component {
  render() {
    return (
      <div>
        <h1>Help</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(help);
