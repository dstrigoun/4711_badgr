import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

// Styling
import '../style/App.css';

class Settings extends React.Component {


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
        <div class="App">
            <div className="NavBar">
                <h1 id="title">Settings</h1>
                <button>Back To Profile</button>
            </div>
            <hr/>
            <div id="Settings">
                <div id="badgeDefault">
                    <h2>Default Badge Display</h2>
                    <div>
                        <input type="radio" name="badgeDefault" id="pastWeek" value="pastWeek"/>
                        <label for="pastWeek">Past Week</label>
                    </div>
                    <div>
                        <input type="radio" name="badgeDefault" id="past2Weeks" value="past2Weeks"/>
                        <label for="past2Weeks">Past 2 Weeks</label>
                    </div>
                    <div>
                        <input type="radio" name="badgeDefault" id="topAward" value="topAward"/>
                        <label for="topAward">Top Awards only</label>
                    </div>
                </div>
                <div id="userName">
                    <h2>Change User Name</h2>
                    <input id="userInput" type="text" name="name" placeholder="Enter new username here"/>
                </div>

                <div id="profileTheme">
                    <h2>Profile Theme Color</h2>
                    <button>Red</button>
                    <button>Blue</button>
                    <button>Green</button>
                    <button>White</button>
                </div>

                <div id="MoreSettings">More Settings</div>

            </div>
        </div>
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps) (App);
export default Settings;
