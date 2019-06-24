import React from 'react';
import { connect } from 'react-redux';
import AppCard from './AppCard';
import type from '../store/type';
import { Spinner } from 'react-bootstrap';
import openSocket from 'socket.io-client';
let socket = openSocket('http://localhost:8000');

class AppStatusOverall extends React.Component {
  componentWillMount() {
    socket.open();

    socket.on('apps_status', data => {
      this.props.updateAppsStatusOverall(data.current.overall);
    });
  }

  componentWillUnmount() {
    socket.removeAllListeners();
  }

  render() {
    const appsCnt = this.props.appsCnt;

    return (
      <div>
        <h1>Overal Application Status</h1>
        {appsCnt === 0 ? (
          <Spinner animation="grow" variant="primary" />
        ) : (
          <AppCard />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { appsCnt: state.appsStatusOverall.length };
};

const mapDistachToProps = dispatch => {
  return {
    updateAppsStatusOverall: payload => {
      dispatch({ type: type.UPDATE_APPS_STATUS_OVERALL, payload });
    },
    setSocket: payload => {
      dispatch({ type: type.SET_SOCKET, payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDistachToProps
)(AppStatusOverall);
