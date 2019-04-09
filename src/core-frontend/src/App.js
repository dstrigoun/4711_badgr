import React, { Component } from 'react';

// Google API App__Login
import GoogleLogin from 'react-google-login';

// React Router
import {BrowserRouter, Route} from "react-router-dom";

// React Router Paths
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Settings from './pages/Settings';

import MenuComponent from './Components/MenuComponent.js';
import SettingComponent from './Components/SettingComponent';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           loggedIn: true,
           settingsDisplay: false
        }
     }


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };



  render() {
    const { classes } = this.props;
    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
        <div id="appMain">
            <DisplayMenu isLoggedIn={this.state.loggedIn}/>

            <BrowserRouter>
                <div id="page-wrap">
                    <Route path = "/" component = {Login} exact/>
                    <Route path = "/Profile" component = {Profile} exact/>
                    <Route path = "/Search" component = {Search} exact/>
                    <Route path = "/Settings" component = {Settings} exact/>
                </div>
            </BrowserRouter>
        </div>
    );
  }
}

function  DisplayMenu(props){
     const isLoggedIn = props.isLoggedIn;
     if(isLoggedIn){
         return(<MenuComponent
                    pageWrapId={"page-wrap"}
                    outerContainerId={"appMain"}
                    />);
     } else {
         return(<div></div>);
     }
 }

 function DisplaySettings(props){
     const isLoggedIn = props.isLoggedIn;
     if(isLoggedIn){
         return(<SettingComponent pageWrapId={"page-wrap"} outerContainerId={"appMain"} right/>);
     } else {
         return(<div></div>);
     }
 }

// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default App;
