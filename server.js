// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const base = require('airtable').base(process.env.AIRTABLE_BASE);

app.get('/test-airtable/:tableName', function (request, response) {
  const { tableName } = request.params;
  base(tableName).select().firstPage().then(([firstEntry]) => {
    response.json({
      message: `${firstEntry._table.name} ${JSON.stringify(firstEntry.fields)}`
    });
  }).catch(err => {
    response.status(500).json(err)
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
