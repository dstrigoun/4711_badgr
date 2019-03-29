import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Connect React Component to Redux Store
import {connect} from 'react-redux';
// Test Action (Redux testAction)
import {testAction} from './actions/testAction';


// Material UI

// Top navbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

// Styling

import './style/Search.css';
import { makeStyles } from '@material-ui/styles'; 
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';
import amber from '@material-ui/core/colors/amber';


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  testAction: () => dispatch(testAction())
});

const StyledTextField = styled(TextField)({
    width: (window.innerWidth * 0.5),
    height: 48,
    primary: amber
});

const theme = createMuiTheme({
  palette: {
    primary: amber,
  },
});


const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 35,
  padding: '0 30px',
});


const styles = theme => ({
  '@global': {
    body: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    
  },
  appBarNavBtn: {
    float: "right",
  },
  searchContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: window.innerHeight*0.3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textFieldStyle:{
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  profileBtn: {
    position: "absolute",
    right: "10px",
    float: "left",
  }
});




class App extends React.Component {

  
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  
  render() {
    const { classes } = this.props;

    return (
      <div className="App">

        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" color="inherit" noWrap className={classes.toolbarTitle}>
              Badgr
            </Typography>
            
            <Button 
              className={classes.profileBtn}
              variant="outlined">Profile Page</Button>
          </Toolbar>
        </AppBar>
        <header className="App-header">
          <form className={classes.searchContainer} noValidate autoComplete="off">
            <MuiThemeProvider theme={theme}>           
              <StyledTextField
                id="standard-search"
                label="Search for users"
                placeholder="Type in username"
                type="search"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                color="white"
              />
            </MuiThemeProvider>
          </form>
          
        </header>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default withStyles(styles)(App);
