import React, { Component } from 'react';
import SideLeftPanel from './SideLeftPanel';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import type from '../store/type';
import { Line } from 'react-chartjs-2';
import openSocket from 'socket.io-client';
import getChartData from './lib/chart-data';
import time from './utils/time';
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

    if (this.props.chartRange < time.MIN_30) {
      this.props.setChartRange(time.MIN_30);
    }
  }

  componentWillUnmount() {
    socket.close();
  }

  render() {
    const timeOptions = [
      time.MIN_30,
      time.MIN_20,
      time.MIN_10,
      time.MIN_5,
      time.MIN_1
    ];

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
                        data={getChartData(
                          this.props.history,
                          this.props.chartRange
                        )}
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
                                  beginAtZero: true,
                                  max: 100,
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
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-right">
                    <Link to="/">
                      <Button variant="primary">
                        <i className="fa fa-arrow-left" /> Go Back
                      </Button>
                    </Link>
                  </div>
                  <div className="col-md-6 text-left">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Select chart range"
                    >
                      {timeOptions.map((time, i) => {
                        return (
                          <Dropdown.Item
                            key={i}
                            onClick={() => {
                              this.props.setChartRange(time);
                            }}
                          >
                            {`${time / 60} min`}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                </div>
              </div>
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
    chartRange: state.chartRange,
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
    },
    setChartRange: payload => {
      dispatch({ type: type.SET_CHART_RANGE, payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetail);
