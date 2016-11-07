var util = require('util');

listPosts = function (req, res) {
    const limit = 128;

    var FB = require('fb');
    const querystring = require('querystring');

    FB.options({version: 'v2.4'});
    var fbApp = FB.extend({appId: '1806797062923375', appSecret: '25d08987cbc8b01f44ec7a4a0adf47f8'});

    const accessToken = req.query.accessToken;
    fbApp.setAccessToken(accessToken);

    const defaultUrl = util.format('me/feed?limit=%d', limit);

    fbApp.api(defaultUrl, 'get', function (res) {
        if (!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }

        console.log('Post Id: ' + res.id);
        // res.data
        // https://graph.facebook.com/v2.4/10204378288520268/feed?access_token=EAACEdEose0cBAFxXdmRRD6DwZCZCRe7NqL3THETzpvWZBfzGIaAMuiAyGtSO3xNdZAEfoQ7urGqCcRrDDQWljZCmzZBrfDk274jnl0aqS857lkiZAFFEvlfC4tqxnFYBcIZAAdCoeJqqeVhBrET2fRNuBpWy7lZAIEyljk9qDuQ979yY2Y8XgV5ptU1SlOqlewfwZD&limit=25&until=1477832513&__paging_token=enc_AdB8rgQNioYGGvvnLvzUBWX2o3hjG4hZBOVmYXluzIjDH9jWs3DCxNblZCpno8TUf2No4mqnEEb78MmskvflN5L2dG
        var parsed = querystring.parse(res.paging.next);
        const nextUrl = util.format('me/feed?limit=%d?until=%d', parsed['limit'], parsed['until']);

        fbApp.api(nextUrl, 'get', function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }

            console.log('Post Id: ' + res.id);
        });
    });
};

module.exports.listPosts = listPosts;