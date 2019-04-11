import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "../style/Search.css";

// Axios
import axios from 'axios';

// Redirect
import { Redirect } from 'react-router-dom';


// List of Search Results
import ListSearchResult from '../Components/ListSearchResultComponent.js';

import MenuComponent from '../Components/MenuComponent.js';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      position: "absolute",
      left: "5%",
      top: "5%",
      width: "90%",
    },
    searchContainerBox: {
        position: "relative",

        width: "70%",
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });



  var emailSearch;

  var result;
  var queueResults;
  var fullName = "";

  const profilePath = "/core-frontend/Profile.html";
  const searchPath = "/core-frontend/Search.html";
  const settingsPath = "/core-frontend/Settings.html";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           loggedIn: true,
           settingsDisplay: false,
           list: [],
           test: "",
           redirectToSpecific: false,
           specificEmail: "",
           redirectToNew: false,
           destUrl: ""
        }

        this.addSearchItem = this.addSearchItem.bind(this);
        this.removeSearchItem = this.removeSearchItem.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.redirectToSearch = this.redirectToSearch.bind(this);
        this.redirectToSettings = this.redirectToSettings.bind(this);
        this.redirectToSpecificFunc = this.redirectToSpecificFunc.bind(this);
     }


     handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };


      componentWillMount(){
          emailSearch = this.props.location.state.email;
          result = [];
          queueResults = [];
      }
      // ms.jenny.ly@gmail.com
      // Load event listener on search input on page load
      componentDidMount(){
          console.log("component will mount!\n");
          // reset queueResults
          queueResults = [];

          // Add event listeners (search bar)
          document.getElementById("searchInput").addEventListener("keypress", (e) =>{

              let objSearch = document.getElementById("searchInput");
              console.log(objSearch.value);

              var key = e.which || e.keyCode;
              if(key == 13){
                  axios({
                      method: "get",
                      url: "https://jeffchoy.ca/comp4711/badgr-app/searchusers",
                      headers: {
                          'Content-Type' : 'application/json',
                          "query" : objSearch.value,
                          "externalapp" : "whereisyou",
                          "score" : 1,
                          "currDate" : "2019-04-10",
                      },
                  })
                  .then((res) => {
                      console.log(res);
                      res.data.searchResult.map((result) => {
                          console.log(result);
                          axios({
                              method: "get",
                              url: "https://jeffchoy.ca/comp4711/badgr-app/users",
                              headers: {
                                  "Authorization": "ca19f39c-8396-4534-8048-d7a406d9357a",
                                  "email" : result,
                              }
                          })
                          .then((res) => {
                              console.log(res.data);

                              // Push to result, then queueResults

                              if (res.data.lastName){
                                  fullName = res.data.firstName + " " + res.data.lastName;
                              } else {
                                  fullName = res.data.firstName;
                              }

                              result = [res.data.picture, fullName, res.data.email, res.data.description];
                              queueResults.push([result ]);
                              console.log(queueResults);
                              this.setState({
                                  test: queueResults,
                                  list: queueResults
                              });

                              console.log(this.state.list);




                          });


                      });


                  });
              }
        });     // document get element by id function


      }

     addSearchItem(){
         // add search item
     }


     removeSearchItem(){
        // remove search item
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

     redirectToSpecificFunc = (email) => {
         this.setState({
             redirectToSpecific: true,
             specificEmail: email,
         });
         console.log("Set redirect from Profile to Profile!\n");
         console.log(email);
         console.log(this.state.specificEmail);
     }


    render(){

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
                        email: emailSearch,
                    }
                }}/>
            );
        }

        if(this.state.redirectToSpecific){
            console.log("redirecting to specific!\n");
            this.setState({
                redirectToSpecific: false,
            });
            return(
                <Redirect to={{
                    pathname: profilePath,
                    state: {
                        email: this.state.specificEmail,
                    }
                }}/>
            )
        }

        return(
            <div>
                <MenuComponent
        			pageWrapId={'page-wrap'}
        			outerContainerId={'appMain'}
                    email={emailSearch}
                    redirectToProfile={this.redirectToProfile}
                    redirectToSearch={this.redirectToSearch}
                    redirectToSettings={this.redirectToSettings}/>
                <div id="page-wrap">
                    <div className="outerSearchContainer">
                        <div className="searchContainer">
                            <TextField
                                id="searchInput"
                                label="Search for users"
                                type="search"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                primary="red"
                                secondary="red"/>

                            <div className = "listContainer">
                                <ListSearchResult
                                    listResults = {this.state.list}
                                    redirectToSpecificFunc = {this.redirectToSpecificFunc}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Search);
