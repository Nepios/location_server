var express = require('express');
var app = express();
var fs = require('fs');
var obj = fs.readFileSync('./static/locations.json', 'utf8');
var parsed = JSON.parse(obj);
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index.ejs', {locations: parsed});
});

app.get('/locations', function(req, res) {
  res.send(obj);
});

app.get('/location/:location', function (req, res){
  var id = req.params.location;
  var name = '';
  var temp = [];
  var descendents = [];
  for (var i = 0; i < parsed.length; i++ ){
    if (parsed[i].location_id == id) {
      name = parsed[i].location_name;
    }
    if (parsed[i].parent_id == id){
      descendents.push(parsed[i].location_name);
    }
  }
  res.send(JSON.stringify({"location": name, "descendants": descendents}));
    
});

app.listen(3000);