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
      "firstName": "",
      "lastName": "",
      "email": "",
      "initials": "",
      "color": ""
    },

    /**
     * stores the user data inside of localStorage
     * @param  {object} data any attributes that belong on the user
     * @return {Instance}
     */
    cache: function ( data ) {
      var _self = this;
      var cleanData = (data)? clearFluff( data ) : null;
      var attrs = (cleanData)? cleanData : _self.attributes;
      var cacheData = JSON.stringify( attrs );

      _self.set( attrs );

      localStorage.setItem("br-user", cacheData);
      return this;
    },

    /**
     * removes all cached user data
     */
    remove: function () {
      this.clear();
      this.id = null;
      localStorage.removeItem("br-user");
    },

    /**
     * gets the user data with all references inside the DB
     * @return {Promise}
     */
    getPlayer: function () {
      // TODO: get my player item, so I can reference the other data
      // similar to:
      // GET /classes/ChampionshipPlayers
      // 'where={"UserRef":{"__type":"Pointer","className":"_User","objectId":"3pf74Md0VT"}}'
    },

    /**
     * gets all championships tied to the user from the DB
     * @return {Promise}
     */
    getAllChampionships: function () {
      // TODO:
      // GET /classes/Championships
      // where={"$relatedTo":{"object":{"__type":"Pointer","className":"ChampionshipPlayers","objectId":"wrawx1tefZ"},"key":"ChampionshipsRef"}}

    }

  });

  return new UserModel();

});
