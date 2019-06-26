import React from 'react';
import { connect } from 'react-redux';
import { CardColumns, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type from '../store/type';
import color from './utils/color';

class AppCard extends React.Component {
  render() {
    return (
      <div>
        <CardColumns>
          {this.props.appsStatusOverall.map((app, key) => {
            return (
              <Link key={key} to="/detail">
                <Card
                  key={key}
                  bg={color(app.status)}
                  text="white"
                  className="text-left p-3"
                  onClick={() => {
                    this.props.setAppDetailsIndex(key);
                    this.props.setDetailsRequestFlag(true);
                  }}
                >
                  <Card.Title>{app.name}</Card.Title>
                  <Card.Text>{app.status}</Card.Text>
                </Card>
              </Link>
            );
          })}
        </CardColumns>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { appsStatusOverall: state.appsStatusOverall };
};

const mapDispatchToProps = dispatch => {
  return {
    setAppDetailsIndex: payload => {
      dispatch({ type: type.SET_APP_DETAILS_INDEX, payload });
    },
    setDetailsRequestFlag: payload => {
      dispatch({ type: type.SET_DETAILS_REQUEST_FLAG, payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppCard);
