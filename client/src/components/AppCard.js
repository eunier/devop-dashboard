import React from 'react';
import { connect } from 'react-redux';
import { CardColumns, Card } from 'react-bootstrap';

class AppCard extends React.Component {
  render() {
    return (
      <div>
        <CardColumns>
          {this.props.appsStatusOverall.map((app, key) => {
            return (
              <Card
                key={key}
                bg={getColor(app.status)}
                text="white"
                className="text-left p-3"
              >
                <Card.Title>{app.name}</Card.Title>
                <Card.Text>{app.status}</Card.Text>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    );
  }
}

const getColor = status => {
  switch (status) {
    case 'Ok':
      return 'success';
    case 'Major':
      return 'warning';
    case 'Critical':
      return 'danger';
    default:
      return 'secondary';
  }
};

const mapStateToProps = state => {
  return { appsStatusOverall: state.appsStatusOverall };
};

export default connect(mapStateToProps)(AppCard);
