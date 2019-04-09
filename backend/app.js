const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
/*
CREATE TABLE Users (
    email varchar(255) NOT NULL,
    firstName varchar(255),
    lastName varchar(255),
    description varchar(2000),
    picture varchar(255),
    PRIMARY KEY (email)
);

CREATE TABLE Tags (
  tag varchar(255) NOT NULL,
  PRIMARY KEY (Tag)
)

CREATE TABLE UserTags (
  user varchar(255) NOT NULL REFERENCES Users(email),
  tag varchar(255) NOT NULL REFERENCES Tags(Tag),
  PRIMARY KEY (User, Tag)
)
*/



const app = express();
const jsonParser = bodyParser.json();

/*let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'badgr'
});*/

let con = mysql.createConnection({
  host: 'localhost',
  user: 'jeffchoy_badgr',
  password: 'b0w$hOck',
  database: 'jeffchoy_badgr'
});

// get user
app.get('/comp4711/badgr-app/users', jsonParser, function (req, res) {
  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if ((!req.header('Email'))) {
    res.status(400).send("No primary key identified in 'Email' header.");
  }
  con.query("SELECT * FROM `Users` WHERE Email = ?", req.header('Email'), (err, result) => {
      if (result.length != 0) {
        res.status(200).send(result[0]);
      } else {
        res.status(404).send('No entries returned');
      }
  });

});

// add user
app.post('/comp4711/badgr-app/users', jsonParser, function (req, res) {

  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if ((!req.body.email) || (!req.body.firstName) || (!req.body.lastName)) {
    res.status(400).send('Request missing required fields');
  }

  con.query("SELECT * FROM Users WHERE email = ?", req.body.email, (err, result) => {
	if (err) res.status(500).send(err);
    if (result.length != 0) {
      res.status(500).send('Email already associated with an account');
    } else {
      con.query("INSERT INTO Users SET ?", req.body, (err, result) => {
        if (err) res.status(500).send(err);
        res.status(201);
        res.send({email: req.body.email});
      });
    }
  });

});

  // update user
app.put('/comp4711/badgr-app/users', jsonParser, function (req, res) {
  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if ((!req.body.email)) {
    res.status(400).send('Request missing required fields');
  }

  // removes email from query body to prevent trying to change primary key
  let email = req.body.email;
  let queryBody = req.body;
  delete queryBody.email;

  con.query("UPDATE Users SET ? WHERE `Email` = '" + email + "';", queryBody, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send();
  });
});

// remove user
app.delete('/comp4711/badgr-app/users', jsonParser, function (req, res) {
  // bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if ((!req.header('Email'))) {
    res.status(400).send("No primary key identified in 'Email' header.");
  }

  con.query("DELETE FROM Users WHERE `Email` = ?", [req.header('Email')], (err, result) => {
    if (err) res.status(500).send(err);

    if (result.affectedRows < 1) {
      res.status(404).send('User entry not found.');
    } else {
      res.status(200).send('User removed.')
    }

  });
});

app.post('/comp4711/badgr-app/tags', jsonParser, function (req, res) {

  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if ((!req.body.user) || (!req.body.tags)) {
    res.status(400).send('Request missing required fields');
  }

  con.query("SELECT * FROM Users WHERE email = ?", req.body.user, (err, result) => {
    if (err) res.status(500).send(err);
    if (result.length == 0) {
      res.status(500).send("No such user");
    } else {
      for (let i = 0; i < req.body.tags.length; ++i) {
        let tag = req.body.tags[i];
        con.query("INSERT IGNORE INTO Tags VALUES (?)", tag, (err, result) => {
          let queryBody = {};
          queryBody.user = req.body.user;
          queryBody.tag = tag;
          con.query("INSERT IGNORE INTO UserTags SET ?", queryBody, (err, result) => {
            if (err) res.status(500).send(err);
            if (i == (req.body.tags.length - 1)) {
              res.status(200).send("Tagging successful");
            }
          });
        });
      }
    }
  });
});

