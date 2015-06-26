define([
  'Q',
  'backbone',
  'models/system'
],
function(
  Q,
  Backbone,
  System
) {
  // SETUP
  var PS = System.get("Parse");

  return Backbone.Model.extend({

    url: PS.CLASSES + PS.CHAMPIONSHIPPLAYERS,

    initialize: function () {
      return this;
    },

    defaults: {
      'players': []
    },

    savePlayers: function ( playersArray ) {
      var dfd = Q.defer();
      var _self = this;

      _self.set({ players: playersArray })
        .save()
        .then( dfd.resolve, dfd.reject );

      return dfd.promise;
    }

  });

});
