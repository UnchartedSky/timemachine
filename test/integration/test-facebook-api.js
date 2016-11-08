var supertest = require('supertest'),
    assert = require('assert'),
    facebook = require('../../lib/facebook'),
    app = require('../../app'),
    util = require('util');

exports.list_posts = function (done) {
    this.timeout(10000);

    FBTestUsers = require('fb-test-users');
    fbTestUsers = new FBTestUsers({appID: '1806797062923375', secret: '25d08987cbc8b01f44ec7a4a0adf47f8'});

    fbTestUsers.create({installed: true, permissions: 'user_posts'}, function (error, result) {
        assert.ifError(error);

        const limit = 2;

        supertest(app)
            .get(util.format('/listPosts?accessToken=%s&limit=%d', result.access_token, limit))
            .expect(200)
            .end(done);
    });

};
