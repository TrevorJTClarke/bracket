define([
  'jquery',
  'backbone'
],
function($, Backbone){

  // Creates a new Backbone Model class object
  return Backbone.Model.extend({

    initialize: function() {
      // totally bind Parse and this model
      var _self = this;
    },

    defaults: {
      'totals': {
        'championships': 0,
        'users': 0
      }
    }

  });

});
