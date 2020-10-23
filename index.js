const Joi = require('joi');
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    }
];

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

//Post to courses array
app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        //400 Bad request
        res.status(400).send(result.error.details[0].message)
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
    //New course is pushed to courses array
    //New course is sent to user
});
//Use Postman to check routes using localhost3000/api/courses
//Don't need to specify ID for new course, just name
//ex. { "name" : "New Course"}

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //All arrays have the find method, use courses.find
    //Need to use parseInt otherwise req.params.id would return a string
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

//req.params object is :id. Essential/required parameters.
//req.query is a Query string parameter. These follow a question mark & are optional.
//ex. ?SortBy=name

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

//To Run Server: nodemon index.js