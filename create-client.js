var Client = require('pg').Client

module.exports = createClient

function createClient(callback){
	var client = new Client({
		database: 'testDB',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password:process.env.DB_PASSWORD
	})
	client.connect(function(err){
		if(err){
			return callback(new Error("Could not connect to database: "+ err.message))
		}
		callback(null, client)
	})
}