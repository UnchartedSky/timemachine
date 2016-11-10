var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://localhost:8081/';

config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '1806797062923375',
    appSecret:      process.env.FACEBOOK_APPSECRET      || '25d08987cbc8b01f44ec7a4a0adf47f8',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'unregistered-machine',
    // redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
};

module.exports = config;