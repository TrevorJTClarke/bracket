define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({

    initialize: function() {
      return this;
    },

    defaults: {
      "Firebase": {
        "ROOT": "https://flickering-heat-8044.firebaseio.com",
        "users": "/users",
        "champsionships": "/champsionships",
        "stats": "/stats"
      }
    }

  });

});
