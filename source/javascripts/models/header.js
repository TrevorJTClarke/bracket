define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({

    initialize: function() {
      return this;
    },

    // Default values for all of the Model attributes
    defaults: {
      "something": "hi"
    },

    // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
    validate: function(attrs) {}

  });

});
