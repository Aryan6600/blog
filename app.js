const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const session = require('express-session')

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(session({
    secret: process.env.SESSION_SECREAT,
    resave: true,
    saveUninitialized: true
}))

const port = process.env.PORT || 3000;

app.use('/', require('./Pages/Home'));
app.use('/blog', require('./Pages/Blog'));
app.use('/search', require('./Pages/Search'));
app.use('/admin', require('./Pages/Admin'));


app.get('/*', (req, res) => {
    res.render('404.ejs');
})

app.listen(port);