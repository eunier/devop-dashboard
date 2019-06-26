import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

class SideLeftPanel extends Component {
  render() {
    const dataLabels = [
      'Incident',
      'Impacted for',
      'MTTA',
      'Anomalist Features'
    ];

    return (
      <div>
        <Card bg="dark" style={{ width: '12rem', alignItems: 'center' }}>
          <div style={{ color: '#fff'}}>
            <h3>{this.props.name}</h3>
          </div>
          {this.props.currentData.map((elem, i) => {
            return (
              <Card key={i} bg="light" style={{ width: '9rem' }}>
                <Card.Body>
                  <Card.Text>
                    {dataLabels[i]}
                    <br />
                    {elem}
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.appsStatusHistory[state.appsStatusHistory.length - 1].name,
    currentData: [
      state.appsStatusHistory[state.appsStatusHistory.length - 1].incidents,
      state.appsStatusHistory[state.appsStatusHistory.length - 1]
        .impactedSeconds,
      state.appsStatusHistory[state.appsStatusHistory.length - 1].mttaCount,
      state.appsStatusHistory[state.appsStatusHistory.length - 1]
        .anomalistFeatures
    ]
  };
};

export default connect(mapStateToProps)(SideLeftPanel);
