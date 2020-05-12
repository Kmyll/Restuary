import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class about extends Component {
  render() {
    return (
      <div>
        <h1>About Restuary</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(about);
