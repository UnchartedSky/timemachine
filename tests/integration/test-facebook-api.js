var supertest = require('supertest'),
    assert = require('assert'),
    util = require('util'),
    facebook = require('../../lib/facebook'),
    app = require('../../app'),
    test_users = require('./../../testsupports/test_users')

exports.list_posts = function (done) {
    this.timeout(10000);

    test_users.getUser( function(error, result) {
        assert.ifError(error);

        const limit = 2;

        supertest(app)
            .get(util.format('/listPosts?accessToken=%s&limit=%d', result.access_token, limit))
            .expect(200)
            .end(done);
    });

};
