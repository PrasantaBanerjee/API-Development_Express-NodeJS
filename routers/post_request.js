'use strict';

//Module dependencies.
const express = require('express');
var router = express.Router();

//----------- Get the JSON Data ------------//
var path = require('path');
var projectDir = path.dirname(require.main.filename);
let allUsersData = require(projectDir + '/data/userData.js');

//Create the API endpoints/routers with callback functions.
//POST Method: Create a new employee.
router.post('/api/users', function (req, res) {
    allUsersData.push(req.body);
    res.status(201).json(req.body);
});

module.exports=router;