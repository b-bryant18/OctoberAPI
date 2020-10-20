const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('What is going on?')
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4, 5])
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

//To Run Server: nodemon index.js