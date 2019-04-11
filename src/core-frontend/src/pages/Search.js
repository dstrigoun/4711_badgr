import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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
          document.getElementById("searchInput").addEventListener("input", function(e){

              let objSearch = document.getElementById("searchInput");
              console.log(objSearch.value);



                axios({
                    method: "get",
                    url: "https://jeffchoy.ca/comp4711/badgr-app/searchusers",
                    headers: {
                        'Content-Type' : 'application/json',
                        "query" : objSearch.value,
                        "Authorization": "ca19f39c-8396-4534-8048-d7a406d9357a",
                        "externalapp" : "whereisyou",
                        "score" : 0,
                        "curDate" : "2019-04-11",
                    },
                }).then((res) => {
                    console.log(res);
                    res.searchResult.map((result) => {
                        axios({
                            method: "get",
                            url: "https://jeffchoy.ca/comp4711/badgr-app/users",
                            headers: {
                                "Authorization": "ca19f39c-8396-4534-8048-d7a406d9357a",
                                "email" : result,
                            }
                        }).then((res) => {
                            console.log(res);

                            // Push to result, then queueResults

                            if (res.lastName){
                                fullName = res.firstName + " " + res.lastName;
                            } else {
                                fullName = res.firstName;
                            }

                            result = [res.picture, fullName, res.email];
                            queueResults.push([result]);

                        });
                    });

                    this.setState({
                        list: queueResults,
                    });
            });
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

     redirectToSpecific(email){
         this.setState({
             redirectToSpecific: true,
             specificEmail: email,
         });
         console.log("Set redirect from Profile to Profile!\n");
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
                    pathname: this.state.destUrl,
                    state: {
                        email: emailSearch,
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
                                    redirectToSpecific = {this.redirectToSpecific}/>
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
