const flash = require('express-flash');
const session = require('express-session');
const routes = require('./routes');
const waiterer = require('./waiters')
const express = require("express");
const app = express();

// always require your pg
const pg = require("pg");
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/waiters-database';

const pool = new Pool({
  connectionString
});

var moment = require('moment'); // require
moment().format()


app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

const instance = waiterer(pool);

// const greetings = greet(pool);
 const routesFactory = routes(instance)

const exphbs = require('express-handlebars');

// //get body parser / instantiate
const bodyParser = require('body-parser');


//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//make the public folder visible when using express, could be css ,js ,page wanst styled.now can see the middleware
// http://localhost:3011/css/style.css --- to see your css

app.use(express.static('public'));

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());

app.get("/", routesFactory.root);

// you will need to render weekDays with every route associated with it.
app.get("/waiters", routesFactory.waitersOnly);


app.get("/waiters/:userName", routesFactory.getWaitersPara);

app.post("/waiters/:userName",routesFactory.postWaitersPara);

app.get("/days", routesFactory.daysOnly);

app.get("/reset", routesFactory.resetOnly);

const PORT = process.env.PORT || 3048

app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});





    

