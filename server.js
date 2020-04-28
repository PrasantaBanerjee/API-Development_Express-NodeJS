'use strict';

//Module dependencies.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth')
 
//Here we are configuring the credentials to be used for Basic Authentication.
app.use(basicAuth({
    users: { 
        'SuperUser1': 'P@ssword1',
        'SuperUser2': 'P@ssword2'
    },
    challenge: true,                                //browser-popup requesting for username & password.
    unauthorizedResponse: getUnauthorizedResponse   //function called if authentication failed.
}));

//Function called when Basic Authentication failed.
function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected.')
        : 'No Credentials Provided.'
};

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); //support encoded bodies.
app.use(bodyParser.json());                          //support json encoded bodies.

//------------ Get the JSON Data -------------//
let allUsersData = require('./data/userData.js');

//---------- Router for GET Requests ----------//
var getRequest = require('./routers/get_request.js');
app.use('', getRequest);

//---------- Router for POST Requests ----------//
var postRequest = require('./routers/post_request.js');
app.use('', postRequest);

//---------- Router for PUT Requests ----------//
var putRequest = require('./routers/put_request.js');
app.use('', putRequest);

//---------- Router for DELETE Requests ----------//
var delRequest = require('./routers/delete_request.js');
app.use('', delRequest);

//Start the Node server.
const hostname = 'localhost';
//Use port 7777 unless the port number is configured in process.env.PORT.
//Since process.env.PORT is UNDEFINED, hence the server will listen to 7777.
const PORT = process.env.PORT  || 7777;
app.listen(PORT, function () {
    console.log('Your server is up & running at http://' + hostname + ':' + PORT);
});