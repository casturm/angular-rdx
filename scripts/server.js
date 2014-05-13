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
    https = require('https'),
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
    if (body == undefined || !(body.username === 'admin' && body.password === 'doit')) {
      res.send(401, 'The username or password you entered is incorrect');
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

app.get('/api/quotes/:id', function(req, res){
  var post_dob = '01/21/1974';
  var gender = 'male';
  var tobacoo = false;
  if (req.params.id != {}) {
    interview = cases[req.params.id];
    var dob = new Date(interview.birthdate)
    if (dob != undefined) {
      console.log("dob: " + dob);
      post_dob = (dob.getMonth() + 1) + "/" + dob.getDate() + "/" + dob.getFullYear();
      console.log("post_dob: " + post_dob);
    }
    gender = interview.sports == 'Yes' ? 'male' : 'female';
    tobacco = interview.risk_taker == 'Yes' ? true : false;
  }

  var request = {
    FaceAmountIncrement: 25000,
    FaceAmountMin: 25000,
    FaceAmountMax: 250000,
    PlanCode: [ "RDEXPT1" ],
    TermLength: [10, 15, 20, 30],
    DOB: post_dob,
    State: "OR",
    Tobacco: tobacco,
    Gender: gender
  };

  console.log('quote requesst: ' + JSON.stringify(request));

  getQuotesFromFlaService(request, res);
});

transform = function(quoteData) {
  var data = JSON.parse(quoteData);

  var quoteHash = {};
  var arrayLength = data.length;
  for (var i = 0; i < arrayLength; i++) {
    q = data[i];
    premium = {};
    premium.id = q["FaceAmount"] + '_' + q["TermLength"];
    premium.term = q["TermLength"];
    premium.amount = q["MonthlyPremium"];
    premiums = quoteHash[q["FaceAmount"].toString()] || {};
    premiums[premium.id] = premium;
    quoteHash[q["FaceAmount"].toString()] = premiums;
  }

  var quotes = [];
  for (var q in quoteHash) {
    var returnQuote = {coverageAmount: q, premiums: { monthly: [] }};
    for (var p in quoteHash[q]) {
      returnQuote.premiums.monthly.push(quoteHash[q][p]);
    }
    quotes.push(returnQuote);
  }
  return quotes;
};

getQuotesFromFlaService = function(clientRequest, clientResponse) {
  var options = {
    hostname: 'efintest.com',
    port: 443,
    path: '/flaquotingservice/api/quote/?authcode=3ace31a2-1482-4062-91fc-a3d7df4059aa',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  var req = https.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on('data', function (data) {
      console.log('data: ', JSON.parse(data));
      clientResponse.send(transform(data));
    });
  });

  req.on('error', function(e) {
    console.log("error");
    console.error(e);
    clientResponse.redirect('/quotes/quotes.json');
  });

  req.write(JSON.stringify(clientRequest) + "\n");
  req.end();
};

app.listen(port);
console.log('Now serving http://localhost:'+port+'/index.html');
