const assert = require("assert");
const pg = require("pg");
const waiters = require("../waiters");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/waiters_tests';
const pool = new Pool({
	connectionString
});

let instance = waiters(pool);

describe("The waiters webapp", async function () {

	beforeEach(async function () {

		await pool.query("delete from waiters_shifts");
		await pool.query("delete from waiters_names");

	
	});

	it("should be able to add a new waiter's name", async function () {
		
		await instance.addUser("Themba");
		await instance.addUser("Sipho");
		await instance.addUser("Tello");

		assert.deepEqual[{ names: "Themba" }, { names: "Sipho" }, { names: "Tello" }], await instance.
			searchUser();

	});

	it("should return the id of the waiter's name in the database", async function () {

		await instance.addUser("Trello");
		await instance.addUser("Siphozi");

		result1 = await pool.query(`select id from waiters_names where names =$1`, ["Trello"])
		result2 = await pool.query(`select id from waiters_names where names =$1`, ["Siphozi"])


		assert.deepEqual(result1.rows[0].id, await instance.getIdOfUser("Trello"));
		assert.deepEqual(result2.rows[0].id, await instance.getIdOfUser("Siphozi"))

	});

	it("should delete all shifts relating to the waiter, if the waiter is already in the database", async function () {

		await instance.addUser("Hloni");

		assert.deepEqual(undefined, await instance.deleteAllShift());

	});

	it("should be able to add a new shift and new id's for waiter , days_id and userID ", async function () {

		await instance.addUser("Trello");

		result1 = await pool.query(`select id from waiters_names where names =$1`, ["Trello"])
		var waiters_id = result1.rows[0].id;


		result1 = await pool.query(`select id from weekly_days where days_bookings  =$1`, ["Tuesday"])
		var day_id = result1.rows[0].id

		await instance.addUser(day_id, waiters_id);


		assert.deepEqual[{
			days_id: 3, waiters_id: 1
		}], await instance.getAllShift();
	});

	it("should be able return all the waiters shift", async function () {

		await instance.addUser("Themba");
		await instance.addUser("Sipho");
		await instance.addUser("Tello");

		assert.deepEqual[{
			days_id: 2, waiters_id: 1,
			days_id: 3, waiters_id: 1
		}, { days_id: 4, waiters_id: 2 }, { days_id: 7, waiters_id: 1, days_id: 5, waiters_id: 3 }], await instance.
			getAllShift();
	});



})

after(function () {
	pool.end();


});

