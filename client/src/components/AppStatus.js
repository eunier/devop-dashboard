import React from 'react';
import { connect } from 'react-redux';
import AppCard from './AppCard';
import type from '../store/type';
import { Spinner, Alert } from 'react-bootstrap';
import openSocket from 'socket.io-client';
let socket;

class AppStatusOverall extends React.Component {
  componentWillMount() {
    socket = openSocket('http://localhost:8000');

    if (this.props.appDetailsRequestedFromHome === true) {
      this.props.setDetailsRequestFlag(false);
    }

    socket.on('apps_status', data => {
      this.props.updateAppsStatusOverall(data.current.overall);
    });
  }

  componentWillUnmount() {
    socket.close();
  }

  render() {
    const appsCnt = this.props.appsCnt;

    return (
      <div>
        {this.props.requestUserRedirectHomeFlag === true ? (
          <Alert variant="danger">Please realod page</Alert>
        ) : null}
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
  return {
    appsCnt: state.appsStatusOverall.length,
    appDetailsRequestedFromHome: state.appDetailsRequestedFromHome,
    requestUserRedirectHomeFlag: state.requestUserRedirectHomeFlag,
    appDetailsIndex: state.appDetailsIndex
  };
};

const mapDistachToProps = dispatch => {
  return {
    updateAppsStatusOverall: payload => {
      dispatch({ type: type.UPDATE_APPS_STATUS_OVERALL, payload });
    },
    setSocket: payload => {
      dispatch({ type: type.SET_SOCKET, payload });
    },
    setDetailsRequestFlag: payload => {
      dispatch({ type: type.SET_DETAILS_REQUEST_FLAG, payload });
    },
    updateFullHistory: payload => {
      dispatch({ type: type.UPDATE_FULL_HISTORY, payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDistachToProps
)(AppStatusOverall);
