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

  // PRIVATE METHODS
  var PS = System.get('Parse');

  // Internal Helpers
  function clearFluff(data) {
    data.id = data.objectId;

    delete data.objectId;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.sessionToken;

    return data;
  }

  // SETUP
  var PS = System.get('Parse');

  var UserModel = Backbone.Model.extend({

    url: PS.USER,

    initialize: function() {
      // grab localvalues
      var lclData = localStorage.getItem('br-user');
      lclData = (lclData) ? JSON.parse(lclData) : lclData;

      this.set(lclData);

      return this;
    },

    defaults: {
      firstName: '',
      lastName: '',
      email: '',
      initials: '',
      color: ''
    },

    /**
     * stores the user data inside of localStorage
     * @param  {object} data any attributes that belong on the user
     * @return {Instance}
     */
    cache: function(data) {
      var _this = this;
      var cleanData = (data) ? clearFluff(data) : null;
      var attrs = (cleanData) ? cleanData : _this.attributes;
      var cacheData = JSON.stringify(attrs);

      _this.set(attrs);

      localStorage.setItem('br-user', cacheData);
      return this;
    },

    /**
     * removes all cached user data
     */
    remove: function() {
      this.clear();
      this.id = null;
      localStorage.removeItem('br-user');
    },

    /**
     * gets the user data with all references inside the DB
     * @return {Promise}
     */
    getPlayer: function() {
      var dfd = Q.defer();
      var _this = this;
      var url = PS.CLASSES + PS.CHAMPIONSHIPPLAYERS;

      // Special query values added
      url = url + '?where={"UserRef":{"__type":"Pointer","className":"_User","objectId":"' + _this.id + '"}}'

      $.get(url)
        .success(function(res) {
          var data = res.results[0];
          _this.set('playerId', data.objectId);

          dfd.resolve(data);
        })
        .error(dfd.reject);

      return dfd.promise;
    },

    /**
     * gets all championships tied to the user from the DB
     * @return {Promise}
     */
    getAllChampionships: function() {
      var dfd = Q.defer();
      var _this = this;
      var url = PS.CLASSES + PS.CHAMPIONSHIPS;
      var plId = _this.get('playerId');

      // Must get Player first!!
      if (!plId) { return; }

      // Special query values added
      url = url + '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"ChampionshipPlayers","objectId":"' + plId + '"},"key":"ChampionshipsRef"}}'

      $.get(url)
        .success(function(res) {
          dfd.resolve(res.results);
        })
        .error(dfd.reject);

      return dfd.promise;
    }

  });

  return new UserModel();

});
