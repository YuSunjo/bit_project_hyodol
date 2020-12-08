const express = require('express');
const nunjucks = require('nunjucks');

const customer = require('./routes/customer');

const app = express();
const port = 3000;

nunjucks.configure('template', {
    autoescape : true, 
    express : app
});

app.get('/', (req, res) => {
    // res.send('hello');
    //template 파일 이후부터 지정해주면 된다. 
    res.render( 'customer/customer.html', {
        message : 'hello'
    })
})

app.use('/cutomer', customer);

app.listen(port , () => {
    console.log('express listening port on ', port);
} )