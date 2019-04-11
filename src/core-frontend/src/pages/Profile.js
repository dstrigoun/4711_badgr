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
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },

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

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           loggedIn: true,
           settingsDisplay: false,
           list: [],
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
      componentDidMount(){
          console.log("component will mount!\n");
          // Add event listeners (search bar)
          // document.getElementById("searchInput").addEventListener("input", function(e){
          //   console.log(this.value);
          //   axios.get("https://jeffchoy.ca/comp4711/badgr-app/users", axiosConfig)
          //       .then(function(response){
          //           console.log("Success! : " + response.data["firstName"] + " \n");
          //       })
          //       .catch(function(error){
          //           console.log("axios error!\n");
          //       })
          // });
      }

     addSearchItem(){
         // add search item
     }


     removeSearchItem(){
        // remove search item
     }


    render(){

        const { classes } = this.props;

        return(

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
                                <CardContent>
                                    <Typography variant="h1" gutterbottom>
                                        Segal Au
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

                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Profile);
