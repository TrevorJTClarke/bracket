// ChampionshipData.js
// --------
define(["jquery", "backbone"], function($, Backbone) {
    var tierNamespace = "tier_";

    // Creates a new Backbone Model class object
    var ChampionshipData = Backbone.Model.extend({

        // TODO: setup this to tie to a DB
        initialize: function() {
            return this;
        },
        defaults: {
            "title": "Championship 1",
            "users": [],
            "bracket": {
                "tiers": 0
            }
        },

        // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
        validate: function(attrs) {

        },

        // set anything new, then store into DB
        createNew: function (data) {
            var _self = this;
            _self.attributes = $.extend(true, _self.attributes, data);
        },

        addUser: function (data) {
            var users = this.get("users");
                users.push(data);
                this.set("users", users);
        },

        addTier: function () {
            var bracket = this.get("bracket");
                bracket.tiers = bracket.tiers + 1;
            var newTierName = tierNamespace + bracket.tiers;

            // setup the baseline data for the tiers
            bracket[newTierName] = [{
                users: [],
                winner: null,
                status: "new"
            }];

            this.set("bracket", bracket);
        }

    });

    return ChampionshipData;

});
