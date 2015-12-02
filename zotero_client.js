Zotero = {};

// Request Zotero credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Zotero.requestCredential = function (options, credentialRequestCompleteCallback) {
    // support both (options, callback) and (callback).
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'zotero'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(
            new ServiceConfiguration.ConfigError());
        return;
    }

    var credentialToken = Random.secret();
    var loginStyle = OAuth._loginStyle('zotero', config, options);
    var loginPath = '_oauth/zotero/?requestTokenAndRedirect=true'
        + '&state=' + OAuth._stateParam(loginStyle, credentialToken,
                                        options && options.redirectUrl);
    
    OAuth.launchLogin({
        loginService: "zotero",
        loginStyle: loginStyle,
        loginUrl: Meteor.absoluteUrl(loginPath),
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken
    });
};

Zotero.requestAPIAccess = function (options, credentialRequestCompleteCallback) {
    // support both (options, callback) and (callback).
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'zoteroAPI'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(
            new ServiceConfiguration.ConfigError());
        return;
    }

    var credentialToken = Random.secret();
    var loginStyle = OAuth._loginStyle('zoteroAPI', config, options);
    var loginPath = '_oauth/zoteroAPI/?requestTokenAndRedirect=true'
        + '&state=' + OAuth._stateParam(loginStyle, credentialToken,
                                        options && options.redirectUrl);
    
    OAuth.launchLogin({
        loginService: "zoteroAPI",
        loginStyle: loginStyle,
        loginUrl: Meteor.absoluteUrl(loginPath),
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken
    });
};
