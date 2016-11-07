var supertest = require('supertest'),
    app = require('../../app');

exports.list_posts = function(done){
    supertest(app)
        .get('/listPosts?accessToken=EAAZArRbkd5G8BABfkqwVZBEHh4FNUZCVxhbljlglXez2F6yYXZAaZBbpYRdkQO0BRz9sTfO6svbZA2QYpS25UxO047YEFOOmGtWUtKhtNFkYhnEDvSm1oLmFGZBWhURKxqeukIf1tYQ1728mr8TyGeoZCrCn6ZBHV8qSTZBtmeloWSb5bxTNFcw2EZA')
        .expect(200)
        .end(done);
};
