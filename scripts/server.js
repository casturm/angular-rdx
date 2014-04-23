// Run from the project root with the shell command "npm start"
// Or, run with the shell command "node server.js".
// (first install dependencies with the command "npm install")
// (first install Node.js, see https://github.com/joyent/node/wiki/Installation
var port = process.env.PORT || 8000,
    express = require('express'),
    jsonBody = require('body/json'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    app = express();


//logger.token('type', function(req, res){ return req.headers['content-type']; })
//app.use(logger(':remote-addr - - [:date] ":method :url HTTP/:http-version" :type :status :res[content-length] ":referrer" ":user-agent"'));
app.use(logger('dev'));
app.use(favicon(express.static(__dirname + '/../app/assets/favicon.ico')));
app.use('/', express.static(__dirname + '/../bower_components'));
app.use('/', express.static(__dirname + '/../app'));

app.post('/cases', function(req, res){
  function send(err, body) {
    console.log('res.send ' + JSON.stringify(body));
    res.send(body);
  }
  jsonBody(req, res, send)
});

app.listen(port);
console.log('Now serving http://localhost:'+port+'/index.html');
