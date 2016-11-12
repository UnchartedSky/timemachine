"use strict";

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    util = require('util'),
    facebook = require('./lib/facebook');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/setAllPostsPrivate', facebook.setAllPostsPrivate);
app.get('/verify', facebook.verify);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

module.exports = server;