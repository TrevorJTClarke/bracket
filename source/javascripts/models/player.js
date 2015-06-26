define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({

    initialize: function() {
      return this;
    },

    defaults: {
      "objectId": ""
    }

  });

});
