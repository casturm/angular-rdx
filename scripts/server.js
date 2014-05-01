// Run from the project root with the shell command "npm start"
// Or, run with the shell command "node server.js".
// (first install dependencies with the command "npm install")
// (first install Node.js, see https://github.com/joyent/node/wiki/Installation
var port = process.env.PORT || 8000,
    express = require('express'),
    jsonBody = require('body/json'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    urlencode = require('urlencode'),
    app = express();


//logger.token('type', function(req, res){ return req.headers['content-type']; })
//app.use(logger(':remote-addr - - [:date] ":method :url HTTP/:http-version" :type :status :res[content-length] ":referrer" ":user-agent"'));
//app.use(favicon(express.static(__dirname + '/../app/assets/favicon.ico')));

app.use(logger('dev'));
app.use(favicon());
app.use('/', express.static(__dirname + '/../bower_components'));
app.use('/', express.static(__dirname + '/../app'));

// protect /api/cases routes
app.use('/api/cases', expressJwt({secret: 'shhhhhhared-secret'}));

app.post('/authenticate', function (req, res) {

  function send(err, body) {
    console.log('authenticate: ' + JSON.stringify(body));
    if (!(body.username === 'admin' && body.password === 'doit')) {
      res.send(401, 'Wrong user or password');
      return;
    }

    var profile = {
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@rdx.com',
      id: 123
    };

    var token = jwt.sign(profile, 'shhhhhhared-secret', { expiresInMinutes: 60*5 });

    var response = { profile: profile, token: token };

    console.log('res.send ' + JSON.stringify(response));
    res.send(response);
  }
  jsonBody(req, res, send)
});

app.get('/api/cases', function(req, res) {
  function send(err, body) {
    data = [];
    for (var k in cases) {
      data.push(cases[k]);
    }
    console.log('get cases res.send ' + JSON.stringify(data));
    res.send({cases: data});
  }
  jsonBody(req, res, send)
});

var cases = {
  "0": {
      id: 0,
      name: "bob",
      email: "bob@foobar.com",
      phone_number: "3034430971",
      beneficiary_type: "trust",
      trust_name: "trusty trust fund",
      risk_taker: "Yes",
      risk_kind: "Sky Diviing",
      alive: "Yes"
    }
};
var ids = 1;
app.post('/api/interview', function(req, res){
  function send(err, body) {
    var interview = {id: ids++};
    cases[interview.id] = interview;
    console.log('post interview res.send ' + JSON.stringify(interview));
    res.send(interview);
  }
  jsonBody(req, res, send)
});

app.put('/api/interview', function(req, res){
  function send(err, body) {
    console.log('put interview res.send ' + JSON.stringify(body));
    cases[body.id] = body;
    res.send(body);
  }
  jsonBody(req, res, send)
});

app.listen(port);
console.log('Now serving http://localhost:'+port+'/index.html');
