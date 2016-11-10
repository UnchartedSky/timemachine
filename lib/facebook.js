const winston = require('winston');

var util = require('util'),
    querystring = require('querystring'),
    config = require('../config');

getFacebookApp = function () {
    var FB = require('fb');
    FB.options({version: 'v2.4'});
    return FB.extend({appId: config.facebook.appId, appSecret: config.facebook.appSecret});
};

fbApp = getFacebookApp();

function nextPage(defaultUrl, response) {
    fbApp.api(defaultUrl, 'get', function (res) {
        if (!res || res.error) {
            errorMsg = !res ? 'error occurred' : res.error;
            winston.error(errorMsg);
            response
                .type('application/json')
                .status(400)
                .send({'errorMsg': errorMsg})
                .end();
            return;
        }

        winston.info('Post Id: ' + res.id);

        if (util.isNullOrUndefined(res.paging) || util.isNullOrUndefined(res.paging.next)) {
            response.sendStatus(200);
            return;
        }

        // https://graph.facebook.com/v2.4/10204378288520268/feed?access_token=EAACEdEose0cBAFxXdmRRD6DwZCZCRe7NqL3THETzpvWZBfzGIaAMuiAyGtSO3xNdZAEfoQ7urGqCcRrDDQWljZCmzZBrfDk274jnl0aqS857lkiZAFFEvlfC4tqxnFYBcIZAAdCoeJqqeVhBrET2fRNuBpWy7lZAIEyljk9qDuQ979yY2Y8XgV5ptU1SlOqlewfwZD&limit=25&until=1477832513&__paging_token=enc_AdB8rgQNioYGGvvnLvzUBWX2o3hjG4hZBOVmYXluzIjDH9jWs3DCxNblZCpno8TUf2No4mqnEEb78MmskvflN5L2dG
        var parsed = querystring.parse(res.paging.next);
        const nextUrl = util.format('me/feed?limit=%d?until=%d', parsed['limit'], parsed['until']);

        nextPage(nextUrl, response);
    });
};

listPosts = function (request, response) {

    const limit = request.query.limit ? request.query.limit : 128;

    const accessToken = request.query.accessToken;
    if (!accessToken) {
        response
            .type('application/json')
            .status(400)
            .send({'errorMsg': 'accessToken is required!'})
            .end();
        return;
    }

    fbApp.setAccessToken(accessToken);

    const url = util.format('me/feed?limit=%d', limit);

    nextPage(url, response);
};

module.exports.getFacebookApp = getFacebookApp;
module.exports.listPosts = listPosts;
