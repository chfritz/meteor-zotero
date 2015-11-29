Zotero = {};

var server = 'https://www.zotero.org'
var urls = {
    requestToken: server + "/oauth/request",
    authorize: server + "/oauth/authorize",
    accessToken: server + "/oauth/access",
    authenticate: server + "/oauth/authorize",
};

OAuth.registerService('zotero', 1, urls, function(oauthBinding, data) {
    // console.log(oauthBinding, data);
    
    var serviceData = {
        id: oauthBinding.accessTokenRawResponse.userID,
        screenName: oauthBinding.accessTokenRawResponse.username,
        accessToken: OAuth.sealSecret(oauthBinding.accessToken),
        accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret)
    };

    return {
        serviceData: serviceData,
        options: {
            profile: {
                name: oauthBinding.accessTokenRawResponse.username,
                username: oauthBinding.accessTokenRawResponse.username
            }
        }
    };
});


Zotero.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
