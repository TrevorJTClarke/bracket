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

    /**
     * used for seperation between the logged in User, and the player part of a championship
     */
    initialize: function() {
      return this;
    },

    defaults: {
      firstName: '',
      lastName: '',
      color: '',
      email: ''
    },

    /**
     * store a reference to the specified data set, based on ID, useful for associating a championship to a player
     * @param  {String} type is the reference to a data class
     * @param  {String} id   is the index to the data class item
     * @return {Promise}
     *
     * Example:
     * "Championships", "ZYX1234"
     *
     * Return and Saves:
     * {
         '__op': 'AddRelation',
         'objects': [{
           '__type': 'Pointer',
           'className': 'Championships',
           'objectId': 'ZYX1234'
         }]
       }
     */
    saveDataRef: function(type, id) {

      var _this = this;

      // save a ref to the user data
      var dataRef = System.getParseRef(type, id);
      _this.set(type.replace('_', '') + 'Ref', dataRef);

      // store the user data as a player and return promise
      return _this.save();
    }

  });

});
