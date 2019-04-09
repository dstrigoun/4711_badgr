import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

// GOOGLE icons
import MaterialIcon, {colorPalette} from 'material-icons-react';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


library.add(
    faGlobeAmericas,
    faUserCircle,
    faSignOutAlt,
    faSearch
);


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SettingComponent extends React.Component {
    constructor(props) {
        super(props);

     }



     render(){
         const { classes } = this.props;
            return (
              <div>
                <Dialog
                  fullScreen
                  open={this.props.open}
                  onClose={this.props.closeSettings}
                  TransitionComponent={Transition}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <Typography variant="h6" color="inherit" className={classes.flex}>
                        SETTINGS
                      </Typography>
                      <Button color="inherit" onClick={this.handleClose}>
                        save
                      </Button>
                      <IconButton color="inherit" onClick={this.props.closeSettings} aria-label="Close">
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>




                  <List>
                    <ListItem button>
                        <DialogTitle id="form-dialog-title">Change User Name </DialogTitle>
                        <DialogContent>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Enter your new user name..."
                              type="email"
                              fullWidth
                            />
                        </DialogContent>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText primary="OTHER SETTINGS" secondary="TODO" />
                    </ListItem>
                  </List>
                </Dialog>
              </div>
            );
      }
 }

 SettingComponent.propTypes = {
   classes: PropTypes.object.isRequired,
 };

export default withStyles(styles)(SettingComponent);
