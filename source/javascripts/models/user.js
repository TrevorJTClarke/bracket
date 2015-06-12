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
      "color": "155062",
      "stats": {
        "championships": 0,
        "win": 0,
        "lose": 0,
        "bye": 0
      },
      "preferences": {
        "push": true
      }
    },

    validate: function(attrs) {
      console.log("validate",attrs);
    }

  });

});
