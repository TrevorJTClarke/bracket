define([
  'backbone'
],
function(
  Backbone
) {

  return Backbone.Model.extend({

    initialize: function() {
      return this;
    },

    defaults: {
      "firstName": "first",
      "lastName": "last",
      "email": "your@email.com",
      "color": "155062"
    },

    validate: function(attrs) {
      console.log("validate",attrs);
    }

  });

});
