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

const path = "/core-frontend/";

const logInScreen = window.location.href == "http://segalau.com/core-frontend/index.html";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           loggedIn: true,
           settingsDisplay: false
        }

        this.userLoggedIn = this.userLoggedIn.bind(this);

        // if(window.location.href != "http://segalau.com/core-frontend/index.html"){
        //     console.log("should display menu!\n");
        //     this.userLoggedIn();
        //     console.log(this.state.loggedIn);
        // }
     }


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  userLoggedIn(){
      console.log("app sees user logged in!\n");
      this.setState({
         loggedIn: true,
      });
  }

  render() {
    const { classes } = this.props;
    // const responseGoogle = (response) => {
    //   console.log(response);
    // }

    return (
        <div id="appMain">
            {logInScreen ? (<div/>) : (<DisplayMenu isLoggedIn={this.state.loggedIn} settingsDisplay={this.state.settingsDisplay}/>)}


            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div id="page-wrap">
                    <Route path = {path + "index.html"}
                        render = {(props) => <Login {... props} userLoggedIn = {this.userLoggedIn}/>} exact/>
                    <Route path = {path + "Profile.html"} component = {Profile} exact/>
                    <Route path = {path + "Search.html"} component = {Search} exact/>
                    <Route path = {path + "/Settings"} component = {Settings} exact/>
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
                    settingsDisplay={props.settingsDisplay}/>);
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
