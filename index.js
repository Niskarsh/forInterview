const express = require('express')
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const { data1 } = require('./data1');
const { data2 } = require('./data2');
const { data3 } = require('./data3');
require('dotenv').config();
const app = express()

let people_data = [];

app.get('/', function (req, res) {
    res.send('ok')
})
// Add middlware to enable CORS on all domains
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

// Return all people data without their data attribute
app.get('/people', function (req, res) {
    let people = people_data.map(person => {
        let { data, ...rest } = person;
        return rest;
    });
    res.json(people);
})

// Route to return people data with their data attribute by id
app.get('/people/:id', function (req, res) {
    let id = req.params.id;
    let person = people_data.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ message: 'Person not found' });
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    let dataArray = [ data1, data2, data3, data1, data3, data2, data3, data2, data1, data3, data1, data2, data2, data1, data3 ];

    for (let i =0 ; i<15; i++) {
        console.log(`Populating data for person ${i+1}`);
        let person = {
            id: uuidv4(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.country(),
            bio: faker.lorem.sentence(),
            data: dataArray[i],
        }
        people_data.push(person);
    }
});