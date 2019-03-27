const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
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

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'badgr'
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
  con.query("SELECT * FROM Users WHERE Email = ?", req.header('Email'), (err, result) => {
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

  con.query("SELECT * FROM Users WHERE Email = ?", req.body.email, (err, result) => {
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


app.listen(8080, function() {
  console.log('listening...');
})
