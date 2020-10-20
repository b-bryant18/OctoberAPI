const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('What is going on?')
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4, 5])
});

app.listen(3000, () => {
    console.log("Listening on PORT 3000...")
});

//To Run Server: nodemon index.js