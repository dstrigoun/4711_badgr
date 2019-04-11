import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import "../style/Search.css";

// Axios
import axios from 'axios';

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


  // Axios headers
  const axiosConfig = {
      headers: {
          'Content-Type' : 'application/json',
          'Email' : 'ms.jenny.ly@gmail.com'
      }
  };

class Search extends React.Component {

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
          document.getElementById("searchInput").addEventListener("input", function(e){
            console.log(this.value);
            axios.get("https://jeffchoy.ca/comp4711/badgr-app/users", axiosConfig)
                .then(function(response){
                    console.log("Success! : " + response.data["firstName"] + " \n");
                })
                .catch(function(error){
                    console.log("axios error!\n");
                })
          });
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
            <div>
                <MenuComponent
        			pageWrapId={'page-wrap'}
        			outerContainerId={'appMain'}/>
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
                                    />
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
