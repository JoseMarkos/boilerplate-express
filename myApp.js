let express = require('express');
let app = express();
console.log("Hello World");
console.log(process.env.MESSAGE_STYLE);

app.use('/public', express.static(__dirname + '/public'));
app.use(function(req, res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
	res.json({"message": 'uppercase' == process.env.MESSAGE_STYLE 
						? "Hello json".toUpperCase()
						: "Hello json"});
});




module.exports = app;
