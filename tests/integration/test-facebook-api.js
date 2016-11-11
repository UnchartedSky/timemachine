var fibrous = require('fibrous'),
    supertest = require('supertest'),
    assert = require('assert'),
    util = require('util'),
    facebook = require('../../lib/facebook'),
    app = require('../../app'),
    test_users = require('./../../testsupports/test_users');


describe('Posts', function () {
    this.timeout(10000);

    var user;
    before(function () {
        user = test_users.sync.getUser();

        test_users.randomPostsSync(user, 20);
    });

    after(function () {
        test_users.deleteAllUsers();
    });

    describe('#listPosts()', function () {
        it('should return 200 ok', function (done) {
            const limit = 2;

            supertest(app)
                .get(util.format('/listPosts?accessToken=%s&limit=%d', user.access_token, limit))
                .expect(200)
                .end(done);
        });

        it('should return 400 if no access token is provided', function (done) {
            const limit = 2;

            supertest(app)
                .get(util.format('/listPosts?limit=%d', limit))
                .expect(400)
                .end(done);
        });
    });
});
