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
        height: "400px",
        width: "400px",
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

var fullName;

var profileData;

var emailProfile;

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           loggedIn: true,
           settingsDisplay: false,
           list: ["badge1", "badge2", "badge3"],
           lastNameNull: true,
        }

        this.addSearchItem = this.addSearchItem.bind(this);
        this.removeSearchItem = this.removeSearchItem.bind(this);
     }


     handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      // ms.jenny.ly@gmail.com
      // Load event listener on search input on page load
      componentWillMount(){
          console.log("component will mount!\n");

          console.log(this.props);
          console.log(this.props.location.state.email);

          if(this.props.location.state.email){
              console.log("setting email value now!\n");
              emailProfile = this.props.location.state.email;
          } else {
              console.log("CANT FIND EMAIL!\n");
          }

          // axios({
          //     method: "get",
          //     url: "https://jeffchoy.ca/comp4711/badgr-app/users",
          //     headers: {
          //         "Authorization": "ca19f39c-8396-4534-8048-d7a406d9357a",
          //         "email" : emailProfile,
          //     }
          // }).then((res) => {
          //     console.log(res);
          // });


          // profileData = this.props.location.state;
          // console.log("PROFILE DATA : " + profileData);
          // // if no last name
          // if(this.props.location.state.lastName){
          //     console.log("LAST NAME IS NULL!\n");
          //     this.setState({
          //         lastNameNull: false,
          //     });
          // }
      }

     addSearchItem(){
         // add search item
     }


     removeSearchItem(){
        // remove search item
     }


    render(){

        const { classes } = this.props;

        console.log("rendering profile now!\n");

        return(
            <div>
                <MenuComponent
        			pageWrapId={'page-wrap'}
        			outerContainerId={'appMain'}
                    />
                <div id="page-wrap">
                    <div className="outerSearchContainer">
                        <MuiThemeProvider theme={theme}>
                            <div className="profileOuterContainer">
                                <div className="profileContainer">
                                    <Card className={classes.card} >
                                      <CardActionArea>
                                        <CardMedia
                                          className={classes.media}
                                          image={testProfilePic}
                                          title="Contemplative Reptile"
                                        />
                                        <CardContent
                                            className={classes.content}>
                                            <Typography variant="h3" gutterbottom>
                                                {fullName}
                                            </Typography>
                                            <Divider className={classes.dividerStyle}/>
                                            <Typography component="p">
                                              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                              across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                      </CardActionArea>
                                      <CardActions>

                                      </CardActions>
                                    </Card>
                                </div>
                                <div className="badgesContainer">
                                    <List className={classes.listRoot}>
                                        {this.state.list.map((badge) => (
                                            <ListItem button>
                                              <Avatar>
                                                <ImageIcon />
                                              </Avatar>
                                              <ListItemText primary={badge} />
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
