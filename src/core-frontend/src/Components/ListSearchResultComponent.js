import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

// List Component
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// Expansion panel Components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';


// GOOGLE icons
import MaterialIcon, {colorPalette} from 'material-icons-react';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Test profile picture
import testProfilePic from '../images/exampleProfilePic.jpg';


// Style
import "../style/SearchResult.css";

library.add(
    faGlobeAmericas,
    faUserCircle,
    faSignOutAlt,
    faSearch
);


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline-block',
  },
  listItem: {
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});


class ListSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []   //names
        }
     }

     componentWillMount(){
         console.log(this.props.listResults);
         this.setState({
             searchResults: this.props.listResults,
         })
     }


     render(){
        const { classes } = this.props;
        const resultsList = this.state.searchResults;
        const { expanded } = this.state;

        return (
            <div className = "ListOuterContainer">
              <List className = {classes.root}>
                {resultsList.map((result) => (
                    <ListItem className={classes.listItem}alignItems = "flex-start" button>

                        <ExpansionPanel  >
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                              <ListItemAvatar>
                                <Avatar alt="Doofus Goofus" src={result[0]}/>
                              </ListItemAvatar>
                              <ListItemText
                                primary= {
                                  <Typography variant="overline" component="span" color="textPrimary" className={classes.inline}>
                                      {result[1]}
                                  </Typography>
                                }/>
                          </ExpansionPanelSummary>

                          <Divider/>
                          <ExpansionPanelActions>
                              <Button variant="outlined" color="primary" className={classes.button}
                                onClick={() => this.props.redirectToSpecific(result[2])}>
                                Visit Profile
                              </Button>
                          </ExpansionPanelActions>
                        </ExpansionPanel>
                    </ListItem>
                ))}
             </List>
          </div>
        );
     }
 }

 ListSearchResult.propTypes = {
   classes: PropTypes.object.isRequired
 };

export default withStyles(styles)(ListSearchResult);
