import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import axios from "axios";
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

// Styling
import '../style/App.css';
import '../style/Settings.css';
import 'react-quill/dist/quill.snow.css';

// Redirect
import { Redirect } from 'react-router-dom';



// icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import MenuComponent from '../Components/MenuComponent.js';

const config ={
  apiKey: "AIzaSyADQwUkVDPsqWZR6WG8mx0955TBa0Av0rM",
  authDomain: "testerino-ccc07.firebaseapp.com",
  databaseURL: "https://testerino-ccc07.firebaseio.com",
  projectId: "testerino-ccc07",
  storageBucket: "testerino-ccc07.appspot.com",
  messagingSenderId: "362691293717"
};
firebase.initializeApp(config);
library.add(faArrowLeft);

var emailSettings;

var fullname = "";

var profileData;

const profilePath = "/core-frontend/Profile.html";
const searchPath = "/core-frontend/Search.html";
const settingsPath = "/core-frontend/Settings.html";

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        firstName: '',
        lastName: '',
        description: '',
        picture: '',
        filename: '',
        isUploading: false,
        progress: 0,
        fullNameState: "",
        profileDesc: "",
        profilePicture: "",
        redirectToNew: false,
        destUrl: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWYSIWYG = this.handleWYSIWYG.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.redirectToSearch = this.redirectToSearch.bind(this);
    this.redirectToSettings = this.redirectToSettings.bind(this);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  }

  handleUploadStart () {
    this.setState({isUploading: true, progress: 0});
  }

  handleProgress (progress) {
    this.setState({progress: progress});
  }

  handleUploadError(error) {
    this.setState({isUploading: false });
    console.error(error);
  }

  handleUploadSuccess(filename) {
    this.setState({filename: filename, progress: 100, isUploading: false});
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ picture: url}));
  };

  handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit(event) {
    console.log(this.state);
    axios({
      method: "put",
      url: "https://jeffchoy.ca/comp4711/badgr-app/users",
      data: {
        email: emailSettings,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        description: this.state.description,
        picture: this.state.picture,
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": "ca19f39c-8396-4534-8048-d7a406d9357a",
      }
    }).then((res)=> {
        if (res.status == 200) {
          alert("success!");
        }
    });
  }

  componentWillMount(){
      emailSettings = this.props.location.state.email;
  }

  componentDidMount() {

    let headers = {'Email': 'testo@gmail.com'}

    let data = {}
    axios({
      method: 'get',
      url: 'https://jeffchoy.ca/comp4711/badgr-app/users',
      //data: {email: 'jefftest@gmail.com', firstName:'el', lastName:'jefe'},
      headers: {
        'email': 'ms.jenny.ly@gmail.com', //TODO: user current user's email
        'Content-Type': 'application/json'}
      })
      .then(res=> {
        this.setState({email: res.data.email});
        this.setState({firstName: res.data.firstName});
        this.setState({lastName: res.data.lastName});
        this.setState({description: res.data.description});
        this.setState({picture: res.data.picture});
        console.log(this.state);
      })
  }

  handleWYSIWYG(value) {
    this.setState({description: value});
  }

  redirectToProfile(){
      this.setState({
          redirectToNew: true,
          destUrl: profilePath
      });
      console.log("Set redirect from Profile to Profile!\n");
  }

  redirectToSearch(){
      this.setState({
          redirectToNew: true,
          destUrl: searchPath
      });
      console.log("Set redirect from Profile to Search!\n");
  }

  redirectToSettings(){
      this.setState({
          redirectToNew: true,
          destUrl: settingsPath
      });
      console.log("Set redirect from Profile to Settings!\n");
  }

  render() {
    const { classes } = this.props;

    if(this.state.redirectToNew){
        console.log("redirecting to new from Profile!\n");
        this.setState({
            redirectToNew: false,
        });
        return(
            <Redirect to={{
                pathname: this.state.destUrl,
                state: {
                    email: emailSettings,
                }
            }}/>
        );
    }


    if(this.state.fullNameState == ""){
        axios({
            method: "get",
            url: "https://jeffchoy.ca/comp4711/badgr-app/users",
            headers: {
                "Authorization": "ca19f39c-8396-4534-8048-d7a406d9357a",
                "email" : emailSettings,
            }
        }).then((res) => {
            console.log("THIS IS THE RESPONSE!\n");
            console.log(res);
            console.log(res.data);
            profileData = res.data;


            this.setState({
                fullNameState: "lololol",
                profileDesc: res.data.description,
                profilePicture: res.data.picture,
            });
        });
    }

    return (
        <div>
            <MenuComponent
                pageWrapId={'page-wrap'}
                outerContainerId={'appMain'}
                email={emailSettings}
                redirectToProfile={this.redirectToProfile}
                redirectToSearch={this.redirectToSearch}
                redirectToSettings={this.redirectToSettings}/>
            <div id="page-wrap">
                <div className="settingOuterContainer">
                <div className="settingContainer">


                      <div id="title" className="" >
                        <a className="settingsSub" href="/Profile">
                          <FontAwesomeIcon icon={faArrowLeft} id="back" size="2x"/><span></span>
                        </a>
                        <h1 className="settingsSub">Edit Profile</h1>
                      </div>

                      <div id="profile-details">
                        <h4 className="subtitle"> Profile Details</h4>
                        <div className="imgContainer">
                          {this.state.picture !== '' && <img className="avatar" src={this.state.picture} />}
                          <label className="buttonLabel">
                            Update Image
                            <FileUploader
                              hidden
                              accept="image/*"
                              name="picture"
                              randomizeFilename
                              storageRef={firebase.storage().ref("images")}
                              onUploadStart={this.handleUploadStart}
                              onUploadError={this.handleUploadError}
                              onUploadSuccess={this.handleUploadSuccess}
                              onProgress={this.handleProgress}
                            />
                          </label>


                        </div>

                        <div className="inputcontainer">
                          <input id="email" name="email" type="text" className="primaryKey inputField" value={emailSettings} readOnly/>
                          <label className="inputLabel" htmlFor="email">Email</label>
                        </div>

                        <div className="inputcontainer">
                          <input id="firstName" name="firstName" type="text" className="inputField" value={this.state.firstName} onChange={this.handleChange}/>
                          <label className="inputLabel" htmlFor="firstName">First Name</label>
                        </div>

                        <div className="inputcontainer">
                          <input id="lastName" name="lastName"type="text" className="inputField" value={this.state.lastName} onChange={this.handleChange} />
                          <label className="inputLabel" htmlFor="lastName">Last Name</label>
                        </div>
                        <br/>

                        <div className="wysiwygContainer">
                          <ReactQuill id="description" value={this.state.description}
                          onChange={this.handleWYSIWYG} className="wysiwyg" />
                          <label  className="inputLabelWYSIWYG" htmlFor="lastName">Description:</label>
                        </div>
                      </div>
                      <div className="buttonLabel" onClick={this.handleSubmit}>Submit</div>
                    </div>


              </div>
          </div>
      </div>
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default Settings;
