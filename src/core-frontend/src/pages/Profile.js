import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import "../style/Profile.css"

// Axios
import axios from 'axios';

// Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';

import testProfilePic from '../images/exampleProfilePic.jpg';

// List of Search Results
import ListSearchResult from '../Components/ListSearchResultComponent.js';

// Redirect
import { Redirect } from 'react-router-dom';

// Badges Tile List

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import MenuComponent from '../Components/MenuComponent.js';

const styles = theme => ({
    card: {
        maxWidth: "80%",
        height: "100%",
        borderRadius: "25px",
        border: "0px",
        marginLeft: "5%",
        marginTop: "5%",
        boxShadow: "0, 0, 0, 0",
        padding: "20px"
    },
    media: {
        height: "250px",
        width: "250px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "50%",
    },
    dividerStyle: {
        marginTop: "15px",
        marginBottom: "10px",
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    listRoot:{
        width: '100%',
        maxWidth: 500,
        marginTop: "10%",
        backgroundColor: theme.palette.background.paper,
        maxHeight: "90%",
        overflow: "auto",
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    content: {
        marginTop: "5%",
        height: "40%",
    }

});

const theme = createMuiTheme({
  palette: {
    // primary: { main: purple[500] }, // Purple and green play nicely together.
    // secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});


  // Axios headers
  const axiosConfig = {
      headers: {
          'Content-Type' : 'application/json',
          'Email' : 'ms.jenny.ly@gmail.com'
      }
  };

var fullName = "";

var profileData;

var emailProfile;

var listRecordsTotal;

const profilePath = "/core-frontend/Profile.html";
const searchPath = "/core-frontend/Search.html";
const settingsPath = "/core-frontend/Settings.html";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           loggedIn: true,
           settingsDisplay: false,
           list: [],
           lastNameNull: true,
           fullNameState: "",
           profileDesc: "",
           profilePicture: "",
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

      // ms.jenny.ly@gmail.com
      // Load event listener on search input on page load
      componentWillMount(){
          console.log("Profile : component will mount!\n");

          console.log(this.props);
          console.log(this.props.location.state.email);

          if(this.props.location.state.email){
              console.log("setting email value now!\n");
              emailProfile = this.props.location.state.email;
          } else {
              console.log("CANT FIND EMAIL!\n");
          }
          listRecordsTotal = [];

      }

      componentDidMount(){



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

     // redirectToProfile(){
     //     this.setState({
     //         redirectToNew: true,
     //         destUrl: profilePath
     //     });
     //     console.log("Set redirect from Profile to Profile!\n");
     // }


    render(){

        if(this.state.fullNameState == ""){
            axios({
                method: "get",
                url: "https://jeffchoy.ca/comp4711/badgr-app/users",
                headers: {
                    "Authorization": "ca19f39c-8396-4534-8048-d7a406d9357a",
                    "email" : emailProfile,
                }
            }).then((res) => {
                console.log("THIS IS THE RESPONSE!\n");
                console.log(res);
                console.log(res.data);
                profileData = res.data;

                if(profileData.lastName){
                    fullName = profileData.firstName + profileData.lastName;
                } else {
                    fullName = profileData.firstName;
                }
                console.log(fullName);
                this.setState({
                    fullNameState: fullName,
                    profileDesc: res.data.description,
                    profilePicture: res.data.picture,
                });
                document.getElementById("profileDescId").innerHTML = this.state.profileDesc;
            });

            axios({
                method: "get",
                url: "https://whereisyou.herokuapp.com/badges.php",
                headers: {
                    "Content-Type" : "application/json",
                    "userId" : emailProfile,
                    "key" : "bbc8e0e1-2dd4-4bc6-9f7d-1a0b3c5a3668"
                }
            }).then((res) => {
                res.records.map((record) => {
                    listRecordsTotal.push(record);
                });
                this.setState({
                    list: listRecordsTotal,
                })
            });
        }

        const { classes } = this.props;

        console.log("rendering profile now!\n");

        if(this.state.redirectToNew){
            console.log("redirecting to new from Profile!\n");
            this.setState({
                redirectToNew: false,
            });
            return(
                <Redirect to={{
                    pathname: this.state.destUrl,
                    state: {
                        email: emailProfile,
                    }
                }}/>
            );
        }

        return(
            <div>
                <MenuComponent
        			pageWrapId={'page-wrap'}
        			outerContainerId={'appMain'}
                    email={emailProfile}
                    redirectToProfile={this.redirectToProfile}
                    redirectToSearch={this.redirectToSearch}
                    redirectToSettings={this.redirectToSettings}/>
                <div id="page-wrap">
                    <div className="outerSearchContainer">
                        <MuiThemeProvider theme={theme}>
                            <div className="profileOuterContainer">
                                <div className="profileContainer">
                                    <Card className={classes.card} >
                                      <CardActionArea>
                                        <CardMedia
                                          className={classes.media}
                                          image={this.state.profilePicture}
                                          title="Contemplative Reptile"
                                        />
                                        <CardContent
                                            className={classes.content}>
                                            <Typography variant="h3" gutterbottom>
                                                {this.state.fullNameState}
                                            </Typography>
                                            <Divider className={classes.dividerStyle}/>
                                            <div id="profileDescId" className="profileDescId"></div>

                                        </CardContent>
                                      </CardActionArea>
                                    </Card>
                                </div>
                                <div className="badgesContainer">
                                    <List className={classes.listRoot}>
                                        {this.state.list.map((badge) => (
                                            <ListItem button>
                                              <Avatar>
                                                <ImageIcon />
                                              </Avatar>
                                              <ListItemText primary={badge[0]} secondary ={badge[1]} />
                                            </ListItem>
                                        ))}
                                  </List>
                                </div>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>

        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Profile);
