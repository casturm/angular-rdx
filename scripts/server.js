// Run from the project root with the shell command "npm start"
// Or, run with the shell command "node server.js".
// (first install dependencies with the command "npm install")
// (first install Node.js, see https://github.com/joyent/node/wiki/Installation
var port = 8000,
    express = require('express'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    app = express();
app.use(favicon());
app.use(logger('dev'));
app.use('/', express.static(__dirname + '/../app'));
app.listen(port);
console.log('Now serving http://localhost:'+port+'/index.html');
