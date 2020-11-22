module.exports = function waiters(pool) {

    /**
        * Workflow
        * 1 - search for the user 
        * 2 - get their id -> delete all in shift
        * 3 - insert to the shift new ids
        * 4 - query * days selected return their ids with state: disable
        * 5 - {name: Thur, id: 5, state: checked}
        */

    async function addUser(name) {

        await pool.query('INSERT INTO waiters_names (names) values ($1)', [name])

    };

    const wf = async (name, days_id) => {


        var userId = await getIdOfUser(name)
        // console.log({ userId })

        // if its true get id of user
        if (userId) {

            // delete from all shift if its user is  there
            await deleteAllShift(userId)

            // then add new shift add days_id and userID
            await addNewShift(days_id, userId)

        }

        //return get all shift with all the shifts in a table
        return await getAllShift();


    };

    async function searchUser(name) {
        const selectQuery = await pool.query('SELECT names FROM waiters_names WHERE names = $1', [name])
        return selectQuery.rows[0];

    };

    const dontReturnMe = async (name) => {
        await addUser(name);
        const selectIdQ = await pool.query('SELECT id FROM waiters_names WHERE names = $1', [name])
        return selectIdQ.rows[0].id
    }

    async function getIdOfUser(name) {
        try {
            const selectIdQ = await pool.query('SELECT id FROM waiters_names WHERE names = $1', [name])

            return selectIdQ.rows[0].id
        } catch (error) {
            return await dontReturnMe(name)
        }

    };

    async function deleteAllShift(id) {
        await pool.query('delete from waiters_shifts where waiters_id = $1', [id])
    };

    async function insertNewNameId(name) {

        await pool.query('INSERT INTO waiters_shifts (waiters_id) values ($1)', [name])

    };


    async function insertNewDaysId(days_id, names_id) {

        await pool.query('INSERT INTO waiters_shifts (days_id, waiters_id) values ($1,$2)', [days_id, names_id])

    };

    /**
     * 
     * @param {Array} days_id - user selected days
     * @param {Integer} names_id 
     * 
     * @returns nothing
     */


    async function addNewShift(days_id, names_id) {
        // console.log(days_id);

        //array not a function

        await days_id.forEach(async (id) => {

            await insertNewDaysId(id, names_id)


        });

    };

    async function getAllShift() {

        const selectIdQ = await pool.query('SELECT * FROM waiters_shifts')
        // console.log(selectIdQ.rows[0].id)
        return selectIdQ.rows;

    };


    async function allDaySpecificUser(id) {
        //console.log(name)
        //   const idFunction = await  searchUser()

        const selectIdQ = await pool.query(`select weekly_days.days_bookings from weekly_days 
        join waiters_shifts
         on  waiters_shifts.days_id = weekly_days.id 
         join waiters_names
         on  waiters_shifts.waiters_id = waiters_names.id where waiters_id = $1`, [id])
        //  console.log(selectIdQ.rows);
        // *  - {name: Thur, id: 5, state: checked}
        return selectIdQ.rows;
    };











    async function checkedUpdate(name) {


    }









    async function waitersDayOneDay() {

        let specificDay = await pool.query(`select * from waiters_names
    join waiters_shifts   
      on waiters_shifts.waiters_id = waiters_names.id
    join  weekly_days
    on waiters_shifts.days_id = weekly_days.id`
        )
        //console.log(specificDay.rows)
        return specificDay.rows;
    };

    async function listOfDaysAndNamesObject() {

        const results = await pool.query('select * from  weekly_days')

        const weekdays = results.rows
        const shift = await waitersDayOneDay()
        //console.log(daysRow)

        weekdays.forEach(async function (day) {

            day.waiters = [];

            shift.forEach(waiter => {

                if (day.days_bookings === waiter.days_bookings) {

                    day.waiters.push(waiter)

                } if (day.waiters.length === 0) {

                    day.color = "white"
                }

                else if (day.waiters.length < 3) {

                    day.color = "yellow"
                }

                else if (day.waiters.length >= 3 && day.waiters.length <= 4) {

                    day.color = "lime"
                }
                else {

                    day.color = "red"
                }


            });


        });

        return weekdays;

    }


    async function dayTogether() {

        const results = await pool.query('select * from  weekly_days')

        return results.rows;

    };



    async function resetFtn() {

        // console.log(userName)
        const dayOfWeeks = await dayTogether();
        //delete from joined table
        let restart = await pool.query('DELETE FROM waiters_shifts');

        return restart;
    };

    async function buttonMsg() {

        var buttonpressed = false;

        if (!buttonpressed) {

            await resetFtn();

            return "database has be cleared...!"
            // console.log(userName)
            const dayOfWeeks = await instance.dayTogether();
        }

    };

    async function similar(name) {

        let insideDb = await pool.query('SELECT * FROM waiters_name WHERE names = ($1)', [name])

        // to check if it exists you check it by === 1
        return insideDb.rowCount == 1;

    };




    

    async function buttonMessage() {

        var buttonpressed = false;

        if (!buttonpressed) {

      return  "registration number already exists... try again!"

        }

    };






    return {

        searchUser,
        getIdOfUser,
        deleteAllShift,
        getAllShift,
        insertNewNameId,
        insertNewDaysId,
        buttonMessage,
        waitersDayOneDay,
        resetFtn,
        buttonMsg,
        similar,
        wf,
        addUser,
        addNewShift,
        listOfDaysAndNamesObject,
        dayTogether,
        // regexMsg,
        checkedUpdate,
        allDaySpecificUser,
    }

};



    //     const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    // ];

























