import React, { Component } from 'react';
import SideLeftPanel from './SideLeftPanel';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import type from '../store/type';
import { Line } from 'react-chartjs-2';
import openSocket from 'socket.io-client';
import getChartData from './lib/chart-data';
let socket;

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
  }

  componentWillMount() {
    socket = openSocket('http://localhost:8000');

    socket.emit('req_full_history', {
      appIndex: this.props.appDetailsIndex
    });

    socket.on('res_full_history', data => {
      this.props.updateFullHistory(data.appHistory);
    });

    socket.on('res_last_history_elem', data => {
      this.props.updateHistory(data.latestHistory[this.props.appDetailsIndex]);
    });
  }

  componentWillUnmount() {
    socket.close();
  }

  render() {
    if (this.props.history.length === 0) {
      return null;
    } else {
      return (
        <div>
          {this.props.appDetailsRequestedFromHome === false ? (
            <div>
              <Link to="/">
                <Button variant="danger">
                  {
                    'Page reloaded, please click here go back, then reload the page'
                  }
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <h1>Applications Detail</h1>
              {}
              <Link to="/">
                <Button variant="primary">Go Back</Button>
              </Link>
              <Card bg="dark">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-md-2 left"
                      style={{ textAlign: 'left' }}
                    >
                      <SideLeftPanel />
                    </div>
                    <div
                      className="col-md-10 right"
                      style={{ alignSelf: 'right' }}
                    >
                      <Line
                        data={getChartData(this.props.history)}
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
                          },
                          title: {
                            fontSize: 25
                          },
                          legend: {
                            labels: {
                              fontColor: '#fff',
                              fontSize: 15
                            }
                          },
                          scales: {
                            xAxes: [
                              {
                                ticks: {
                                  fontSize: 15,
                                  fontColor: '#fff'
                                },
                                gridLines: {
                                  color: '#668080'
                                }
                              }
                            ],
                            yAxes: [
                              {
                                ticks: {
                                  fontSize: 15,
                                  fontColor: '#fff'
                                },
                                gridLines: {
                                  color: '#668080'
                                }
                              }
                            ]
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
    appDetailsIndex: state.appDetailsIndex,
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
