define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({

    initialize: function() {
      return this;
    },

    defaults: {
      "name": "First Last",
      "color": "1D677E"
    }

  });

});
