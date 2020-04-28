'use strict';

//Module dependencies.
const express = require('express');
var router = express.Router();

//----------- Get the JSON Data ------------//
var path = require('path');
var projectDir = path.dirname(require.main.filename);
let allUsersData = require(projectDir + '/data/userData.js');

//Create the API endpoints/routers with callback functions.
//---- Display a welcome message ----//
router.get('/api/', function (req, res) {
    res.send('Welcome to Users API !!! Get access to free APIs. These APIs have been developed using Node & Express.');
});

//GET Method: Retrieve all user's data.
router.get('/api/users', function (req, res) {
    res.json(allUsersData);
});

//GET Method: Retrieve user's data based on 'ID' param.
router.get('/api/users/:id', function (req, res) {
    const id = req.params.id;
    const user = allUsersData.find(user => user.id == id);
    if (user) {
        res.statusCode = 200
        res.json(user)
    }
    else {
        res.statusCode = 404
        return res.json({ Error: ['ID Not Found'] });
    }
});

module.exports = router;