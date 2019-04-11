const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const axios = require('axios');
/*
CREATE TABLE Users (
    Email varchar(255) NOT NULL,
    FirstName varchar(255),
    LastName varchar(255),
    Description varchar(2000),
    Picture varchar(255),
    PRIMARY KEY (Email)
);

CREATE TABLE Tags (
  Tag varchar(255) NOT NULL,
  PRIMARY KEY (Tag)
)

CREATE TABLE UserTags (
  User varchar(255) NOT NULL REFERENCES Users(email),
  Tag varchar(255) NOT NULL REFERENCES Tags(Tag),
  PRIMARY KEY (User, Tag)
)
*/



const app = express();
const jsonParser = bodyParser.json();

app.use(cors());
let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'badgr'
});

// let con = mysql.createConnection({
//   host: 'localhost',
//   user: 'jeffchoy_badgr',
//   password: 'b0w$hOck',
//   database: 'jeffchoy_badgr'
// });

// get user
app.get('/comp4711/badgr-app/users', jsonParser, function (req, res) {
  // Bad request check
  if ((!req.header('Email'))) {
    res.status(400).send("No primary key identified in 'Email' header.");
  }

  if ((!req.header('Authorization'))) {
    res.status(403).send("Unauthorized request - Missing header.");
  }

  con.query("Select * FROM Apps WHERE token = ?", req.header('Authorization'), (err, result) => {
    if(result.length == 0) {
      res.status(403).send("Unauthorized request.");
    }
    if(result.length > 1) {
      res.status(403).send("More than one app associated with this token.");
    }
    con.query("SELECT * FROM Users WHERE Email = ?", req.header('Email'), (err, result) => {
        if (result.length != 0) {
          responseBody = result[0];
          if (responseBody.picture === '' || responseBody.picture === null) {
            responseBody.picture = 'https://firebasestorage.googleapis.com/v0/b/testerino-ccc07.appspot.com/o/images%2Fprofile-placeholder-300x300.png?alt=media&token=98fdc700-6148-4514-aa0a-f388812d9d65';
          }
          res.status(200).send(result[0]);
        } else {
          res.status(404).send('No entries returned');
        }
    });
  });
});

// add user
app.post('/comp4711/badgr-app/users', jsonParser, function (req, res) {

  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }

  if ((!req.header('Authorization'))) {
    res.status(403).send("Unauthorized request - Missing header.");
  }

  if ((!req.body.email) || (!req.body.firstName) || (!req.body.lastName)) {
    res.status(400).send('Request missing required fields');
  }

  con.query("Select * FROM Apps WHERE token = ?", req.header('Authorization'), (err, result) => {
    if(result.length == 0) {
      res.status(403).send("Unauthorized request.");
    }

    let app = result[0];
    con.query("SELECT * FROM Users WHERE Email = ?", req.body.email, (err, result) => {
      if (result.length != 0) {

        if(app.appId == 'WhereIsYou') {
          res.status(200).send({email: req.body.email});
        } else {
          res.status(500).send('Email already associated with an account');
        }
      } else {
        con.query("INSERT INTO Users SET ?", req.body, (err, result) => {
          if (err) res.status(500).send(err);
          res.status(201);
          res.send({email: req.body.email});
        });
      }
    });
  });
});

  // update user
app.put('/comp4711/badgr-app/users', jsonParser, function (req, res) {
  // Bad request check
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }

  if ((!req.header('Authorization'))) {
    res.status(403).send("Unauthorized request - Missing header.");
  }

  if ((!req.body.email)) {
    res.status(400).send('Request missing required fields');
  }

  // removes email from query body to prevent trying to change primary key
  let email = req.body.email;
  let queryBody = req.body;
  delete queryBody.email;

  con.query("Select * FROM Apps WHERE token = ?", req.header('Authorization'), (err, result) => {
    if(result.length == 0) {
      res.status(403).send("Unauthorized request.");
    }
    con.query("UPDATE Users SET ? WHERE `Email` = '" + email + "';", queryBody, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send();
    });
  });
});

