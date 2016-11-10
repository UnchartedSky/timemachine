const winston = require('winston');

var FBTestUsers = require('fb-test-users'),
    config = require('../config');

var fbTestUsers = new FBTestUsers({appID: config.facebook.appId, secret: config.facebook.appSecret});

getUser = function (created) {
    fbTestUsers.create({installed: true, permissions: 'user_posts'}, created);
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
}

module.exports.getUser = getUser;
module.exports.deleteAllUsers = deleteAllUsers;
