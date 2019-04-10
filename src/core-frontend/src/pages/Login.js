import React, { Component } from 'react';

// Google API App__Login
import GoogleLogin from 'react-google-login';

// Styling
import '../style/App.css';

// Redirect
import { Redirect } from 'react-router-dom'


const path = "/core-frontend/";

class Login extends React.Component {
    state = {
        isLoggedIn: false
    }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  testSuccess(){
      console.log("signed in!\n");
      this.props.userLoggedIn;
      this.setState({
         isLoggedIn: true 
      });
  }

  testFail(){
      console.log("failed!\n");
  }

  redirectToProfile(){
      if(this.state.isLoggedIn){
          return <Redirect to={path + "Profile.html"}/>;
      }
  }

  render() {
    const { classes } = this.props;
    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div>
        {this.redirectToProfile}
          <div class="App">
            <div class="App_LeftPanel">
                <div class="App__Login">
                  <h1 class="description">Log in or Sign up with your Google Account</h1>
                  <a href="./profile.html">Log In</a>
                  *<GoogleLogin
                  clientId="994995244089-nd58pj7ep27sfkinl3rejpbnpd6l92rq.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.testSuccess}
                  onFailure={this.testFail}
                />*
                </div>
            </div>

            <div class ="App__Form">
              <div class="FormTitle">
                <h1>Welcome to Badgr!</h1>
                <p>Create an account to experience the joy of earning badges and competing with your friends!</p>
              </div>

            </div>
          </div>
      </div>

    );
  }
}


// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default Login;
