define([
  'jquery',
  'backbone'
],
function($, Backbone){

  // Creates a new Backbone Model class object
  return Backbone.Model.extend({
    url: Parse.sync,

    initialize: function() {
      // totally bind Parse and this model
      var _self = this;
      $.extend(true, _self, Parse.Object.extend({
        className: "Statistics"
      }) );
    },

    defaults: {
      'totals': {
        'championships': 0,
        'users': 0
      }
    }

  });

});
