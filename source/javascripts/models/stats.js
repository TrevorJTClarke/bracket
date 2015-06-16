define([],
function(){

  // Creates a new Backbone Model class object
  return Parse.Object.extend({
    className: "Statistics",

    initialize: function() {

      return this;
    },

    defaults: {
      'totals': {
        'championships': 0,
        'users': 0
      }
    },

    getMain: function () {
      return this();
    }

  });

});
