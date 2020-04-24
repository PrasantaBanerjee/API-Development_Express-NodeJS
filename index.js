//Module dependencies.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); //support encoded bodies.
app.use(bodyParser.json());                          //support json encoded bodies.

//Get the user data.
let employeesData = require('./employeesData');

//Create the API endpoints/routers with callback functions.
//Display a Welcome message.
app.get('/api/info', function (req, res) {
    res.send('Welcome to Employees API !!! Get access to free APIs.\nThese APIs have been developed using Node & Express.');
});

//GET Method: Retrieve all user's data.
app.get('/api/employees', function (req, res) {
    res.json(employeesData);
});

//GET Method: Retrieve user's data based on ID param.
app.get('/api/employees/:id', function (req, res) {
    const id = req.params.id;
    const user = employeesData.find(user => user.id == id);
    if (user) {
        res.statusCode = 200
        res.json(user)
    }
    else {
        res.statusCode = 404
        return res.json({ Error: ['ID Not Found'] });
    }
});

//POST Method: Create a new employee.
app.post('/api/employees', function (req, res) {
    employeesData.push(req.body);
    res.status(201).json(req.body);
});

//PUT Method: Update an employee based on ID param.
app.put('/api/employees/:id', function (req, res) {
    const id = req.params.id;
    const user = employeesData.find(user => user.id == id)
    if (user) {
        const index = employeesData.indexOf(user);
        let keys = Object.keys(req.body);
        keys.forEach(key => {
            user[key] = req.body[key];
        });
        employeesData[index] = user;
        res.json(employeesData[index]);
    }
    else {
        res.statusCode = 404
        return res.json({ Error: ['ID Not Found'] });
    }
});

//DELETE: Delete an employee based on ID param.
app.delete('/api/employees/:id', function (req, res) {
    let id = req.params.id;
    const user = employeesData.find(user => user.id == id)
    if (user) {
        const index = employeesData.indexOf(user);
        employeesData.splice(index, 1);
        res.json({ message: `User ${id} deleted.` });
    }
    else {
        res.statusCode = 404
        return res.json({ Error: ['ID Not Found'] });
    }
})

//Start the Node server.
const hostname = 'localhost';
const PORT = 7777;
app.listen(PORT, function () {
    console.log('Your server is up & running at http://' + hostname + ':' + PORT + '.');
});