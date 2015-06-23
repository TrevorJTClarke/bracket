define([
  'backbone',
  'models/system'
],
function(
  Backbone,
  System
){

  // Internal Helpers
  function clearFluff ( data ) {
    data.id = data.objectId;

    delete data.objectId;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.sessionToken;

    return data;
  }

  // SETUP
  var PS = System.get("Parse");

  var UserModel = Backbone.Model.extend({

    url: PS.USER,

    initialize: function () {
      // grab localvalues
      var lclData = localStorage.getItem("br-user");
          lclData = (lclData)? JSON.parse(lclData): lclData;

      this.set(lclData);

      return this;
    },

    defaults: {
      "firstName": "Billa",
      "lastName": "Bong",
      "email": "bb@billabong.com",
      "initials": "BB"
    },

    cache: function ( data ) {
      var _self = this;
      var cleanData = (data)? clearFluff( data ) : null;
      var attrs = (cleanData)? cleanData : _self.attributes;
      var cacheData = JSON.stringify( attrs );

      _self.set( attrs );

      localStorage.setItem("br-user", cacheData);
      return this;
    },

    remove: function () {
      this.clear();
      this.id = null;
      localStorage.removeItem("br-user");
    }

  });

  return new UserModel();

});
