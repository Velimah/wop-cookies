'use strict';
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const username = 'foo';
const password = 'bar';

app.use(cookieParser());
app.use(session({secret: 'dfgdrdsdfes'}));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if(req.session.kirjautunut) {
    res.render('secret');
  } else {
    res.redirect('/form');
  }
});

app.post('/login', (req, res) => {
  const uname = req.body.username;
  const passwd = req.body.password;
  if(uname === username && passwd === password) {
    req.session.kirjautunut = true;
    res.redirect('/secret');
  }  else {
    res.redirect('/form');
  }
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr, {httpOnly: true}).send('cookie set');
});

app.get('/readCookie', (req, res) => {
  console.log('Cookies: ', req.cookies.color);
  res.send('cookie read');
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('cookie deleted');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
