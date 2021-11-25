const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const comments = require('./routers/comments')
const users = require('./routers/users')
const posts = require('./routers/posts')
// const connect = require('./schemas')
// connect();

mongoose.connect('mongodb://localhost:27017/CRUD', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'));
app.use('/api', users)
app.use('/api', posts)
app.use('/api', comments)

// ejs 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signUp', (req, res) => {
    res.render('signUp');
})

app.get('/write', (req, res) => {
    res.render('write');
})



app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
