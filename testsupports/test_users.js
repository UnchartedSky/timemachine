const winston = require('winston');

var fibrous = require('fibrous'),
    FBTestUsers = require('fb-test-users'),
    facebook = require('../lib/facebook'),
    config = require('../config'),
    randomstring = require("randomstring");

var fbTestUsers = new FBTestUsers({appID: config.facebook.appId, secret: config.facebook.appSecret});

getUser = function (created) {
    fbTestUsers.create({installed: true, permissions: ['user_posts', 'publish_actions']}, created);
};

deleteAllUsers = function () {
    fbTestUsers.list(function (error, users) {
        users.forEach(u =>
            fbTestUsers.delete(u.id, function (error, success) {
                if (!error) {
                    winston.error(error);
                }
            })
        );

    });
};

randomPost = function (user, result) {
    fbApp = facebook.getFacebookApp();
    fbApp.setAccessToken(user.access_token);

    var body = 'Test post: ' + randomstring.generate();
    fbApp.api('me/feed', 'post', {message: body}, function (res) {
        if (!result) {
            return res.send(500, 'error');
        }

        if (result.error) {
            if (result.error.type == 'OAuthException') {
                return res.send(401, 'error');
            }
        }

        result();
    });
};

randomPostsSync = function (user, number_of_posts) {
    "use strict";

    var futures = [];
    for (var i = 0; i < number_of_posts; i++) {
        futures.push(future.randomPost(user));
    }

    fibrous.wait(futures);
};

module.exports.getUser = getUser;
module.exports.deleteAllUsers = deleteAllUsers;
module.exports.randomPostsSync = randomPostsSync;