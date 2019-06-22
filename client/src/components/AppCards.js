import React, { Component } from 'react';
import { connect } from 'react-redux';
import type from '../store/type';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class AppCards extends Component {
  componentDidMount() {
    socket.on('data', data => {
      this.props.updateAppsStatus(data);
    });
  }

  render() {
    return (
      <div>
        <h1>Overal Application Status</h1>
        <p>
          {this.props.appsStatus.length !== 0
            ? JSON.stringify(this.props.appsStatus)
            : null}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { appsStatus: state.appsStatus };
};

const mapDistachToProps = dispatch => {
  return {
    updateAppsStatus: payload => {
      dispatch({ type: type.UPDATE_APPS_STATUS, payload: payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDistachToProps
)(AppCards);
