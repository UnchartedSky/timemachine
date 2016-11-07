var express = require('express');
var app = express();
var util = require('util');
facebook = require('./lib/facebook')

app.get('/listPosts', facebook.listPosts);

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
