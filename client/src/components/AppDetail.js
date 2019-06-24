import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import type from '../store/type';
import { Line } from 'react-chartjs-2';

class AppDetail extends Component {
  componentDidMount() {
    if (!this.props.socket.connected) {
      this.props.socket.off();
      this.props.socket.open();
    }

    this.props.socket.emit('req_full_history', {
      appIndex: this.props.appDetailsIndex
    });

    this.props.socket.on('res_fll_history', data => {
      this.props.updateFullHistory(data);
    });
  }

  render() {
    return (
      <div>
        <p>{this.props.appDetailsIndex}</p>
        {/* <p>{JSON.stringify(this.props.history)}</p> */}
        {/* <Line /> */}
        <Link to="/">
          <Button variant="primary">Go Back</Button>
        </Link>
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetail);
