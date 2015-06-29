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
  var PS = System.get('Parse');

  return Backbone.Model.extend({

    url: PS.CLASSES + PS.CHAMPIONSHIPPLAYERS,

    initialize: function() {
      return this;
    },

    defaults: {
      'firstName': '',
      'lastName': '',
      'color': '',
      'email': ''
    },

    saveDataRef: function ( type, id ) {

      var _self = this;
      // save a ref to the user data
      var dataRef = System.getParseRef( type, id );
      _self.set( type.replace("_","") + 'Ref', dataRef );

      // store the user data as a player and return promise
      return _self.save();
    }

  });

});
