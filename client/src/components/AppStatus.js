import React from 'react';
import { connect } from 'react-redux';
import AppCard from './AppCard';
import type from '../store/type';
import { Spinner } from 'react-bootstrap';
import openSocket from 'socket.io-client';
let socket = openSocket('http://localhost:8000');

class AppStatusOverall extends React.Component {
  componentDidMount() {
    socket.on('apps_status', data => {
      this.props.updateAppsStatusOverall(data);
      this.props.updateAppsStatusHistory(data);
    });
  }

  render() {
    return (
      <div>
        <h1>Overal Application Status</h1>
        {this.props.appsCnt === 0 ? (
          <Spinner animation="grow" variant="secondary" />
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
    updateAppsStatusHistory: payload => {
      dispatch({ type: type.ADD_APP_DETAILS_HISTORY, payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDistachToProps
)(AppStatusOverall);