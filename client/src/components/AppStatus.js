import React from 'react';
import { connect } from 'react-redux';
import AppCard from './AppCard';
import type from '../store/type';
import { Spinner } from 'react-bootstrap';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class AppStatusOverall extends React.Component {
  componentDidMount() {
    socket.on('data', data => {
      this.props.updateAppsStatusOverall(data);
    });
  }

  componentWillUnmount() {
    socket.close();
  }

  render() {
    return (
      <div>
        <h1>Overal Application Status</h1>
        {this.props.appsStatusOverall.length === 0 ? (
          <Spinner animation="grow" variant="secondary" />
        ) : (
          <AppCard />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { appsStatusOverall: state.appsStatusOverall };
};

const mapDistachToProps = dispatch => {
  return {
    updateAppsStatusOverall: payload => {
      dispatch({ type: type.UPDATE_APPS_STATUS_OVERALL, payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDistachToProps
)(AppStatusOverall);
