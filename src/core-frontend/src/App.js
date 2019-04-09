import React, { Component } from 'react';

// Google API App__Login
import GoogleLogin from 'react-google-login';

// React Router
import {BrowserRouter, Route} from "react-router-dom";

// React Router Paths
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Settings from './pages/Settings';

class App extends React.Component {

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
        <BrowserRouter>
            <div>
                <Route path = "/" component = {Home} exact/>
                <Route path = "/Profile" component = {Profile} exact/>
                <Route path = "/Search" component = {Search} exact/>
                <Route path = "/Settings" component = {Settings} exact/>
            </div>
        </BrowserRouter>
    );
  }
}


// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default App;
