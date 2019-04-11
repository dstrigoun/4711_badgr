import React from "react";
import { elastic as Menu } from "react-burger-menu";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// GOOGLE icons
import MaterialIcon, {colorPalette} from 'material-icons-react';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';


// SETTING
import SettingComponent from './SettingComponent';

// REDIRECT
import { Redirect } from 'react-router-dom';

// Google Log out
import { GoogleLogout } from 'react-google-login';

import axios from 'axios';


// STYLES
import "../style/MenuDivider.css"
import "../style/MenuStyle.css"


library.add(
    faGlobeAmericas,
    faUserCircle,
    faSignOutAlt,
    faSearch,
    faCogs
);

const path = "/core-frontend/";

var emailMenu;

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           // loggedIn: true,
           settingsDisplay: false,
           destUrl: "",
           redirected: false,
        }
        this.test = this.test.bind(this);
        this.closeSettings = this.closeSettings.bind(this);
        this.redirectTo = this.redirectTo.bind(this);
     }

     componentWillMount(){
         console.log("Props: " + this.props);
         console.log("Email: " + this.props.email);

         emailMenu = this.props.email;

         // axios({
         //     method: "get",
         //     url: "https://jeffchoy.ca/comp4711/badgr-app/users",
         //     headers: {
         //         "Authorization": "ca19f39c-8396-4534-8048-d7a406d9357a",
         //         "email" : emailMenu,
         //     }
         // }).then((res) => {
         //     console.log(res);
         // });
     }

     redirectTo(url){
         this.setState({
             destUrl: url,
             redirected: true,
         })
     }


     test(){
         this.setState({
             settingsDisplay: true
         });
     }

     closeSettings(){
         console.log("RUNNING CLOSE SETTINGS!\n");
         this.setState({
             settingsDisplay: false
         });
         console.log("ran close settings!\n");
         console.log(this.state.settingsDisplay);
     }

     logout(){
         console.log("logged out!\n");
     }

     // <!-- <GoogleLogout
     //   clientId="994995244089-nd58pj7ep27sfkinl3rejpbnpd6l92rq.apps.googleusercontent.com"
     //   buttonText="Logout"
     //   onLogoutSuccess={this.logout}>
     // </GoogleLogout> -->

     render(){

         if(this.state.redirected){
             // return(
             //     <Redirect to={{
             //         pathname: this.state.destUrl,
             //         state: {
             //             email : emailMenu
             //         }
             //     }}/>
             // );
         }

         //onClick={this.redirectTo({path} + "Search.html")
         return (

           <div>
               <Menu pageWrapId= {this.props.pageWrapId}
                    outerContainerId= {this.props.outerContainerId}>



                 <h1 className="menuHeader">MENU</h1>

                 <h1 className="divider">_________________</h1>

                 <a className="menu-item" >
                   <FontAwesomeIcon icon={faUserCircle} className="menuIcon"/><span>Profile</span>
                 </a>

                 <a className="menu-item" }>
                   <FontAwesomeIcon icon={faSearch} className="menuIcon"/><span>Search</span>
                 </a>

                 <a className="menu-item" href="https://www.jennyly.info/COMP4711/labs/final_project/landingpage.html" target="_blank">
                   <FontAwesomeIcon icon={faGlobeAmericas} className="menuIcon"/><span>WhereIsYou</span>
                 </a>

                 <a className="menu-item" href={path + "Settings.html"}>
                   <FontAwesomeIcon icon={faCogs} className="menuIcon"/><span>Settings</span>
                 </a>


                 <GoogleLogout
                   clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                   buttonText="Logout"
                   render = {renderProps => (
                       <a className="menu-item" href={path + "index.html"}>
                         <FontAwesomeIcon icon={faSignOutAlt} className="menuIcon"/><span>Logout</span>
                       </a>
                   )}
                   onLogoutSuccess={this.logout}
                 >
                 </GoogleLogout>

               </Menu>

            </div>
         );
     }

}




export default MenuComponent;
