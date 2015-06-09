// ChampionshipData.js
// --------
define(["jquery", "backbone"], function($, Backbone) {

    // Creates a new Backbone Model class object
    var ChampionshipData = Backbone.Model.extend({
        tierNamespace: "tier_",

        // TODO: setup to tie to a DB
        initialize: function() {
            return this;
        },

        defaults: {
            "title": "Championship 1",
            "users": {},
            "bracket": {
                "tiers": 0
            }
        },

        //
        validate: function(attrs) {

        },

        /**
         * set anything new, then store into DB
         * @param  {Object} data model of the entire Championship data, setting anything here will modify defaults, and add new attributes
         * @return {null}
         *
         * TODO: finish this method
         */
        createNew: function (data) {
            var _self = this;
            _self.attributes = $.extend(true, _self.attributes, data);
        },

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
        addUser: function (data) {
            var users = this.get("users");
                users[data.id] = data;
                this.set("users", users);
        },

        /**
         * returns a user object from the Championship data
         * @param  {String} userId is the unique ID of the user, based off their hash
         * @return {Object}        user data object, see above example
         */
        getUserById: function( userId ) {
            var usersData = this.get("users");

            return usersData[userId];
        },

        /**
         * adds a new default tier data into the Championship data
         *
         * Options:
         * Winner - The ID hash of the user that has won
         * Status - One of the following: 1. new, 2. pending, 3. finished, 4. bye
         */
        addTier: function () {
            var bracket = this.get("bracket");
                bracket.tiers = bracket.tiers + 1;
            var newTierName = this.tierNamespace + bracket.tiers;

            // setup the baseline data for the tiers
            bracket[newTierName] = [{
                users: [],
                winner: null,
                status: "new"
            }];

            this.set("bracket", bracket);
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
        getTierById: function( tierId ) {
            var champData = this.get("bracket");
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
        addUserToTier: function( tierId, userId, tierPosition, gamePosition ) {
            if(!tierId || !userId){return;}
            var champData = this.get("bracket");
            var tierData = (champData && champData[tierId])? champData[tierId]: null;

            // defaults
            tierPosition = tierPosition || 0;
            gamePosition = gamePosition || 0;

            // set the user in the correct position
            tierData[tierPosition].users[gamePosition] = userId;
            // set the data back into the bracket
            champData[tierId] = tierData;

            // update data to main model
            this.set("bracket", champData);
        }

    });

    return ChampionshipData;

});
