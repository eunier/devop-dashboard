import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import type from '../store/type';
import { Line } from 'react-chartjs-2';

class AppDetail extends Component {
  render() {
    return (
      <div>
        <p>{this.props.appDetailsIndex}</p>
        <Line></Line>
        <Link to="/">
          <Button
            variant="primary"
            onClick={() => this.props.resetAppDetailsIndex()}
          >
            Go Back
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appDetailsIndex: state.appDetailsIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetAppDetailsIndex: () => {
      dispatch({ type: type.RESET_APP_DETAILS_INDEX });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetail);
