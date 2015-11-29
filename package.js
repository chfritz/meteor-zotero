Package.describe({
    name: 'chfritz:zotero',
    summary: "Zotero OAuth1 authentication flow",
    git: 'https://github.com/chfritz/meteor-zotero',
    version: "0.1.0",
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    // api.use('http', ['client', 'server']);
    api.use('templating', 'client');
    api.use('chfritz:oauth1@1.1.5', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use('random', 'client');
    api.use('underscore', 'server');
    api.use('service-configuration', ['client', 'server']);
    
    api.export('Zotero');
    
    api.addFiles(
        ['zotero_configure.html', 'zotero_configure.js'],
        'client');
    
    api.addFiles('zotero_server.js', 'server');
    api.addFiles('zotero_client.js', 'client');
});
