import React from "react";
import { bubble as Menu } from "react-burger-menu";
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

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>



      <h1 className="menuHeader">MENU</h1>

      <h1 className="divider">_________________</h1>

      <a className="menu-item" href="/Profile">
        <FontAwesomeIcon icon={faUserCircle} className="menuIcon"/><span>Profile</span>
      </a>

      <a className="menu-item" href="/Search">
        <FontAwesomeIcon icon={faSearch} className="menuIcon"/><span>Search</span>
      </a>

      <a className="menu-item" href="/Profile">
        <FontAwesomeIcon icon={faGlobeAmericas} className="menuIcon"/><span>WhereIsYou</span>
      </a>

      <a className="menu-item" onClick='test'>
        <FontAwesomeIcon icon={faCogs} className="menuIcon"/><span>Settings</span>
      </a>

      <a className="menu-item" href="/">
        <FontAwesomeIcon icon={faSignOutAlt} className="menuIcon"/><span>Logout</span>
      </a>
    </Menu>
  );
};
