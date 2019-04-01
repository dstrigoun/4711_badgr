import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';
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
      <div class="App">
        <div class="App_LeftPanel">
            <div class="App__Login">
              <h1 class="description">Log in or Sign up with your Google Account</h1>
              <a href="./profile.html">Log In</a>
              {/*<GoogleLogin
              clientId="821375497611-ee3ojh2v4urr7jif82o4sbt3vmsbk6vp.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />*/}
            </div>
        </div>
        
        <div class ="App__Form">
          <div class="FormTitle">
            <h1>Welcome to Badgr!</h1>
            <p>Create an account to experience the joy of earning badges and competing with your friends!</p>
          </div>

        </div> 
      </div>
      
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default App;
