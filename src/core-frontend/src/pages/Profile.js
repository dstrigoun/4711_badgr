import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import '../style/Profile.css';
class Profile extends React.Component {

  
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };  

  render() {
    const { classes } = this.props;
    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
        <div className="App">
        <div className="App_LeftPanel">
          <div className="App_Profile">
            <div className="Profile_Panel">
                <img src="../images/man.png"/>
                <h1 id="userName">Segal Au</h1>
            </div>
            <div className="Badges_Panel">
              <div className="Badges_Title">
                  <h1 id="badgeTitle">Badges Earned</h1>
                  <button id="badgeSort">Past Week</button>
              </div>
              <hr/>
              <div id="badgeCollection">
                  <img className="badge" src="../images/001-medal.png"/>
                  <img className="badge" src="../images/002-shield.png"/>
                  <img className="badge" src="../images/003-star.png"/>
                  <img className="badge" src="../images/004-bear.png"/>
                  <img className="badge" src="../images/001-medal.png"/>
                  <img className="badge" src="../images/002-shield.png"/>
                  <img className="badge" src="../images/003-star.png"/>
                  <img className="badge" src="../images/004-bear.png"/>
                  <img className="badge" src="../images/001-medal.png"/>
              </div>
              <hr/>
            </div>
            
            <div id="controls_Panel">
                  <div id="left-controls">
                      <button>Settings</button>
                      <button>Search</button>
                  </div>
                  <div id="right-controls">
                      <button>Logout</button>
                  </div>
            </div>
          </div>
        </div>
        <div className="App_RightPanel">
          <div id="badgeBlock">
              <div id="badgeTitle">
                  <img className="badgeFull" src="../images/001-medal.png"/>
                  <h1 id="badgeTitle">001 Medal</h1>
              </div>
              <hr/>
              <p id="badgeDescription">Congratulations! You tried... at least once! Not the most prestigious of awards, but every epic journey must begin with the first step...</p>
          </div>
        </div>
      </div>
      
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default Profile;
