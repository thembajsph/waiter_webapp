const { unix } = require("moment");

module.exports = function routesFact(instance) {

    const root = async function (req, res) {


        try {

            res.render("home", {

                title: "Home"

            });

        } catch (error) {
            console.log(error.name);
            console.log(error.message);
            console.log(error.stack);

        }

    };

    const waitersOnly = async function (req, res) {

        const dayOfWeeks = await instance.dayTogether();
        // console.log(dayOfWeeks)

        res.render("index", {

            weekDays: dayOfWeeks,

        })
    };

    const getWaitersPara = async function (req, res) {

        try {

            let userName = req.params.userName;

            userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
            // console.log({ userName });
            var regex = /^[a-zA-Z]+$/;

            if (userName != null && regex.test(userName)) {
                //  console.log(userName)
                const newId = await instance.getIdOfUser(userName);

                var dayOfWeeks = await instance.dayTogether();
                // console.log(dayOfWeeks);
                // const listOfNames = await instance.allDayChecked();
                ///console.log(listOfNames)

                const specificUser = await instance.allDaySpecificUser(newId);
                // console.log({ specificUser } + " asasasasasasasa");

                // const listOfNames = await allDayChecked();
                dayOfWeeks.forEach(day => {

                    day.state = ''

                    specificUser.forEach(waiter => {
                        //  console.log(specificUser)
                        if (waiter.days_bookings === day.days_bookings) {

                            day.state = 'checked'

                        }

                    })

                    // return specificUser;

                })

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

    };

    const postWaitersPara = async function (req, res) {

        try {

            var { days } = await req.body;
            //this is to select one day because whe you select on day it become a string instead of an array , so this special function does that for you.
            //checks if its an array if not makes it one.
            days = Array.isArray(req.body.days) ? req.body.days : [req.body.days];

            let userName = req.params.userName;

            userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
            // console.log({ userName });
            var regex = /^[a-zA-Z]+$/;


            if (userName != null && regex.test(userName)) {
                // console.log({ days });

                // check if name and days are defined
                results = await instance.wf(userName, days);
                //console.log({ results });
                dayOfWeeks = await instance.dayTogether();


                const flashMsg = await instance.buttonMessage();

                req.flash('regexMes', flashMsg);

            }
           // res.redirect(`/waiters/${userName}`);

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

    };

    const daysOnly = async function (req, res) {

        try {

            const listOfNames = await instance.listOfDaysAndNamesObject();
            // console.log(listOfNames[1].waiters)
            //console.log(listOfNames)

            res.render("days", {

                list: listOfNames

            });

        } catch (error) {
            console.log(error.name);
            console.log(error.message);
            console.log(error.stack);
        }

    };

    const resetOnly = async function (req, res) {

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

    };

    return {
        root,
        waitersOnly,
        getWaitersPara,
        postWaitersPara,
        daysOnly,
        resetOnly

    }

}