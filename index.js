const flash = require('express-flash');
const session = require('express-session');
//const routes = require('./routes');
const waiters = require('./waiters')
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




// //const routesFactory = routes(registrations)

const instance = waiters(pool);


// const greetings = greet(pool);
// const routesFact = routes(greetings)

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

app.get("/", async function (req, res) {


  try {


    res.render("index", {

      title: "Home"


    });

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

  }


});

app.post("/waiters", async function (req, res) {

  res.render("index", {

  })
});







app.get("/waiters/:userName", async function (req, res) {


  try {
    const userName = await req.params.userName;

    //const waiterNames = await instance.createShift(userName)
    // const daysSelect = await instance.daysSelected()

    render("index", {

      userName

    });

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

  }



});






app.post("/waiters/:userName", async function (req, res) {

  try {
    const { days, userName } = await req.body;
    //const userName = await req.params.userName;

    console.log(userName);

    console.log(days);

    // var newDays = []
    //newDays.push(days)
    //newDays.push(days[i])

    // using a for loop 
    for (let i = 0; i < days.length; i++) {

      //console.log(days[i]);

      
      const storeAwaydays = await instance.selectDayShift(days[i]);
     // const storeAwayBoth = await instance.insertBoth(userName, days[i]);


      
    }
    const storeAwayNames = await instance.createNameShift(userName);
    // i want the individual day after looping in my parameter

    res.render("index", {

      //  names: storeAway , storeAwayNames, storeAwayBoth

    });


  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);


  }






  app.get("/days", async function (req, res) {
    try {



      // //want to send the call and sms to my factort function
      // settingsBill.recordAction(req.body.actionType);


      res.render("days", {

        // actions: actionLists2 

      });
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);
    }


  });
  app.get("/reset", async function (req, res) {

    try {

      res.redirect("/days")

    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);

    }

  });


});

const PORT = process.env.PORT || 3055

app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});


// const newName = req.params.userName;

//         var names = await greetings.getName()
//         // console.log(names + "zxcvbnasdfghdfg")
//         if (newName != null) {

//             await greetings.enterName(newName)

//         }



// async function filteredTownsOptions(id) {

//   if (id === "all") {

//       let allRegistrations = await pool.query("SELECT reg_numbers FROM foreign_keys");

//       return allRegistrations.rows
//   }
//   else {

//       const regId = await pool.query("SELECT reg_numbers FROM foreign_keys WHERE  town_id = ($1)", [id])
//       //console.log(regId.rows)
//       return regId.rows
//   }
// };



  // //using a foreach loop
    // let value

    // days.forEach((value, index) => {



    //   console.log(index, value)

    // req.flash('reset', 'Week succe reset')
    // });
    // const storeAway = instance.createShift(userName, value)




