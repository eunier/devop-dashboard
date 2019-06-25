import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import type from '../store/type';
import { Line } from 'react-chartjs-2';
import openSocket from 'socket.io-client';
import getChartData from './lib/chart-data';
let socket = openSocket('http://localhost:8000');

// const chartData = require('./lib/chart-data');

class AppDetail extends Component {
  constructor(props) {
    super(props);

    if (window.performance) {
      if (performance.navigation.type === 1) {
        if (!this.props.appDetailsRequestedFromHome) {
          this.props.setRequestUsetRedirectHome(true);
        }
      }
    }

    socket.open();

    socket.emit('req_full_history', {
      appIndex: this.props.appDetailsIndex
    });

    socket.on('res_full_history', data => {
      console.log('res_full_history', { data });
      this.props.updateFullHistory(data.appHistory);
    });

    socket.on('res_last_history_elem', data => {
      console.log('res_last_history_elem', { data });
      this.props.updateHistory(data.latestHistory[this.props.appDetailsIndex]);
    });
  }

  componentWillUnmount() {
    socket.removeAllListeners();
  }

  render() {
    const history = this.props.history;

    return (
      <div>
        {this.props.appDetailsRequestedFromHome === false ? (
          <div>
            <Link to="/">
              <Button variant="danger">
                {'Page reloaded, please click here go back'}
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <h1>Applications Details</h1>
            <Link to="/">
              <Button variant="primary">Go Back</Button>
            </Link>
            <Line
              data={getChartData(history)}
              options={{
                layout: {
                  padding: {
                    left: 30,
                    right: 30,
                    top: 0
                  }
                },
                elements: {
                  line: {
                    tension: 0 // disables bezier curves
                  }
                },
                animation: {
                  duration: 0
                },
                hove: {
                  animationDuration: 0
                }
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appDetailsIndex: state.appDetailsIndex,
    socket: state.socket,
    history: state.appsStatusHistory,
    appDetailsRequestedFromHome: state.appDetailsRequestedFromHome
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFullHistory: payload => {
      dispatch({ type: type.UPDATE_FULL_HISTORY, payload });
    },
    updateHistory: payload => {
      dispatch({ type: type.UPDATE_HISTORY, payload });
    },
    setRequestUsetRedirectHome: payload => {
      dispatch({ type: type.SET_REQUEST_USER_REDIRECT_HOME, payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetail);
