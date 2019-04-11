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

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};
		this.testSuccess = this.testSuccess.bind(this);
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	testSuccess(response) {
		console.log('signed in!\n');
		this.props.userLoggedIn();
		this.setState({
			isLoggedIn: true
		});

		console.log(response);

		let userEmail = response.profileObj.email;

		axios({
			method: 'post',
			url: 'https://jeffchoy.ca/comp4711/badgr-app/users',
			headers: {
				email: response.profileObj.email,
				'Content-Type': 'application/json',
				Authorization: 'ca19f39c-8396-4534-8048-d7a406d9357a'
			},
			data: {
				email: response.profileObj.email,
				firstName: response.profileObj.givenName,
				lastName: response.profileObj.familyName,
				description: ''
			}
		}).then(
			axios({
				method: 'get',
				url: 'https://jeffchoy.ca/comp4711/badgr-app/users',
				headers: {
					email: response.profileObj.email,
					Authorization: 'ca19f39c-8396-4534-8048-d7a406d9357a'
				}
			}).then(res => {
				this.set;
			})
		);

		// window.location.href = 'http://segalau.com/core-frontend/Profile.html';
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
