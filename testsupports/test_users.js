var FBTestUsers = require('fb-test-users'),
    config = require('../config');

getUser = function(created) {
    fbTestUsers = new FBTestUsers({appID: config.facebook.appId, secret: config.facebook.appSecret});

    fbTestUsers.create({installed: true, permissions: 'user_posts'}, created);
};

module.exports.getUser = getUser;
