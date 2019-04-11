import React, { Component } from 'react';

// Google API App__Login
import GoogleLogin from 'react-google-login';

// Styling
// import '../style/App.css';

// Redirect
import { Redirect } from 'react-router-dom';

// Axios
import axios from 'axios';

const path = '/core-frontend/';

const success = response => {
	console.log(response); // eslint-disable-line
};

var profileData = 'ORIGINAL VALUE';

class Login extends React.Component {
	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	success(response) {
		console.log(response);
		// axios({
		// 	method: 'get',
		// 	header: {
		// 		"Content-Type":"application/json",

		// 	},
		// 	data: {

		// 	}
		// }).then(res => {

		// });
	}

	testFail() {
		console.log('failed!\n');
	}

	render() {
		const { classes } = this.props;
		const responseGoogle = response => {
			console.log(response);
		};

		return (
			<div>
				<div class="App">
					<div class="App_LeftPanel">
						<div class="App__Login">
							<h1 class="description">
								Log in or Sign up with your Google Account
							</h1>
							<a href="./profile.html">Log In</a>
							<GoogleLogin
								clientId="994995244089-nd58pj7ep27sfkinl3rejpbnpd6l92rq.apps.googleusercontent.com"
								buttonText="Login"
								onSuccess={res => {
									this.testSuccess(res);
									success(res);
								}}
								onFailure={this.testFail}
							/>
						</div>
					</div>

					<div class="App__Form">
						<div class="FormTitle">
							<h1>Welcome to Badgr!</h1>
							<p>
								Create an account to experience the joy of
								earning badges and competing with your friends!
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default Login;
