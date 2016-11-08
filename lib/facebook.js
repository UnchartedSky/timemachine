var util = require('util');
const querystring = require('querystring');

listPosts = function (request, response) {

    const limit = request.query.limit ? request.query.limit : 128;


    var FB = require('fb');
    FB.options({version: 'v2.4'});
    var fbApp = FB.extend({appId: '1806797062923375', appSecret: '25d08987cbc8b01f44ec7a4a0adf47f8'});

    const accessToken = request.query.accessToken;
    fbApp.setAccessToken(accessToken);

    const defaultUrl = util.format('me/feed?limit=%d', limit);

    fbApp.api(defaultUrl, 'get', function (res) {
        if (!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            response.sendStatus(400);
            return;
        }

        console.log('Post Id: ' + res.id);

        if (util.isNullOrUndefined(res.paging) || util.isNullOrUndefined(res.paging.next)) {
            response.sendStatus(200);
            return;
        }

        // res.data
        // https://graph.facebook.com/v2.4/10204378288520268/feed?access_token=EAACEdEose0cBAFxXdmRRD6DwZCZCRe7NqL3THETzpvWZBfzGIaAMuiAyGtSO3xNdZAEfoQ7urGqCcRrDDQWljZCmzZBrfDk274jnl0aqS857lkiZAFFEvlfC4tqxnFYBcIZAAdCoeJqqeVhBrET2fRNuBpWy7lZAIEyljk9qDuQ979yY2Y8XgV5ptU1SlOqlewfwZD&limit=25&until=1477832513&__paging_token=enc_AdB8rgQNioYGGvvnLvzUBWX2o3hjG4hZBOVmYXluzIjDH9jWs3DCxNblZCpno8TUf2No4mqnEEb78MmskvflN5L2dG
        var parsed = querystring.parse(res.paging.next);
        const nextUrl = util.format('me/feed?limit=%d?until=%d', parsed['limit'], parsed['until']);

        fbApp.api(nextUrl, 'get', function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                response.sendStatus(400);
                return;
            }

            console.log('Post Id: ' + res.id);
            response.sendStatus(200);
        });
    });
};

module.exports.listPosts = listPosts;
