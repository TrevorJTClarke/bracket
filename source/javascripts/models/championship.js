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
){
  // SETUP
  var PS = System.get("Parse");

  // Creates a new Backbone Model class object
  return Backbone.Model.extend({

    url: PS.CLASSES + PS.CHAMPIONSHIP,
    className: "Championship",
    tierNamespace: 'tier_',

    initialize: function() {
      return this;
    },

    defaults: {
      'title': '',
      'tierCount': 0
    },

    /**
     * insert players into assigned match slots, used for randomizer function
     */
    associatePlayers: function ( playersArray ) {
      // check for first tier
      var _self = this,
          tierId = 'tier_1',
          mainTier = this.get(tierId);
      if(!mainTier){
        // create new tier, only since we dont have one
        this.addTier();
      }

      // separate players into matches
      for (var i = 0; i <= Math.round(playersArray.length / 2); i++) {
        var matchArray = playersArray.splice(0,2);

        // then store into the new tier
        _self.addMatch( matchArray, tierId );
      }

      return _self.get(tierId);
    },

    /**
      * adds a new match to a tier data set
      *
      * Options:
      * Winner - The ID hash of the user that has won
      * Status - One of the following: 1. new, 2. pending, 3. finished, 4. bye
      */
    addMatch: function ( players, tierId ) {
      var tierData = this.get(tierId) || [];
      var baseData = {
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
    addTier: function () {
        var tierCount = this.get('tierCount'),
            currentTier = parseInt(tierCount,10) + 1,
            newTierName = this.tierNamespace + currentTier;
        this.set('tierCount', currentTier);
        this.set(newTierName, []);
    },

    /**
     *
     */
    generateTier: function ( total ) {
      // check for first tier
      var _self = this,
          tierId = 'tier_1',
          mainTier = this.get(tierId);
      if(mainTier){ return; }
      // create new tier, only since we dont have one
      this.addTier();

      // separate players into matches
      for (var i = 0; i < Math.round(total / 2); i++) {
        var matchArray = [{},{}];
        // then store into the new tier
        _self.addMatch( matchArray, tierId );
      }
    },

    /**
     * removes all data from all tiers
     */
    clearTiers: function () {
      var _self = this,
          tierCount = parseInt(_self.get('tierCount'), 10);

      if(tierCount > 0){
        for (var i = 1; i <= tierCount; i++) {
          var nm = _self.tierNamespace + i;
          var tmpTierData = _self.set( nm, []);
        }
      }

      _self.set("tiers", null);
      _self.set("tierCount", 0);
    },

    /**
      * returns a specific tier data object
      * @param  {String} tierId is the unique ID of the tier, Example: "tier_1"
      * @return {Object}        tier data object, see example for a sample
      *
      * Example:
      * {
      * 		users: ["5u43io-543fdos-fjdksl-riew98787","5u43io-543fdos-fjdksl-riew98787"],
      * 		winner: "5u43io-543fdos-fjdksl-riew98787",
      * 		status: "finished"
      * }
      */
    getTierById: function(tierId) {
      var champData = this.get('bracket');
      var tierData = (champData && champData[tierId])? champData[tierId]: null;

      return tierData;
    },

    /**
      * adds a user to a specific tier
      * @param  {String} tierId   the unique ID of the tier, example "tier_1"
      * @param  {String} userId   the unique ID of the user to add to the tier, based off of the user ID hash
      * @param  {number} tierPosition (Optional) - sets the user at a specific tier position
      * @param  {number} gamePosition (Optional) - sets the user at a specific game position
      */
    addPlayerToTier: function(tierId, userId, tierPosition, gamePosition) {
      if(!tierId || !userId) {
        return;
      }

      var champData = this.get('bracket');
      var tierData = (champData && champData[tierId])? champData[tierId]: null;

      // defaults
      tierPosition = tierPosition || 0;
      gamePosition = gamePosition || 0;

      // set the user in the correct position
      tierData[tierPosition].users[gamePosition] = userId;
      // set the data back into the bracket
      champData[tierId] = tierData;

      // update data to main model
      this.set('bracket', champData);
    }

  });

});
