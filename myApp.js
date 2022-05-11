let express = require('express');
let app = express();
const bodyParser = require('body-parser');

console.log("Hello World");

app.use('/public', express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
	res.json({"message": 'uppercase' == process.env.MESSAGE_STYLE 
						? "Hello json".toUpperCase()
						: "Hello json"});
});

app.get('/now', function(req, res, next) {
	req.time = new Date().toString();
	next();
}, function(req, res) {
	res.json({time: req.time});
});

app.get('/:word/echo', function(req, res) {
	console.log(req.params.word);
	res.json({echo: req.params.word});
});

app.route('/name').get(function(req, res) {
	console.log(req.query);
	const { first, last } = req.query;
	res.json({ name: `${first} ${last}`});
}).post(function(req, res){
	console.info(req.body);
	const { first, last } = req.body;
	res.json({ name: `${first} ${last}`});
});




module.exports = app;
