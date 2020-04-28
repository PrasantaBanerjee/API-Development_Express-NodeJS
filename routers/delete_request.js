'use strict';

//Module dependencies.
const express = require('express');
var router = express.Router();

//----------- Get the JSON Data ------------//
var path = require('path');
var projectDir = path.dirname(require.main.filename);
let allUsersData = require(projectDir + '/data/userData.js');

//Create the API endpoints/routers with callback functions.
//DELETE: Delete an employee based on 'ID' param.
router.delete('/api/users/:id', function (req, res) {
    let id = req.params.id;
    const user = allUsersData.find(user => user.id == id)
    /*
    //get headers.
    console.log(req.headers)
    //set headers.
    res.set('Content-Type', 'text/html')
    //validate the new value set.
    console.log(req.headers)
    */
    if (user) {
        const index = allUsersData.indexOf(user);
        allUsersData.splice(index, 1);
        res.json({ message: `User ${id} deleted.`} );
    }
    else {
        res.statusCode = 404
        return res.json({ Error: ['ID Not Found'] });
    }
});

module.exports=router;