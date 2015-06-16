define([
  'models/championship'
], function(
  Championship
) {

  return Backbone.Collection.extend({

    model: Championship

  });

});
