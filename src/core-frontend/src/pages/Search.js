import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import "../style/Search.css";

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      position: "absolute",
      left: "15%",
      top: "10%",
      width: "70%",
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });

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

     addSearchItem(){

     }


     removeSearchItem(){

     }


    render(){

        const { classes } = this.props;

        return(
            <div class="outerSearchContainer">
                <div class="searchContainer">
                    <TextField
                        id="outlined-search"
                        label="Search for users"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        primary="red"
                        secondary="red"
                        />

                </div>
            </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Search);
