define([
  'jquery',
  'backbone',
  'collections/players',
  'models/player',
  'models/system'
],
function(
  $,
  Backbone,
  Players,
  Player,
  System
) {
  // SETUP
  var PS = System.get('Parse');

  // Creates a new Backbone Model class object
  return Backbone.Model.extend({

    url: PS.CLASSES + PS.CHAMPIONSHIP,
    className: 'Championship',
    tierNamespace: 'tier_',

    initialize: function() {
      return this;
    },

    defaults: {
      title: '',
      tierCount: 0
    },

    /**
     * insert players into assigned match slots, used for randomizer function
     */
    associatePlayers: function(playersArray) {
      // check for first tier
      var _this = this;
      var tierId = this.tierNamespace + 1;
      var mainTier = this.get(tierId);

      if (!mainTier) {
        // create new tier, only since we dont have one
        this.addTier();
      }

      // separate players into matches
      for (var i = 0; i <= Math.round(playersArray.length / 2); i++) {
        var matchArray = playersArray.splice(0, 2);

        // then store into the new tier
        _this.addMatch(matchArray, tierId);
      }

      return _this.get(tierId);
    },

    /**
      * adds a new match to a tier data set
      *
      * Data Options:
      * Winner - The ID hash of the user that has won
      * Status - One of the following: 1. new, 2. pending, 3. finished, 4. bye
      */
    addMatch: function(players, tierId) {
      var _this = this;
      var tierData = _this.get(tierId) || [];
      var baseData = {
        sort: tierData.length + 1 || 1,
        players: players,
        winner: null,
        status: 'new'
      };

      tierData.push(baseData);
      this.set(tierId, tierData);
    },

    /**
      * adds new tier data into the Championship data
      */
    addTier: function() {
      var tierCount = this.get('tierCount');
      var currentTier = parseInt(tierCount, 10) + 1;
      var newTierName = this.tierNamespace + currentTier;

      this.set('tierCount', currentTier);
      this.set(newTierName, []);
    },

    /**
     *
     */
    generateTier: function(total) {
      // check for first tier
      var _this = this;
      var tierId = this.tierNamespace + 1;
      var mainTier = this.get(tierId);

      if (mainTier) {
        return;
      }

      // create new tier, only since we dont have one
      this.addTier();

      // separate players into matches
      for (var i = 0; i < Math.round(total / 2); i++) {
        var matchArray = [{}, {}];

        // then store into the new tier
        _this.addMatch(matchArray, tierId);
      }
    },

    /**
     * removes all data from all tiers
     */
    clearTiers: function() {
      var _this = this;
      var tierCount = parseInt(_this.get('tierCount'), 10);

      if (tierCount > 0) {
        for (var i = 1; i <= tierCount; i++) {
          var nm = _this.tierNamespace + i;
          var tmpTierData = _this.set(nm, []);
        }
      }

      _this.set('tiers', []);
    },

    /**
      * returns a specific tier data object
      * @param  {String} tierId is the unique ID of the tier, Example: "tier_1"
      * @return {Object}        tier data object, see example for a sample
      *
      * Example:
      * [{
      * 		players: ["5u43io8787","5w98787"],
      * 		winner: "5u43io8787",
      * 		status: "finished",
      * 		sort: 2
      * }]
      */
    getTierById: function(tierId) {
      var _this = this;
      var tierName = _this.tierNamespace + tierId;
      var tierData = _this.get(tierName);

      return tierData;
    },

    /**
      * adds a user to a specific tier
      * @param  {String} tierId   the unique ID of the tier, example "tier_1"
      * @param  {String} userId   the unique ID of the user to add to the tier, based off of the user ID hash
      * @param  {number} matchId (Optional) - sets the user at a specific match
      * @param  {number} matchPosition (Optional) - sets the user at a specific match position
      */
    addPlayerToTier: function(tierId, userId, matchId, matchPosition) {
      if (!tierId || !userId) {
        return;
      }

      var _this = this;
      var tierName = _this.tierNamespace + tierId;
      var tierData = _this.get(tierName);

      // TODO: refactor this cheezbiznesss
      // assess area to place the player
      function processMatchPlayer(id) {
        var mPlayers = tierData[id].players;

        if (typeof mPlayers[0] === 'string') {
          if (typeof mPlayers[1] === 'string') {
            // add the player to first position
            tierData[id].players[0] = userId;
          } else {
            // add the player to first position
            tierData[id].players[1] = userId;
          }
        } else {
          // add the player to first position
          tierData[id].players[0] = userId;
        }
      }

      tierData.forEach(function(obj, idx) {
        if (obj.sort === matchId) {
          processMatchPlayer(idx);
        }
      });

      // update data to main model
      _this.get(tierName, tierData);
    }

  });

});
