"use strict";

const winston = require('winston'),
    url = require('url'),
    querystring = require('querystring'),
    util = require('util'),
    config = require('../config');

var getFacebookApp = function () {
    var FB = require('fb');
    FB.options({version: 'v2.4'});
    return FB.extend({appId: config.facebook.appId, appSecret: config.facebook.appSecret});
};

var fbApp = getFacebookApp();

function nextPage(response, fb_options, updatePost) {
    fbApp.api('me/feed', 'get', fb_options, function (res) {
        if (!res || res.error) {
            var errorMsg = !res ? 'error occurred' : res.error;
            winston.error(errorMsg);
            response
                .type('application/json')
                .status(400)
                .send({'errorMsg': errorMsg})
                .end();
            return;
        }

        res.data.forEach(post => updatePost(post));

        if (util.isNullOrUndefined(res.paging) || util.isNullOrUndefined(res.paging.next)) {
            response.sendStatus(200);
            return;
        }

        // https://graph.facebook.com/v2.8/102804073536249/feed?fields=privacy&limit=2&access_token=EAAZArRbkd5G8BAE5xEIrBXIoi7a3v3uBjGVxyYibZAy7KwOrfG1kNSknb092Q51jdjpiCm6ARGxwf9tEZC6R4uGU8Cfhv5O7ZA4sBStM3qgTuMHKR77c5ljASKqYxDMAfdLQ1mRzb6gZBshj59UhyNIrYZBZCR68qZCfOzZB09ksf1gZDZD&until=1478877488&__paging_token=enc_AdBpzJ9ZC3iKewlLJRCgDwrE4ZBwUkmCFRYsRPRYZCPzO2XpdZBHxji8GtLXyfO6Md9ZCgyRqRHoPEN5QC0hWzkrVpPiCfcDA6E1Ili8tsakOm5lfnvjhBCNu5jJoROSXoJhb3ZCpuLEf469wnZCSpEWZBfZBIvIr
        var urlParsed = url.parse(res.paging.next);
        var queryParsed = querystring.parse(urlParsed.query);
        nextPage(response, queryParsed, updatePost);
    });
};

function setAllPostsPrivate(request, response) {
    "use strict";

    const accessToken = request.body.accessToken;
    const limit = request.body.limit ? request.body.limit : 128;

    iteratePosts(accessToken, {'limit': limit, 'privacy': ['privacy']}, response, function (post) {
        winston.info('This post is going to be set to only me: ' + JSON.stringify(post));

        fbApp.api(post.id, 'post', { 'privacy': {'value': 'SELF'}}, function (res) {
            if (!res || res.error) {
                var errorMsg = !res ? 'error occurred' : res.error;
                winston.error(errorMsg);
                response
                    .type('application/json')
                    .status(400)
                    .send({'errorMsg': errorMsg})
                    .end();
                return;
            }
        });
    });
}

function verify(request, response) {
    "use strict";

    const accessToken = request.query.accessToken;
    const limit = request.query.limit ? request.query.limit : 128;

    iteratePosts(accessToken, {'limit': limit, 'fields': ['privacy']}, response, function (post) {
        if(post.privacy.value != 'SELF') {
            var errorMsg = 'Post: ' + JSON.stringify(post);
            winston.error(errorMsg);
            response
                .type('application/json')
                .status(400)
                .send({'errorMsg': errorMsg})
                .end();
            return;
        }
    });
}

function iteratePosts(accessToken, fb_options, response, updatePost) {

    if (!accessToken) {
        response
            .type('application/json')
            .status(400)
            .send({'errorMsg': 'accessToken is required!'})
            .end();
        return;
    }

    fbApp.setAccessToken(accessToken);

    nextPage(response, fb_options, updatePost);
};

module.exports.getFacebookApp = getFacebookApp;
module.exports.verify = verify;
module.exports.setAllPostsPrivate = setAllPostsPrivate;