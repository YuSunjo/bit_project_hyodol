const express = require('express');

const customer = require('./routes/customer');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello');
})

app.use('/cutomer', customer);

app.listen(port , () => {
    console.log('express listening port on ', port);
} )