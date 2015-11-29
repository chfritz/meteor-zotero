Template.configureLoginServiceDialogForZotero.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForZotero.fields = function () {
  return [
    {property: 'consumerKey', label: 'API key'},
    {property: 'secret', label: 'API secret'}
  ];
};
