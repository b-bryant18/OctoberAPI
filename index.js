const express = require('express');
const app = express();

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

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //All arrays have the find method, use courses.find
    //Need to use parseInt otherwise req.params.id would return a string
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

//req.params object is :year/:month. Essential/required parameters.
//Query string parameters follow a question mark. These are optional. req.query
//ex. ?SortBy=name

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

//To Run Server: nodemon index.js