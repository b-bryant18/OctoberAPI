const Joi = require('joi');
const path = require('path');
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

//Get Add Courses Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "add.html"));
});

//Get View Courses Page
// app.get('/view', (req, res) => {
//     res.sendFile(path.join(__dirname, "view.html"));
// });

//Find all courses
app.get('/api/courses', (req, res) => {
    res.send(courses)
});

//Create new course
app.post('/api/courses', (req, res) => {
    //Runs validateCourse function (below) to check course name min length
    //Else returns status 400 Bad Request
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message)


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    //Finds current length of courses array and +1 to it to create ID for new course
    courses.push(course);
    res.send(course);
    //New course is pushed to courses array
    //New course is sent to user
});
//Use Postman to check routes using localhost3000/api/courses
//Don't need to specify ID for new course, just name
//ex. { "name" : "New Course"}

//Update course
app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //If not existing return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    //This prevents any further code from running


    //Runs validateCourse function (below) on the request
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //Update course & return updated course
    course.name = req.body.name;
    res.send(course);
});

//Checks if course name meets min length requirement
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

// Find course by ID
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //All arrays can use the find method,like courses.find
    //Need to use parseInt otherwise req.params.id would return a string
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

// Delete course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    //If course doesn't exist, return error 404
    if (!course) res.status(404).send('The course with the given ID was not found');


    //Delete
    //Finds the index of the desired course in courses array
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //splice removes objects from arrays
    //Go to that index & remove 1 object

    //Return courses array (after desired object has been deleted)
    res.send(course);
});

//req.params object is :id. Essential/required parameters.
//req.query is a Query string parameter. These follow a question mark & are optional.
//ex. ?SortBy=name

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

//To Run Server: nodemon index.js