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

    res.render("home", {

      title: "Home"

    });

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

  }

});

// you will need to render weekDays with every route associated with it.
app.get("/waiters", async function (req, res) {

  const dayOfWeeks = await instance.dayTogether();
  // console.log(dayOfWeeks)

  res.render("index", {

    weekDays: dayOfWeeks,

  })
});


app.get("/waiters/:userName", async function (req, res) {


  try {

   



    let userName = req.params.userName;

    userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
    // console.log({ userName });
    var regex = /^[a-zA-Z]+$/;


    if (userName != null && regex.test(userName)) {

    //  console.log(userName)
    const newId = await instance.getIdOfUser(userName);

    var dayOfWeeks = await instance.dayTogether();
       console.log(dayOfWeeks);
    // const listOfNames = await instance.allDayChecked();
    ///console.log(listOfNames)


    const specificUser = await instance.allDaySpecificUser(newId);
      console.log({ specificUser }  + " asasasasasasasa");
    //  console.log({specificUser});


    // const listOfNames = await allDayChecked();
    dayOfWeeks.forEach(day => {

        day.state = ''

      specificUser.forEach(waiter => {
        //  console.log(specificUser)
        if (waiter.days_bookings === day.days_bookings) {


          day.state = 'checked'

            // console.log(day.state)
        }

      })

          // return specificUser;

    })
    //  console.log(specificUser);

    //  console.log(dayOfWeeks);

  }
    res.render("index", {

      userName,
      weekDays: dayOfWeeks,
      // list: listOfNames
    });

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

  }



});

// async function waitersDays(x) {
//   const lists = await pool.query(`select weekdays_name from shifts where waiters_name = $1`, [x])
//   var lst = lists.rows

//   var dai = await pool.query(`select * from weekdays`)
//   var day = dai.rows;

//   day.forEach(allDays => {
//       lst.forEach(WaiterDays => {
//           if (WaiterDays.weekdays_name === allDays.weekdays) {
//               allDays.state = "checked"
//           }
//       })
//   })
//   return day
// }


app.post("/waiters/:userName", async function (req, res) {

  try {

    const { days } = await req.body;
    let userName = req.params.userName;

    userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
    // console.log({ userName });
    var regex = /^[a-zA-Z]+$/;

    //  if (userName === null) {
    //    req.flash("info", "enter your name")

    //  }
    if (userName != null && regex.test(userName)) {
      // console.log({ days });

      // check if name and days are defined

      results = await instance.wf(userName, days);
      //console.log({ results });
      dayOfWeeks = await instance.dayTogether();
      

       const flashMsg = await instance.buttonMessage();

       req.flash('regexMes', flashMsg);

    }

    res.render("index", {
      //copy userName from get req.params.userName, render userName , then in index.handlebars {{userName}} = sender it dynamically
      userName,
      allNames: results,
      weekDays: dayOfWeeks,

    });


  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

  }

});


app.get("/days", async function (req, res) {

  try {

    const listOfNames = await instance.listOfDaysAndNamesObject();

    //console.log(listOfNames)

    res.render("days", {

      list: listOfNames

    });

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
  }


});

app.get("/reset", async function (req, res) {

  // let regTown = req.body.regNumbers

  let clearDb = await instance.buttonMsg()

  req.flash("clear", clearDb);

  await instance.resetFtn()



  try {

    res.redirect("/days")

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

  }

});




const PORT = process.env.PORT || 3048


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


    // console.log(listOfNames[1].waiters)

