define([
  'backbone',
  'models/player',
  'models/system'
],
function(
  Backbone,
  Player,
  System
) {
  // SETUP
  var PS = System.get("Parse");

  return Backbone.Collection.extend({

    url: PS.CLASSES + PS.CHAMPIONSHIPPLAYERS,

    model: Player

  });

});
