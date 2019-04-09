import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Styling
import '../style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Settings.css';

class Settings extends React.Component {


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;


    return (
      <Container>
        <Row>
          <Col>
          </Col>

          <Col xs={10}>
            <h1>Register for Badgr </h1>
          </Col>

          <Col>
          </Col>
        </Row>
      </Container>
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default Settings;
