require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app  = express();

const PORT = 3000 || process.env.PORT;

// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); 

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/MainPr02'
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));

app.use(express.static('public'));

//templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');


app.locals.isActiveRoute = isActiveRoute; 

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
// app.use('/', require('./server/routes/index'));


app.listen(PORT, ()=> {
    console.log(`app listening on port ${PORT}`);
});