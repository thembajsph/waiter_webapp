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

		// await pool.query("create table waiters_shifts(
		// 	id serial not null primary key,
		// 	days_id int not null,
		// 	waiters_id int not null, 
		// 	foreign key (days_id ) references weekly_days (id),
		// 	foreign key (waiters_id) references waiters_names (id)
		// "");	

	});

	it("should be able to add a new waiter's name", async function () {
		// let instance = waiters(pool);
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







	// 	assert.deepEqual[{
	// 		days_id: 2, waiters_id: 1,
	// 		days_id: 3, waiters_id: 1, days_id: 5, waiters_id: 1
	// 	}], await instance.getAllShift();
	// });



















	// it("should be able to use flash and return a message if the input is valid", async function () {

	//     // await instance.storeData("CY 456 789");

	//     assert.equal("registration successfully added", await instance.errorGreen('CY 456 789'));

	// });




	// it("should be able to add a greet", async function () {


	// 	await instance.enterName("Themba");
	// 	await instance.enterName("Sipho");
	// 	await instance.enterName("Tello");

	// 	assert.deepEqual[{ name: "Themba" }, { name: "Sipho" }, { name: "Tello" }], await instance.
	// 		getName();

	// });

	// it("should be able set the name of the user and get overall counter", async function () {
	// 	// let instance = greetings(pool);
	// 	await instance.enterName("Themba");

	// 	assert.equal(await instance.overallCounter(), 1);

	// });

	// it("should be able take in a different language and return message", async function () {


	// 	var message = await instance.language("Isixhosa", "Themba");
	// 	var message2 = await instance.language("English", "Themba");
	// 	var message3 = await instance.language("Afrikaans", "Sipho");


	// 	assert.equal(message, "Molo, Themba" + " !");
	// 	assert.equal(message2, "Hello, Themba" + " !");
	// 	assert.equal(message3, "Hallo, Sipho" + " !");

	// });


	// it("should be able check if no name is updated and return undefined or empty", async function () {

	// 	let instance = greetings(pool);

	// 	assert.equal(undefined, await instance.getCountForUser('sipho'));

	// });

	// it("should be able check count for specific  user", async function () {

	// 	let instance = greetings(pool);

	// 	//await instance.existDbAndCount();

	// 	await instance.enterName("Thabie");
	// 	await instance.enterName("zweli");

	// 	assert.deepEqual(await instance.getCountForUser("zweli"), 1);

	// });


	// 	it("should be able to reset the counter back to zero", async function () {

	// 		let instance = greetings(pool);


	// 		await instance.enterName("Hloni");
	// 		await instance.enterName("Tau");

	// await instance.resetFtn()
	// 		assert.deepEqual([], await instance.getName() );

	// 	});


































})

after(function () {
	pool.end();


});

