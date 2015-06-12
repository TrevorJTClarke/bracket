define([
  'models/user',
  'models/system',
  'firebase',
	'backbonefire'
], function(
  User,
  System
) {

  // SETUP
  var sys = new System();
  var FB = sys.get("Firebase");

  return Backbone.Firebase.Collection.extend({

    model: User,

    url: FB.ROOT + FB.users

  });

});
