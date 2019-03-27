import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Connect React Component to Redux Store
import {connect} from 'react-redux';
// Test Action (Redux testAction)
import {testAction} from './actions/testAction';


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  testAction: () => dispatch(testAction())
})

class App extends Component {


  


  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload (edited).
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
