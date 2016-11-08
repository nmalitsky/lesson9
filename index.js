let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:6565/lesson9';

MongoClient.connect(url, (err, db) => {
	if(err) {
		console.log(`Error connection to the MongoDB server: ${url} - ${err.message}`)
	} else {
		let users = db.collection('users');

		console.log(`The successful connection to the MongoDB server: ${url}\n`)

		users.insert( [{user: 'U1', age: 45}, {user: 'U2', age: 67}, {user: 'U3', age: 23}], (err, res) => {
			if(err) {
				console.log(`Error insert to the collection 'users' - ${err.message}`);
			} else {
				
				// find all
				users.find({}).toArray((err, res) => {
					if(err) {
						console.log(`Error search in the collection 'users' - ${err.message}`);
					} else {
						console.log(`Search #1 - find all (${res.length}) users:`);
						console.log(JSON.stringify(res, null, 2));
					}
				});

				let maxAge = 40;
				// find users with age > maxAge
				users.find({age: {$gt: maxAge}}).toArray((err, res) => {
					if(err) {
						console.log(`Error search in the collection 'users' - ${err.message}`);
					} else {
						console.log(`Search #2 - find ${res.length} users with age > ${maxAge}:`);
						console.log(JSON.stringify(res, null, 2));
					}
				});

				users.remove();
			}
			db.close();
		});
	}
});