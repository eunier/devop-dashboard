import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import type from '../store/type';
import { Line } from 'react-chartjs-2';
import openSocket from 'socket.io-client';
let socket = openSocket('http://localhost:8000');
const chartData = require('./lib/chart-data');

class AppDetail extends Component {
  componentWillMount() {
    socket.open();

    socket.emit('req_full_history', {
      appIndex: this.props.appDetailsIndex
    });

    socket.on('res_full_history', data => {
      this.props.updateFullHistory(data.appHistory);
    });

    socket.on('apps_status_history', data => {
      this.props.updateHistory(data.latestHistory);
    });
  }

  componentWillUnmount() {
    socket.removeAllListeners();
  }

  render() {
    const appDetailsIndex = this.props.appDetailsIndex;
    const history = this.props.history;

    return (
      <div>
        <h1>Applications Details</h1>
        <Link to="/">
          <Button variant="primary">Go Back</Button>
        </Link>
        <Line data={chartData.getChartData(history)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appDetailsIndex: state.appDetailsIndex,
    socket: state.socket,
    history: state.appsStatusHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFullHistory: payload => {
      dispatch({ type: type.UPDATE_FULL_HISTORY, payload });
    },
    updateHistory: payload => {
      dispatch({ type: type.UPDATE_HISTORY, payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetail);
