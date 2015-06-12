define([
  'models/championship',
  'models/system',
  'firebase',
	'backbonefire'
], function(
  Championship,
  System
) {

  // SETUP
  var sys = new System();
  var FB = sys.get("Firebase");

  return Backbone.Firebase.Collection.extend({

    model: Championship,

    url: FB.ROOT + FB.championships

  });

});
