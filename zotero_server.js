Zotero = {};

var server = 'https://www.zotero.org'
var urls = {
    requestToken: server + "/oauth/request",
    authorize: server + "/oauth/authorize",
    accessToken: server + "/oauth/access",
    authenticate: server + "/oauth/authorize",
};

OAuth.registerService('zotero', 1, urls, function(oauthBinding, data) {

    // data looks like this (oauth_verifier might become useful at one point:
    // { close: '',
    //   state: 'ey....JvIn0=',
    //   oauth_token: 'eaa12...f006',
    //   oauth_verifier: 'd9ad...50a1' } }
    
    return {
        serviceData: {
            id: oauthBinding.accessTokenRawResponse.userID,
            username: oauthBinding.accessTokenRawResponse.username,
            accessToken: OAuth.sealSecret(oauthBinding.accessToken),
            accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret) },
        options: {
            profile: {
                name: oauthBinding.accessTokenRawResponse.username,
                username: oauthBinding.accessTokenRawResponse.username,
                id: oauthBinding.accessTokenRawResponse.userID
            }
        }
    };
});


Zotero.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
