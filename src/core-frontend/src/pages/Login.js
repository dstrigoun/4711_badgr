import React, { Component } from 'react';

// Google API App__Login
import GoogleLogin from 'react-google-login';

// Styling
// import '../style/App.css';
import Button from '@material-ui/core/Button';

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
	constructor(props){
		super(props);

		this.state = {
			goToProfile: false,
			responseObj: "original value",
		};

		this.testSuccess = this.testSuccess.bind(this);
	}
	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	testSuccess(response) {
		console.log(response);

		let responseObj = response.profileObj;
		let nothing = "";

		// try to add user
		axios({
			method: 'post',
			url: 'https://jeffchoy.ca/comp4711/badgr-app/users',
			headers: {
				'Content-Type': 'application/json',
				"Authorization" : "ca19f39c-8396-4534-8048-d7a406d9357a"
			},
			data: {
				email: responseObj.email,
				firstName: responseObj.givenName,
				lastName: responseObj.givenName,
				description: nothing
			}
		}).then(() => {
			console.log("Post executed!\n");

			this.setState({
				responseObj: responseObj,
				goToProfile: true,
			})
		});



	}

	testFail() {
		console.log('failed!\n');
	}

	render() {
		const { classes } = this.props;
		const responseGoogle = response => {
			console.log(response);
		};

		if(this.state.goToProfile){
			console.log("REDIRECTING TO PROFILE!\n");
			return(<Redirect to={{
					pathname: "/core-frontend/Profile.html",
					state: {
						email: this.state.responseObj.email
					}
			}}/>);
		}


		return (
			<div>
				<div class="App">
					<div class="App_LeftPanel">
							<div class="App__Login">
							<h1 class="description">
								Log in or Sign up with your Google Account
							</h1>
							<GoogleLogin
								clientId="994995244089-nd58pj7ep27sfkinl3rejpbnpd6l92rq.apps.googleusercontent.com"
								buttonText="Login"
								
								onSuccess={this.testSuccess}
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
