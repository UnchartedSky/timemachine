`master`: [![Build Status](https://travis-ci.com/andromedarabbit/timemachine.svg?token=265AAhxHviCMV4xC9qkK&branch=master)](https://travis-ci.com/andromedarabbit/timemachine)
`develop`: [![Build Status](https://travis-ci.com/andromedarabbit/timemachine.svg?token=265AAhxHviCMV4xC9qkK&branch=develop)](https://travis-ci.com/andromedarabbit/timemachine)

# Time Machine

Privacy protecting tool for Facebook and Twitter users.

## How to run it

```bash
# Run the server
node app.js

# Call the APIs
curl http://localhost:8081/listPosts?accessToken=YOUR_FB_ACCESS_TOKEN
```

## How to run tests

```bash
npm test
```

## Guide for developers

### How to get Facebook access token

* You can get your token by using [Access Token Tool](https://developers.facebook.com/tools/accesstoken/).
* You can also get token for testing users via FB's [Test Users](https://developers.facebook.com/apps/1806797062923375/roles/test-users/) tool.

### Get to know how APIs work

Read [Graph API `/{user-id}/feed`](https://developers.facebook.com/docs/graph-api/reference/v2.8/user/feed) document and run it on [Graph API Explorer](https://developers.facebook.com/tools-and-support/).

## Thanks to

* [node-facebook/facebook-node-sdk](https://github.com/node-facebook)