app.delete('/comp4711/badgr-app/tags', jsonParser, function (req, res) {
  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if ((!req.body.user) || (!req.body.tags)) {
    res.status(400).send('Request missing required fields');
  }

  con.query("SELECT * FROM Users WHERE email = ?", req.body.user, (err, result) => {
    if (err) res.status(500).send(err);
    if (result.length == 0) {
      res.status(500).send("No such user");
    } else {
      for (let i = 0; i < req.body.tags.length; ++i) {
        let tag = req.body.tags[i];
        con.query("DELETE FROM Tags WHERE Tag = ?", tag, (err, result) => {
          if (err) res.status(500).send(err);
          con.query("DELETE FROM UserTags WHERE `User` = ? AND `Tag` = ?", [req.body.user, tag], (err, result) => {
            if (err) res.status(500).send(err);
            if (i == (req.body.tags.length - 1)) {
              res.status(200).send("Tags removed");
            }
          });
        });
      }
    }
  });
});

app.get('/comp4711/badgr-app/tags', jsonParser, function (req, res) {

  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if (!req.body.user) {
    res.status(400).send('Request missing required fields');
  }

  con.query("SELECT * FROM Users WHERE email = ?", req.body.user, (err, result) => {
    if (err) res.status(500).send(err);
    if (result.length == 0) {
      res.status(500).send("No such user");
    } else {
      con.query("SELECT * FROM UserTags WHERE `user` = ?", [req.body.user], (err, result) => {
        if (err) res.status(500).send(err);
        let responseBody = {};
        responseBody.tags = [];

        for (let i = 0; i < result.length; ++i) {
          responseBody.tags.push(result[i].Tag);
        }
        res.status(200).send(responseBody);
        //console.log(result);
      });
    }
  });
});

/*
Select b.badgeImage FROM 
Badges b JOIN ExternalApp e
ON b.appId = e.appId
WHERE e.appName = 'req.body.appName'
*/
//api call that only the core app can call to get the badge image url
//must pass an appId
app.get('/comp4711/badgr-app/badges', jsonParser, function (req, res) {
  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if (!req.body.appName) {
    res.status(400).send('Request missing required fields');
  }

  con.query("Select b.badgeImage FROM Badges b JOIN ExternalApp e ON b.appId = e.appId WHERE e.appName = ?", req.body.appName, (err, result) => {
    if (err) res.status(500).send(err);
    if (result.length == 0) {
      res.status(404).send("no registered external app found");
    } else if (result.length > 1){
      res.status(500).send("something has gone horribly wrong");
    } else {
      let responseBody = {};
      responseBody.badgeImage = result;
      res.status(200).send(responseBody);
    }
  })
})

//api call that the external app can call to add / update their badge image url
//if there is no entry, it will create an entry in the table
//otherwise updates the table
//must pass an appId
app.post('/comp4711/badgr-app/badges', jsonParser, function (req, res) {
  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if (!req.body.appName || !req.body.badgeImage) {
    res.status(400).send('Request missing required fields');
  }


  //check if there is already an entry
  con.query("Select b.badgeImage, FROM Badges b JOIN ExternalApp e ON b.appId = e.appId WHERE e.appName = ?", req.body.appName, (err, result) => {
    if (err) res.status(500).send(err);
    if (result.length == 0) {
      //insert new row
      con.query("INSERT INTO Badges (appId, badgeImage) VALUES ( SELECT appId FROM ExternalApp WHERE appName = ?, ?)", [req.body.appName, req.body.badgeImage], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(200).send("successfully added new badgeImage");
      })
    } else if (result.length > 1){
      res.status(500).send("something has gone horribly wrong");
    } else {
      //update entry
      con.query("Update Badges set badgeImage = ? FROM ( Select appId from ExternalApp WHERE appName = ? ) t Where Badges.appId = t.appId", [req.body.badgeImage, req.body.appName], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(200).send("badge image updated successfully");
      });
    }
  })


})


/*
Select count(*) 
FROM Authorization
WHERE token = token
*/
//used to check if a given auth token has been registered
//because javascript be like it is, you need to pass a callback 
//should be used in api calls that require external app to be registered with core app
//returns true if yes
//otherwise return false
function checkAuthorized(token, callback){
  //check if token is correct format (int 32)
  if (!Numnber.isInteger(token)){
    return false;
  }
  if (token.toString().length != 32){
    return false;
  }

  //query table for matching token
  let p = new Promise( (resolve, reject) => {
    con.query("Select count(*) FROM Authorization WHERE token = " + token, (err, result)=>{
      if (err){
        return reject(err);
      }
      if (result.length == 0){
        return resolve(false);
      }
      if (result.length > 1){
        console.log("multiple entries with same token");
        return resolve(false);
      }
      return resolve(true);
    });  
  });

  p.then(callback(value));
}

app.listen(8080, function() {
  console.log('listening...');
})
