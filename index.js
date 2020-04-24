const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); //support encoded bodies.
app.use(bodyParser.json());                          //support json encoded bodies.

//Create user data.
const employeesData = [
    {
        id : 673630,
        firstName : 'Prasanta',
        lastName : 'Banerjee',
        age : 24,
        hobby : [
            {
                coding : ['java', 'python', 'javascript'],
                movies : ['action', 'comedy' , 'suspense'],
                sports : "basketball"
            }
        ],
        oper_sys : ['Mac', 'Windows']
    },
    {
        id : 673631,
        firstName : 'Neha',
        lastName : 'Bharti',
        age : 23
    },
    {
        id : 673651,
        firstName : 'Priyanka',
        lastName : 'Moharana',
        age : 24
    },
    {
        id : 673649,
        firstName : 'Shreyanshu',
        lastName : 'Jena',
        age : 25
    },
    {
        id : 673632,
        firstName : 'Priyanka',
        lastName : 'Sonalia',
        age : 23
    },
    {
        id : 673653,
        firstName : 'Bhupinder',
        lastName : 'Singh',
        age : 25
    },
];

//Create the API endpoints with callback functions.
//Display a message.
app.get('/api/info', function(req, res) {
    res.send('Welcome to Employees API !!! Get access to free APIs.');
});

//Display all Employees data.
app.get('/api/employees', function(req, res) {
    res.json(employeesData);
});

//Display employee data based on 'id' param.
app.get('/api/employees/:id', function(req, res) {
    const id = req.params.id;
    const user = employeesData.find(user => user.id == id)

    if(user){
        res.statusCode = 200
        res.json(user)
    }
    else {
        res.statusCode = 404
        return res.json({Error: ['ID Not Found']});
    }
});

const newData = {
    id : 578895,
    firstName : 'Abhijeet',
    lastName : 'Agarwala',
    age : 24
}

// POST new employees data.
app.post('/api/employees', function (req, res) {
    const newUser = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    }

    employeesData.push(newUser);
    res.status(200).json(newUser);
});

//start the node server.
const PORT = 7777;
app.listen(PORT, function() {
    console.log('Your server is up & running at localhost:' + PORT + '. Please hit the APIs.');
});