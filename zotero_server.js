Zotero = {};

var server = 'https://www.zotero.org'
var urls = {
    requestToken: server + "/oauth/request",
    authorize: server + "/oauth/authorize",  // not in use?
    accessToken: server + "/oauth/access",
};

// OAuth.registerService('zotero', 1, urls, function(oauthBinding, data) {
OAuth.registerService('zotero', 1, _.extend({
    authenticate: server + "/oauth/authorize?identity=1",   // for login (do not create key)
}, urls), function(oauthBinding, data) {

    // data looks like this (oauth_verifier might become useful at one point:
    // { close: '',
    //   state: 'ey....JvIn0=',
    //   oauth_token: 'eaa12...f006',
    //   oauth_verifier: 'd9ad...50a1' } }
    
    return {
        serviceData: {
            id: oauthBinding.accessTokenRawResponse.userID,
            username: oauthBinding.accessTokenRawResponse.username },            
        options: {
            profile: {
                username: oauthBinding.accessTokenRawResponse.username,
                id: oauthBinding.accessTokenRawResponse.userID
            }
        }
    };
});

OAuth.registerService('zoteroAPI', 1, _.extend({
    authenticate: server + "/oauth/authorize",    // for API (create key)
}, urls), function(oauthBinding, data) {
    
    return {
        serviceData: {
            id: oauthBinding.accessTokenRawResponse.userID,
            username: oauthBinding.accessTokenRawResponse.username,
            accessToken: OAuth.sealSecret(oauthBinding.accessToken),
            accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret) },
        options: {
            profile: {
                username: oauthBinding.accessTokenRawResponse.username,
                id: oauthBinding.accessTokenRawResponse.userID,
                zotero: true
            }
        }
    };
});

Zotero.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
