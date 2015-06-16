define([
  'jquery',
  'backbone',
  'Parse',
  'collections/players',
  'models/player'
],
function(
  $,
  Backbone,
  Parse,
  Players,
  Player
){

  // Creates a new Backbone Model class object
  return Parse.Object.extend({
    className: "Championship",
    tierNamespace: 'tier_',

    initialize: function() {
      // this.set("players", new Players() );

      return this;
    },

    defaults: {
      'title': 'Championship 1',
      'players_ref': null,
      'tiers': 0
    },

    //
    validate: function(attrs) {},

    /**
      * adds user into the Championship.users data
      * @param {Object} data model of the user, see example for a sample
      *
      * example:
      * {
      * 		id: "5u43io-543fdos-fjdksl-riew98787",
      * 		firstName: "First",
      * 		lastName: "Last"
      * }
      */
    addPlayer: function(data) {
      // TODO:
      var users = this.get('players');

      users[data.id] = data;
      this.set('players', users);
    },

    /**
      * returns a user object from the Championship data
      * @param  {String} userId is the unique ID of the user, based off their hash
      * @return {Object}        user data object, see above example
      */
    getPlayerById: function(userId) {
      // TODO:
      // var usersData = this.get('users');
      //
      // return usersData[userId];
    },

    /**
      * adds a new default tier data into the Championship data
      *
      * Options:
      * Winner - The ID hash of the user that has won
      * Status - One of the following: 1. new, 2. pending, 3. finished, 4. bye
      */
    addTier: function () {
        var bracket = this.get('bracket');
            bracket.tiers = bracket.tiers + 1;
        var newTierName = this.tierNamespace + bracket.tiers;

        // setup the baseline data for the tiers
        bracket[newTierName] = [{
            players: [],
            winner: null,
            status: 'new'
        }];

        this.set('bracket', bracket);
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
