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

    // TODO:
    // get associated stuffsssss
    // GET /classes/Championships
    // where={"$relatedTo":{"object":{"__type":"Pointer","className":"ChampionshipPlayers","objectId":"wrawx1tefZ"},"key":"ChampionshipsRef"}}

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
      "firstName": "",
      "lastName": "",
      "email": "",
      "initials": "",
      "color": ""
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
    },

    getPlayer: function () {
      // TODO: get my player item, so I can reference the other data
      // similar to:
      // GET /classes/ChampionshipPlayers
      // 'where={"UserRef":{"__type":"Pointer","className":"_User","objectId":"3pf74Md0VT"}}'
    },

    getAllChampionships: function () {
      // TODO: see top
    }

  });

  return new UserModel();

});
