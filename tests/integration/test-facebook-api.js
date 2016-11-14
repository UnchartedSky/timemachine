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

        test_users.randomPostsSync(user, 8);
    });

    after(function () {
        test_users.sync.deleteAllUsers();
    });

    describe('#setPostsPrivate()', function () {
        it('should return 200 ok', function (done) {
            const limit = 2;

            supertest(app)
                .post('/setPostsPrivate')
                .send({'accessToken': user.access_token, 'limit': limit})
                .expect(200)
                .end(done);
        });

        it('just for verifying the result', function (done) {
            const limit = 2;

            supertest(app)
                .get(util.format('/verify?accessToken=%s&limit=%d', user.access_token, limit))
                .expect(200)
                .end(done);
        });

        it('should return 400 if no access token is provided', function (done) {
            const limit = 2;

            supertest(app)
                .post('/setPostsPrivate')
                .send({'accessToken': '', 'limit': limit})
                .expect(400)
                .end(done);
        });
    });
});
