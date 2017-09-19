var express = require('express')
var createClient = require('./create-client')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static('static-content'))

app.use(bodyParser.json())
app.get('/rest/endpoints/get-all', function(req, res){
	createClient(function (err, client){
		if(err){
			res.status(500)
			return res.send(err.message)
		}

	client.query("SELECT * FROM notetbl", function(err, resultSet){
		if(err){
			res.status(500)
			return res.send("Could not fetch rows: "+ err.message)
		}
		res.json(resultSet.rows)
	})
	})
})
app.post('/rest/endpoints/create', function(req, res){
	createClient(function (err, client){
		if(err){
			res.status(500)
			return res.send(err.message)
		}
		client.query("INSERT INTO notetbl  (name, content) VALUES($1,$2) RETURNING *",[req.body.name,req.body.content],
				function(err, result){
					if(err){
						res.status(500)
						return res.send('Could not insert entry into database: '+ err.message)
					}
					res.json(result.rows[0])
		})
	})
})
app.post('/rest/endpoints/delete', function(req, res){
	createClient(function (err, client){
		if(err){
			res.status(500)
			return res.send(err.message)
		}
		client.query("DELETE FROM notetbl WHERE name = '$1'",[req.body.name],
				function(err, result){
					if(err){
						res.status(500)
						return res.send('Could not delete entry from database: '+ err.message)
					}
					res.json(result.rows[0])
		})
	})
})
app.listen(3000)