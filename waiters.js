module.exports = function waiters(pool) {


    async function createNameShift(name) {

        if (name !== "") {

            const selectQuery = await pool.query('SELECT names FROM waiters_names WHERE names = $1', [name])
            // if the name is not there insert the name in the table

            let insertNameQ
            if (selectQuery.rowCount === 0) {

                insertNameQ = await pool.query('INSERT INTO waiters_names values($1)', [name])

                //if it inside the database

                // if (insertNameQ > 0) {

                //     let selectIdQ;

                //     selectIdQ = await pool.query('SELECT id FROM waiters_names WHERE names = $1', [name])

                //     return selectIdQ.rows[0].id
                //    let newNameId = selectIdQ.rows[0].id
                // }


            } else {

                return false;
            }
        } else {

            return false;
        }

    }



    async function selectDayShift(day) {
        // check days the return id

        let selectQueryDays;

        selectQueryDays = await pool.query('SELECT days_bookings FROM weekly_days WHERE days_bookings = $1', [day])
        // console.log(selectQueryDays)
        //if it inside the database


        if (selectQueryDays.rowCount > 0) {

            let selectIdQdays;

            selectIdQdays = await pool.query('SELECT id FROM weekly_days WHERE days_bookings = $1', [day])

            return selectIdQdays.rows[0].id
            newDaysId = selectIdQdays.rows[0].id;
        }

    }



//     async function insertBoth(name, day) {

//         const selectQuery = await pool.query('SELECT * FROM waiters_shifts')
//         // if the name is not there insert the name in the table


//         let selectIdQ;

//         selectIdQ = await pool.query('SELECT id FROM waiters_names WHERE names = $1', [name])

//         //console.log(selectIdQ.rows[0].id);

//          newNameId = selectIdQ.rows[0].id


//         selectIdQdays = await pool.query('SELECT id FROM weekly_days WHERE days_bookings = $1', [day])

//        // console.log(selectIdQdays.rows[0].id)
//          newDaysId = selectIdQdays.rows[0].id;
// console,log(newDaysId)
//         if (selectQuery.rowCount === 0) {

//             insertQuery = await pool.query('INSERT INTO  waiters_shifts(days_id, waiters_id)  values ($1,$2)', [newNameId, newDaysId])

//         } else {

//             return false;

//         }


   // };

    // await pool.query('INSERT INTO  foreign_keys (reg_numbers ,town_id  ) values($1,$2)', [reg, codeId])
    // ait pool.query('SELECT id FROM town_names WHERE town_code  = $1', [string])









































    //                 // if (insertNameQ && insertNameQdays > 0) {

    // let insertQuery;

    //                 } else {

    //                     return false;
    //                 }
    //             } else {

    //                 return false;
    //             }

    // } else {

    //     return false;

    // }




    // if the name is not there insert the name in the table

    // let insertNameQdays;
    // if (selectQueryDays.rowCount === 0) {

    //     insertNameQdays = await pool.query('INSERT INTO weekly_days (days_bookings) values($1)', [day])

    // } else {

    //     return false
    // }








    //console.log(selectQuery);
    // now we must select the right id for our registrations

    // console.log({ day })

    //console.log({ selectQuery });

    //     let codeId = selectQuery.rows[0].id

    //     console.log(codeId)

    //     //to check if its a database
    //     let ifExists;

    //     if (codeId > 0) {

    //         ifExists = await pool.query('select id from weekly_days WHERE days_bookings = $1', [day])

    //         console.log({ ifExists });
    //         // return ifExists.rows.id
    //     }

    //     else {

    //         return false;

    //     }
    //     //now if if doesnt in the database , you want to insert registrations and the id
    //     let insertQuery;
    //     if (ifExists.rows.length < 1) {

    //         insertQuery = await pool.query('INSERT INTO  waiters_shifts (days_id ,waiters_id   ) values($1,$2)', [day, name])

    //     } else {

    //         return false
    //     }

    // } else {

    //     return false
    // }






    async function joinedBack(day) {

        // const joined = await pool.query('SELECT week_days.days, waiters_names.names From week_days INNER JOIN waiters_names ON week_days.id = waiters_names.id);


        //     const daysSelectQuery = await pool.query('SELECT id FROM week_days WHERE days = $1', [day])
        //     // now we must select the right id for our registrations
        //     // console.log({ day })
        //     console.log({ daysSelectQuery });

        //     return daysSelectQuery.rows.id

    };

    async function resetFtn() {

        //delete from joined table
        let restart = await pool.query('DELETE FROM foreign_keys');

        return restart;
    };

    async function buttonMsg() {

        var buttonpressed = false;

        if (!buttonpressed) {

            await resetFtn();

            return "database has be cleared...!"
        }

    };

    async function similar(name) {

        let insideDb = await pool.query('SELECT * FROM waiters_name WHERE names = ($1)', [name])

        // to check if it exists you check it by === 1
        return insideDb.rowCount == 1;

    };



    return {

        //enterNames,
        // daysSelected,
        //restartFunct,
        joinedBack,
        resetFtn,
        buttonMsg,
        similar,
        createNameShift,
        selectDayShift,
       // insertBoth




    }

};



//now if if doesnt in the database , you want to insert registrations and the id

    //         if (ifExists.rows.length < 1) {

    //             await pool.query('INSERT INTO  foreign_keys (days_id ,waiters_id   ) values($1,$2)', [day, name])

    //         } else {

    //             return false
    //         }

    //     } else {

    //         return false
    //     }
    // };












































// async function restartFunct(day) {

    //     // // if (name !== "") {

    //     // const daysSelectQuery = await pool.query('SELECT id FROM week_days WHERE days = $1', [day])
    //     // // now we must select the right id for our registrations
    //     // // console.log({ day })
    //     // console.log({ daysSelectQuery });

    //     // return daysSelectQuery.rows.id

    // };






    //             let codeId = selectQuery.rows[0].id
    //             console.log({ codeId });


















    //             //to check if its a database
    //             let ifExists;

    //             if (codeId > 0) {

    //                 ifExists = await pool.query('SELECT id FROM  waiters_names where  = ($1)', [name])

    //             console.log({ ifExists });       
    // // return ifExists.rows.id
    //             }

    //             else {

    //                 return false;

    //             }

    //             async function enterNames(name, day) {





    //             }



    //         //now if if doesnt in the database , you want to insert registrations and the id

    //         if (ifExists.rows.length < 1) {

    //             await pool.query('INSERT INTO  foreign_keys (days_id ,waiters_id   ) values($1,$2)', [day, name])

    //         } else {

    //             return false
    //         }

    //     } else {

    //         return false
    //     }
    // };
