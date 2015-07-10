define([
  'Q',
  'backbone',
  'models/player',
  'models/system'
],
function(
  Q,
  Backbone,
  Player,
  System
) {
  // SETUP
  var PS = System.get('Parse');
  var mainUrl = PS.CLASSES + PS.CHAMPIONSHIPPLAYERS;

  // PRIVATE METHODS

  // Mutates the data to be formatted into what UI needs
  function formatList(array) {
    var finArray = [];
    var myself = localStorage.getItem('br-user');

    myself = (myself) ? JSON.parse(myself) : {};

    array.map(function(obj, idx) {
      if (obj.username !== 'a' && obj.firstName !== '') {
        // only add needed data
        var addUser = obj;

        addUser.id = obj.objectId;
        addUser.added = false;

        delete addUser.ChampionshipsRef;
        delete addUser.UserRef;
        delete addUser.createdAt;
        delete addUser.updatedAt;

        if (obj.username === myself.username) {
          addUser.email = 'Championship Creator';
          addUser.admin = true;
        }

        finArray.push(addUser);
      }
    });

    return finArray;
  }

  return Backbone.Collection.extend({

    // Helper Exposed
    formatPlayers: formatList,

    // creates mad duplicate players
    // url: PS.CLASSES + PS.CHAMPIONSHIPPLAYERS,

    // model: Player

    /**
     * send a batch update to DB to store references for players and Championships
     * @param  {String} champID      the index to the Championship
     * @param  {String} playersArray the Array of player indexes
     * @return {Promise}
     */
    savePlayers: function(champID, playersArray) {
      var dfd = Q.defer();
      var url = '/batch';
      var champDataRef = System.getParseRef('Championships', champID);
      var data = {
        requests: []
      };

      for (var i = 0; i < playersArray.length; i++) {
        data.requests.push({
          method: 'PUT',
          path: '/1' + PS.CLASSES + PS.CHAMPIONSHIPPLAYERS + '/' + playersArray[i],
          body: {
            ChampionshipsRef: champDataRef
          }
        });
      }

      $.post(url, JSON.stringify(data))
        .success(dfd.resolve)
        .error(dfd.reject);

      return dfd.promise;
    },

    /**
     * Grab root list of players and only return needed data
     * @return {Promise}
     *
     * NOTE: this is a safer way of retrieving all list, since regular fetch stores blank references
     */
    getAvailablePlayers: function() {
      var dfd = Q.defer();
      var _this = this;

      $.get(mainUrl)
        .success(function(res) {
          // quick filtering of player data
          var players = _this.formatPlayers(res.results);

          dfd.resolve(players);
        })
        .error(dfd.reject);

      return dfd.promise;
    },

    /**
     * Grab root list of players and only return needed data
     * @return {Promise}
     *
     * NOTE: this is a safer way of retrieving all list, since regular fetch stores blank references
     */
    getGamePlayers: function(championshipId) {
      var url = PS.CLASSES + PS.CHAMPIONSHIPPLAYERS + System.getExactRef('ChampionshipPlayers', 'Championships', championshipId);

      return $.get(url);
    }

  });

});
