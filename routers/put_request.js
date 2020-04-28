'use strict';

//Module dependencies.
const express = require('express');
var router = express.Router();

//----------- Get the JSON Data ------------//
var path = require('path');
var projectDir = path.dirname(require.main.filename);
let allUsersData = require(projectDir + '/data/userData.js');

//Create the API endpoints/routers with callback functions.
//PUT Method: Update an employee based on 'ID' param.
router.put('/api/users/:id', function (req, res) {
    const id = req.params.id;
    const user = allUsersData.find(user => user.id == id)
    if (user) {
        const index = allUsersData.indexOf(user);
        let keys = Object.keys(req.body);
        keys.forEach(key => {
            user[key] = req.body[key];
        });
        allUsersData[index] = user;
        res.json(allUsersData[index]);
    }
    else {
        res.statusCode = 404
        return res.json({ Error: ['ID Not Found'] });
    }
});

module.exports=router;