// remove user
app.delete('/comp4711/badgr-app/users', jsonParser, function (req, res) {
  // bad request check
  if ((!req.header('Authorization'))) {
    res.status(403).send("Unauthorized request - Missing header.");
  }

  if ((!req.header('Email'))) {
    res.status(400).send("No primary key identified in 'Email' header.");
  }

  con.query("Select * FROM Apps WHERE token = ?", req.header('Authorization'), (err, result) => {
    if (result.length == 0) {
      res.status(403).send("Unauthorized request.");
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


});


//api call that only the core app can call to get the badge image url
//must pass an appId
app.get('/comp4711/badgr-app/badges', jsonParser, function (req, res) {
  // Bad request check

  if ((!req.header('appName'))) {
    res.status(400).send('Request missing required fields');
  }

  if ((!req.header('Authorization'))) {
    res.status(403).send("Unauthorized request - Missing header.");
  }

  con.query("Select * FROM Apps WHERE token = ?", req.header('Authorization'), (err, result) => {
    if(result.length == 0) {
      res.status(403).send("Unauthorized request.");
    }

    con.query("SELECT badgeImage FROM Apps where appId = ?", req.header('appName'), (err, result) => {
      if (err) res.status(500).send(err);
      if (result.length == 0) {
        res.status(404).send("no registered external app found");
      } else if (result.length > 1) {
        res.status(500).send("something went horribly wrong");
      } else {
        res.status(200).send(result[0]);
      }
    })
  });
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
  if ((!req.header('Authorization'))) {
    res.status(403).send("Unauthorized request - Missing header.");
  }

  con.query("Select * FROM Apps WHERE token = ?", req.header('Authorization'), (err, result) => {
    if(result.length == 0) {
      res.status(403).send("Unauthorized request.");
    }
    con.query("SELECT badgeImage FROM Apps WHERE appId = ?", req.body.appName, (err, result) => {
      if (err) res.status(500).send(err);
      if (result.length == 0 || result.length == 1) {
        con.query("UPDATE Apps set `badgeImage` = '" + req.body.badgeImage + "' WHERE appId = '" + req.body.appName + "'", (err, result) => {
          if (err) {
            res.status(500).send(err);
          }
          else {
            res.status(200).send("successfully added new badgeImage");
          }
        })
      }
    });
  });
});

app.get('/comp4711/badgr-app/searchusers', jsonParser, function(req, res){
  // Bad request check
  console.log("fmksld");
  if (req.header('Content-Type') != 'application/json') {
    res.status(400).send('Invalid header - Content-Type');
  }
  if (!req.header('query')) {
    res.status(400).send('Request missing required fields');
  }
  if (!req.header('externalapp')){
    res.status(400).send('request missing required fields');
  }
  con.query("Select * from users where lastname = ? OR firstname = ? OR description LIKE '%" + req.header('query') + "%'", [req.header('query'), req.header('query')], function(err, result){
    console.log("pls");
    if (err) res.status(500).send(err);
    if (result.length == 0) {
      res.status(404).send("no matching users found");
    } else {
      if (req.header('score') > 0) {
        //filters for information from the external app
        //get our access key for the external app
        con.query("Select token from Apps where appId = ?", req.header('externalapp'), function(err, tokenResult){
          console.log("fsfddaaa");
          if (err) res.status(500).send(err);
          if (tokenResult.length == 0) {
            res.status(404).send("no api key found for external app");
          } else {
            console.log("passed in date is ...");
            console.log(req.header('currDate'));
            //console.log(tokenResult);
            axios({
              method: 'get',
              url: 'https://whereisyou.herokuapp.com/scores.php',
              headers: {
                    'key': tokenResult[0].token,
                    'currentDate': req.header('currDate'),
                    'leaderboard': true
                  }
            })
            .then(function(response){
              //console.log(response.body);
              //response.data = results from external
              //result = result from core
              //find entries that exist in both

              let finalSearchRes = [];
              console.log("response length: " + Object.values(response.data).length);
              console.log("result length: " +result.length);
              console.log("response.data is next line");
              console.log(response.data);
              console.log("blah");
              for (let i = 0; i < Object.values(response.data).length; i++){
                for (let j = 0; j < result.length; j++){
                  console.log("response.data: " + Object.keys(response.data)[i] + " result: " + result[j].email);
                  if (Object.keys(response.data)[i] == result[j].email){

                    finalSearchRes.push(result[j].email);
                    break;
                  }
                }
              }

              let responseBody = {};
              console.log("response dtat 2: " + response.data);
              responseBody.searchResult = finalSearchRes;
              res.status(200).send(responseBody);
            }).catch(function(err){
              //res.status(500).send(err);
              console.log("hekk")
              //console.log(tokenResult[0]);
              //console.log(err);
            })
          }
        })
      }else {
        let responseBody = {};
        responseBody.searchResult = result;
        res.status(200).send(responseBody);
      }
    }
  })
});

app.listen(8080, function() {
  console.log('listening...');
})
