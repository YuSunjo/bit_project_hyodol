const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');

const customer = require('./routes/customer');
const alarm = require('./routes/alarm');
const alzheimer = require('./routes/alzheimer');
const malddomi = require('./routes/malddomi');

const app = express();
const port = 3000;

db.sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully');
})
.then(() => {
    console.log('DB sync complete');
    // return db.sequelize.sync();
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})

nunjucks.configure('template', {
    //ture -> message 안에 html 태그가 안들어감 들어가게 하려면 {{message | safe}} 처럼 뒤에 safe넣으면 된다.
    autoescape : true, 
    express : app
});

app.get('/', (req, res) => {
    // res.send('hello');
    //template 파일 이후부터 지정해주면 된다. 
    res.render( 'init/init.html', {
        message : 'hello'
    })
})



//미들웨어 세팅
//morgan => get인지 post인지 로그로 알려줌  
app.use( logger('dev'));

app.use('/uploads', express.static('uploads'));

app.use('/customer', customer);

app.use('/alarm' ,alarm );

app.use('/alzheimer', alzheimer);

app.use('/malddomi',malddomi);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.listen(port , () => {
    console.log('express listening port on ', port);
} )